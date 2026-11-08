'use client';

import { useState } from 'react';

export default function CommissionCalculator({ onSelectCommission }) {
  const [width, setWidth] = useState(140);
  const [height, setHeight] = useState(110);
  const [substrate, setSubstrate] = useState('linen');
  const [framing, setFraming] = useState('unframed');

  // Surface area in square meters
  const areaM2 = (width * height) / 10000;

  // Base pricing: $3,200 baseline + $5,800 per square meter
  let price = 3200 + (areaM2 * 5800);

  if (substrate === 'panel') price *= 1.12;
  if (substrate === 'sailcloth') price *= 1.25;

  if (framing === 'oak') price += 450 + (width + height) * 1.8;
  if (framing === 'walnut') price += 750 + (width + height) * 2.5;

  const roundedPrice = Math.round(price / 100) * 100;

  let weeks = 6;
  if (areaM2 > 1.2) weeks = 12;
  if (areaM2 > 2.5) weeks = 18;

  const handleApply = () => {
    if (onSelectCommission) {
      onSelectCommission({
        width,
        height,
        substrate,
        framing,
        price: `$${roundedPrice.toLocaleString()}`,
        weeks: `${weeks}–${weeks + 4} Weeks`
      });
    } else {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
        const msg = document.getElementById("contact-message");
        const typeSelect = document.getElementById("contact-type");
        if (typeSelect) typeSelect.value = "commission";
        if (msg) {
          msg.value = `Hello Aurelia,\n\nI would like to inquire about reserving a bespoke commission based on my configured parameters:\n- Dimensions: ${width} × ${height} cm\n- Substrate: ${substrate}\n- Framing: ${framing}\n- Estimated Price: $${roundedPrice.toLocaleString()}\n\nCould we arrange a studio consultation to discuss palette harmonies and architectural lighting?\n\nWarm regards,`;
          msg.focus();
        }
      }
    }
  };

  return (
    <div className="estimator-container">
      <div>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", marginBottom: "1.25rem" }}>
          Interactive Dimension & Cost Calculator
        </h3>

        <div className="slider-row">
          <div className="slider-label-val">
            <span>Canvas Width:</span>
            <span>{width} cm</span>
          </div>
          <input
            type="range"
            className="timeline-scrubber"
            min="40"
            max="300"
            step="10"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value, 10))}
          />
        </div>

        <div className="slider-row">
          <div className="slider-label-val">
            <span>Canvas Height:</span>
            <span>{height} cm</span>
          </div>
          <input
            type="range"
            className="timeline-scrubber"
            min="40"
            max="250"
            step="10"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value, 10))}
          />
        </div>

        <div className="form-grid" style={{ marginBottom: 0 }}>
          <div className="form-group">
            <label className="form-label">Substrate</label>
            <select
              className="form-select"
              value={substrate}
              onChange={(e) => setSubstrate(e.target.value)}
            >
              <option value="linen">Belgian Flax Linen (460gsm)</option>
              <option value="panel">Marine Birch Wood Panel</option>
              <option value="sailcloth">Heavy Architectural Sailcloth</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Framing Presentation</label>
            <select
              className="form-select"
              value={framing}
              onChange={(e) => setFraming(e.target.value)}
            >
              <option value="unframed">Gallery Wrapped Edge (Unframed)</option>
              <option value="oak">Natural European Oak Float Frame</option>
              <option value="walnut">American Walnut Shadowbox</option>
            </select>
          </div>
        </div>
      </div>

      <div className="estimator-output-box">
        <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", fontWeight: 700 }}>
          Calculated Atelier Estimate
        </span>
        <div className="estimator-price-tag">
          ${roundedPrice.toLocaleString()}
        </div>
        <div style={{ fontSize: "0.88rem", color: "var(--viridian-green)", fontWeight: 600 }}>
          Estimated Execution: {weeks}–{weeks + 4} Weeks
        </div>
        <button
          onClick={handleApply}
          className="btn-primary"
          style={{ marginTop: "0.75rem", justifyContent: "center" }}
        >
          Reserve This Commission
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
