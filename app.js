/**
 * AURELIA DELACROIX — PORTFOLIO CORE APPLICATION & 3D ENGINE
 * 
 * Includes:
 * 1. Three.js 3D hero blob with shape & color shifts + 3 orbiting paint drops.
 * 2. Reduced motion support with static fallback & manual toggle.
 * 3. Letter-by-letter rising title animation.
 * 4. Scroll-driven yellow brush-stroke underline drawing on headings.
 * 5. Scroll-filling process timeline tracking.
 * 6. Interactive Motion Frame / Painting Time-Lapse Studio player.
 * 7. 3D WebGL Canvas Studio / Virtual Gallery Inspector (rotate 3D canvas, lighting modes).
 * 8. Interactive Pigment Alchemy Studio (mixing wells & optical analysis).
 * 9. Bespoke Commissions Interactive Cost & Dimension Estimator.
 * 10. 3D card tilt with specular glare on gallery hover + filter support for photos & SVGs.
 * 11. Interactive artwork detail modal with zoom, swatches, and inquiry link.
 * 12. Light/Dark mode toggle with localStorage and Three.js lighting sync.
 * 13. Artist Customizer drawer for live personalization testing.
 */

(function () {
  "use strict";

  // --- STATE ---
  let isDarkMode = false;
  let isReducedMotion = false;
  let currentFilter = "all";
  let activeModalIndex = 0;
  let currentFilteredList = [];

  // --- INITIALIZE ON DOM READY ---
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initReducedMotion();
    initTitleLetterAnimation();
    initScrollHeader();
    initBrushStrokeObserver();
    initGallery();
    initMotionFrameTimeLapse();
    initThreeCanvasStudio();
    initPigmentAlchemyMixer();
    initCommissionEstimator();
    initProcessTimeline();
    initModalEvents();
    initThreeBlobHero();
    initContactForm();
    initCustomizerDrawer();
    initMobileNav();
  });

  /* ==========================================================================
     1. THEME MANAGEMENT (LIGHT GESSO / DARK NOCTURNE)
     ========================================================================== */
  function initTheme() {
    const savedTheme = localStorage.getItem("delacroix_theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setTheme(true);
    } else {
      setTheme(false);
    }

    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        setTheme(!isDarkMode);
      });
    }
  }

  function setTheme(dark) {
    isDarkMode = dark;
    const html = document.documentElement;
    const themeIcon = document.getElementById("theme-icon-use");

    if (isDarkMode) {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("delacroix_theme", "dark");
      if (themeIcon) {
        themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
      }
    } else {
      html.removeAttribute("data-theme");
      localStorage.setItem("delacroix_theme", "light");
      if (themeIcon) {
        themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
      }
    }

    if (window.updateThreeSceneLighting) {
      window.updateThreeSceneLighting(isDarkMode);
    }
    if (window.updateStudioCanvasLighting) {
      window.updateStudioCanvasLighting();
    }
  }

  /* ==========================================================================
     2. REDUCED MOTION MANAGEMENT
     ========================================================================== */
  function initReducedMotion() {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotion = motionMediaQuery.matches;

    motionMediaQuery.addEventListener("change", (e) => {
      isReducedMotion = e.matches;
      updateMotionUI();
    });

    const motionToggleBtn = document.getElementById("motion-toggle-btn");
    if (motionToggleBtn) {
      motionToggleBtn.addEventListener("click", () => {
        isReducedMotion = !isReducedMotion;
        updateMotionUI();
      });
    }

    updateMotionUI();
  }

  function updateMotionUI() {
    const motionText = document.getElementById("motion-btn-text");
    if (motionText) {
      motionText.textContent = isReducedMotion ? "Motion: Off" : "Motion: On";
    }
    if (window.setThreeMotionActive) {
      window.setThreeMotionActive(!isReducedMotion);
    }
  }

  /* ==========================================================================
     3. TITLE LETTER-BY-LETTER RISING ANIMATION
     ========================================================================== */
  function initTitleLetterAnimation(customName) {
    const titleContainer = document.getElementById("hero-artist-name");
    if (!titleContainer) return;

    const rawText = customName || titleContainer.getAttribute("data-artist-name") || "AURELIA DELACROIX";
    titleContainer.setAttribute("data-artist-name", rawText);

    titleContainer.innerHTML = "";
    const words = rawText.trim().split(" ");
    let charCounter = 0;

    words.forEach((word, wordIndex) => {
      const lineSpan = document.createElement("span");
      lineSpan.className = "title-line";

      for (let i = 0; i < word.length; i++) {
        const charWrap = document.createElement("span");
        charWrap.className = "char-wrap";

        const charSpan = document.createElement("span");
        charSpan.className = "char";
        charSpan.textContent = word[i];
        charSpan.style.setProperty("--char-index", charCounter++);

        charWrap.appendChild(charSpan);
        lineSpan.appendChild(charWrap);
      }

      titleContainer.appendChild(lineSpan);

      if (wordIndex < words.length - 1) {
        const spaceWrap = document.createElement("span");
        spaceWrap.className = "char-wrap";
        spaceWrap.innerHTML = "&nbsp;";
        titleContainer.appendChild(spaceWrap);
      }
    });
  }

  window.updateArtistName = function(name) {
    if (!name) return;
    initTitleLetterAnimation(name);
    const navName = document.querySelector(".artist-name-nav");
    if (navName) navName.textContent = name;
    const footerName = document.querySelector(".footer-artist-name");
    if (footerName) footerName.textContent = name;
  };

  /* ==========================================================================
     4. HEADER SCROLL & BRUSH-STROKE UNDERLINE OBSERVER
     ========================================================================== */
  function initScrollHeader() {
    const header = document.querySelector(".site-header");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, { passive: true });
  }

  function initBrushStrokeObserver() {
    const sectionTitles = document.querySelectorAll(".section-title");

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      }, {
        threshold: 0.25,
        rootMargin: "0px 0px -40px 0px"
      });

      sectionTitles.forEach((title) => observer.observe(title));
    } else {
      sectionTitles.forEach((title) => title.classList.add("in-view"));
    }
  }

  /* ==========================================================================
     5. INTERACTIVE MOTION FRAME: THE ANATOMY OF A PAINTING (TIME-LAPSE)
     ========================================================================== */
  const MOTION_STAGES = [
    {
      stepNum: "Frame 01 of 06",
      title: "Rabbit-Skin Gesso Ground",
      description: "Belgian flax linen is stretched across tulipwood stretchers and sized with warm rabbit-skin glue. Eight cross-directional coats of Bolognese chalk gesso are sanded with water stones to form an absorbent ivory marble surface.",
      substrate: "Belgian Flax Linen (460 gsm)",
      dryingTime: "48 Hours curing",
      tools: "Broad Japanese hog brush",
      layerThickness: "0.2 mm chalk bed"
    },
    {
      stepNum: "Frame 02 of 06",
      title: "Charcoal Cartoons & Sgraffito Geometry",
      description: "Direct compositional scoring onto the dry gesso ground using natural vine charcoal. Architectural harmonic ratios and vector masses are mapped before liquid pigments touch the canvas.",
      substrate: "Vine charcoal on gesso",
      dryingTime: "Immediate",
      tools: "Willow charcoal & plumb line",
      layerThickness: "Dry carbon powder"
    },
    {
      stepNum: "Frame 03 of 06",
      title: "Imprimatura Wash (Ultramarine & Viridian)",
      description: "A fast-drying translucent wash of French Ultramarine and Hydrated Viridian diluted in spike lavender oil is wiped across with linen rags, establishing the global shadow temperature and atmospheric depth.",
      substrate: "Dilute mineral glazes",
      dryingTime: "12 Hours",
      tools: "Raw linen wiping rags",
      layerThickness: "0.05 mm optical veil"
    },
    {
      stepNum: "Frame 04 of 06",
      title: "Impasto Block-In (Cadmium & Rose Madder)",
      description: "Heavy palette knife application of pure Cadmium Yellow Medium and Rose Madder Genuine mixed with cold wax and walnut paste. High-energy textural slabs sculpt tactile peaks and ridges.",
      substrate: "Cold wax & dry mineral paste",
      dryingTime: "7 Days setting",
      tools: "Italian steel palette knives",
      layerThickness: "3.5 mm textural impasto"
    },
    {
      stepNum: "Frame 05 of 06",
      title: "Cold Wax Glazing & Sgraffito Slicing",
      description: "Multiple translucent glazes of rose madder lake are laid over viridian grounds. Razor blades score razor incisions into wet paint, revealing the brilliant white chalk gesso bed buried deep beneath.",
      substrate: "Beeswax dammar glazes",
      dryingTime: "14 Days curing",
      tools: "Micro-scalpels & silicone scrapers",
      layerThickness: "Variable multi-strata"
    },
    {
      stepNum: "Frame 06 of 06",
      title: "Final Dammar Varnish & Museum Specular Sheen",
      description: "A lustrous isolation coat of retoucher's dammar resin seals the four elemental pigments. Equalizes optical refraction, deepens ultramarine saturation, and provides museum archival permanence.",
      substrate: "Natural tree resin seal",
      dryingTime: "12 Months full cure",
      tools: "Soft badger hair varnishing mop",
      layerThickness: "0.1 mm crystalline sheen"
    }
  ];

  function initMotionFrameTimeLapse() {
    let currentStageIndex = 0;
    let isPlaying = false;
    let playInterval = null;

    const layers = document.querySelectorAll(".motion-canvas-layer");
    const scrubber = document.getElementById("motion-scrubber");
    const playBtn = document.getElementById("play-pause-btn");
    const pills = document.querySelectorAll(".frame-pill");
    const brushCursor = document.getElementById("painter-brush-cursor");

    const stageTag = document.getElementById("motion-stage-tag");
    const stageTitle = document.getElementById("motion-stage-title");
    const stageDesc = document.getElementById("motion-stage-desc");
    const specSubstrate = document.getElementById("motion-spec-substrate");
    const specDrying = document.getElementById("motion-spec-drying");
    const specTools = document.getElementById("motion-spec-tools");
    const specLayer = document.getElementById("motion-spec-layer");

    if (!scrubber || layers.length === 0) return;

    function setStage(index) {
      currentStageIndex = index;
      scrubber.value = index;

      // Update canvas layers
      layers.forEach((layer, i) => {
        if (i === index) {
          layer.classList.add("active");
        } else {
          layer.classList.remove("active");
        }
      });

      // Update pills
      pills.forEach((p, i) => {
        if (i === index) {
          p.classList.add("active");
        } else {
          p.classList.remove("active");
        }
      });

      // Update texts
      const data = MOTION_STAGES[index];
      if (data) {
        if (stageTag) stageTag.textContent = data.stepNum;
        if (stageTitle) stageTitle.textContent = data.title;
        if (stageDesc) stageDesc.textContent = data.description;
        if (specSubstrate) specSubstrate.textContent = data.substrate;
        if (specDrying) specDrying.textContent = data.dryingTime;
        if (specTools) specTools.textContent = data.tools;
        if (specLayer) specLayer.textContent = data.layerThickness;
      }

      // Animate brush cursor movement
      if (brushCursor) {
        brushCursor.classList.add("painting");
        const brushCoords = [
          { x: 30, y: 40, r: -15 },
          { x: 70, y: 35, r: 25 },
          { x: 45, y: 65, r: 10 },
          { x: 60, y: 45, r: -35 },
          { x: 25, y: 75, r: 20 },
          { x: 50, y: 50, r: 0 }
        ];
        const pos = brushCoords[index] || { x: 50, y: 50, r: 0 };
        brushCursor.style.transform = `translate(${pos.x * 3.5}px, ${pos.y * 2.2}px) rotate(${pos.r}deg)`;

        setTimeout(() => {
          if (!isPlaying) brushCursor.classList.remove("painting");
        }, 600);
      }
    }

    // Scrubber input
    scrubber.addEventListener("input", (e) => {
      pausePlayback();
      setStage(parseInt(e.target.value, 10));
    });

    // Pills click
    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        pausePlayback();
        const stage = parseInt(pill.getAttribute("data-stage"), 10);
        setStage(stage);
      });
    });

    // Play / Pause button
    if (playBtn) {
      playBtn.addEventListener("click", () => {
        if (isPlaying) {
          pausePlayback();
        } else {
          startPlayback();
        }
      });
    }

    function startPlayback() {
      isPlaying = true;
      if (brushCursor) brushCursor.classList.add("painting");
      playBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16"/>
          <rect x="14" y="4" width="4" height="16"/>
        </svg>
      `;

      playInterval = setInterval(() => {
        let nextIndex = (currentStageIndex + 1) % MOTION_STAGES.length;
        setStage(nextIndex);
      }, 2200);
    }

    function pausePlayback() {
      isPlaying = false;
      if (playInterval) clearInterval(playInterval);
      if (brushCursor) brushCursor.classList.remove("painting");
      if (playBtn) {
        playBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        `;
      }
    }

    setStage(0);
  }

  /* ==========================================================================
     6. INTERACTIVE 3D CANVAS STUDIO / VIRTUAL GALLERY INSPECTOR (THREE.JS)
     ========================================================================== */
  function initThreeCanvasStudio() {
    const container = document.getElementById("canvas-studio-webgl");
    if (!container || typeof THREE === "undefined") return;

    let scene, camera, renderer, canvasMeshGroup;
    let mainSpotlight, ambientLight, fillLight, rakingLight;
    let isDragging = false;
    let previousMouseX = 0, previousMouseY = 0;
    let targetRotationX = 0.1, targetRotationY = -0.3;
    let currentRotationX = 0.1, currentRotationY = -0.3;
    let targetZoom = 4.2;
    let currentLightingMode = "museum";

    // Setup Scene & Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 50);
    camera.position.set(0, 0, targetZoom);

    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    canvasMeshGroup = new THREE.Group();
    scene.add(canvasMeshGroup);

    // --- CREATE REALISTIC STRETCHED CANVAS BOX ---
    // Width 2.4, Height 3.0, Depth 0.08 (thick gallery wrap edge)
    const canvasGeometry = new THREE.BoxGeometry(2.4, 3.0, 0.12);

    // Load High-Res Front Artwork Texture
    const textureLoader = new THREE.TextureLoader();
    const frontTexture = textureLoader.load("images/work-oil-horizon.jpg");
    frontTexture.wrapS = THREE.ClampToEdgeWrapping;
    frontTexture.wrapT = THREE.ClampToEdgeWrapping;

    // Materials for the 6 Box Faces:
    // 0: Right edge (linen wrap)
    // 1: Left edge (linen wrap)
    // 2: Top edge (linen wrap)
    // 3: Bottom edge (linen wrap)
    // 4: Front face (Painting artwork + specular varnish)
    // 5: Back face (Raw linen ground + wooden stretcher bars)

    const linenEdgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x223c8a, // dark ultramarine edge bleed
      roughness: 0.8,
      metalness: 0.05
    });

    const frontArtworkMaterial = new THREE.MeshPhysicalMaterial({
      map: frontTexture,
      roughness: 0.22,
      metalness: 0.05,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15,
      reflectivity: 0.7
    });

    const backStretcherMaterial = new THREE.MeshStandardMaterial({
      color: 0xd9d3c5, // raw unprimed Belgian linen
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

    // Wooden Stretcher Crossbars on Back
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

    // --- LIGHTING RIG ---
    ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    mainSpotlight = new THREE.DirectionalLight(0xffeedd, 2.2);
    mainSpotlight.position.set(2.5, 4.0, 3.5);
    scene.add(mainSpotlight);

    fillLight = new THREE.PointLight(0x1837b9, 1.2, 10);
    fillLight.position.set(-3.0, -1.0, 2.0);
    scene.add(fillLight);

    rakingLight = new THREE.DirectionalLight(0xffdf88, 0); // Active in raking mode
    rakingLight.position.set(4.5, 0.2, 0.4);
    scene.add(rakingLight);

    // Lighting Modes Handler
    window.setStudioLightingMode = function(mode) {
      currentLightingMode = mode;
      const pills = document.querySelectorAll(".light-mode-btn");
      pills.forEach(p => {
        if (p.getAttribute("data-lighting") === mode) {
          p.classList.add("active");
        } else {
          p.classList.remove("active");
        }
      });

      if (mode === "museum") {
        mainSpotlight.color.setHex(0xffecc2); // 3200K warm halogen
        mainSpotlight.intensity = 2.4;
        mainSpotlight.position.set(2.0, 4.0, 3.5);
        ambientLight.intensity = 0.6;
        rakingLight.intensity = 0;
        frontArtworkMaterial.clearcoatRoughness = 0.15;
      } else if (mode === "daylight") {
        mainSpotlight.color.setHex(0xf5f8ff); // 5500K crisp northern daylight
        mainSpotlight.intensity = 2.0;
        mainSpotlight.position.set(0, 4.5, 3.0);
        ambientLight.intensity = 0.9;
        rakingLight.intensity = 0;
        frontArtworkMaterial.clearcoatRoughness = 0.12;
      } else if (mode === "raking") {
        mainSpotlight.intensity = 0.6;
        ambientLight.intensity = 0.3;
        rakingLight.color.setHex(0xffdf88);
        rakingLight.intensity = 3.6; // Extreme raking angle casts dramatic shadows along impasto
        frontArtworkMaterial.clearcoatRoughness = 0.25;
      }
    };

    // Attach lighting pill listeners
    const lightBtns = document.querySelectorAll(".light-mode-btn");
    lightBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-lighting");
        window.setStudioLightingMode(mode);
      });
    });

    // --- INTERACTIVE DRAG ROTATION ---
    container.addEventListener("mousedown", (e) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;

      // Clamp vertical rotation so canvas doesn't flip upside down
      targetRotationX = Math.max(-1.1, Math.min(1.1, targetRotationX));

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    });

    // Touch Support
    container.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener("touchend", () => {
      isDragging = false;
    });

    window.addEventListener("touchmove", (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMouseX;
      const deltaY = e.touches[0].clientY - previousMouseY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      targetRotationX = Math.max(-1.1, Math.min(1.1, targetRotationX));

      previousMouseX = e.touches[0].clientX;
      previousMouseY = e.touches[0].clientY;
    }, { passive: true });

    // Wheel Zoom
    container.addEventListener("wheel", (e) => {
      e.preventDefault();
      targetZoom += e.deltaY * 0.003;
      targetZoom = Math.max(2.6, Math.min(6.5, targetZoom));
    }, { passive: false });

    // Reset View Button
    const resetBtn = document.getElementById("studio-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        targetRotationX = 0.1;
        targetRotationY = -0.3;
        targetZoom = 4.2;
      });
    }

    // Resize
    window.addEventListener("resize", () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Render Loop
    function renderStudio() {
      requestAnimationFrame(renderStudio);

      // Smooth damping lerp
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      camera.position.z += (targetZoom - camera.position.z) * 0.08;

      canvasMeshGroup.rotation.x = currentRotationX;
      canvasMeshGroup.rotation.y = currentRotationY;

      // Idle gentle float when not dragging
      if (!isDragging && !isReducedMotion) {
        canvasMeshGroup.position.y = Math.sin(Date.now() * 0.001) * 0.04;
      }

      renderer.render(scene, camera);
    }

    renderStudio();
  }

  /* ==========================================================================
     7. PIGMENT ALCHEMY STUDIO (INTERACTIVE COLOR MIXER)
     ========================================================================== */
  const PIGMENT_DATABASE = [
    { id: "ultramarine", name: "French Ultramarine", code: "PB29", hex: "#1837b9", opacity: 0.35, rgb: [24, 55, 185] },
    { id: "cadmium", name: "Cadmium Yellow Medium", code: "PY35", hex: "#ffc300", opacity: 0.95, rgb: [255, 195, 0] },
    { id: "madder", name: "Rose Madder Genuine", code: "NR9", hex: "#cf385b", opacity: 0.45, rgb: [207, 56, 91] },
    { id: "viridian", name: "Viridian Hydrated Oxide", code: "PG18", hex: "#1b7a58", opacity: 0.50, rgb: [27, 122, 88] },
    { id: "white", name: "Titanium White", code: "PW6", hex: "#f5f7f4", opacity: 1.0, rgb: [245, 247, 244] },
    { id: "umber", name: "Burnt Umber", code: "PBr7", hex: "#59392b", opacity: 0.85, rgb: [89, 57, 43] }
  ];

  function initPigmentAlchemyMixer() {
    let selectedPigments = ["ultramarine", "cadmium"]; // initial default blend

    const wells = document.querySelectorAll(".pigment-well-item");
    const dish = document.getElementById("dish-swatch");
    const blendTitle = document.getElementById("dish-blend-title");
    const blendHex = document.getElementById("dish-blend-hex");
    const blendDesc = document.getElementById("dish-blend-desc");
    const blendOpacity = document.getElementById("dish-blend-opacity");

    if (!dish || wells.length === 0) return;

    wells.forEach(well => {
      well.addEventListener("click", () => {
        const id = well.getAttribute("data-pigment");
        const idx = selectedPigments.indexOf(id);

        if (idx > -1) {
          // Deselect if already selected (minimum 1 must remain)
          if (selectedPigments.length > 1) {
            selectedPigments.splice(idx, 1);
            well.classList.remove("selected");
          }
        } else {
          // Select (maximum 3 for harmonic clarity)
          if (selectedPigments.length >= 3) {
            const removed = selectedPigments.shift();
            const removedWell = document.querySelector(`[data-pigment="${removed}"]`);
            if (removedWell) removedWell.classList.remove("selected");
          }
          selectedPigments.push(id);
          well.classList.add("selected");
        }

        updateMixture();
      });
    });

    function updateMixture() {
      const activeData = PIGMENT_DATABASE.filter(p => selectedPigments.includes(p.id));

      // Calculate optical subtractive color mix
      let r = 0, g = 0, b = 0, totalOpacity = 0;
      activeData.forEach(p => {
        r += p.rgb[0];
        g += p.rgb[1];
        b += p.rgb[2];
        totalOpacity += p.opacity;
      });

      r = Math.round(r / activeData.length);
      g = Math.round(g / activeData.length);
      b = Math.round(b / activeData.length);
      const avgOpacity = (totalOpacity / activeData.length).toFixed(2);
      const hexCode = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

      // Update dish swatch
      dish.style.backgroundColor = hexCode;

      // Descriptive naming based on combination
      let blendName = "Harmonic Chords";
      let analysis = "A balanced optical collision of elemental mineral wavelengths.";

      const ids = selectedPigments.sort().join("+");

      if (ids === "cadmium+ultramarine") {
        blendName = "Luminous Oceanic Olive";
        analysis = "The searing solar radiation of cadmium yellow combines with the cold spiritual depth of ultramarine to produce an ancient, terrestrial green wash.";
      } else if (ids === "madder+ultramarine") {
        blendName = "Imperial Nocturnal Violet";
        analysis = "Natural rose madder root meets lapis lazuli. Yields a deeply translucent purple glaze favored by 16th-century Venetian masters.";
      } else if (ids === "cadmium+madder") {
        blendName = "Molten Cadmium Vermilion";
        analysis = "A searing, high-energy warm spectrum capable of vibrating aggressively forward against cool gesso grounds.";
      } else if (ids === "ultramarine+viridian") {
        blendName = "Deep Abyssal Marine";
        analysis = "Two cold minerals in harmonic agreement. Creates a limitless oceanic depth ideal for atmospheric landscape grounds.";
      } else if (ids === "madder+viridian") {
        blendName = "Chromatic Complementary Resonance";
        analysis = "Direct complementary opposition. When layered as glazes rather than mixed flat, they create optical vibrating vibration.";
      } else if (selectedPigments.includes("white")) {
        blendName = "Gesso Tint & Pastel Atmosphere";
        analysis = "Titanium white raises the tonal value while increasing opacity and cooling down pigment saturation.";
      }

      if (blendTitle) blendTitle.textContent = blendName;
      if (blendHex) blendHex.textContent = hexCode.toUpperCase();
      if (blendDesc) blendDesc.textContent = analysis;
      if (blendOpacity) blendOpacity.textContent = `Optical Opacity: ${Math.round(avgOpacity * 100)}% • Active Pigments: ${activeData.map(p => p.code).join(" + ")}`;
    }

    updateMixture();
  }

  /* ==========================================================================
     8. BESPOKE COMMISSION CALCULATOR
     ========================================================================== */
  function initCommissionEstimator() {
    const widthSlider = document.getElementById("comm-width-slider");
    const heightSlider = document.getElementById("comm-height-slider");
    const widthVal = document.getElementById("comm-width-val");
    const heightVal = document.getElementById("comm-height-val");
    const priceDisplay = document.getElementById("comm-price-display");
    const timelineDisplay = document.getElementById("comm-timeline-display");
    const substrateSelect = document.getElementById("comm-substrate-select");
    const framingSelect = document.getElementById("comm-framing-select");
    const applyBtn = document.getElementById("comm-apply-btn");

    if (!widthSlider || !heightSlider || !priceDisplay) return;

    function calculateEstimate() {
      const w = parseInt(widthSlider.value, 10);
      const h = parseInt(heightSlider.value, 10);

      if (widthVal) widthVal.textContent = `${w} cm`;
      if (heightVal) heightVal.textContent = `${h} cm`;

      // Surface area in square meters
      const areaM2 = (w * h) / 10000;

      // Base pricing: $3,200 baseline + $5,800 per square meter
      let price = 3200 + (areaM2 * 5800);

      // Substrate multiplier
      const substrate = substrateSelect ? substrateSelect.value : "linen";
      if (substrate === "panel") price *= 1.12;
      if (substrate === "sailcloth") price *= 1.25;

      // Framing addition
      const framing = framingSelect ? framingSelect.value : "unframed";
      if (framing === "oak") price += 450 + (w + h) * 1.8;
      if (framing === "walnut") price += 750 + (w + h) * 2.5;

      // Timeline estimation
      let weeks = 6;
      if (areaM2 > 1.2) weeks = 12;
      if (areaM2 > 2.5) weeks = 18;

      // Format price
      priceDisplay.textContent = `$${Math.round(price / 100) * 100}`;
      if (timelineDisplay) timelineDisplay.textContent = `Estimated Execution: ${weeks}–${weeks + 4} Weeks`;
    }

    widthSlider.addEventListener("input", calculateEstimate);
    heightSlider.addEventListener("input", calculateEstimate);
    if (substrateSelect) substrateSelect.addEventListener("change", calculateEstimate);
    if (framingSelect) framingSelect.addEventListener("change", calculateEstimate);

    calculateEstimate();

    // Link to pre-populate contact form
    if (applyBtn) {
      applyBtn.addEventListener("click", () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
          const messageField = document.getElementById("contact-message");
          const typeSelect = document.getElementById("contact-type");
          if (typeSelect) typeSelect.value = "commission";

          if (messageField) {
            const w = widthSlider.value;
            const h = heightSlider.value;
            const sub = substrateSelect ? substrateSelect.options[substrateSelect.selectedIndex].text : "Belgian Linen";
            const frame = framingSelect ? framingSelect.options[framingSelect.selectedIndex].text : "Unframed";
            const est = priceDisplay.textContent;

            messageField.value = `Hello Aurelia,\n\nI would like to inquire about reserving a bespoke commission based on my configured parameters:\n- Dimensions: ${w} × ${h} cm\n- Substrate: ${sub}\n- Framing: ${frame}\n- Estimated Price: ${est}\n\nCould we arrange a studio consultation to discuss palette harmonies and architectural lighting?\n\nWarm regards,`;
            messageField.focus();
          }
        }
      });
    }
  }

  /* ==========================================================================
     9. GALLERY: RENDERING, 3D TILT, & FILTERING
     ========================================================================== */
  function initGallery() {
    renderGallery("all");

    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.getAttribute("data-filter");
        renderGallery(category);
      });
    });
  }

  function renderGallery(filterCategory) {
    currentFilter = filterCategory;
    const grid = document.getElementById("paintings-grid");
    const countDisplay = document.getElementById("gallery-count-text");
    if (!grid) return;

    currentFilteredList = window.getFilteredPaintings ? window.getFilteredPaintings(filterCategory) : (window.PAINTINGS_DATA || []);
    
    if (countDisplay) {
      countDisplay.textContent = `Showing ${currentFilteredList.length} of ${(window.PAINTINGS_DATA || []).length} artworks`;
    }

    grid.innerHTML = "";

    currentFilteredList.forEach((artwork, index) => {
      const card = document.createElement("article");
      card.className = "artwork-card";
      card.setAttribute("data-id", artwork.id);
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `View details of ${artwork.title}`);

      // Media: Render real fine art photo if available, fallback to painterly SVG
      let mediaHtml = "";
      if (artwork.imageUrl) {
        mediaHtml = `<img src="${artwork.imageUrl}" alt="${artwork.title}" class="artwork-image" loading="lazy">`;
      } else {
        mediaHtml = artwork.svgContent;
      }

      card.innerHTML = `
        <div class="artwork-glare"></div>
        <div class="artwork-media-wrap">
          <span class="artwork-badge">${artwork.category.toUpperCase()}</span>
          ${mediaHtml}
        </div>
        <div class="artwork-info">
          <div class="artwork-meta-top">
            <span class="artwork-year">${artwork.year}</span>
            <span class="artwork-status">${artwork.status}</span>
          </div>
          <h3 class="artwork-title">${artwork.title}</h3>
          <p class="artwork-medium">${artwork.medium}</p>
          <p class="artwork-dimensions">${artwork.dimensions}</p>
          <div class="artwork-footer">
            <span class="artwork-price">${artwork.price}</span>
            <span class="artwork-inspect-cta">
              Inspect Piece
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>
        </div>
      `;

      attach3DTilt(card);

      card.addEventListener("click", () => openArtworkModal(index));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openArtworkModal(index);
        }
      });

      grid.appendChild(card);
    });
  }

  function attach3DTilt(card) {
    const glare = card.querySelector(".artwork-glare");

    card.addEventListener("mousemove", (e) => {
      if (isReducedMotion) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;

      if (glare) {
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)";
      if (glare) {
        glare.style.background = "transparent";
      }
    });
  }

  /* ==========================================================================
     10. ARTWORK DETAIL MODAL
     ========================================================================== */
  function initModalEvents() {
    const modal = document.getElementById("artwork-modal");
    const closeBtn = document.getElementById("modal-close-btn");
    const prevBtn = document.getElementById("modal-prev-btn");
    const nextBtn = document.getElementById("modal-next-btn");

    if (!modal) return;

    if (closeBtn) closeBtn.addEventListener("click", closeArtworkModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeArtworkModal();
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (activeModalIndex > 0) {
          openArtworkModal(activeModalIndex - 1);
        } else {
          openArtworkModal(currentFilteredList.length - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (activeModalIndex < currentFilteredList.length - 1) {
          openArtworkModal(activeModalIndex + 1);
        } else {
          openArtworkModal(0);
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("open")) return;
      if (e.key === "Escape") closeArtworkModal();
      if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
      if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
    });
  }

  function openArtworkModal(index) {
    const modal = document.getElementById("artwork-modal");
    if (!modal || !currentFilteredList[index]) return;

    activeModalIndex = index;
    const item = currentFilteredList[index];

    // Media presentation (photo or SVG)
    const mediaWrap = document.getElementById("modal-media-wrap");
    if (mediaWrap) {
      if (item.imageUrl) {
        mediaWrap.innerHTML = `<img src="${item.imageUrl}" alt="${item.title}" class="artwork-image">`;
      } else {
        mediaWrap.innerHTML = item.svgContent;
      }
    }

    document.getElementById("modal-artwork-title").textContent = item.title;
    document.getElementById("modal-artwork-year").textContent = item.year;
    document.getElementById("modal-artwork-status").textContent = item.status;
    document.getElementById("modal-artwork-medium").textContent = item.medium;
    document.getElementById("modal-artwork-dimensions").textContent = item.dimensions;
    document.getElementById("modal-artwork-price").textContent = item.price;
    document.getElementById("modal-artwork-description").textContent = item.description;
    document.getElementById("modal-artwork-curatorial").textContent = item.curatorialNote;
    document.getElementById("modal-artwork-provenance").textContent = item.provenance;

    // Palette Chips
    const paletteContainer = document.getElementById("modal-palette-container");
    if (paletteContainer) {
      paletteContainer.innerHTML = item.palette.map(p => `
        <div class="modal-swatch-row">
          <span class="modal-swatch-dot" style="background-color: ${p.hex};"></span>
          <div>
            <strong>${p.name}</strong> <span style="color: var(--text-muted); font-size: 0.8rem;">(${p.hex})</span>: ${p.role}
          </div>
        </div>
      `).join("");
    }

    // Inquire Button Link to Contact
    const inquireBtn = document.getElementById("modal-inquire-btn");
    if (inquireBtn) {
      inquireBtn.onclick = () => {
        closeArtworkModal();
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
          const messageField = document.getElementById("contact-message");
          if (messageField) {
            messageField.value = `Hello Aurelia,\n\nI am inquiring regarding your work "${item.title}" (${item.year}, ${item.medium}). Could you provide current acquisition details, viewing opportunities, and shipping logistics?\n\nWarm regards,`;
            messageField.focus();
          }
        }
      };
    }

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeArtworkModal() {
    const modal = document.getElementById("artwork-modal");
    if (modal) {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  /* ==========================================================================
     11. PROCESS TIMELINE FILL ON SCROLL
     ========================================================================== */
  function initProcessTimeline() {
    const processWrapper = document.querySelector(".process-wrapper");
    const progressFill = document.querySelector(".timeline-progress-fill");
    const steps = document.querySelectorAll(".process-step");
    if (!processWrapper || !progressFill || steps.length === 0) return;

    function handleScrollTimeline() {
      const rect = processWrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalDist = rect.height;
      const currentDist = (windowHeight * 0.65) - rect.top;
      let ratio = currentDist / totalDist;
      ratio = Math.max(0, Math.min(1, ratio));

      progressFill.style.height = `${(ratio * 100).toFixed(1)}%`;

      steps.forEach((step) => {
        const stepRect = step.getBoundingClientRect();
        if (stepRect.top < windowHeight * 0.75) {
          step.classList.add("active");
        } else {
          step.classList.remove("active");
        }
      });
    }

    window.addEventListener("scroll", handleScrollTimeline, { passive: true });
    handleScrollTimeline();
  }

  /* ==========================================================================
     12. THREE.JS 3D HERO: SHIFTING BLOB & 3 ORBITING PAINT DROPS
     ========================================================================== */
  function initThreeBlobHero() {
    const container = document.getElementById("hero-three-canvas-wrap");
    if (!container || typeof THREE === "undefined") return;

    let scene, camera, renderer;
    let blobMesh, originalPositions;
    let lightUltramarine, lightCadmium, lightMadder, lightViridian, ambientLight;
    let dropYellow, dropMadder, dropViridian;
    let dropLightYellow, dropLightMadder, dropLightViridian;
    let mouseX = 0, mouseY = 0;
    let targetRotX = 0, targetRotY = 0;
    let currentRotX = 0, currentRotY = 0;
    let scrollY = 0;
    let isMotionActive = !isReducedMotion;

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

    // 1. Cadmium Yellow Drop
    const yellowMat = new THREE.MeshStandardMaterial({
      color: 0xffc300,
      emissive: 0xffa500,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.05
    });
    dropYellow = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), yellowMat);
    dropLightYellow = new THREE.PointLight(0xffc300, 1.4, 4.5);
    dropYellow.add(dropLightYellow);
    scene.add(dropYellow);

    // 2. Rose Madder Drop
    const madderMat = new THREE.MeshStandardMaterial({
      color: 0xcf385b,
      emissive: 0x8c1731,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.05
    });
    dropMadder = new THREE.Mesh(new THREE.SphereGeometry(0.18, 32, 32), madderMat);
    dropLightMadder = new THREE.PointLight(0xcf385b, 1.2, 4.5);
    dropMadder.add(dropLightMadder);
    scene.add(dropMadder);

    // 3. Viridian Green Drop
    const viridianMat = new THREE.MeshStandardMaterial({
      color: 0x1b7a58,
      emissive: 0x12523b,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.05
    });
    dropViridian = new THREE.Mesh(new THREE.SphereGeometry(0.16, 32, 32), viridianMat);
    dropLightViridian = new THREE.PointLight(0x1b7a58, 1.2, 4.5);
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

    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
      targetRotY = mouseX * 0.9;
      targetRotX = mouseY * 0.9;
    });

    window.addEventListener("scroll", () => {
      scrollY = window.scrollY;
    }, { passive: true });

    window.addEventListener("resize", () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });

    window.updateThreeSceneLighting = function(isDark) {
      if (isDark) {
        ambientLight.intensity = 0.5;
        blobMaterial.clearcoatRoughness = 0.15;
      } else {
        ambientLight.intensity = 0.85;
        blobMaterial.clearcoatRoughness = 0.1;
      }
    };
    window.updateThreeSceneLighting(isDarkMode);

    window.setThreeMotionActive = function(active) {
      isMotionActive = active;
      if (!isMotionActive) renderFrame();
    };

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      if (isMotionActive) {
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
        
        let currentColor = colorA.clone().lerp(colorB, cycle).lerp(colorC, cycle2 * 0.5);
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

      renderFrame();
    }

    function renderFrame() {
      renderer.render(scene, camera);
    }

    animate();
  }

  /* ==========================================================================
     13. CONTACT FORM VALIDATION & SUBMISSION
     ========================================================================== */
  function initContactForm() {
    const form = document.getElementById("artist-inquiry-form");
    const toast = document.getElementById("form-toast");

    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const message = document.getElementById("contact-message").value.trim();

      if (!name || !email || !message) {
        showToast("Please complete your name, email, and inquiry message.", "error");
        return;
      }

      const submitBtn = form.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Transmitting to Atelier...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();
        showToast("Inquiry received. The atelier will respond within two business days.", "success");
      }, 1200);
    });

    function showToast(msg, type) {
      if (!toast) return;
      toast.textContent = msg;
      toast.className = `form-toast-msg show ${type}`;
      setTimeout(() => {
        toast.className = "form-toast-msg";
      }, 4500);
    }
  }

  /* ==========================================================================
     14. ARTIST CUSTOMIZER DRAWER (FOR TESTING PLACEHOLDERS)
     ========================================================================== */
  function initCustomizerDrawer() {
    const drawer = document.getElementById("customizer-drawer");
    const openBtn = document.getElementById("open-customizer-btn");
    const closeBtn = document.getElementById("close-customizer-btn");
    const nameInput = document.getElementById("customizer-name-input");
    const downloadCvBtn = document.getElementById("download-cv-btn");

    if (!drawer) return;

    if (openBtn) {
      openBtn.addEventListener("click", () => drawer.classList.add("open"));
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => drawer.classList.remove("open"));
    }

    if (nameInput) {
      nameInput.addEventListener("input", (e) => {
        const val = e.target.value.trim();
        if (val && window.updateArtistName) {
          window.updateArtistName(val);
        }
      });
    }

    if (downloadCvBtn) {
      downloadCvBtn.addEventListener("click", () => window.print());
    }
  }

  /* ==========================================================================
     15. MOBILE DRAWER NAVIGATION
     ========================================================================== */
  function initMobileNav() {
    const toggleBtn = document.getElementById("mobile-menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("mobile-open");
      toggleBtn.setAttribute("aria-expanded", isOpen);
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
      });
    });
  }

})();
