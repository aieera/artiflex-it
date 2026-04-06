import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface LightPillarProps {
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  interactive?: boolean;
  className?: string;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;
  mixBlendMode?: React.CSSProperties["mixBlendMode"];
  pillarRotation?: number;
  quality?: "low" | "medium" | "high";
}

const LightPillar: React.FC<LightPillarProps> = ({
  topColor = "#5227FF",
  bottomColor = "#FF9FFC",
  intensity = 1.0,
  rotationSpeed = 0.3,
  interactive = false,
  className = "",
  glowAmount = 0.005,
  pillarWidth = 3.0,
  pillarHeight = 0.4,
  noiseIntensity = 0.5,
  mixBlendMode = "screen",
  pillarRotation = 0,
  quality = "high",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const timeRef = useRef(0);
  const rotationSpeedRef = useRef(rotationSpeed);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) setWebGLSupported(false);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !webGLSupported) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = isMobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    let eq = quality;
    if (isLowEnd && eq === "high") eq = "medium";
    if (isMobile && eq !== "low") eq = "low";

    const qs: Record<string, { iterations: number; waveIterations: number; pixelRatio: number; precision: string; stepMultiplier: number }> = {
      low: { iterations: 24, waveIterations: 1, pixelRatio: 0.5, precision: "mediump", stepMultiplier: 1.5 },
      medium: { iterations: 40, waveIterations: 2, pixelRatio: 0.65, precision: "mediump", stepMultiplier: 1.2 },
      high: { iterations: 80, waveIterations: 4, pixelRatio: Math.min(window.devicePixelRatio, 2), precision: "highp", stepMultiplier: 1.0 },
    };
    const s = qs[eq] || qs.medium;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: eq === "low" ? "low-power" : "high-performance", precision: s.precision as "highp" | "mediump" | "lowp", stencil: false, depth: false });
    } catch {
      setWebGLSupported(false);
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(s.pixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const parseColor = (hex: string) => { const c = new THREE.Color(hex); return new THREE.Vector3(c.r, c.g, c.b); };

    const vertexShader = `varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}`;
    const fragmentShader = `
      precision highp float;
      uniform float uTime;uniform vec2 uResolution;uniform vec2 uMouse;uniform vec3 uTopColor;uniform vec3 uBottomColor;
      uniform float uIntensity;uniform bool uInteractive;uniform float uGlowAmount;uniform float uPillarWidth;
      uniform float uPillarHeight;uniform float uNoiseIntensity;uniform float uRotCos;uniform float uRotSin;
      uniform float uPillarRotCos;uniform float uPillarRotSin;uniform float uWaveSin[4];uniform float uWaveCos[4];
      varying vec2 vUv;
      const float PI=3.141592653589793;const float E=2.71828182845904523536;
      float noise(vec2 c){vec2 r=(E*sin(E*c));return fract(r.x*r.y*(1.0+c.x));}
      void main(){
        vec2 fragCoord=vUv*uResolution;vec2 uv=(fragCoord*2.0-uResolution)/uResolution.y;
        uv=vec2(uv.x*uPillarRotCos-uv.y*uPillarRotSin,uv.x*uPillarRotSin+uv.y*uPillarRotCos);
        vec3 origin=vec3(0.0,0.0,-10.0);vec3 direction=normalize(vec3(uv,1.0));
        float maxDepth=50.0;float depth=0.1;
        float rotCos=uRotCos;float rotSin=uRotSin;
        if(uInteractive&&length(uMouse)>0.0){float ma=uMouse.x*PI*2.0;rotCos=cos(ma);rotSin=sin(ma);}
        vec3 color=vec3(0.0);
        for(int i=0;i<${s.iterations};i++){
          vec3 pos=origin+direction*depth;
          float nX=pos.x*rotCos-pos.z*rotSin;float nZ=pos.x*rotSin+pos.z*rotCos;pos.x=nX;pos.z=nZ;
          vec3 def=pos;def.y*=uPillarHeight;def=def+vec3(0.0,uTime,0.0);
          float freq=1.0;float amp=1.0;
          for(int j=0;j<${s.waveIterations};j++){
            float wx=def.x*uWaveCos[j]-def.z*uWaveSin[j];float wz=def.x*uWaveSin[j]+def.z*uWaveCos[j];
            def.x=wx;def.z=wz;float ph=uTime*float(j)*2.0;vec3 osc=cos(def.zxy*freq-ph);def+=osc*amp;freq*=2.0;amp*=0.5;
          }
          vec2 cp=cos(def.xz);float fd=length(cp)-0.2;
          float rb=length(pos.xz)-uPillarWidth;float k=4.0;float h=max(k-abs(-rb-(-fd)),0.0);
          fd=-(min(-rb,-fd)-h*h*0.25/k);fd=abs(fd)*0.15+0.01;
          vec3 grad=mix(uBottomColor,uTopColor,smoothstep(15.0,-15.0,pos.y));color+=grad/fd;
          if(fd<0.001||depth>maxDepth)break;depth+=fd*${s.stepMultiplier.toFixed(1)};
        }
        float wn=uPillarWidth/3.0;color=tanh(color*uGlowAmount/wn);
        float rnd=noise(gl_FragCoord.xy);color-=rnd/15.0*uNoiseIntensity;
        gl_FragColor=vec4(color*uIntensity,1.0);
      }`;

    const wa = 0.4;
    const wSin = new Float32Array(4), wCos = new Float32Array(4);
    for (let i = 0; i < 4; i++) { wSin[i] = Math.sin(wa); wCos[i] = Math.cos(wa); }
    const pr = (pillarRotation * Math.PI) / 180;

    const material = new THREE.ShaderMaterial({
      vertexShader, fragmentShader, transparent: true, depthWrite: false, depthTest: false,
      uniforms: {
        uTime: { value: 0 }, uResolution: { value: new THREE.Vector2(width, height) }, uMouse: { value: mouseRef.current },
        uTopColor: { value: parseColor(topColor) }, uBottomColor: { value: parseColor(bottomColor) },
        uIntensity: { value: intensity }, uInteractive: { value: interactive }, uGlowAmount: { value: glowAmount },
        uPillarWidth: { value: pillarWidth }, uPillarHeight: { value: pillarHeight }, uNoiseIntensity: { value: noiseIntensity },
        uRotCos: { value: 1.0 }, uRotSin: { value: 0.0 }, uPillarRotCos: { value: Math.cos(pr) }, uPillarRotSin: { value: Math.sin(pr) },
        uWaveSin: { value: wSin }, uWaveCos: { value: wCos },
      },
    });
    materialRef.current = material;
    const geometry = new THREE.PlaneGeometry(2, 2);
    geometryRef.current = geometry;
    scene.add(new THREE.Mesh(geometry, material));

    let mmt: number | null = null;
    const updateMouse = (clientX: number, clientY: number) => {
      if (mmt) return;
      mmt = window.setTimeout(() => { mmt = null; }, 16);
      const r = container.getBoundingClientRect();
      mouseRef.current.set(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
    };
    const handleMM = (e: MouseEvent) => { if (interactive) updateMouse(e.clientX, e.clientY); };
    const handleTM = (e: TouchEvent) => { if (interactive && e.touches.length > 0) updateMouse(e.touches[0].clientX, e.touches[0].clientY); };
    if (interactive) {
      container.addEventListener("mousemove", handleMM, { passive: true });
      container.addEventListener("touchmove", handleTM, { passive: true });
      container.addEventListener("touchstart", handleTM, { passive: true });
    }

    let lastTime = performance.now();
    const ft = 1000 / (eq === "low" ? 30 : 60);
    const animate = (ct: number) => {
      if (!materialRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;
      const dt = ct - lastTime;
      if (dt >= ft) {
        timeRef.current += 0.016 * rotationSpeedRef.current;
        materialRef.current.uniforms.uTime.value = timeRef.current;
        const ra = timeRef.current * 0.3;
        materialRef.current.uniforms.uRotCos.value = Math.cos(ra);
        materialRef.current.uniforms.uRotSin.value = Math.sin(ra);
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        lastTime = ct - (dt % ft);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    let rt: number | null = null;
    const handleResize = () => {
      if (rt) clearTimeout(rt);
      rt = window.setTimeout(() => {
        if (!rendererRef.current || !materialRef.current || !containerRef.current) return;
        const nw = containerRef.current.clientWidth, nh = containerRef.current.clientHeight;
        rendererRef.current.setSize(nw, nh);
        materialRef.current.uniforms.uResolution.value.set(nw, nh);
      }, 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        container.removeEventListener("mousemove", handleMM);
        container.removeEventListener("touchmove", handleTM);
        container.removeEventListener("touchstart", handleTM);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        if (container.contains(rendererRef.current.domElement)) container.removeChild(rendererRef.current.domElement);
      }
      materialRef.current?.dispose();
      geometryRef.current?.dispose();
      rendererRef.current = null; materialRef.current = null; sceneRef.current = null; cameraRef.current = null; geometryRef.current = null; rafRef.current = null;
    };
  }, [webGLSupported, quality]);

  useEffect(() => { rotationSpeedRef.current = rotationSpeed; }, [rotationSpeed]);
  useEffect(() => { if (materialRef.current) materialRef.current.uniforms.uTopColor.value = new THREE.Vector3(...new THREE.Color(topColor).toArray()); }, [topColor]);
  useEffect(() => { if (materialRef.current) materialRef.current.uniforms.uBottomColor.value = new THREE.Vector3(...new THREE.Color(bottomColor).toArray()); }, [bottomColor]);
  useEffect(() => { if (materialRef.current) materialRef.current.uniforms.uIntensity.value = intensity; }, [intensity]);
  useEffect(() => { if (materialRef.current) materialRef.current.uniforms.uGlowAmount.value = glowAmount; }, [glowAmount]);
  useEffect(() => { if (materialRef.current) materialRef.current.uniforms.uPillarWidth.value = pillarWidth; }, [pillarWidth]);
  useEffect(() => { if (materialRef.current) materialRef.current.uniforms.uPillarHeight.value = pillarHeight; }, [pillarHeight]);
  useEffect(() => { if (materialRef.current) materialRef.current.uniforms.uNoiseIntensity.value = noiseIntensity; }, [noiseIntensity]);
  useEffect(() => {
    if (!materialRef.current) return;
    const r = (pillarRotation * Math.PI) / 180;
    materialRef.current.uniforms.uPillarRotCos.value = Math.cos(r);
    materialRef.current.uniforms.uPillarRotSin.value = Math.sin(r);
  }, [pillarRotation]);

  if (!webGLSupported) return <div className={`w-full h-full absolute top-0 left-0 bg-black ${className}`} style={{ mixBlendMode }} />;

  return <div ref={containerRef} className={`w-full h-full absolute top-0 left-0 ${className}`} style={{ mixBlendMode }} />;
};

export default LightPillar;
