"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

/* ── PAC-MAN ICONS ── */
const PacmanIcons = {
  Home: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
      <circle cx="9" cy="10" r="1.5" />
      <circle cx="15" cy="10" r="1.5" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    </svg>
  ),
  About: () => (
    <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 2 C9 2 4 9 4 16 C4 23 9 30 16 30 C23 30 28 23 28 16 L22 16 C22 19.8 19.3 23 16 23 C11.5 23 8 19.8 8 16 C8 12.2 11.5 9 16 9 Z" />
    </svg>
  ),
  Projects: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="8" r="3" />
      <circle cx="5" cy="8" r="2" />
      <circle cx="19" cy="8" r="2" />
      <circle cx="12" cy="16" r="2" />
      <circle cx="6" cy="16" r="2" />
      <circle cx="18" cy="16" r="2" />
    </svg>
  ),
  Skills: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  ),
  Contact: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
      <circle cx="9" cy="10" r="1.5" />
      <circle cx="15" cy="10" r="1.5" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    </svg>
  ),
};

/* ── CHESS ICONS ── */
const ChessIcons = {
  Home: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      {/* Pawn */}
      <circle cx="12" cy="6" r="3" />
      <path d="M9 9.5 C7 11 7 14 9 15 L8 19 H16 L15 15 C17 14 17 11 15 9.5 Z" />
    </svg>
  ),
  About: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      {/* King */}
      <rect x="10" y="2" width="4" height="7" rx="1" />
      <rect x="8" y="4" width="8" height="3" rx="1" />
      <path d="M7 9 C5 11 5 16 7 18 L6 21 H18 L17 18 C19 16 19 11 17 9 Z" />
    </svg>
  ),
  Projects: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      {/* Knight */}
      <path d="M8 21h8M12 21v-4M6 7c0-3 2-5 5-5 2 0 3.5 1 4 2l1 3-2 1 1 2-3 1v3H8v-3L6 10l1-2z" />
    </svg>
  ),
  Skills: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      {/* Rook */}
      <path d="M7 2h2v3h6V2h2v3h1v4l-2 1v9H8V10L6 9V5h1z" />
    </svg>
  ),
  Contact: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      {/* Bishop */}
      <circle cx="12" cy="3.5" r="1.5" />
      <path d="M9 20h6M12 20v-3M8 17h8M9 7c0 4 3 7 3 9H9C9 14 7 11 7 8c0-2 2-4 5-4s5 2 5 4c0 3-2 6-2 8h-3c0-2 3-5 3-9z" />
    </svg>
  ),
};

export default function Navbar() {
  const { isPacman } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const accent = isPacman ? "#FCC92F" : "#769656";
  const bg = isPacman ? "#1a1a1a" : "#F5F0E8";
  const pillBg = isPacman ? "rgba(26,26,26,0.93)" : "rgba(245,240,232,0.93)";
  const pillBorder = isPacman ? "rgba(252,201,47,0.25)" : "rgba(201,193,154,0.5)";
  const textMuted = isPacman ? "rgba(240,240,240,0.55)" : "rgba(44,43,41,0.5)";
  const textFull = isPacman ? "#F0F0F0" : "#2c2b29";
  const mobBg = isPacman ? "#0d0d0d" : "#F0EBE0";
  const fontHeading = isPacman ? "var(--font-space)" : "var(--font-playfair)";

  const Icons = isPacman ? PacmanIcons : ChessIcons;

  return (
    <>
      <style>{`
        @keyframes nb-fadeDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nb-root { animation: nb-fadeDown 0.55s cubic-bezier(0.16,1,0.3,1) both; }

        .nb-link {
          position: relative;
          text-decoration: none;
          font-family: var(--font-space), sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: ${textMuted};
          padding: 6px 0;
          transition: color 0.25s ease;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .nb-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 2px;
          border-radius: 2px;
          background: ${accent};
          transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .nb-link:hover { color: ${textFull}; }
        .nb-link:hover::after { width: 100%; }
        .nb-link .nb-icon { 
          transition: color 0.25s ease;
          color: ${textMuted};
          flex-shrink: 0;
        }
        .nb-link:hover .nb-icon { color: ${accent}; }

        /* Desktop: show icon + label */
        .nb-icon-wrap { display: flex; }
        .nb-label     { display: inline; }

        /* Tablet (640–1023px): label only, no icon */
        @media (max-width: 1023px) and (min-width: 640px) {
          .nb-icon-wrap { display: none; }
          .nb-label     { display: inline; }
        }

        /* Mobile (<640px): icon only via hamburger — handled in mobile menu */
        .nb-hamburger {
          background: transparent; border: none; cursor: pointer;
          color: ${textMuted}; padding: 8px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
          transition: background 0.2s, color 0.2s;
        }
        .nb-hamburger:hover {
          background: ${isPacman ? "rgba(252,201,47,0.08)" : "rgba(118,150,86,0.08)"};
          color: ${textFull};
        }

        @media (min-width: 768px) {
          .nb-desktop-links { display: flex !important; }
          .nb-hamburger      { display: none !important; }
        }

        /* ── Mobile menu ── */
        .nb-mobile-menu {
          position: fixed; inset: 0; z-index: 9990;
          background: ${mobBg};
          display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
          overflow-y: auto;
        }
        .nb-mobile-menu.open { transform: translateX(0); }

        .nb-mob-link {
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid ${isPacman ? "rgba(255,255,255,0.05)" : "rgba(44,43,41,0.08)"};
          padding: 20px 0;
          transition: color 0.2s;
          color: ${isPacman ? "rgba(240,240,240,0.25)" : "rgba(44,43,41,0.25)"};
        }
        .nb-mob-link:hover { color: ${textFull}; }
        .nb-mob-link:hover .nb-mob-icon { color: ${accent}; }
        .nb-mob-link:hover .nb-mob-arrow { color: ${accent}; transform: translateX(5px); }

        .nb-mob-icon {
          color: ${isPacman ? "rgba(240,240,240,0.35)" : "rgba(44,43,41,0.35)"};
          transition: color 0.2s;
          flex-shrink: 0;
        }
        .nb-mob-arrow {
          color: ${isPacman ? "rgba(240,240,240,0.2)" : "rgba(44,43,41,0.2)"};
          transition: transform 0.25s, color 0.25s;
          flex-shrink: 0;
        }

        .nb-close {
          background: transparent;
          border: 1px solid ${isPacman ? "rgba(255,255,255,0.1)" : "rgba(44,43,41,0.15)"};
          cursor: pointer;
          color: ${textMuted};
          width: 44px; height: 44px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s, color 0.2s;
        }
        .nb-close:hover { border-color: ${accent}; color: ${textFull}; }

        /* Glow pill */
        .nb-glow {
          position: absolute; inset: 0; pointer-events: none;
          border-radius: inherit; opacity: 0;
          background: ${isPacman
          ? "radial-gradient(ellipse 90% 80% at 50% 0%, rgba(252,201,47,0.07), transparent 65%)"
          : "radial-gradient(ellipse 90% 80% at 50% 0%, rgba(118,150,86,0.07), transparent 65%)"};
          transition: opacity 0.55s ease;
        }
        .nb-glow.on { opacity: 1; }

        /* Mobile grid bg (pacman only) */
        .nb-mob-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          ${isPacman ? `
          background-image:
            linear-gradient(rgba(252,201,47,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(252,201,47,0.04) 1px, transparent 1px);
          background-size: 40px 40px;` : ""}
        }

        .colored-icon {
    /* Example: To turn it Blue */
    filter: invert(42%) sepia(93%) saturate(1352%) hue-rotate(200deg) brightness(119%) contrast(119%);
    
    /* Example: To turn it White */
    /* filter: invert(1); */
  }
      `}</style>

      {/* ══ NAVBAR ══ */}
      <nav
        className="nb-root"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000,
          transition: "padding 0.55s cubic-bezier(0.4,0,0.2,1)",
          padding: scrolled ? "10px clamp(12px,2vw,20px)" : "0",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.55s cubic-bezier(0.4,0,0.2,1)",

            // 1. Force the border to exist at all times with 0 opacity to prevent the "black flash"
            border: `1.5px solid ${scrolled ? pillBorder : "rgba(0,0,0,0)"}`,
            boxSizing: "border-box",

            ...(scrolled ? {
              maxWidth: 1100,
              borderRadius: 999,
              background: pillBg,
              backdropFilter: "blur(28px) saturate(160%)",
              WebkitBackdropFilter: "blur(28px) saturate(160%)",
              boxShadow: isPacman
                ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(252,201,47,0.06)"
                : "0 8px 32px rgba(44,43,41,0.08), inset 0 1px 0 rgba(118,150,86,0.06)",
              padding: "12px clamp(24px,4vw,36px)",
            } : {
              maxWidth: "100%",
              borderRadius: 0,
              background: "transparent",
              backdropFilter: "none",
              WebkitBackdropFilter: "none",
              // 2. Animate shadow to fully transparent instead of "none"
              boxShadow: "0 0 0 rgba(0,0,0,0)",
              padding: "clamp(16px,2.5vw,22px) clamp(20px,4vw,44px)",
            }),
          }}
        >

          <div className={`nb-glow${scrolled ? " on" : ""}`} />

          {/* Logo */}
          <Link
            href="#hero"
            style={{
              display: "flex", alignItems: "center", gap: 10,
              textDecoration: "none", zIndex: 2,
            }}
          >
            <span style={{
              fontFamily: fontHeading + ", sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: textFull,
              letterSpacing: isPacman ? "0.06em" : "-0.01em",
              fontStyle: isPacman ? "normal" : "italic",
              userSelect: "none",
            }}>
              {isPacman ? "SB.exe" : "Sarthak"}
              <span style={{ color: accent, marginLeft: 1 }}>
                {isPacman ? "_" : "."}
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div
            className="nb-desktop-links"
            style={{ display: "none", gap: 32, alignItems: "center", zIndex: 2 }}
          >
            {NAV_LINKS.map((l) => {
              const Icon = Icons[l.label as keyof typeof Icons];
              return (
                <Link key={l.label} href={l.href} className="nb-link">
                  <span className="nb-icon-wrap nb-icon">
                    <Icon />
                  </span>
                  <span className="nb-label">{l.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Hamburger */}
          <button
            className="nb-hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            style={{ zIndex: 2 }}
          >
            <svg width="22" height="15" viewBox="0 0 22 15" fill="none">
              <rect y="0" width="22" height="2" rx="1" fill="currentColor" />
              <rect y="6.5" width="15" height="2" rx="1" fill="currentColor" />
              <rect y="13" width="22" height="2" rx="1" fill="currentColor" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ══ MOBILE MENU ══ */}
      <div
        className={`nb-mobile-menu${mobileOpen ? " open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className="nb-mob-grid" />

        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          padding: "clamp(24px,6vw,40px)",
          paddingTop: "max(clamp(24px,6vw,40px), env(safe-area-inset-top, 24px))",
          paddingBottom: "max(clamp(24px,6vw,40px), env(safe-area-inset-bottom, 24px))",
          position: "relative", zIndex: 2, minHeight: "100%",
        }}>

          {/* Top row */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: "clamp(32px,8vh,56px)",
          }}>
            <span style={{
              fontFamily: fontHeading + ", sans-serif",
              fontWeight: 700, fontSize: 18,
              color: textFull, letterSpacing: isPacman ? "0.06em" : "-0.01em",
              fontStyle: isPacman ? "normal" : "italic",
            }}>
              {isPacman ? "SB.exe" : "Sarthak"}
              <span style={{ color: accent }}>{isPacman ? "_" : "."}</span>
            </span>
            <button
              className="nb-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Mobile nav links — icon only on left, label large center, arrow right */}
          <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {NAV_LINKS.map((l, i) => {
              const Icon = Icons[l.label as keyof typeof Icons];
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  className="nb-mob-link"
                  onClick={() => setMobileOpen(false)}
                  style={{ transitionDelay: mobileOpen ? `${i * 45}ms` : "0ms" }}
                >
                  {/* Icon */}
                  <span className="nb-mob-icon" style={{ width: 32 }}>
                    <Icon />
                  </span>

                  {/* Label */}
                  <span style={{
                    flex: 1,
                    fontFamily: fontHeading + ", sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(28px,8vw,48px)",
                    letterSpacing: isPacman ? "0.04em" : "-0.01em",
                    fontStyle: isPacman ? "normal" : "italic",
                    paddingLeft: 16,
                    lineHeight: 1.1,
                  }}>
                    {l.label}
                  </span>

                  {/* Arrow */}
                  <svg className="nb-mob-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
