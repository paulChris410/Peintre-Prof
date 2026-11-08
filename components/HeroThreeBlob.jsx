'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroThreeBlob({ isReducedMotion = false }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene, camera, renderer, blobMesh, originalPositions;
    let lightUltramarine, lightCadmium, lightMadder, lightViridian, ambientLight;
    let dropYellow, dropMadder, dropViridian;
    let mouseX = 0, mouseY = 0;
    let targetRotX = 0, targetRotY = 0;
    let currentRotX = 0, currentRotY = 0;
    let scrollY = 0;
    let animId;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const blobGeo = new THREE.IcosahedronGeometry(1.5, 4);
    originalPositions = blobGeo.attributes.position.clone();

    const blobMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1837b9,
      emissive: 0x0f2275,
      emissiveIntensity: 0.15,
      roughness: 0.18,
      metalness: 0.1,
      clearcoat: 0.9,
      clearcoatRoughness: 0.12,
      reflectivity: 0.8,
      transmission: 0.12,
      thickness: 1.2
    });

    blobMesh = new THREE.Mesh(blobGeo, blobMaterial);
    scene.add(blobMesh);

    // Orbiting Paint Drops
    // 1. Cadmium Yellow
    const yellowMat = new THREE.MeshStandardMaterial({ color: 0xffc300, emissive: 0xffa500, emissiveIntensity: 0.4, roughness: 0.2 });
    dropYellow = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), yellowMat);
    const dropLightYellow = new THREE.PointLight(0xffc300, 1.4, 4.5);
    dropYellow.add(dropLightYellow);
    scene.add(dropYellow);

    // 2. Rose Madder
    const madderMat = new THREE.MeshStandardMaterial({ color: 0xcf385b, emissive: 0x8c1731, emissiveIntensity: 0.35, roughness: 0.2 });
    dropMadder = new THREE.Mesh(new THREE.SphereGeometry(0.18, 32, 32), madderMat);
    const dropLightMadder = new THREE.PointLight(0xcf385b, 1.2, 4.5);
    dropMadder.add(dropLightMadder);
    scene.add(dropMadder);

    // 3. Viridian Green
    const viridianMat = new THREE.MeshStandardMaterial({ color: 0x1b7a58, emissive: 0x12523b, emissiveIntensity: 0.35, roughness: 0.2 });
    dropViridian = new THREE.Mesh(new THREE.SphereGeometry(0.16, 32, 32), viridianMat);
    const dropLightViridian = new THREE.PointLight(0x1b7a58, 1.2, 4.5);
    dropViridian.add(dropLightViridian);
    scene.add(dropViridian);

    ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    lightUltramarine = new THREE.PointLight(0x1837b9, 2.6, 12);
    lightUltramarine.position.set(-3.5, 3, 2.5);
    scene.add(lightUltramarine);

    lightCadmium = new THREE.PointLight(0xffc300, 2.4, 12);
    lightCadmium.position.set(3.5, -2, 2.5);
    scene.add(lightCadmium);

    lightMadder = new THREE.PointLight(0xcf385b, 2.0, 10);
    lightMadder.position.set(3, 3, 1.5);
    scene.add(lightMadder);

    lightViridian = new THREE.PointLight(0x1b7a58, 2.0, 10);
    lightViridian.position.set(-3, -3, 2);
    scene.add(lightViridian);

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
      targetRotY = mouseX * 0.9;
      targetRotX = mouseY * 0.9;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();

    function animate() {
      animId = requestAnimationFrame(animate);

      if (!isReducedMotion) {
        const time = clock.getElapsedTime();

        const positions = blobMesh.geometry.attributes.position;
        const orig = originalPositions;
        const count = positions.count;

        for (let i = 0; i < count; i++) {
          const ox = orig.getX(i);
          const oy = orig.getY(i);
          const oz = orig.getZ(i);

          const wave1 = Math.sin(ox * 2.2 + time * 1.1) * Math.cos(oy * 2.0 + time * 0.9);
          const wave2 = Math.sin(oz * 2.5 + time * 1.3) * 0.5;
          const wave3 = Math.cos(ox * 1.8 + oz * 1.8 + time * 0.8) * 0.4;
          const displacement = 1.0 + 0.22 * (wave1 + wave2 + wave3);

          positions.setXYZ(i, ox * displacement, oy * displacement, oz * displacement);
        }
        positions.needsUpdate = true;
        blobMesh.geometry.computeVertexNormals();

        const cycle = (Math.sin(time * 0.4) + 1) / 2;
        const cycle2 = (Math.cos(time * 0.35) + 1) / 2;
        const colorA = new THREE.Color(0x1837b9);
        const colorB = new THREE.Color(0xcf385b);
        const colorC = new THREE.Color(0x1b7a58);
        const currentColor = colorA.clone().lerp(colorB, cycle).lerp(colorC, cycle2 * 0.5);
        blobMaterial.color.copy(currentColor);

        const yellowAngle = time * 0.9;
        dropYellow.position.x = Math.cos(yellowAngle) * 2.4;
        dropYellow.position.y = Math.sin(yellowAngle * 1.2) * 0.6;
        dropYellow.position.z = Math.sin(yellowAngle) * 2.4;

        const madderAngle = -time * 0.75 + 1.2;
        dropMadder.position.x = Math.sin(madderAngle) * 2.8;
        dropMadder.position.y = Math.cos(madderAngle) * 2.2;
        dropMadder.position.z = Math.cos(madderAngle * 0.8) * 1.4;

        const viridianAngle = time * 0.6 + 2.4;
        dropViridian.position.x = Math.cos(viridianAngle) * 1.9;
        dropViridian.position.y = Math.sin(viridianAngle) * 2.3;
        dropViridian.position.z = Math.sin(viridianAngle * 1.5) * 1.8;

        currentRotX += (targetRotX - currentRotX) * 0.05;
        currentRotY += (targetRotY - currentRotY) * 0.05;

        blobMesh.rotation.x = currentRotX + time * 0.12;
        blobMesh.rotation.y = currentRotY + time * 0.16;

        blobMesh.position.y = -scrollY * 0.0016;
        blobMesh.rotation.z = scrollY * 0.0006;
      }

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement) {
        container.innerHTML = "";
      }
      renderer.dispose();
    };
  }, [isReducedMotion]);

  return <div ref={containerRef} className="hero-canvas-container" aria-hidden="true" />;
}
