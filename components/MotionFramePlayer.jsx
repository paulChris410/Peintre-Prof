'use client';

import { useState, useEffect, useRef } from 'react';

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

export default function MotionFramePlayer() {
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const brushRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStage((prev) => (prev + 1) % MOTION_STAGES.length);
      }, 2200);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (brushRef.current) {
      const brushCoords = [
        { x: 30, y: 40, r: -15 },
        { x: 70, y: 35, r: 25 },
        { x: 45, y: 65, r: 10 },
        { x: 60, y: 45, r: -35 },
        { x: 25, y: 75, r: 20 },
        { x: 50, y: 50, r: 0 }
      ];
      const pos = brushCoords[currentStage] || { x: 50, y: 50, r: 0 };
      brushRef.current.style.transform = `translate(${pos.x * 3.5}px, ${pos.y * 2.2}px) rotate(${pos.r}deg)`;
    }
  }, [currentStage]);

  const activeData = MOTION_STAGES[currentStage];

  return (
    <div className="motion-frame-stage">
      <div className="motion-frame-grid">
        <div className="easel-frame-outer">
          <div className="easel-frame-inner">
            {/* Layer 01 */}
            <div className={`motion-canvas-layer ${currentStage === 0 ? 'active' : ''}`}>
              <svg viewBox="0 0 800 640" xmlns="http://www.w3.org/2000/svg">
                <rect width="800" height="640" fill="#dedbd2" />
                <rect x="20" y="20" width="760" height="600" fill="#f0f2ed" stroke="#c4cac0" stroke-width="2"/>
                <g stroke="#e2e6de" strokeWidth="1.5" opacity="0.6">
                  <line x1="20" y1="120" x2="780" y2="120"/>
                  <line x1="20" y1="240" x2="780" y2="240"/>
                  <line x1="20" y1="360" x2="780" y2="360"/>
                  <line x1="20" y1="480" x2="780" y2="480"/>
                </g>
              </svg>
            </div>

            {/* Layer 02 */}
            <div className={`motion-canvas-layer ${currentStage === 1 ? 'active' : ''}`}>
              <svg viewBox="0 0 800 640" xmlns="http://www.w3.org/2000/svg">
                <rect width="800" height="640" fill="#dedbd2" />
                <rect x="20" y="20" width="760" height="600" fill="#f0f2ed"/>
                <g stroke="#3a3e44" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" strokeDasharray="8 4">
                  <line x1="80" y1="380" x2="720" y2="360"/>
                  <circle cx="480" cy="280" r="140" fill="none" strokeWidth="2"/>
                  <path d="M 120,540 C 260,420 540,580 700,440" fill="none" strokeWidth="3"/>
                  <line x1="300" y1="60" x2="300" y2="580" strokeDasharray="4 4"/>
                </g>
              </svg>
            </div>

            {/* Layer 03 */}
            <div className={`motion-canvas-layer ${currentStage === 2 ? 'active' : ''}`}>
              <svg viewBox="0 0 800 640" xmlns="http://www.w3.org/2000/svg">
                <rect width="800" height="640" fill="#dedbd2" />
                <rect x="20" y="20" width="760" height="600" fill="#f0f2ed"/>
                <rect x="20" y="20" width="760" height="340" fill="#1837b9" opacity="0.45" />
                <path d="M 20,320 C 220,260 480,380 780,300 L 780,620 L 20,620 Z" fill="#1b7a58" opacity="0.5" />
                <circle cx="480" cy="280" r="140" fill="#ffc300" opacity="0.3" />
              </svg>
            </div>

            {/* Layer 04 */}
            <div className={`motion-canvas-layer ${currentStage === 3 ? 'active' : ''}`}>
              <svg viewBox="0 0 800 640" xmlns="http://www.w3.org/2000/svg">
                <rect width="800" height="640" fill="#dedbd2" />
                <rect x="20" y="20" width="760" height="600" fill="#1837b9" opacity="0.8" />
                <path d="M 20,320 C 220,260 480,380 780,300 L 780,620 L 20,620 Z" fill="#1b7a58" opacity="0.85" />
                <polygon points="120,180 340,110 520,280 260,340" fill="#cf385b" opacity="0.9" />
                <circle cx="500" cy="280" r="120" fill="#ffc300" opacity="0.95" />
              </svg>
            </div>

            {/* Layer 05 */}
            <div className={`motion-canvas-layer ${currentStage === 4 ? 'active' : ''}`}>
              <svg viewBox="0 0 800 640" xmlns="http://www.w3.org/2000/svg">
                <rect width="800" height="640" fill="#dedbd2" />
                <rect x="20" y="20" width="760" height="600" fill="#1837b9" opacity="0.9" />
                <path d="M 20,320 C 220,260 480,380 780,300 L 780,620 L 20,620 Z" fill="#1b7a58" opacity="0.9" />
                <polygon points="120,180 340,110 520,280 260,340" fill="#cf385b" opacity="0.9" />
                <circle cx="500" cy="280" r="120" fill="#ffc300" opacity="0.95" />
                <line x1="60" y1="220" x2="740" y2="220" stroke="#f0f2ed" strokeWidth="2.5" strokeDasharray="14 6"/>
              </svg>
            </div>

            {/* Layer 06 */}
            <div className={`motion-canvas-layer ${currentStage === 5 ? 'active' : ''}`}>
              <img src="/images/work-oil-horizon.jpg" alt="Final Cured Masterpiece" className="artwork-image" />
            </div>

            {/* Animated Painter Brush Cursor */}
            <div ref={brushRef} className={`painter-brush-cursor ${isPlaying ? 'painting' : ''}`}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                <path d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M12 12h.01" stroke="var(--cadmium-yellow)" strokeWidth="3" strokeLinecap="round"/>
                <path d="M4 20l5-5 3 3-5 5H4v-3z" fill="#9e7b57" stroke="#483424" strokeWidth="1.5"/>
                <polygon points="9,15 14,10 17,13 12,18" fill="var(--ultramarine)"/>
              </svg>
            </div>
          </div>

          {/* Controls */}
          <div className="motion-controls-wrap">
            <div className="scrubber-bar-row">
              <button
                className="play-pause-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pause time-lapse animation" : "Play time-lapse animation"}
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                )}
              </button>
              <input
                type="range"
                className="timeline-scrubber"
                min="0"
                max="5"
                step="1"
                value={currentStage}
                onChange={(e) => {
                  setIsPlaying(false);
                  setCurrentStage(parseInt(e.target.value, 10));
                }}
                aria-label="Scrub painting creation frames"
              />
            </div>

            <div className="frame-pills-row">
              {MOTION_STAGES.map((s, idx) => (
                <button
                  key={idx}
                  className={`frame-pill ${currentStage === idx ? 'active' : ''}`}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStage(idx);
                  }}
                >
                  {`0${idx + 1}. ${s.title.split(' ')[0]}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Info */}
        <div className="motion-frame-data-card">
          <span className="stage-number-tag">{activeData.stepNum}</span>
          <h3 className="stage-name-heading">{activeData.title}</h3>
          <p className="stage-desc-text">{activeData.description}</p>

          <div className="stage-specs-box">
            <div className="spec-entry">
              <span className="spec-entry-label">Substrate / Support</span>
              <span className="spec-entry-val">{activeData.substrate}</span>
            </div>
            <div className="spec-entry">
              <span className="spec-entry-label">Curing Duration</span>
              <span className="spec-entry-val">{activeData.dryingTime}</span>
            </div>
            <div className="spec-entry">
              <span className="spec-entry-label">Application Tools</span>
              <span className="spec-entry-val">{activeData.tools}</span>
            </div>
            <div className="spec-entry">
              <span className="spec-entry-label">Layer Thickness</span>
              <span className="spec-entry-val">{activeData.layerThickness}</span>
            </div>
          </div>

          <div>
            <a href="#works" className="btn-outline">
              Browse All Curated Works
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
