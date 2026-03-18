/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useState } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
    : [1, 1, 1];
};

type Origin = "top-center" | "top-left" | "top-right" | "left" | "right" | "bottom-left" | "bottom-center" | "bottom-right";

const getAnchorAndDir = (origin: Origin, w: number, h: number) => {
  const o = 0.2;
  switch (origin) {
    case "top-left": return { anchor: [0, -o * h], dir: [0, 1] };
    case "top-right": return { anchor: [w, -o * h], dir: [0, 1] };
    case "left": return { anchor: [-o * w, 0.5 * h], dir: [1, 0] };
    case "right": return { anchor: [(1 + o) * w, 0.5 * h], dir: [-1, 0] };
    case "bottom-left": return { anchor: [0, (1 + o) * h], dir: [0, -1] };
    case "bottom-center": return { anchor: [0.5 * w, (1 + o) * h], dir: [0, -1] };
    case "bottom-right": return { anchor: [w, (1 + o) * h], dir: [0, -1] };
    default: return { anchor: [0.5 * w, -o * h], dir: [0, 1] };
  }
};

interface LightRaysProps {
  className?: string;
  raysOrigin?: Origin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
}

const vert = `attribute vec2 position;varying vec2 vUv;void main(){vUv=position*0.5+0.5;gl_Position=vec4(position,0.0,1.0);}`;

const frag = `precision highp float;
uniform float iTime;uniform vec2 iResolution;uniform vec2 rayPos;uniform vec2 rayDir;uniform vec3 raysColor;uniform float raysSpeed;uniform float lightSpread;uniform float rayLength;uniform float pulsating;uniform float fadeDistance;uniform float saturation;uniform vec2 mousePos;uniform float mouseInfluence;uniform float noiseAmount;uniform float distortion;varying vec2 vUv;
float noise(vec2 st){return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);}
float rayStrength(vec2 src,vec2 refDir,vec2 coord,float sA,float sB,float spd){vec2 s2c=coord-src;vec2 dn=normalize(s2c);float ca=dot(dn,refDir);float da=ca+distortion*sin(iTime*2.0+length(s2c)*0.01)*0.2;float sf=pow(max(da,0.0),1.0/max(lightSpread,0.001));float dist=length(s2c);float mxD=iResolution.x*rayLength;float lf=clamp((mxD-dist)/mxD,0.0,1.0);float ff=clamp((iResolution.x*fadeDistance-dist)/(iResolution.x*fadeDistance),0.5,1.0);float p=pulsating>0.5?(0.8+0.2*sin(iTime*spd*3.0)):1.0;float bs=clamp((0.45+0.15*sin(da*sA+iTime*spd))+(0.3+0.2*cos(-da*sB+iTime*spd)),0.0,1.0);return bs*lf*ff*sf*p;}
void mainImage(out vec4 fc,in vec2 fC){vec2 c=vec2(fC.x,iResolution.y-fC.y);vec2 fd=rayDir;if(mouseInfluence>0.0){vec2 ms=mousePos*iResolution.xy;vec2 md=normalize(ms-rayPos);fd=normalize(mix(rayDir,md,mouseInfluence));}vec4 r1=vec4(1.0)*rayStrength(rayPos,fd,c,36.2214,21.11349,1.5*raysSpeed);vec4 r2=vec4(1.0)*rayStrength(rayPos,fd,c,22.3991,18.0234,1.1*raysSpeed);fc=r1*0.5+r2*0.4;if(noiseAmount>0.0){float n=noise(c*0.01+iTime*0.1);fc.rgb*=(1.0-noiseAmount+noiseAmount*n);}float b=1.0-(c.y/iResolution.y);fc.x*=0.1+b*0.8;fc.y*=0.3+b*0.6;fc.z*=0.5+b*0.5;if(saturation!=1.0){float g=dot(fc.rgb,vec3(0.299,0.587,0.114));fc.rgb=mix(vec3(g),fc.rgb,saturation);}fc.rgb*=raysColor;}
void main(){vec4 c;mainImage(c,gl_FragCoord.xy);gl_FragColor=c;}`;

export default function LightRays({
  className = "",
  raysOrigin = "top-center",
  raysColor = "#1B8AC7",
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = false,
  mouseInfluence = 0.1,
  noiseAmount = 0.0,
  distortion = 0.0,
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setIsVisible(e.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;
    cleanupRef.current?.();
    cleanupRef.current = null;

    const container = containerRef.current;
    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
    const gl = renderer.gl;
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    while (container.firstChild) container.removeChild(container.firstChild);
    container.appendChild(gl.canvas);

    const uniforms: any = {
      iTime: { value: 0 }, iResolution: { value: [1, 1] },
      rayPos: { value: [0, 0] }, rayDir: { value: [0, 1] },
      raysColor: { value: hexToRgb(raysColor) }, raysSpeed: { value: raysSpeed },
      lightSpread: { value: lightSpread }, rayLength: { value: rayLength },
      pulsating: { value: pulsating ? 1 : 0 }, fadeDistance: { value: fadeDistance },
      saturation: { value: saturation }, mousePos: { value: [0.5, 0.5] },
      mouseInfluence: { value: followMouse ? mouseInfluence : 0 },
      noiseAmount: { value: noiseAmount }, distortion: { value: distortion },
    };

    const geometry = new Triangle(gl);
    const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
    const mesh = new Mesh(gl, { geometry, program });
    let raf = 0;

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      renderer.setSize(w, h);
      const dpr = (renderer as any).dpr || 1;
      uniforms.iResolution.value = [w * dpr, h * dpr];
      const { anchor, dir } = getAnchorAndDir(raysOrigin, w * dpr, h * dpr);
      uniforms.rayPos.value = anchor;
      uniforms.rayDir.value = dir;
    };

    const mouseTarget = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseTarget.x = (e.clientX - rect.left) / rect.width;
      mouseTarget.y = (e.clientY - rect.top) / rect.height;
    };

    if (followMouse) {
      window.addEventListener("mousemove", onMouseMove);
    }

    const loop = (t: number) => {
      uniforms.iTime.value = t * 0.001;
      if (followMouse) {
        smoothMouse.x += (mouseTarget.x - smoothMouse.x) * 0.05;
        smoothMouse.y += (mouseTarget.y - smoothMouse.y) * 0.05;
        uniforms.mousePos.value = [smoothMouse.x, smoothMouse.y];
      }
      try { renderer.render({ scene: mesh }); } catch { return; }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    resize();
    raf = requestAnimationFrame(loop);

    cleanupRef.current = () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      try {
        const ext = gl.getExtension("WEBGL_lose_context");
        ext?.loseContext();
        gl.canvas.parentNode?.removeChild(gl.canvas);
      } catch {}
    };

    return () => { cleanupRef.current?.(); cleanupRef.current = null; };
  }, [isVisible, raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating, fadeDistance, saturation, followMouse, mouseInfluence, noiseAmount, distortion]);

  return <div ref={containerRef} className={`absolute inset-0 overflow-hidden z-[2] ${className}`} />;
}
