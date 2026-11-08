'use client';

import { useState } from 'react';

const PIGMENT_DATABASE = [
  { id: "ultramarine", name: "French Ultramarine", code: "PB29", hex: "#1837b9", opacity: 0.35, rgb: [24, 55, 185] },
  { id: "cadmium", name: "Cadmium Yellow Medium", code: "PY35", hex: "#ffc300", opacity: 0.95, rgb: [255, 195, 0] },
  { id: "madder", name: "Rose Madder Genuine", code: "NR9", hex: "#cf385b", opacity: 0.45, rgb: [207, 56, 91] },
  { id: "viridian", name: "Viridian Hydrated Oxide", code: "PG18", hex: "#1b7a58", opacity: 0.50, rgb: [27, 122, 88] },
  { id: "white", name: "Titanium White", code: "PW6", hex: "#f5f7f4", opacity: 1.0, rgb: [245, 247, 244] },
  { id: "umber", name: "Burnt Umber", code: "PBr7", hex: "#59392b", opacity: 0.85, rgb: [89, 57, 43] }
];

export default function PigmentAlchemyMixer() {
  const [selectedPigments, setSelectedPigments] = useState(["ultramarine", "cadmium"]);

  const togglePigment = (id) => {
    setSelectedPigments((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        if (prev.length <= 1) return prev; // Keep at least one
        return prev.filter((p) => p !== id);
      } else {
        if (prev.length >= 3) {
          return [...prev.slice(1), id]; // keep max 3
        }
        return [...prev, id];
      }
    });
  };

  const activeData = PIGMENT_DATABASE.filter((p) => selectedPigments.includes(p.id));

  // Compute optical subtractive color mix
  let r = 0, g = 0, b = 0, totalOpacity = 0;
  activeData.forEach((p) => {
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

  let blendName = "Harmonic Chords";
  let analysis = "A balanced optical collision of elemental mineral wavelengths.";
  const ids = [...selectedPigments].sort().join("+");

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

  return (
    <div className="pigment-mixer-card">
      <div className="mixer-grid">
        <div>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "1rem" }}>
            Select Pigments to Blend (Click to Toggle):
          </h3>
          <div className="pigment-wells-grid">
            {PIGMENT_DATABASE.map((pigment) => {
              const isSelected = selectedPigments.includes(pigment.id);
              return (
                <div
                  key={pigment.id}
                  className={`pigment-well-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => togglePigment(pigment.id)}
                  role="button"
                  tabIndex={0}
                >
                  <span
                    className="well-dot"
                    style={{
                      backgroundColor: pigment.hex,
                      border: pigment.id === 'white' ? '1px solid #ccc' : 'none'
                    }}
                  />
                  <div>
                    <div className="well-title">{pigment.name}</div>
                    <div className="well-code">{pigment.code} • {Math.round(pigment.opacity * 100)}% Opacity</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mixing-dish-result">
          <div className="dish-swatch-circle" style={{ backgroundColor: hexCode }} />
          <div>
            <h4 className="dish-blend-title">{blendName}</h4>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ultramarine)", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
              {hexCode.toUpperCase()}
            </div>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", maxWidth: "440px", margin: "0 auto 0.75rem" }}>
              {analysis}
            </p>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
              Optical Opacity: {Math.round(avgOpacity * 100)}% • Active Pigments: {activeData.map((p) => p.code).join(" + ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
