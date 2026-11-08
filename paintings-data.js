/**
 * PAINTINGS DATA & ARTWORKS REPOSITORY
 * Aurelia Delacroix — Contemporary Painter & Colorist
 * 
 * Palette:
 * - Ultramarine:      #1837b9 / #2442d6
 * - Cadmium Yellow:   #ffc300 / #f5a600
 * - Rose Madder:      #cf385b / #b32b47
 * - Viridian Green:   #1b7a58 / #16684b
 * - Cool Gesso:       #f2f4f2 (Light) / #111417 (Dark)
 */

const PAINTINGS_DATA = [
  {
    id: "work-1",
    title: "The Deep Horizon (Lapis & Viridian)",
    category: "oil",
    year: "2025",
    medium: "Oil and cold wax on Belgian linen",
    dimensions: "160 × 120 cm (63 × 47 in)",
    status: "Available",
    price: "$9,400",
    imageUrl: "images/work-oil-horizon.jpg",
    description: "An immersive exploration of atmospheric pressure and optical depth. Dense layers of French ultramarine lapis are scraped away with palette knives to expose translucent viridian glazes beneath, crowned by a searing horizon of pure cadmium yellow.",
    curatorialNote: "In 'The Deep Horizon', Delacroix orchestrates an almost oceanic gravity. The tension between the heavy opacity of cold wax and the luminous transparency of hydrated chromium creates an illusion of limitless atmospheric space.",
    palette: [
      { name: "French Ultramarine", hex: "#1837b9", role: "Primary field & nocturnal undertones" },
      { name: "Viridian Green", hex: "#1b7a58", role: "Hydrated glaze & deep refraction" },
      { name: "Cadmium Yellow Medium", hex: "#ffc300", role: "Solar crest & optical accent" },
      { name: "Rose Madder Lake", hex: "#cf385b", role: "Sub-layer warmth & chromatic counterpoint" }
    ],
    provenance: "Delacroix Studio, Paris • Exhibited at Palais de Tokyo Salon, 2025",
    svgContent: `
      <svg viewBox="0 0 800 1000" class="painting-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Deep Horizon (Lapis & Viridian)">
        <defs>
          <linearGradient id="sky-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0d1b4d" />
            <stop offset="35%" stop-color="#1837b9" />
            <stop offset="68%" stop-color="#1b7a58" />
            <stop offset="85%" stop-color="#cf385b" stop-opacity="0.85" />
            <stop offset="92%" stop-color="#ffc300" />
            <stop offset="100%" stop-color="#0a1226" />
          </linearGradient>
          <radialGradient id="sun-burst-1" cx="62%" cy="48%" r="45%">
            <stop offset="0%" stop-color="#ffdf59" stop-opacity="0.95" />
            <stop offset="25%" stop-color="#ffc300" stop-opacity="0.8" />
            <stop offset="55%" stop-color="#cf385b" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#1837b9" stop-opacity="0" />
          </radialGradient>
          <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1b7a58" />
            <stop offset="50%" stop-color="#12523b" />
            <stop offset="100%" stop-color="#0a2a1e" />
          </linearGradient>
        </defs>
        <rect width="800" height="1000" fill="#e8ebe8" />
        <rect width="800" height="1000" fill="url(#sky-grad-1)" opacity="0.92" />
        <circle cx="540" cy="460" r="320" fill="url(#sun-burst-1)" mix-blend-mode="screen" />
        <path d="M -50,620 Q 220,540 480,630 T 850,590 L 850,1050 L -50,1050 Z" fill="url(#wave-grad-1)" opacity="0.94" />
        <path d="M 40,240 C 180,180 320,310 520,220 C 680,150 780,260 820,290 L 840,480 C 640,430 440,510 260,450 C 140,410 60,490 20,440 Z" fill="#1837b9" opacity="0.75" />
        <path d="M 60,530 Q 340,490 560,515 T 820,480 L 810,505 Q 540,545 320,515 T 70,555 Z" fill="#ffc300" opacity="0.95" />
        <path d="M 120,380 C 260,330 440,360 620,310 C 720,280 770,340 810,380 C 720,460 520,410 360,440 C 220,470 140,440 100,410 Z" fill="#cf385b" opacity="0.6" mix-blend-mode="multiply" />
        <path d="M 80,720 Q 300,680 540,730 T 780,690" stroke="#ffc300" stroke-width="4" stroke-dasharray="14 8 3 8" stroke-linecap="round" opacity="0.7" />
        <path d="M 50,860 Q 320,820 580,870 T 820,830" stroke="#1837b9" stroke-width="8" stroke-linecap="round" opacity="0.8" />
      </svg>
    `
  },
  {
    id: "work-2",
    title: "Study in Rose Madder and Cold Wax",
    category: "oil",
    year: "2025",
    medium: "Oil, beeswax and marble dust on panel",
    dimensions: "80 × 60 cm (31 × 24 in)",
    status: "Available",
    price: "$5,200",
    description: "An intimate, tactile study examining the physical transparency of rose madder lake when suspended in bleached beeswax. Scraped rectangular monoliths collide with warm cadmium grounds and viridian razor marks.",
    curatorialNote: "Madder root possesses an ancient, almost flesh-like biological resonance. Suspended here in beeswax, the pigment glows from within, refusing to sit flatly on the panel surface.",
    palette: [
      { name: "Rose Madder Genuine", hex: "#cf385b", role: "Central chromatic mass & glazes" },
      { name: "Cadmium Yellow Deep", hex: "#f5a600", role: "Warm underpainting & edges" },
      { name: "Ultramarine Blue", hex: "#1837b9", role: "Structural perimeter & tension" },
      { name: "Viridian", hex: "#1b7a58", role: "Razor incisions & cool margins" }
    ],
    provenance: "Galerie Vivienne, Paris",
    svgContent: `
      <svg viewBox="0 0 600 800" class="painting-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Study in Rose Madder and Cold Wax">
        <defs>
          <linearGradient id="madder-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#e84a6f" />
            <stop offset="40%" stop-color="#cf385b" />
            <stop offset="85%" stop-color="#8a1832" />
            <stop offset="100%" stop-color="#4a0b19" />
          </linearGradient>
          <linearGradient id="cadmium-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f5a600" />
            <stop offset="60%" stop-color="#ffc300" />
            <stop offset="100%" stop-color="#ffe885" />
          </linearGradient>
        </defs>
        <rect width="600" height="800" fill="#ecefe9" />
        <rect x="40" y="40" width="520" height="720" rx="8" fill="url(#cadmium-grad-2)" opacity="0.85" />
        <rect x="60" y="70" width="220" height="420" fill="#1837b9" opacity="0.8" />
        <rect x="320" y="380" width="220" height="340" fill="#10257e" opacity="0.9" />
        <rect x="140" y="140" width="360" height="500" rx="4" fill="url(#madder-grad-2)" opacity="0.92" mix-blend-mode="multiply" />
        <path d="M 80,180 L 480,240 L 460,270 L 60,210 Z" fill="#1b7a58" opacity="0.88" />
        <circle cx="280" cy="360" r="48" fill="#ffc300" opacity="0.95" />
        <path d="M 160,220 L 160,620" stroke="#ffc300" stroke-width="4" stroke-dasharray="16 12" opacity="0.9" />
      </svg>
    `
  },
  {
    id: "work-3",
    title: "Nocturne with Viridian Veil",
    category: "oil",
    year: "2024",
    medium: "Oil on portrait-grade linen",
    dimensions: "140 × 110 cm (55 × 43 in)",
    status: "Private Collection, Zurich",
    price: "$8,800",
    description: "A contemplative nocturnal landscape rendered in deep viridian and midnight ultramarine. Inspired by the twilight reflecting across lake waters, accented with molten cadmium embers.",
    curatorialNote: "Viridian reveals its nocturnal majesty when married to deep lapis ultramarine. Delacroix's fluid glaze work captures the exact moment evening light extinguishes into deep shadow.",
    palette: [
      { name: "Viridian Hydrated Oxide", hex: "#1b7a58", role: "Dominant atmospheric veil" },
      { name: "Deep Ultramarine", hex: "#0f2275", role: "Nocturnal ground & abyss" },
      { name: "Cadmium Yellow Pale", hex: "#ffe066", role: "Luminous ember & reflections" },
      { name: "Rose Madder", hex: "#cf385b", role: "Twilight horizon bleed" }
    ],
    provenance: "Acquired by the H. von Berg Collection, Zurich (2024)",
    svgContent: `
      <svg viewBox="0 0 700 900" class="painting-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nocturne with Viridian Veil">
        <defs>
          <linearGradient id="nocturne-grad-3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#070c1a" />
            <stop offset="35%" stop-color="#0f2275" />
            <stop offset="65%" stop-color="#12523b" />
            <stop offset="85%" stop-color="#1b7a58" />
            <stop offset="100%" stop-color="#071b13" />
          </linearGradient>
          <radialGradient id="moon-ember-3" cx="35%" cy="30%" r="40%">
            <stop offset="0%" stop-color="#ffe885" stop-opacity="0.95" />
            <stop offset="20%" stop-color="#ffc300" stop-opacity="0.7" />
            <stop offset="50%" stop-color="#cf385b" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#0f2275" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="700" height="900" fill="#e5e8e4" />
        <rect width="700" height="900" fill="url(#nocturne-grad-3)" />
        <circle cx="260" cy="270" r="280" fill="url(#moon-ember-3)" mix-blend-mode="screen" />
        <path d="M -20,450 C 150,380 320,510 500,420 C 620,360 680,440 740,410 L 740,680 C 580,620 400,720 220,640 C 100,590 30,660 -20,620 Z" fill="#1b7a58" opacity="0.85" />
        <path d="M 60,380 Q 280,320 520,370 T 720,330" stroke="#cf385b" stroke-width="12" stroke-linecap="round" opacity="0.75" />
        <path d="M 240,480 Q 290,460 380,480 T 490,470" stroke="#ffc300" stroke-width="4" stroke-linecap="round" opacity="0.95" />
      </svg>
    `
  },
  {
    id: "work-4",
    title: "Gesso & Sgraffito No. 7",
    category: "oil",
    year: "2025",
    medium: "Oil, rabbit-skin glue gesso, and graphite",
    dimensions: "120 × 90 cm (47 × 35 in)",
    status: "Available",
    price: "$7,600",
    description: "An intentional tribute to the physical substrate of painting. Heavy coats of traditional rabbit-skin gesso are carved into with fine needlepoint sgraffito, allowing raw pigments to bleed through the fissures.",
    curatorialNote: "Here the white gesso is not merely a passive support—it is an active protagonist. Delacroix treats the chalk substrate as a sculptural relief, slicing into it with precision.",
    palette: [
      { name: "Chalk Gesso White", hex: "#f2f4f2", role: "Primary sculptural support" },
      { name: "French Ultramarine", hex: "#1837b9", role: "Sub-surface fissure bleed" },
      { name: "Cadmium Yellow", hex: "#ffc300", role: "Geometric focal anchor" },
      { name: "Rose Madder", hex: "#cf385b", role: "Scored capillary lines" }
    ],
    provenance: "Delacroix Studio, Berlin",
    svgContent: `
      <svg viewBox="0 0 600 800" class="painting-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gesso & Sgraffito No. 7">
        <rect width="600" height="800" fill="#d9d2c5" />
        <rect x="30" y="30" width="540" height="740" fill="#f7f9f6" />
        <path d="M 60,120 L 320,80 L 280,380 L 40,320 Z" fill="#1837b9" opacity="0.9" />
        <circle cx="440" cy="240" r="90" fill="#ffc300" opacity="0.95" />
        <path d="M 220,440 L 520,380 L 560,680 L 240,720 Z" fill="#1b7a58" opacity="0.85" />
        <path d="M 100,520 C 180,480 320,560 480,500" stroke="#cf385b" stroke-width="14" stroke-linecap="round" opacity="0.9" />
        <line x1="80" y1="180" x2="520" y2="180" stroke="#24282e" stroke-width="1.5" stroke-dasharray="4 2" />
      </svg>
    `
  },
  {
    id: "work-5",
    title: "Botanical Fragments at Dawn",
    category: "gouache",
    year: "2025",
    medium: "Opaque gouache on 640gsm Arches cotton rag",
    dimensions: "56 × 76 cm (22 × 30 in)",
    status: "Available",
    price: "$3,400",
    imageUrl: "images/work-gouache-fragments.jpg",
    description: "A crisp, flat study of organic plant fragments rendered in matte designer gouache. The velvety matte finish of gouache gives extraordinary saturation to pure cadmium yellow and deep rose madder petals on deckled cotton paper.",
    curatorialNote: "Unlike oil's translucence, gouache offers uncompromising, graphic flat opacity. Here, Delacroix arranges organic silhouettes like musical notations across the unprimed deckled paper.",
    palette: [
      { name: "Opaque Rose Madder", hex: "#cf385b", role: "Botanical petal silhouette" },
      { name: "Cadmium Lemon", hex: "#ffd53d", role: "Stamens & luminous pollen" },
      { name: "Viridian Matte", hex: "#1b7a58", role: "Foliage geometry" },
      { name: "Ultramarine Blue", hex: "#1837b9", role: "Stem stems & structural weight" }
    ],
    provenance: "Exhibited at Drawing Now Paris, 2025",
    svgContent: `
      <svg viewBox="0 0 760 560" class="painting-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Botanical Fragments at Dawn">
        <rect width="760" height="560" fill="#f4f6f2" />
        <rect x="25" y="25" width="710" height="510" fill="#f9faf7" stroke="#e0e4dc" stroke-width="1.5" />
        <path d="M 140,240 C 140,120 280,100 280,240 C 280,360 140,360 140,240 Z" fill="#cf385b" />
        <circle cx="270" cy="230" r="42" fill="#ffd53d" />
        <path d="M 380,260 C 480,200 580,280 540,380 C 480,480 360,420 380,260 Z" fill="#1b7a58" />
        <path d="M 270,270 Q 240,420 180,500" stroke="#1837b9" stroke-width="18" stroke-linecap="round" fill="none" />
        <circle cx="560" cy="180" r="22" fill="#ffc300" />
      </svg>
    `
  },
  {
    id: "work-6",
    title: "Thermal Drift in Cadmium",
    category: "gouache",
    year: "2024",
    medium: "Gouache and graphite on Saunders Waterford 425gsm",
    dimensions: "42 × 59 cm (16 × 23 in)",
    status: "Available",
    price: "$2,900",
    description: "An homage to high-noon solar radiation. Pure cadmium yellow covers two-thirds of the composition, punctuated by an asymmetric ultramarine rectangle and razor-sharp rose madder compass lines.",
    curatorialNote: "Cadmium yellow has an aggressive visual warmth that pushes forward from the picture plane. Paired with ultramarine's receding coolness, the two pigments create physical optical vibration.",
    palette: [
      { name: "Cadmium Yellow Medium", hex: "#ffc300", role: "Primary solar field" },
      { name: "French Ultramarine", hex: "#1837b9", role: "Receding counter-weight" },
      { name: "Rose Madder", hex: "#cf385b", role: "Linear compass markings" },
      { name: "Viridian", hex: "#1b7a58", role: "Equatorial horizon boundary" }
    ],
    provenance: "Delacroix Studio, Paris",
    svgContent: `
      <svg viewBox="0 0 590 420" class="painting-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Thermal Drift in Cadmium">
        <rect width="590" height="420" fill="#f1f3ed" />
        <rect x="50" y="50" width="360" height="320" fill="#ffc300" />
        <rect x="340" y="90" width="180" height="240" fill="#1837b9" />
        <rect x="50" y="210" width="470" height="34" fill="#1b7a58" />
        <circle cx="180" cy="140" r="50" fill="#cf385b" />
        <line x1="180" y1="50" x2="180" y2="370" stroke="#cf385b" stroke-width="3" />
      </svg>
    `
  },
  {
    id: "work-7",
    title: "Capri Terraces (Plein Air)",
    category: "gouache",
    year: "2025",
    medium: "Opaque gouache in artist travel album",
    dimensions: "30 × 40 cm (12 × 16 in)",
    status: "Private Collection, London",
    price: "$2,400",
    description: "Executed plein air on the cliffs of Anacapri. Blinding white limestone walls, towering viridian cypress trees, and the dizzying lapis ultramarine expanse of the Tyrrhenian Sea below.",
    curatorialNote: "Small-scale plein air gouache captures what large canvases cannot: the immediacy of wind, salt air, and immediate light decision-making.",
    palette: [
      { name: "Ultramarine Sea", hex: "#1837b9", role: "Tyrrhenian abyss" },
      { name: "Viridian Cypress", hex: "#1b7a58", role: "Mediterranean foliage" },
      { name: "Cadmium Sunlight", hex: "#ffc300", role: "Terrace glare & lemon trees" },
      { name: "Rose Madder", hex: "#cf385b", role: "Floral cascades" }
    ],
    provenance: "Delacroix Italian Travel Journals, 2025",
    svgContent: `
      <svg viewBox="0 0 400 300" class="painting-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Capri Terraces (Plein Air)">
        <rect width="400" height="300" fill="#f4f5f0" />
        <rect x="20" y="20" width="360" height="150" fill="#1837b9" />
        <polygon points="20,150 180,130 260,190 20,230" fill="#ffffff" stroke="#d5dad0" stroke-width="1.5" />
        <polygon points="20,230 260,190 380,260 380,280 20,280" fill="#ffc300" opacity="0.9" />
        <polygon points="80,160 95,50 110,160" fill="#1b7a58" />
        <circle cx="280" cy="140" r="24" fill="#cf385b" />
      </svg>
    `
  },
  {
    id: "work-8",
    title: "Monolith of the Four Pigments (Triptych)",
    category: "large",
    year: "2025",
    medium: "Oil, cold wax and dry pigments on three Belgian linen panels",
    dimensions: "220 × 380 cm (87 × 150 in)",
    status: "Available",
    price: "$28,000",
    imageUrl: "images/work-monumental-triptych.jpg",
    description: "The magnum opus of Delacroix's recent museum survey. Across nearly four meters of raw linen, the four elemental pigments—Ultramarine, Cadmium Yellow, Rose Madder, and Viridian—engage in a continuous, panoramic chromatic confrontation.",
    curatorialNote: "Spanning three monumental stretchers, this triptych functions like an architectural fresco. Delacroix refuses decorative blending; instead, each pigment asserts its chemical integrity with monumental pride.",
    palette: [
      { name: "French Ultramarine Extra", hex: "#1837b9", role: "Spanning oceanic conduit across all 3 panels" },
      { name: "Cadmium Yellow Deep", hex: "#ffc300", role: "Solar crest & central energy node" },
      { name: "Rose Madder Genuine", hex: "#cf385b", role: "Emotional heart & biological depth" },
      { name: "Viridian Green", hex: "#1b7a58", role: "Anchor arches & terrestrial stability" }
    ],
    provenance: "Centerpiece of 'Chromodynamics: Delacroix Solo', Palais de Tokyo, 2025",
    svgContent: `
      <svg viewBox="0 0 1200 700" class="painting-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Monolith of the Four Pigments (Triptych)">
        <rect width="1200" height="700" fill="#131619" />
        <g id="panel-1">
          <rect x="40" y="50" width="350" height="600" fill="#e9ece6" stroke="#252a30" stroke-width="2" />
          <path d="M 40,50 L 390,50 L 390,450 C 260,520 150,380 40,490 Z" fill="#1837b9" opacity="0.95" />
          <path d="M 40,380 C 140,290 280,420 390,340 L 390,650 L 40,650 Z" fill="#1b7a58" opacity="0.9" />
          <circle cx="210" cy="220" r="85" fill="#ffc300" opacity="0.9" />
        </g>
        <g id="panel-2">
          <rect x="425" y="50" width="350" height="600" fill="#e9ece6" stroke="#252a30" stroke-width="2" />
          <path d="M 425,200 C 520,120 640,260 775,180 L 775,440 C 670,520 540,380 425,480 Z" fill="#cf385b" opacity="0.92" />
          <circle cx="600" cy="360" r="130" fill="#ffc300" opacity="0.95" />
        </g>
        <g id="panel-3">
          <rect x="810" y="50" width="350" height="600" fill="#e9ece6" stroke="#252a30" stroke-width="2" />
          <path d="M 810,180 C 920,110 1020,240 1160,150 L 1160,650 L 810,650 Z" fill="#ffc300" opacity="0.95" />
          <circle cx="980" cy="460" r="100" fill="#cf385b" opacity="0.92" />
        </g>
      </svg>
    `
  },
  {
    id: "work-9",
    title: "The Resonance of Gesso",
    category: "large",
    year: "2024",
    medium: "Oil, beeswax and marble plaster on heavy sailcloth",
    dimensions: "200 × 260 cm (79 × 102 in)",
    status: "Acquired by Fondazione Prada",
    price: "$24,500",
    description: "An immense field of hand-applied gesso plaster, raked horizontally with wooden combs. A vertical fault line of ultramarine divides the canvas, weeping viridian and rose madder onto the gallery floor.",
    curatorialNote: "Delacroix's physical stamina is on full display in 'Resonance'. The sailcloth was laid flat on the studio floor, allowing the artist to walk directly into the wet pigment while applying marble plaster.",
    palette: [
      { name: "Marble Plaster Gesso", hex: "#f0f2ee", role: "Massive relief substrate" },
      { name: "Ultramarine Blue", hex: "#1837b9", role: "Vertical canyon fault line" },
      { name: "Viridian Green", hex: "#1b7a58", role: "Mineral weeping veins" },
      { name: "Cadmium Yellow", hex: "#ffc300", role: "High-contrast spark" }
    ],
    provenance: "Permanent Collection, Fondazione Prada, Milan",
    svgContent: `
      <svg viewBox="0 0 900 700" class="painting-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Resonance of Gesso">
        <rect width="900" height="700" fill="#d8d4c7" />
        <rect x="30" y="30" width="840" height="640" fill="#f0f2ee" stroke="#c9cdbe" stroke-width="2" />
        <path d="M 410,30 L 490,30 L 520,320 L 460,450 L 510,670 L 430,670 L 390,440 L 440,310 Z" fill="#1837b9" />
        <path d="M 120,240 C 260,180 340,310 440,310 C 560,310 680,210 810,270" stroke="#1b7a58" stroke-width="24" stroke-linecap="round" fill="none" opacity="0.85" />
        <circle cx="280" cy="340" r="54" fill="#ffc300" />
      </svg>
    `
  },
  {
    id: "work-10",
    title: "Chroma Symphony: Tension & Release",
    category: "large",
    year: "2025",
    medium: "Oil and dammar glaze on heavy Belgian flax canvas",
    dimensions: "190 × 240 cm (75 × 94 in)",
    status: "Available",
    price: "$21,000",
    description: "A theatrical composition exploring the psychological tension between crimson Rose Madder and cold Viridian Green. Bound together by an architectural frame of lapis and brilliant cadmium sparks.",
    curatorialNote: "Complementary color relationships often risk decorative harmony. Delacroix intentionally destabilizes the harmony by withholding equal quantities, letting rose madder erupt like an emotional surge.",
    palette: [
      { name: "Rose Madder Lake", hex: "#cf385b", role: "Dynamic emotional surge" },
      { name: "Viridian Deep", hex: "#16684b", role: "Equilibrating mass" },
      { name: "French Ultramarine", hex: "#1837b9", role: "Foundation pillars" },
      { name: "Cadmium Yellow Light", hex: "#ffe859", role: "Kinetic sparks & lightning" }
    ],
    provenance: "Delacroix Studio, Paris",
    svgContent: `
      <svg viewBox="0 0 960 760" class="painting-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Chroma Symphony: Tension & Release">
        <rect width="960" height="760" fill="#e9ede8" />
        <rect x="40" y="40" width="880" height="680" fill="#1837b9" opacity="0.88" />
        <polygon points="40,40 540,40 420,720 40,720" fill="#1b7a58" opacity="0.9" />
        <circle cx="500" cy="380" r="240" fill="#ffd53d" opacity="0.6" />
        <path d="M 320,180 C 460,80 680,120 740,240 C 800,360 690,520 540,580 C 420,620 310,480 320,180 Z" fill="#cf385b" opacity="0.85" />
      </svg>
    `
  },
  {
    id: "work-11",
    title: "The Deep Horizon (Collector Archival Print)",
    category: "prints",
    year: "2025",
    medium: "12-color archival pigment giclée on Hahnemühle Photo Rag 308gsm",
    dimensions: "70 × 50 cm (28 × 20 in) • Limited Edition of 25",
    status: "Edition 8 of 25 Available",
    price: "$650",
    imageUrl: "images/work-oil-horizon.jpg",
    description: "Museum-grade limited edition archival print, numbered and hand-signed by the artist in graphite. Blind-stamped by Atelier Delacroix with an accompanying Certificate of Authenticity on deckled rag.",
    curatorialNote: "Printed using archival mineral pigment inks on 100% cotton rag paper, achieving 99.8% spectral fidelity to the original oil canvas.",
    palette: [
      { name: "Archival Ultramarine", hex: "#1837b9", role: "Deep tonal base" },
      { name: "Cadmium Pigment Ink", hex: "#ffc300", role: "Solar crest" }
    ],
    provenance: "Numbered edition, printed in Paris by Atelier Clot, Bramsen & Georges",
    svgContent: ""
  },
  {
    id: "work-12",
    title: "Monolith Triptych (Exhibition Folio Print)",
    category: "prints",
    year: "2025",
    medium: "Three-plate panoramic giclée on Somerset Velvet 330gsm",
    dimensions: "50 × 120 cm (20 × 47 in) • Limited Edition of 15",
    status: "Edition 3 of 15 Available",
    price: "$950",
    imageUrl: "images/work-monumental-triptych.jpg",
    description: "Panoramic exhibition folio recreating the monumental triptych shown at Palais de Tokyo. Hand-numbered, deckled edges, presented in a custom linen presentation folio with artist monograph.",
    curatorialNote: "A collector-grade edition allowing the architectural scale of the museum triptych to reside in private domestic settings.",
    palette: [
      { name: "French Ultramarine", hex: "#1837b9", role: "Panoramic bridge" },
      { name: "Viridian Green", hex: "#1b7a58", role: "Hydrated glaze" }
    ],
    provenance: "Delacroix Studio Print Archives, Paris",
    svgContent: ""
  }
];

function getFilteredPaintings(filter) {
  if (!filter || filter === "all") return PAINTINGS_DATA;
  return PAINTINGS_DATA.filter(p => p.category === filter);
}

if (typeof window !== "undefined") {
  window.PAINTINGS_DATA = PAINTINGS_DATA;
  window.getFilteredPaintings = getFilteredPaintings;
}
