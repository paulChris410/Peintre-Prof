'use client';

import { useEffect } from 'react';

export default function ArtworkModal({
  artwork,
  onClose,
  onPrev,
  onNext,
  onInquire
}) {
  useEffect(() => {
    if (!artwork) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [artwork, onClose, onPrev, onNext]);

  if (!artwork) return null;

  return (
    <div
      className="modal-overlay open"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog">
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close artwork detail view"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="modal-body">
          {/* Media Column */}
          <div className="modal-media-column">
            {artwork.imageUrl ? (
              <img src={artwork.imageUrl} alt={artwork.title} className="artwork-image" />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: artwork.svgContent }} />
            )}
          </div>

          {/* Documentation Column */}
          <div className="modal-info-column">
            <div className="modal-nav-arrows">
              <button className="modal-nav-btn" onClick={onPrev}>← Previous Piece</button>
              <button className="modal-nav-btn" onClick={onNext}>Next Piece →</button>
            </div>

            <h2 className="modal-title">{artwork.title}</h2>

            <div className="modal-spec-row">
              <div><strong>Year:</strong> <span>{artwork.year}</span></div>
              <div><strong>Status:</strong> <span style={{ color: "var(--viridian-green)" }}>{artwork.status}</span></div>
              <div><strong>Price:</strong> <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem" }}>{artwork.price}</span></div>
            </div>

            <p style={{ fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "0.25rem", fontWeight: 500 }}>
              {artwork.medium}
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
              {artwork.dimensions}
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              {artwork.description}
            </p>

            <div style={{ backgroundColor: "var(--bg-card)", padding: "1.25rem", borderRadius: "8px", border: "1px solid var(--border-subtle)", marginBottom: "1.5rem" }}>
              <h4 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ultramarine)", marginBottom: "0.5rem", fontWeight: 700 }}>
                Curatorial Analysis
              </h4>
              <p style={{ fontSize: "0.9rem", fontStyle: "italic" }}>
                {artwork.curatorialNote}
              </p>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.5rem", fontWeight: 700 }}>
                Pigment Chemistry Breakdown
              </h4>
              <div className="modal-palette-chips">
                {artwork.palette && artwork.palette.map((p, idx) => (
                  <div key={idx} className="modal-swatch-row">
                    <span className="modal-swatch-dot" style={{ backgroundColor: p.hex }} />
                    <div>
                      <strong>{p.name}</strong> <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>({p.hex})</span>: {p.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "2rem" }}>
              <strong>Provenance:</strong> <span>{artwork.provenance}</span>
            </div>

            <button
              className="btn-primary"
              style={{ marginTop: "auto", justifyContent: "center" }}
              onClick={() => onInquire && onInquire(artwork)}
            >
              Inquire About This Piece
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
