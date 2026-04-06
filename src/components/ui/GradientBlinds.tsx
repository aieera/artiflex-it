/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const MAX_COLORS = 8;
const hexToRGB = (hex: string) => {
  const c = hex.replace("#", "").padEnd(6, "0");
  return [
    parseInt(c.slice(0, 2), 16) / 255,
    parseInt(c.slice(2, 4), 16) / 255,
    parseInt(c.slice(4, 6), 16) / 255,
  ];
};

const prepStops = (stops?: string[]) => {
  const base = (stops?.length
    ? stops
    : ["#0A3D6B", "#1B8AC7", "#28B5E1"]
  ).slice(0, MAX_COLORS);
  if (base.length === 1) base.push(base[0]);
  while (base.length < MAX_COLORS)
    base.push(base[base.length - 1]);
  const arr = base.map(hexToRGB);
  return {
    arr,
    count: Math.max(2, Math.min(MAX_COLORS, stops?.length ?? 3)),
  };
};

interface GradientBlindsProps {
  className?: string;
  gradientColors?: string[];
  angle?: number;
  noise?: number;
  blindCount?: number;
  blindMinWidth?: number;
  mouseDampening?: number;
  mirrorGradient?: boolean;
  spotlightRadius?: number;
  spotlightSoftness?: number;
  spotlightOpacity?: number;
  distortAmount?: number;
  shineDirection?: "left" | "right";
}

const vertex = `attribute vec2 position;attribute vec2 uv;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,0.0,1.0);}`;

const fragment = `#ifdef GL_ES
precision mediump float;
#endif
uniform vec3 iResolution;uniform vec2 iMouse;uniform float iTime;uniform float uAngle;uniform float uNoise;uniform float uBlindCount;uniform float uSpotlightRadius;uniform float uSpotlightSoftness;uniform float uSpotlightOpacity;uniform float uMirror;uniform float uDistort;uniform float uShineFlip;uniform vec3 uColor0;uniform vec3 uColor1;uniform vec3 uColor2;uniform vec3 uColor3;uniform vec3 uColor4;uniform vec3 uColor5;uniform vec3 uColor6;uniform vec3 uColor7;uniform int uColorCount;varying vec2 vUv;
float rand(vec2 co){return fract(sin(dot(co,vec2(12.9898,78.233)))*43758.5453);}
vec2 rotate2D(vec2 p,float a){float c=cos(a);float s=sin(a);return mat2(c,-s,s,c)*p;}
vec3 getGradientColor(float t){float tt=clamp(t,0.0,1.0);int count=uColorCount;if(count<2)count=2;float scaled=tt*float(count-1);float seg=floor(scaled);float f=fract(scaled);if(seg<1.0)return mix(uColor0,uColor1,f);if(seg<2.0&&count>2)return mix(uColor1,uColor2,f);if(seg<3.0&&count>3)return mix(uColor2,uColor3,f);if(seg<4.0&&count>4)return mix(uColor3,uColor4,f);if(seg<5.0&&count>5)return mix(uColor4,uColor5,f);if(seg<6.0&&count>6)return mix(uColor5,uColor6,f);if(seg<7.0&&count>7)return mix(uColor6,uColor7,f);if(count>7)return uColor7;if(count>6)return uColor6;if(count>5)return uColor5;if(count>4)return uColor4;if(count>3)return uColor3;if(count>2)return uColor2;return uColor1;}
void mainImage(out vec4 fc,in vec2 fC){vec2 uv0=fC.xy/iResolution.xy;float asp=iResolution.x/iResolution.y;vec2 p=uv0*2.0-1.0;p.x*=asp;vec2 pr=rotate2D(p,uAngle);pr.x/=asp;vec2 uv=pr*0.5+0.5;vec2 um=uv;if(uDistort>0.0){um.x+=sin(um.y*6.0)*0.01*uDistort;um.y+=cos(um.x*6.0)*0.01*uDistort;}float t=um.x;if(uMirror>0.5)t=1.0-abs(1.0-2.0*fract(t));vec3 base=getGradientColor(t);vec2 off=vec2(iMouse.x/iResolution.x,iMouse.y/iResolution.y);float d=length(uv0-off);float r=max(uSpotlightRadius,1e-4);float dn=d/r;float spot=(1.0-2.0*pow(dn,uSpotlightSoftness))*uSpotlightOpacity;vec3 cir=vec3(spot);float stripe=fract(um.x*max(uBlindCount,1.0));if(uShineFlip>0.5)stripe=1.0-stripe;vec3 ran=vec3(stripe);vec3 col=cir+base-ran;col+=(rand(gl_FragCoord.xy+iTime)-0.5)*uNoise;fc=vec4(col,1.0);}
void main(){vec4 c;mainImage(c,vUv*iResolution.xy);gl_FragColor=c;}`;

export default function GradientBlinds({
  className = "",
  gradientColors,
  angle = 45,
  noise = 0.3,
  blindCount = 16,
  blindMinWidth = 60,
  mouseDampening = 0.15,
  mirrorGradient = false,
  spotlightRadius = 0.5,
  spotlightSoftness = 1,
  spotlightOpacity = 1,
  distortAmount = 0,
  shineDirection = "left",
}: GradientBlindsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const rendererRef = useRef<any>(null); // ✅ added
  const mouseTarget = useRef([0, 0]);
  const lastTime = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ✅ prevent multiple renderers
    if (rendererRef.current) return;

    const renderer = new Renderer({
      dpr: 1, // ✅ reduced GPU load
      alpha: true,
      antialias: true,
    });

    rendererRef.current = renderer;

    const gl = renderer.gl;
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";
    container.appendChild(gl.canvas);

    const { arr, count } = prepStops(gradientColors);

    const uniforms: any = {
      iResolution: {
        value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1],
      },
      iMouse: { value: [0, 0] },
      iTime: { value: 0 },
      uAngle: { value: (angle * Math.PI) / 180 },
      uNoise: { value: noise },
      uBlindCount: { value: Math.max(1, blindCount) },
      uSpotlightRadius: { value: spotlightRadius },
      uSpotlightSoftness: { value: spotlightSoftness },
      uSpotlightOpacity: { value: spotlightOpacity },
      uMirror: { value: mirrorGradient ? 1 : 0 },
      uDistort: { value: distortAmount },
      uShineFlip: {
        value: shineDirection === "right" ? 1 : 0,
      },
      uColor0: { value: arr[0] },
      uColor1: { value: arr[1] },
      uColor2: { value: arr[2] },
      uColor3: { value: arr[3] },
      uColor4: { value: arr[4] },
      uColor5: { value: arr[5] },
      uColor6: { value: arr[6] },
      uColor7: { value: arr[7] },
      uColorCount: { value: count },
    };

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms,
    });

    const geometry = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      uniforms.iResolution.value = [
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
        1,
      ];
      if (blindMinWidth > 0) {
        uniforms.uBlindCount.value = Math.max(
          1,
          Math.min(
            blindCount,
            Math.floor(rect.width / blindMinWidth)
          )
        );
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const updateTarget = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const s = (renderer as any).dpr || 1;
      mouseTarget.current = [
        (clientX - rect.left) * s,
        (rect.height - (clientY - rect.top)) * s,
      ];
    };

    const onMove = (e: MouseEvent) =>
      updateTarget(e.clientX, e.clientY);

    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0)
        updateTarget(
          e.touches[0].clientX,
          e.touches[0].clientY
        );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, {
      passive: true,
    });
    window.addEventListener("touchstart", onTouch, {
      passive: true,
    });

    const loop = (t: number) => {
      rafRef.current = requestAnimationFrame(loop);

      uniforms.iTime.value = t * 0.001;

      if (mouseDampening > 0) {
        const dt =
          (t - (lastTime.current || t)) / 1000;
        lastTime.current = t;

        const f = Math.min(
          1,
          1 -
            Math.exp(
              -dt / Math.max(1e-4, mouseDampening)
            )
        );

        const cur = uniforms.iMouse.value;

        cur[0] +=
          (mouseTarget.current[0] - cur[0]) * f;
        cur[1] +=
          (mouseTarget.current[1] - cur[1]) * f;
      }

      try {
        renderer.render({ scene: mesh });
      } catch {}
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);

      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchstart", onTouch);

      ro.disconnect();

      if (rendererRef.current) {
        const gl = rendererRef.current.gl;

        // ✅ force release GPU context
        gl.getExtension("WEBGL_lose_context")?.loseContext();

        if (gl.canvas.parentElement === container) {
          container.removeChild(gl.canvas);
        }

        rendererRef.current = null;
      }
    };
  }, []); // ✅ RUN ONLY ONCE

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
    />
  );
}