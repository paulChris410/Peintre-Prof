'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function CanvasStudio3D({ isReducedMotion = false }) {
  const containerRef = useRef(null);
  const [lightingMode, setLightingMode] = useState('museum');
  const lightingModeRef = useRef('museum');
  const setLightingFnRef = useRef(null);
  const resetFnRef = useRef(null);

  useEffect(() => {
    lightingModeRef.current = lightingMode;
    if (setLightingFnRef.current) {
      setLightingFnRef.current(lightingMode);
    }
  }, [lightingMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene, camera, renderer, canvasMeshGroup;
    let mainSpotlight, ambientLight, fillLight, rakingLight;
    let frontArtworkMaterial;
    let isDragging = false;
    let previousMouseX = 0, previousMouseY = 0;
    let targetRotationX = 0.1, targetRotationY = -0.3;
    let currentRotationX = 0.1, currentRotationY = -0.3;
    let targetZoom = 4.2;
    let animId;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 50);
    camera.position.set(0, 0, targetZoom);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    canvasMeshGroup = new THREE.Group();
    scene.add(canvasMeshGroup);

    // Stretched Canvas Geometry (2.4 x 3.0 x 0.12 depth)
    const canvasGeometry = new THREE.BoxGeometry(2.4, 3.0, 0.12);

    const textureLoader = new THREE.TextureLoader();
    const frontTexture = textureLoader.load("/images/work-oil-horizon.jpg");

    const linenEdgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x223c8a,
      roughness: 0.8,
      metalness: 0.05
    });

    frontArtworkMaterial = new THREE.MeshPhysicalMaterial({
      map: frontTexture,
      roughness: 0.22,
      metalness: 0.05,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15,
      reflectivity: 0.7
    });

    const backStretcherMaterial = new THREE.MeshStandardMaterial({
      color: 0xd9d3c5,
      roughness: 0.9,
      metalness: 0.0
    });

    const boxMaterials = [
      linenEdgeMaterial,
      linenEdgeMaterial,
      linenEdgeMaterial,
      linenEdgeMaterial,
      frontArtworkMaterial,
      backStretcherMaterial
    ];

    const canvasMesh = new THREE.Mesh(canvasGeometry, boxMaterials);
    canvasMesh.castShadow = true;
    canvasMeshGroup.add(canvasMesh);

    // Stretcher Bars on reverse
    const woodMaterial = new THREE.MeshStandardMaterial({ color: 0x9e7b57, roughness: 0.7 });
    const barV = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.9, 0.04), woodMaterial);
    barV.position.set(0, 0, -0.065);
    canvasMeshGroup.add(barV);

    const barH = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.12, 0.04), woodMaterial);
    barH.position.set(0, 0, -0.065);
    canvasMeshGroup.add(barH);

    // Atelier Wax Seal
    const seal = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.02, 16), new THREE.MeshStandardMaterial({ color: 0x8a1832 }));
    seal.rotation.x = Math.PI / 2;
    seal.position.set(0.6, -0.8, -0.068);
    canvasMeshGroup.add(seal);

    // Lighting Setup
    ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    mainSpotlight = new THREE.DirectionalLight(0xffecc2, 2.4);
    mainSpotlight.position.set(2.0, 4.0, 3.5);
    scene.add(mainSpotlight);

    fillLight = new THREE.PointLight(0x1837b9, 1.2, 10);
    fillLight.position.set(-3.0, -1.0, 2.0);
    scene.add(fillLight);

    rakingLight = new THREE.DirectionalLight(0xffdf88, 0);
    rakingLight.position.set(4.5, 0.2, 0.4);
    scene.add(rakingLight);

    const applyLighting = (mode) => {
      if (mode === "museum") {
        mainSpotlight.color.setHex(0xffecc2);
        mainSpotlight.intensity = 2.4;
        mainSpotlight.position.set(2.0, 4.0, 3.5);
        ambientLight.intensity = 0.6;
        rakingLight.intensity = 0;
        frontArtworkMaterial.clearcoatRoughness = 0.15;
      } else if (mode === "daylight") {
        mainSpotlight.color.setHex(0xf5f8ff);
        mainSpotlight.intensity = 2.0;
        mainSpotlight.position.set(0, 4.5, 3.0);
        ambientLight.intensity = 0.9;
        rakingLight.intensity = 0;
        frontArtworkMaterial.clearcoatRoughness = 0.12;
      } else if (mode === "raking") {
        mainSpotlight.intensity = 0.6;
        ambientLight.intensity = 0.3;
        rakingLight.color.setHex(0xffdf88);
        rakingLight.intensity = 3.6;
        frontArtworkMaterial.clearcoatRoughness = 0.25;
      }
    };

    setLightingFnRef.current = applyLighting;
    applyLighting(lightingModeRef.current);

    resetFnRef.current = () => {
      targetRotationX = 0.1;
      targetRotationY = -0.3;
      targetZoom = 4.2;
    };

    // Mouse Drag Listeners
    const onMouseDown = (e) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      targetRotationX = Math.max(-1.1, Math.min(1.1, targetRotationX));

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    // Touch Support
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMouseX;
      const deltaY = e.touches[0].clientY - previousMouseY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      targetRotationX = Math.max(-1.1, Math.min(1.1, targetRotationX));

      previousMouseX = e.touches[0].clientX;
      previousMouseY = e.touches[0].clientY;
    };

    const onWheel = (e) => {
      e.preventDefault();
      targetZoom += e.deltaY * 0.003;
      targetZoom = Math.max(2.6, Math.min(6.5, targetZoom));
    };

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);

    function renderStudio() {
      animId = requestAnimationFrame(renderStudio);

      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      camera.position.z += (targetZoom - camera.position.z) * 0.08;

      canvasMeshGroup.rotation.x = currentRotationX;
      canvasMeshGroup.rotation.y = currentRotationY;

      if (!isDragging && !isReducedMotion) {
        canvasMeshGroup.position.y = Math.sin(Date.now() * 0.001) * 0.04;
      }

      renderer.render(scene, camera);
    }

    renderStudio();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement) {
        container.innerHTML = "";
      }
      renderer.dispose();
    };
  }, [isReducedMotion]);

  return (
    <div className="canvas-studio-container">
      <div className="canvas-studio-header">
        <div className="studio-lighting-pills">
          <span style={{ fontSize: "0.82rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", alignSelf: "center", marginRight: "0.5rem" }}>
            Gallery Lighting:
          </span>
          <button
            className={`light-mode-btn ${lightingMode === 'museum' ? 'active' : ''}`}
            onClick={() => setLightingMode('museum')}
          >
            🏛️ Museum Spotlight (3200K)
          </button>
          <button
            className={`light-mode-btn ${lightingMode === 'daylight' ? 'active' : ''}`}
            onClick={() => setLightingMode('daylight')}
          >
            ☀️ Studio Daylight (5500K)
          </button>
          <button
            className={`light-mode-btn ${lightingMode === 'raking' ? 'active' : ''}`}
            onClick={() => setLightingMode('raking')}
          >
            🌙 Impasto Raking Light
          </button>
        </div>

        <div>
          <button
            onClick={() => resetFnRef.current && resetFnRef.current()}
            className="badge-pill-btn"
          >
            Reset View
          </button>
        </div>
      </div>

      <div className="canvas-studio-viewport">
        <div ref={containerRef} id="canvas-studio-webgl" />
        <div className="studio-overlay-hint">
          <span>✦ Click & Drag to Rotate Canvas in 3D • Scroll Wheel to Zoom</span>
        </div>
      </div>
    </div>
  );
}
