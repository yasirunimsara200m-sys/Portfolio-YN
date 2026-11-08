'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SuriaOrbAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = parent.clientWidth || 600;
    let height = parent.clientHeight || 600;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Custom Organic Fluid Shader Orb (Ysuriadesign style with Indigo/Cyan/Violet palette)
    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vDistort;

      // Classic Simplex Noise 3D
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

      float snoise(vec3 v){
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
        i = mod(i, 289.0 );
        vec4 p = permute( permute( permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
      }

      void main() {
        vUv = uv;
        vNormal = normal;

        // Multi-frequency harmonic wave noise
        float noise = snoise(normal * 1.5 + vec3(uTime * 0.45));
        noise += snoise(normal * 3.2 - vec3(uTime * 0.25)) * 0.35;

        // Subtle mouse interaction displacement
        float mouseDist = distance(uv, uMouse);
        float mouseInfluence = smoothstep(0.6, 0.0, mouseDist) * 0.15;

        float displacement = (noise * 0.28) + mouseInfluence;
        vDistort = displacement;

        vec3 newPosition = position + normal * displacement;
        vPosition = newPosition;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vDistort;

      void main() {
        // Fresnel rim glow
        vec3 viewDir = normalize(cameraPosition - vPosition);
        float fresnel = 1.0 - max(dot(viewDir, normalize(vNormal)), 0.0);
        fresnel = pow(fresnel, 2.5);

        // Core colors tuned for Yasiru's portfolio (Deep Navy, Indigo, Vivid Cyan, Violet)
        vec3 deepColor = vec3(0.04, 0.06, 0.16);     // Dark Slate Indigo
        vec3 indigoColor = vec3(0.39, 0.40, 0.95);   // Electric Indigo #6366f1
        vec3 cyanColor = vec3(0.02, 0.71, 0.83);     // Neon Cyan #06b6d4
        vec3 violetColor = vec3(0.66, 0.33, 0.97);   // Soft Violet #a855f7

        // Dynamic fluid gradient mixing based on distortion and height
        float mixVal = smoothstep(-0.25, 0.35, vDistort);
        vec3 baseColor = mix(deepColor, indigoColor, mixVal);

        // Iridescent highlight zones
        float highlight = smoothstep(0.1, 0.4, vDistort);
        baseColor = mix(baseColor, cyanColor, highlight * 0.65);
        baseColor = mix(baseColor, violetColor, fresnel * 0.7);

        // Rim Light Glow
        vec3 rimGlow = cyanColor * fresnel * 1.4 + indigoColor * fresnel * 0.8;
        vec3 finalColor = baseColor + rimGlow;

        // Subtle transparency fade towards the edges
        float alpha = clamp(0.75 + fresnel * 0.25, 0.0, 0.96);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    // 3. Geometry & Mesh
    const geometry = new THREE.IcosahedronGeometry(1.22, 64);
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: false,
    });

    const orbMesh = new THREE.Mesh(geometry, material);
    scene.add(orbMesh);

    // 4. Subtle Outer Atmosphere Ring (Ysuriadesign style aura)
    const ringGeo = new THREE.RingGeometry(1.5, 1.85, 64);
    const ringMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: uniforms.uTime,
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          float dist = distance(vUv, vec2(0.5));
          float alpha = smoothstep(0.5, 0.35, dist) * smoothstep(0.2, 0.38, dist);
          vec3 ringColor = mix(vec3(0.39, 0.4, 0.95), vec3(0.02, 0.71, 0.83), sin(uTime * 0.5) * 0.5 + 0.5);
          gl_FragColor = vec4(ringColor, alpha * 0.22);
        }
      `,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.position.z = -0.2;
    scene.add(ringMesh);

    // 5. Mouse Interaction Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.4;
      targetMouseY = y * 0.4;
      uniforms.uMouse.value.set((x + 1) * 0.5, (y + 1) * 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!canvas || !parent) return;
      width = parent.clientWidth || 600;
      height = parent.clientHeight || 600;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      uniforms.uTime.value = elapsedTime;

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Gentle organic rotation + mouse tilt
      orbMesh.rotation.y = elapsedTime * 0.18 + currentMouseX;
      orbMesh.rotation.x = Math.sin(elapsedTime * 0.12) * 0.15 - currentMouseY;

      ringMesh.rotation.z = elapsedTime * 0.08;
      ringMesh.rotation.y = currentMouseX * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-auto overflow-hidden">
      {/* Visual soft background glow behind orb */}
      <div className="absolute w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] rounded-full bg-indigo-500/15 dark:bg-indigo-600/20 blur-[100px] pointer-events-none"></div>
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[580px] max-h-[580px] object-contain transition-opacity duration-700"
      />
    </div>
  );
}
