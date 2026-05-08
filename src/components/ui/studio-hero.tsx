// studio-hero.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

gsap.registerPlugin(ScrollTrigger);

export const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const totalSections = 2;

  const threeRefs = useRef<any>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
    locations: [],
    targetCameraX: 0,
    targetCameraY: 30,
    targetCameraZ: 100,
  });

  useEffect(() => {
    const { current: refs } = threeRefs;

    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x000000, 0.00022);

    refs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    refs.camera.position.set(0, 20, 100);

    refs.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true, alpha: true });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.45;

    refs.composer = new EffectComposer(refs.renderer);
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
    refs.composer.addPass(new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight), 0.9, 0.4, 0.82
    ));

    for (let layer = 0; layer < 3; layer++) {
      const count = 4500;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const sz = new Float32Array(count);
      for (let j = 0; j < count; j++) {
        const r = 200 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        pos[j * 3]     = r * Math.sin(phi) * Math.cos(theta);
        pos[j * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[j * 3 + 2] = r * Math.cos(phi);
        const c = new THREE.Color();
        const pick = Math.random();
        if (pick < 0.72) c.setHSL(0, 0, 0.8 + Math.random() * 0.2);
        else if (pick < 0.88) c.setHSL(0.74, 0.55, 0.78);
        else c.setHSL(0.62, 0.4, 0.82);
        col[j * 3] = c.r; col[j * 3 + 1] = c.g; col[j * 3 + 2] = c.b;
        sz[j] = Math.random() * 1.8 + 0.4;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
      geo.setAttribute('size',     new THREE.BufferAttribute(sz, 1));
      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: layer } },
        vertexShader: `
          attribute float size; attribute vec3 color; varying vec3 vColor;
          uniform float time; uniform float depth;
          void main() {
            vColor = color;
            vec3 p = position;
            float a = time * 0.04 * (1.0 - depth * 0.28);
            mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
            p.xy = rot * p.xy;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = size * (280.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            gl_FragColor = vec4(vColor, 1.0 - smoothstep(0.0, 0.5, d));
          }`,
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const stars = new THREE.Points(geo, mat);
      refs.scene.add(stars);
      refs.stars.push(stars);
    }

    const nebGeo = new THREE.PlaneGeometry(8000, 4000, 100, 100);
    const nebMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x5b21b6) },
        color2: { value: new THREE.Color(0x1e1b4b) },
        opacity: { value: 0.28 },
      },
      vertexShader: `
        varying vec2 vUv; varying float vEl; uniform float time;
        void main() {
          vUv = uv; vec3 p = position;
          float el = sin(p.x * 0.01 + time) * cos(p.y * 0.01 + time) * 20.0;
          p.z += el; vEl = el;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 color1; uniform vec3 color2;
        uniform float opacity; uniform float time;
        varying vec2 vUv; varying float vEl;
        void main() {
          float m = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
          vec3 col = mix(color1, color2, m * 0.5 + 0.5);
          float a = opacity * (1.0 - length(vUv - 0.5) * 2.0) * (1.0 + vEl * 0.01);
          gl_FragColor = vec4(col, a);
        }`,
      transparent: true, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false,
    });
    refs.nebula = new THREE.Mesh(nebGeo, nebMat);
    refs.nebula.position.z = -1050;
    refs.scene.add(refs.nebula);

    const layers = [
      { z: -50,  h: 60,  color: 0x0a0a0f, op: 1   },
      { z: -100, h: 80,  color: 0x0d0d18, op: 0.82 },
      { z: -150, h: 100, color: 0x0f0f22, op: 0.62 },
      { z: -200, h: 120, color: 0x12122e, op: 0.42 },
    ];
    layers.forEach((l, idx) => {
      const pts: THREE.Vector2[] = [];
      for (let i = 0; i <= 50; i++) {
        const x = (i / 50 - 0.5) * 1000;
        const y = Math.sin(i * 0.1) * l.h + Math.sin(i * 0.05) * l.h * 0.5 + Math.random() * l.h * 0.18 - 100;
        pts.push(new THREE.Vector2(x, y));
      }
      pts.push(new THREE.Vector2(5000, -300), new THREE.Vector2(-5000, -300));
      const mesh = new THREE.Mesh(
        new THREE.ShapeGeometry(new THREE.Shape(pts)),
        new THREE.MeshBasicMaterial({ color: l.color, transparent: true, opacity: l.op, side: THREE.DoubleSide })
      );
      mesh.position.z = l.z;
      mesh.position.y = l.z;
      mesh.userData = { baseZ: l.z, index: idx };
      refs.scene.add(mesh);
      refs.mountains.push(mesh);
    });
    refs.locations = refs.mountains.map((m: any) => m.position.z);

    const atmMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        varying vec3 vN; varying vec3 vP;
        void main() { vN = normalize(normalMatrix * normal); vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `
        varying vec3 vN; uniform float time;
        void main() {
          float i = pow(0.7 - dot(vN, vec3(0,0,1)), 2.0);
          vec3 atm = vec3(0.35, 0.15, 0.9) * i;
          gl_FragColor = vec4(atm * (sin(time * 2.0) * 0.08 + 0.92), i * 0.22);
        }`,
      side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true,
    });
    refs.scene.add(new THREE.Mesh(new THREE.SphereGeometry(600, 32, 32), atmMat));

    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      refs.stars.forEach((s: any) => { if (s.material.uniforms) s.material.uniforms.time.value = t; });
      if (refs.nebula?.material.uniforms) refs.nebula.material.uniforms.time.value = t * 0.5;
      if (refs.camera) {
        const ease = 0.05;
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * ease;
        smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * ease;
        smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * ease;
        refs.camera.position.x = smoothCameraPos.current.x + Math.sin(t * 0.1) * 1.5;
        refs.camera.position.y = smoothCameraPos.current.y + Math.cos(t * 0.15) * 0.8;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 10, -600);
      }
      refs.mountains.forEach((m: any, i: number) => {
        const pf = 1 + i * 0.5;
        m.position.x = Math.sin(t * 0.1) * 2 * pf;
        m.position.y = 50 + Math.cos(t * 0.15) * pf;
      });
      refs.composer?.render();
    };
    animate();
    setIsReady(true);

    const onResize = () => {
      if (!refs.camera || !refs.renderer || !refs.composer) return;
      refs.camera.aspect = window.innerWidth / window.innerHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', onResize);
      refs.stars.forEach((s: any) => { s.geometry.dispose(); s.material.dispose(); });
      refs.mountains.forEach((m: any) => { m.geometry.dispose(); m.material.dispose(); });
      refs.nebula?.geometry.dispose(); refs.nebula?.material.dispose();
      refs.renderer?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;
    gsap.set([eyebrowRef.current, titleRef.current, subtitleRef.current, statsRef.current, scrollProgressRef.current], {
      visibility: 'visible',
    });
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 1 })
      .from(titleRef.current?.querySelectorAll('.title-char'), { y: 160, opacity: 0, duration: 1.4, stagger: 0.045 }, '-=0.6')
      .from(subtitleRef.current?.querySelectorAll('.sub-line'), { y: 40, opacity: 0, duration: 1, stagger: 0.18 }, '-=0.8')
      .from(statsRef.current?.querySelectorAll('.stat-item'), { y: 30, opacity: 0, duration: 0.9, stagger: 0.12 }, '-=0.7')
      .from(scrollProgressRef.current, { opacity: 0, y: 30, duration: 0.9 }, '-=0.5');
    return () => { tl.kill(); };
  }, [isReady]);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / maxScroll, 1);
      setScrollProgress(progress);
      setCurrentSection(Math.floor(progress * totalSections));
      const { current: refs } = threeRefs;
      const totalP = progress * totalSections;
      const secP = totalP % 1;
      const cam = [
        { x: 0, y: 30,  z: 300  },
        { x: 0, y: 40,  z: -50  },
        { x: 0, y: 50,  z: -700 },
      ];
      const cur  = cam[Math.floor(totalP)] ?? cam[0];
      const next = cam[Math.floor(totalP) + 1] ?? cur;
      refs.targetCameraX = cur.x + (next.x - cur.x) * secP;
      refs.targetCameraY = cur.y + (next.y - cur.y) * secP;
      refs.targetCameraZ = cur.z + (next.z - cur.z) * secP;
      refs.mountains.forEach((m: any, i: number) => {
        if (progress > 0.7) { m.position.z = 600000; return; }
        m.position.z = refs.locations[i];
        if (refs.nebula) refs.nebula.position.z = refs.mountains[3].position.z;
      });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [totalSections]);

  const splitChars = (text: string) =>
    text.split('').map((ch, i) => (
      <span key={i} className="title-char inline-block overflow-hidden">
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ));

  const sections = [
    {
      eyebrow: 'Selected Work · 2026',
      title: 'PRECISION\nINTERFACES',
      lines: [
        'We design and engineer interactive systems',
        'for brands that treat detail as a discipline.',
      ],
    },
    {
      eyebrow: 'Identity · Motion · Engineering',
      title: 'BEYOND\nSTATIC',
      lines: [
        'Every surface is an opportunity.',
        'Every interaction, a statement of intent.',
      ],
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${(totalSections + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{ background: 'linear-gradient(to bottom, transparent, #000)' }}
        />
        <div
          ref={eyebrowRef}
          className="absolute top-10 left-8 md:left-12"
          style={{ visibility: 'hidden' }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.4em]"
            style={{ color: 'rgba(255,255,255,0.38)', fontFamily: '"JetBrains Mono", monospace' }}
          >
            {sections[currentSection]?.eyebrow ?? sections[0].eyebrow}
          </p>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <h1
            ref={titleRef}
            className="font-black leading-[0.85] tracking-[-0.04em] whitespace-pre-line"
            style={{
              fontSize: 'clamp(4rem, 13vw, 13rem)',
              color: 'rgba(255,255,255,0.96)',
              visibility: 'hidden',
            }}
          >
            {splitChars(sections[currentSection]?.title ?? sections[0].title)}
          </h1>
          <div
            ref={subtitleRef}
            className="mt-8 max-w-xl"
            style={{ visibility: 'hidden' }}
          >
            {(sections[currentSection]?.lines ?? sections[0].lines).map((line, i) => (
              <p
                key={i}
                className="sub-line"
                style={{
                  fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.015em',
                }}
              >
                {line}
              </p>
            ))}
          </div>
          <div
            ref={statsRef}
            className="mt-12 flex gap-10 border-t pt-8"
            style={{ borderColor: 'rgba(255,255,255,0.1)', visibility: 'hidden' }}
          >
            {[['12+', 'Years'], ['84', 'Shipped'], ['5', 'Continents']].map(([num, label]) => (
              <div key={label} className="stat-item">
                <div
                  style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}
                >
                  {num}
                </div>
                <div
                  className="mt-1 text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          ref={scrollProgressRef}
          className="absolute bottom-8 right-8 flex flex-col items-end gap-3"
          style={{ visibility: 'hidden' }}
        >
          <span
            className="text-[9px] uppercase tracking-[0.35em]"
            style={{ color: 'rgba(255,255,255,0.28)', fontFamily: '"JetBrains Mono", monospace' }}
          >
            Scroll
          </span>
          <div
            className="h-px w-24 overflow-hidden rounded-full"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-150"
              style={{
                width: `${scrollProgress * 100}%`,
                background: 'linear-gradient(90deg, rgba(139,92,246,0.9), rgba(255,255,255,0.9))',
              }}
            />
          </div>
          <span
            className="text-[9px]"
            style={{ color: 'rgba(255,255,255,0.2)', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.2em' }}
          >
            {String(currentSection + 1).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};