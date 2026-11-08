/**
 * AURELIA DELACROIX — VUE.JS 3 COMPOSITION API ATELIER APPLICATION
 * 
 * Fully reactive single-page architecture powering:
 * - 3D Hero Three.js blob with orbiting paint drops
 * - Interactive Motion Frame / Painting Time-Lapse Studio
 * - 3D WebGL Canvas Studio Inspector with dynamic museum lighting
 * - Curated Gallery with 3D tilt, filtering, and detail modal
 * - Interactive Pigment Alchemy Studio
 * - Bespoke Commission Cost & Dimension Estimator
 * - Two-way data-bound Artist Customizer Drawer
 * - Light (Cool Gesso) / Dark (Nocturnal Charcoal) mode
 */

const { createApp, ref, computed, watch, onMounted, nextTick } = Vue;

const app = createApp({
  setup() {
    // --- 1. THEME & REDUCED MOTION STATE ---
    const isDarkMode = ref(false);
    const isReducedMotion = ref(false);

    // 3D Interactive Hero & Studio State
    const heroBlobMode = ref("fluid"); // 'fluid' | 'impasto' | 'nebula'
    const isStudioSpinning = ref(true);

    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value;
      const html = document.documentElement;
      if (isDarkMode.value) {
        html.setAttribute("data-theme", "dark");
        localStorage.setItem("delacroix_theme", "dark");
      } else {
        html.removeAttribute("data-theme");
        localStorage.setItem("delacroix_theme", "light");
      }
      if (updateHeroLighting) updateHeroLighting(isDarkMode.value);
    };

    const toggleMotion = () => {
      isReducedMotion.value = !isReducedMotion.value;
      const html = document.documentElement;
      if (isReducedMotion.value) {
        html.setAttribute("data-reduced-motion", "true");
        localStorage.setItem("delacroix_motion", "off");
      } else {
        html.removeAttribute("data-reduced-motion");
        localStorage.setItem("delacroix_motion", "on");
      }
    };

    // --- 2. ARTIST NAME & TWO-WAY CUSTOMIZER ---
    const artistName = ref("AURELIA DELACROIX");
    const isCustomizerOpen = ref(false);
    const isMobileNavOpen = ref(false);

    // Compute rising letter structure for hero animation
    const titleWords = computed(() => {
      const words = artistName.value.trim().split(" ");
      let counter = 0;
      return words.map((word) => {
        const chars = word.split("").map((ch) => ({
          char: ch,
          index: counter++
        }));
        return chars;
      });
    });

    // --- 3. MOTION FRAME / PAINTING TIME-LAPSE STUDIO ---
    const motionStages = [
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

    const activeStageIndex = ref(0);
    const isPlayingTimeLapse = ref(false);
    let timeLapseTimer = null;

    const activeStageData = computed(() => motionStages[activeStageIndex.value]);

    const setStage = (index) => {
      activeStageIndex.value = index;
      updateBrushCursorPosition(index);
    };

    const togglePlayTimeLapse = () => {
      isPlayingTimeLapse.value = !isPlayingTimeLapse.value;
      if (isPlayingTimeLapse.value) {
        timeLapseTimer = setInterval(() => {
          activeStageIndex.value = (activeStageIndex.value + 1) % motionStages.length;
          updateBrushCursorPosition(activeStageIndex.value);
        }, 2200);
      } else {
        if (timeLapseTimer) clearInterval(timeLapseTimer);
      }
    };

    const brushCursorStyle = ref({
      transform: "translate(100px, 80px) rotate(-15deg)"
    });

    const updateBrushCursorPosition = (index) => {
      const brushCoords = [
        { x: 30, y: 40, r: -15 },
        { x: 70, y: 35, r: 25 },
        { x: 45, y: 65, r: 10 },
        { x: 60, y: 45, r: -35 },
        { x: 25, y: 75, r: 20 },
        { x: 50, y: 50, r: 0 }
      ];
      const pos = brushCoords[index] || { x: 50, y: 50, r: 0 };
      brushCursorStyle.value = {
        transform: `translate(${pos.x * 3.5}px, ${pos.y * 2.2}px) rotate(${pos.r}deg)`
      };
    };

    // --- 4. GALLERY & ARTWORK DETAIL MODAL ---
    const paintings = ref(window.PAINTINGS_DATA || []);
    const activeCategory = ref("all");
    const activeModalArtwork = ref(null);

    const filteredPaintings = computed(() => {
      if (activeCategory.value === "all") return paintings.value;
      return paintings.value.filter((p) => p.category === activeCategory.value);
    });

    const openArtworkModal = (artwork) => {
      activeModalArtwork.value = artwork;
      document.body.style.overflow = "hidden";
    };

    const closeArtworkModal = () => {
      activeModalArtwork.value = null;
      document.body.style.overflow = "";
    };

    const nextModalArtwork = () => {
      const list = filteredPaintings.value;
      const idx = list.findIndex((p) => p.id === activeModalArtwork.value.id);
      if (idx < list.length - 1) {
        activeModalArtwork.value = list[idx + 1];
      } else {
        activeModalArtwork.value = list[0];
      }
    };

    const prevModalArtwork = () => {
      const list = filteredPaintings.value;
      const idx = list.findIndex((p) => p.id === activeModalArtwork.value.id);
      if (idx > 0) {
        activeModalArtwork.value = list[idx - 1];
      } else {
        activeModalArtwork.value = list[list.length - 1];
      }
    };

    const inquireModalArtwork = (artwork) => {
      closeArtworkModal();
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
        formMessage.value = `Hello Aurelia,\n\nI am inquiring regarding your work "${artwork.title}" (${artwork.year}, ${artwork.medium}). Could you provide current acquisition details, viewing opportunities, and shipping logistics?\n\nWarm regards,`;
      }
    };

    // 3D Card Tilt Handler
    const handleCardMouseMove = (e) => {
      if (isReducedMotion.value) return;
      const card = e.currentTarget;
      const glare = card.querySelector(".artwork-glare");
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = ((y - centerY) / centerY) * -8;
      const rotY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
      if (glare) {
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%)`;
      }
    };

    const handleCardMouseLeave = (e) => {
      const card = e.currentTarget;
      const glare = card.querySelector(".artwork-glare");
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)";
      if (glare) glare.style.background = "transparent";
    };

    // --- 5. 3D CANVAS STUDIO INSPECTOR (THREE.JS) ---
    const studioLightingMode = ref("museum");
    let setStudioLighting = null;
    let resetStudioView = null;

    const selectStudioLighting = (mode) => {
      studioLightingMode.value = mode;
      if (setStudioLighting) setStudioLighting(mode);
    };

    // --- 6. PIGMENT ALCHEMY STUDIO (COLOR MIXER) ---
    const pigmentDatabase = [
      { id: "ultramarine", name: "French Ultramarine", code: "PB29", hex: "#1837b9", opacity: 0.35, rgb: [24, 55, 185] },
      { id: "cadmium", name: "Cadmium Yellow Medium", code: "PY35", hex: "#ffc300", opacity: 0.95, rgb: [255, 195, 0] },
      { id: "madder", name: "Rose Madder Genuine", code: "NR9", hex: "#cf385b", opacity: 0.45, rgb: [207, 56, 91] },
      { id: "viridian", name: "Viridian Hydrated Oxide", code: "PG18", hex: "#1b7a58", opacity: 0.50, rgb: [27, 122, 88] },
      { id: "white", name: "Titanium White", code: "PW6", hex: "#f5f7f4", opacity: 1.0, rgb: [245, 247, 244] },
      { id: "umber", name: "Burnt Umber", code: "PBr7", hex: "#59392b", opacity: 0.85, rgb: [89, 57, 43] }
    ];

    const selectedPigmentIds = ref(["ultramarine", "cadmium"]);

    const togglePigmentWell = (id) => {
      const list = selectedPigmentIds.value;
      const idx = list.indexOf(id);
      if (idx > -1) {
        if (list.length > 1) {
          selectedPigmentIds.value = list.filter((p) => p !== id);
        }
      } else {
        if (list.length >= 3) {
          selectedPigmentIds.value = [...list.slice(1), id];
        } else {
          selectedPigmentIds.value = [...list, id];
        }
      }
    };

    const mixtureResult = computed(() => {
      const active = pigmentDatabase.filter((p) => selectedPigmentIds.value.includes(p.id));
      let r = 0, g = 0, b = 0, totalOpacity = 0;
      active.forEach((p) => {
        r += p.rgb[0];
        g += p.rgb[1];
        b += p.rgb[2];
        totalOpacity += p.opacity;
      });

      r = Math.round(r / active.length);
      g = Math.round(g / active.length);
      b = Math.round(b / active.length);
      const avgOpacity = (totalOpacity / active.length).toFixed(2);
      const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();

      let name = "Harmonic Chords";
      let desc = "A balanced optical collision of elemental mineral wavelengths.";
      const sorted = [...selectedPigmentIds.value].sort().join("+");

      if (sorted === "cadmium+ultramarine") {
        name = "Luminous Oceanic Olive";
        desc = "The searing solar radiation of cadmium yellow combines with the cold spiritual depth of ultramarine to produce an ancient, terrestrial green wash.";
      } else if (sorted === "madder+ultramarine") {
        name = "Imperial Nocturnal Violet";
        desc = "Natural rose madder root meets lapis lazuli. Yields a deeply translucent purple glaze favored by 16th-century Venetian masters.";
      } else if (sorted === "cadmium+madder") {
        name = "Molten Cadmium Vermilion";
        desc = "A searing, high-energy warm spectrum capable of vibrating aggressively forward against cool gesso grounds.";
      } else if (sorted === "ultramarine+viridian") {
        name = "Deep Abyssal Marine";
        desc = "Two cold minerals in harmonic agreement. Creates a limitless oceanic depth ideal for atmospheric landscape grounds.";
      } else if (sorted === "madder+viridian") {
        name = "Chromatic Complementary Resonance";
        desc = "Direct complementary opposition. When layered as glazes rather than mixed flat, they create optical vibrating vibration.";
      } else if (selectedPigmentIds.value.includes("white")) {
        name = "Gesso Tint & Pastel Atmosphere";
        desc = "Titanium white raises the tonal value while increasing opacity and cooling down pigment saturation.";
      }

      return {
        hex,
        name,
        desc,
        opacityPercent: Math.round(avgOpacity * 100),
        codes: active.map((p) => p.code).join(" + ")
      };
    });

    // --- 7. BESPOKE COMMISSION CALCULATOR ---
    const commWidth = ref(140);
    const commHeight = ref(110);
    const commSubstrate = ref("linen");
    const commFraming = ref("unframed");

    const commissionEstimate = computed(() => {
      const w = commWidth.value;
      const h = commHeight.value;
      const area = (w * h) / 10000;
      let price = 3200 + area * 5800;

      if (commSubstrate.value === "panel") price *= 1.12;
      if (commSubstrate.value === "sailcloth") price *= 1.25;

      if (commFraming.value === "oak") price += 450 + (w + h) * 1.8;
      if (commFraming.value === "walnut") price += 750 + (w + h) * 2.5;

      const rounded = Math.round(price / 100) * 100;
      let weeks = 6;
      if (area > 1.2) weeks = 12;
      if (area > 2.5) weeks = 18;

      return {
        priceFormatted: `$${rounded.toLocaleString()}`,
        weeksFormatted: `${weeks}–${weeks + 4} Weeks`
      };
    });

    const applyCommissionToForm = () => {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
        formType.value = "commission";
        formMessage.value = `Hello Aurelia,\n\nI would like to inquire about reserving a bespoke commission based on my configured parameters:\n- Dimensions: ${commWidth.value} × ${commHeight.value} cm\n- Substrate: ${commSubstrate.value}\n- Framing: ${commFraming.value}\n- Estimated Price: ${commissionEstimate.value.priceFormatted}\n\nCould we arrange a studio consultation to discuss palette harmonies and architectural lighting?\n\nWarm regards,`;
      }
    };

    // --- 8. ATELIER CONTACT FORM ---
    const formName = ref("");
    const formEmail = ref("");
    const formType = ref("acquisition");
    const formBudget = ref("5k-10k");
    const formMessage = ref("");
    const isSubmitting = ref(false);
    const formToast = ref({ show: false, message: "", type: "success" });

    const submitInquiry = () => {
      if (!formName.value || !formEmail.value || !formMessage.value) {
        showToast("Please complete your name, email, and inquiry message.", "error");
        return;
      }

      isSubmitting.value = true;
      setTimeout(() => {
        isSubmitting.value = false;
        formName.value = "";
        formEmail.value = "";
        formMessage.value = "";
        showToast("Inquiry received. The atelier will respond within two business days.", "success");
      }, 1200);
    };

    const showToast = (msg, type) => {
      formToast.value = { show: true, message: msg, type };
      setTimeout(() => {
        formToast.value.show = false;
      }, 4500);
    };

    // --- 9. THREE.JS RUNTIMES & MOUNTED LIFECYCLE ---
    let updateHeroLighting = null;

    onMounted(() => {
      // Restore Theme
      const saved = localStorage.getItem("delacroix_theme");
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (saved === "dark" || (!saved && prefersDark)) {
        isDarkMode.value = true;
        document.documentElement.setAttribute("data-theme", "dark");
      }

      // Check reduced motion
      const motionMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
      isReducedMotion.value = motionMQ.matches;
      motionMQ.addEventListener("change", (e) => {
        isReducedMotion.value = e.matches;
      });

      // Intersection Observer for yellow brush-stroke draws
      const sectionTitles = document.querySelectorAll(".section-title");
      if ("IntersectionObserver" in window) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) en.target.classList.add("in-view");
          });
        }, { threshold: 0.25 });
        sectionTitles.forEach((t) => obs.observe(t));
      }

      // Process Timeline Scroll Fill
      const processWrap = document.querySelector(".process-wrapper");
      const progressFill = document.querySelector(".timeline-progress-fill");
      const steps = document.querySelectorAll(".process-step");

      window.addEventListener("scroll", () => {
        if (processWrap && progressFill && steps.length > 0) {
          const rect = processWrap.getBoundingClientRect();
          const winH = window.innerHeight;
          let ratio = (winH * 0.65 - rect.top) / rect.height;
          ratio = Math.max(0, Math.min(1, ratio));
          progressFill.style.height = `${(ratio * 100).toFixed(1)}%`;

          steps.forEach((step) => {
            const stepRect = step.getBoundingClientRect();
            if (stepRect.top < winH * 0.75) {
              step.classList.add("active");
            } else {
              step.classList.remove("active");
            }
          });
        }
      }, { passive: true });

      // Init Three.js Hero Blob
      initHeroThree();

      // Init 3D Canvas Studio
      initCanvasStudioThree();
    });

    // Helper: Three.js Hero
    const initHeroThree = () => {
      const container = document.getElementById("hero-three-canvas-wrap");
      if (!container || typeof THREE === "undefined") return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 5.2);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const blobGeo = new THREE.IcosahedronGeometry(1.5, 4);
      const originalPositions = blobGeo.attributes.position.clone();

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

      const blobMesh = new THREE.Mesh(blobGeo, blobMaterial);
      scene.add(blobMesh);

      // Drops
      const dropYellow = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0xffc300, emissive: 0xffa500, emissiveIntensity: 0.4, roughness: 0.2 })
      );
      dropYellow.add(new THREE.PointLight(0xffc300, 1.4, 4.5));
      scene.add(dropYellow);

      const dropMadder = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0xcf385b, emissive: 0x8c1731, emissiveIntensity: 0.35, roughness: 0.2 })
      );
      dropMadder.add(new THREE.PointLight(0xcf385b, 1.2, 4.5));
      scene.add(dropMadder);

      const dropViridian = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0x1b7a58, emissive: 0x12523b, emissiveIntensity: 0.35, roughness: 0.2 })
      );
      dropViridian.add(new THREE.PointLight(0x1b7a58, 1.2, 4.5));
      scene.add(dropViridian);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      const lUltra = new THREE.PointLight(0x1837b9, 2.6, 12);
      lUltra.position.set(-3.5, 3, 2.5);
      scene.add(lUltra);

      const lCad = new THREE.PointLight(0xffc300, 2.4, 12);
      lCad.position.set(3.5, -2, 2.5);
      scene.add(lCad);

      const lMad = new THREE.PointLight(0xcf385b, 2.0, 10);
      lMad.position.set(3, 3, 1.5);
      scene.add(lMad);

      const lVir = new THREE.PointLight(0x1b7a58, 2.0, 10);
      lVir.position.set(-3, -3, 2);
      scene.add(lVir);

      let targetRotX = 0, targetRotY = 0;
      let currentRotX = 0, currentRotY = 0;
      let scrollY = 0;

      window.addEventListener("mousemove", (e) => {
        targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.9;
        targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.9;
      });

      window.addEventListener("scroll", () => {
        scrollY = window.scrollY;
      }, { passive: true });

      updateHeroLighting = (isDark) => {
        ambientLight.intensity = isDark ? 0.5 : 0.85;
      };

      const clock = new THREE.Clock();

      function animate() {
        requestAnimationFrame(animate);

        if (!isReducedMotion.value) {
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
          blobMaterial.color.copy(colorA.clone().lerp(colorB, cycle).lerp(colorC, cycle2 * 0.5));

          const yAngle = time * 0.9;
          dropYellow.position.set(Math.cos(yAngle) * 2.4, Math.sin(yAngle * 1.2) * 0.6, Math.sin(yAngle) * 2.4);

          const mAngle = -time * 0.75 + 1.2;
          dropMadder.position.set(Math.sin(mAngle) * 2.8, Math.cos(mAngle) * 2.2, Math.cos(mAngle * 0.8) * 1.4);

          const vAngle = time * 0.6 + 2.4;
          dropViridian.position.set(Math.cos(vAngle) * 1.9, Math.sin(vAngle) * 2.3, Math.sin(vAngle * 1.5) * 1.8);

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
    };

    // Helper: Three.js 3D Stretched Canvas Studio Inspector
    const initCanvasStudioThree = () => {
      const container = document.getElementById("canvas-studio-webgl");
      if (!container || typeof THREE === "undefined") return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 50);
      let targetZoom = 4.2;
      camera.position.set(0, 0, targetZoom);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const canvasMeshGroup = new THREE.Group();
      scene.add(canvasMeshGroup);

      const canvasGeometry = new THREE.BoxGeometry(2.4, 3.0, 0.12);
      const textureLoader = new THREE.TextureLoader();
      const frontTexture = textureLoader.load("images/work-oil-horizon.jpg");

      const linenEdge = new THREE.MeshStandardMaterial({ color: 0x223c8a, roughness: 0.8, metalness: 0.05 });
      const frontArt = new THREE.MeshPhysicalMaterial({ map: frontTexture, roughness: 0.22, metalness: 0.05, clearcoat: 0.85, clearcoatRoughness: 0.15 });
      const backLinen = new THREE.MeshStandardMaterial({ color: 0xd9d3c5, roughness: 0.9 });

      const canvasMesh = new THREE.Mesh(canvasGeometry, [linenEdge, linenEdge, linenEdge, linenEdge, frontArt, backLinen]);
      canvasMeshGroup.add(canvasMesh);

      const wood = new THREE.MeshStandardMaterial({ color: 0x9e7b57, roughness: 0.7 });
      const barV = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.9, 0.04), wood);
      barV.position.set(0, 0, -0.065);
      canvasMeshGroup.add(barV);

      const barH = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.12, 0.04), wood);
      barH.position.set(0, 0, -0.065);
      canvasMeshGroup.add(barH);

      const seal = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.02, 16), new THREE.MeshStandardMaterial({ color: 0x8a1832 }));
      seal.rotation.x = Math.PI / 2;
      seal.position.set(0.6, -0.8, -0.068);
      canvasMeshGroup.add(seal);

      const ambient = new THREE.AmbientLight(0xffffff, 0.65);
      scene.add(ambient);

      const mainSpot = new THREE.DirectionalLight(0xffecc2, 2.4);
      mainSpot.position.set(2.0, 4.0, 3.5);
      scene.add(mainSpot);

      const fill = new THREE.PointLight(0x1837b9, 1.2, 10);
      fill.position.set(-3.0, -1.0, 2.0);
      scene.add(fill);

      const raking = new THREE.DirectionalLight(0xffdf88, 0);
      raking.position.set(4.5, 0.2, 0.4);
      scene.add(raking);

      setStudioLighting = (mode) => {
        if (mode === "museum") {
          mainSpot.color.setHex(0xffecc2);
          mainSpot.intensity = 2.4;
          mainSpot.position.set(2.0, 4.0, 3.5);
          ambient.intensity = 0.6;
          raking.intensity = 0;
          frontArt.clearcoatRoughness = 0.15;
        } else if (mode === "daylight") {
          mainSpot.color.setHex(0xf5f8ff);
          mainSpot.intensity = 2.0;
          mainSpot.position.set(0, 4.5, 3.0);
          ambient.intensity = 0.9;
          raking.intensity = 0;
          frontArt.clearcoatRoughness = 0.12;
        } else if (mode === "raking") {
          mainSpot.intensity = 0.6;
          ambient.intensity = 0.3;
          raking.color.setHex(0xffdf88);
          raking.intensity = 3.6;
          frontArt.clearcoatRoughness = 0.25;
        }
      };

      let isDragging = false;
      let prevX = 0, prevY = 0;
      let targetRotX = 0.1, targetRotY = -0.3;
      let curRotX = 0.1, curRotY = -0.3;

      resetStudioView = () => {
        targetRotX = 0.1;
        targetRotY = -0.3;
        targetZoom = 4.2;
      };

      container.addEventListener("mousedown", (e) => {
        isDragging = true;
        prevX = e.clientX;
        prevY = e.clientY;
      });
      window.addEventListener("mouseup", () => { isDragging = false; });
      window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        targetRotY += (e.clientX - prevX) * 0.008;
        targetRotX += (e.clientY - prevY) * 0.008;
        targetRotX = Math.max(-1.1, Math.min(1.1, targetRotX));
        prevX = e.clientX;
        prevY = e.clientY;
      });

      container.addEventListener("wheel", (e) => {
        e.preventDefault();
        targetZoom = Math.max(2.6, Math.min(6.5, targetZoom + e.deltaY * 0.003));
      }, { passive: false });

      function renderStudio() {
        requestAnimationFrame(renderStudio);
        curRotX += (targetRotX - curRotX) * 0.08;
        curRotY += (targetRotY - curRotY) * 0.08;
        camera.position.z += (targetZoom - camera.position.z) * 0.08;

        canvasMeshGroup.rotation.x = curRotX;
        canvasMeshGroup.rotation.y = curRotY;

        if (!isDragging && !isReducedMotion.value) {
          canvasMeshGroup.position.y = Math.sin(Date.now() * 0.001) * 0.04;
        }

        renderer.render(scene, camera);
      }
      renderStudio();
    };

    return {
      // Theme & Motion
      isDarkMode,
      isReducedMotion,
      toggleTheme,
      toggleMotion,

      // Artist Personalization
      artistName,
      titleWords,
      isCustomizerOpen,
      isMobileNavOpen,

      // Motion Frame Time-Lapse
      motionStages,
      activeStageIndex,
      activeStageData,
      isPlayingTimeLapse,
      setStage,
      togglePlayTimeLapse,
      brushCursorStyle,

      // Gallery & Modal
      paintings,
      activeCategory,
      filteredPaintings,
      activeModalArtwork,
      openArtworkModal,
      closeArtworkModal,
      nextModalArtwork,
      prevModalArtwork,
      inquireModalArtwork,
      handleCardMouseMove,
      handleCardMouseLeave,

      // 3D Studio
      studioLightingMode,
      selectStudioLighting,
      resetStudioView: () => resetStudioView && resetStudioView(),

      // Pigment Alchemy
      pigmentDatabase,
      selectedPigmentIds,
      togglePigmentWell,
      mixtureResult,

      // Commission Calculator
      commWidth,
      commHeight,
      commSubstrate,
      commFraming,
      commissionEstimate,
      applyCommissionToForm,

      // Contact Form
      formName,
      formEmail,
      formType,
      formBudget,
      formMessage,
      isSubmitting,
      formToast,
      submitInquiry
    };
  }
});

app.mount("#app");
