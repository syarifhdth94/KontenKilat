"use client";

import { useState, useEffect, useRef } from "react";

// =============================================
// KONTENKILAT — LANDING PAGE
// Hybrid: MUI-style components + Custom styling
// Komponen siap dipecah ke Next.js structure:
//   - components/landing/HeroSection.jsx
//   - components/landing/BeforeAfterShowcase.jsx
//   - components/landing/HowItWorks.jsx
//   - components/landing/CategoryShowcase.jsx
//   - components/landing/PricingSection.jsx
//   - components/landing/CTAFinal.jsx
//   - components/landing/Footer.jsx
//   - components/landing/Navbar.jsx
// =============================================

// ============ DESIGN TOKENS ============
const T = {
  bg: "#08080D",
  bgCard: "#111118",
  bgElevated: "#1A1A24",
  bgHover: "#22222E",
  border: "#262636",
  borderSubtle: "#1E1E2C",
  text: "#EEEEF4",
  textSec: "#8E8EA8",
  textMuted: "#56566E",
  accent: "#635BFF",
  accentLight: "#8B83FF",
  accentGlow: "rgba(99,91,255,0.12)",
  pink: "#FF3B8B",
  green: "#00D68F",
  amber: "#FFBE0B",
  gradient: "linear-gradient(135deg, #635BFF 0%, #FF3B8B 100%)",
  gradientText: "linear-gradient(135deg, #635BFF 0%, #8B83FF 40%, #FF3B8B 100%)",
  radius: 14,
  radiusSm: 8,
  font: "'Satoshi', 'Outfit', -apple-system, sans-serif",
  fontMono: "'JetBrains Mono', 'Fira Code', monospace",
};

// ============ BEFORE/AFTER DATA ============
const SHOWCASE_DATA = [
  {
    category: "Makanan & Minuman",
    emoji: "🍽️",
    before: { label: "Foto HP Biasa", desc: "Nasi goreng difoto pakai HP, pencahayaan seadanya, background berantakan" },
    after: { label: "Hasil KontenKilat", desc: "Foto studio profesional, pencahayaan sempurna, background clean, siap posting" },
    color: T.amber,
  },
  {
    category: "Fashion & Outfit",
    emoji: "👗",
    before: { label: "Foto HP Biasa", desc: "Foto OOTD di kamar, mirror selfie, cahaya kuning, background kasur berantakan" },
    after: { label: "Hasil KontenKilat", desc: "Katalog fashion profesional, model look, lighting studio, feed-ready" },
    color: T.pink,
  },
  {
    category: "Skincare & Beauty",
    emoji: "✨",
    before: { label: "Foto HP Biasa", desc: "Produk skincare difoto di meja, bayangan kamera, refleksi berantakan" },
    after: { label: "Hasil KontenKilat", desc: "Product shot premium, lighting lembut, background gradient, siap iklan" },
    color: T.accentLight,
  },
  {
    category: "Elektronik & Gadget",
    emoji: "💻",
    before: { label: "Foto HP Biasa", desc: "Foto earbuds di atas meja kerja, kabel berantakan, pencahayaan flat" },
    after: { label: "Hasil KontenKilat", desc: "Hero shot dramatis, floating effect, gradient background, premium feel" },
    color: T.green,
  },
];

// ============ ICON COMPONENTS ============
const Icons = {
  Upload: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  Palette: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="10.5" r="2.5" />
      <circle cx="8.5" cy="7.5" r="2.5" />
      <circle cx="6.5" cy="12.5" r="2.5" />
      <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10c0 2-1 3.5-3 3.5h-2.5c-.8 0-1.5.7-1.5 1.5 0 .4.2.8.4 1.1.3.3.4.6.4 1 0 .8-.7 1.4-1.3 1.4" />
    </svg>
  ),
  Download: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Zap: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" />
    </svg>
  ),
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Clock: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Play: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Star: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Check: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  WhatsApp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
};

// ============ REUSABLE COMPONENTS ============

function GradientButton({ children, onClick, size = "lg", variant = "primary", fullWidth = false, style: sx = {} }) {
  const [hovered, setHovered] = useState(false);
  const sizes = {
    sm: { padding: "10px 20px", fontSize: 13 },
    md: { padding: "12px 28px", fontSize: 14 },
    lg: { padding: "16px 36px", fontSize: 16 },
  };
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: variant === "primary" ? T.gradient : "transparent",
        border: variant === "primary" ? "none" : `1px solid ${T.border}`,
        color: variant === "primary" ? "#fff" : T.textSec,
        borderRadius: 12,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: T.font,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered && variant === "primary" ? "0 8px 32px rgba(99,91,255,0.3)" : "none",
        width: fullWidth ? "100%" : "auto",
        justifyContent: "center",
        letterSpacing: "-0.01em",
        ...sizes[size],
        ...sx,
      }}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children, color = T.accent }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: color + "12",
        color: color,
        borderRadius: 20,
        padding: "6px 16px",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        marginBottom: 16,
      }}
    >
      {children}
    </div>
  );
}

// ============ NAVBAR ============
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(16px, 4vw, 48px)",
        background: scrolled ? "rgba(8,8,13,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.borderSubtle}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: T.gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 900,
            color: "#fff",
          }}
        >
          KK
        </div>
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: T.text,
            fontFamily: T.font,
            letterSpacing: "-0.03em",
          }}
        >
          KontenKilat
        </span>
      </div>

      {/* Desktop nav */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <GradientButton size="sm" variant="outline" onClick={() => {}}>
          Masuk
        </GradientButton>
        <GradientButton size="sm" onClick={() => {}}>
          Coba Gratis
        </GradientButton>
      </div>
    </nav>
  );
}

// ============ HERO SECTION ============
function HeroSection() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "100px clamp(16px, 5vw, 60px) 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background effects */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "140%",
          maxWidth: 900,
          aspectRatio: "1",
          background: "radial-gradient(circle, rgba(99,91,255,0.08) 0%, rgba(255,59,139,0.04) 40%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(${T.border} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <SectionLabel>
          <Icons.Zap /> Platform AI untuk UMKM Indonesia
        </SectionLabel>

        <h1
          style={{
            fontSize: "clamp(32px, 6vw, 68px)",
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            fontFamily: T.font,
            margin: "0 0 20px",
            color: T.text,
            maxWidth: 800,
          }}
        >
          Foto HP Jadi{" "}
          <span
            style={{
              background: T.gradientText,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Konten Studio
          </span>
          <br />
          dalam 30 Detik
        </h1>

        <p
          style={{
            fontSize: "clamp(15px, 2vw, 19px)",
            color: T.textSec,
            maxWidth: 560,
            margin: "0 auto 36px",
            lineHeight: 1.6,
            letterSpacing: "-0.01em",
          }}
        >
          Tanpa skill desain. Tanpa belajar prompt. Upload foto produk dari HP, pilih gaya, download hasil profesional.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <GradientButton size="lg" onClick={() => {}}>
            Coba Gratis 3x Generate <Icons.ArrowRight />
          </GradientButton>
          <GradientButton size="lg" variant="outline" onClick={() => {}}>
            <Icons.Play /> Lihat Demo
          </GradientButton>
        </div>

        <p
          style={{
            marginTop: 20,
            fontSize: 13,
            color: T.textMuted,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <Icons.Shield /> Daftar gratis • Tidak perlu kartu kredit
        </p>
      </div>

      {/* Floating stats */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: 24,
          marginTop: 56,
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
        }}
      >
        {[
          { val: "10,000+", label: "Konten Dihasilkan" },
          { val: "2,500+", label: "UMKM Terdaftar" },
          { val: "30 dtk", label: "Rata-rata Proses" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "clamp(24px, 3vw, 32px)",
                fontWeight: 900,
                color: T.text,
                fontFamily: T.fontMono,
                letterSpacing: "-0.02em",
              }}
            >
              {s.val}
            </div>
            <div style={{ fontSize: 13, color: T.textMuted, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============ BEFORE/AFTER SHOWCASE ============
function BeforeAfterShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = SHOWCASE_DATA[activeIdx];

  return (
    <section
      style={{
        padding: "80px clamp(16px, 5vw, 60px)",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <SectionLabel color={T.pink}>Before → After</SectionLabel>
        <h2
          style={{
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 900,
            color: T.text,
            fontFamily: T.font,
            letterSpacing: "-0.03em",
            margin: "0 0 12px",
          }}
        >
          Lihat Bedanya
        </h2>
        <p style={{ color: T.textSec, fontSize: 16, maxWidth: 480, margin: "0 auto" }}>Dari foto HP seadanya menjadi konten profesional yang siap viral</p>
      </div>

      {/* Category tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 36,
        }}
      >
        {SHOWCASE_DATA.map((item, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            style={{
              background: activeIdx === i ? active.color + "15" : T.bgCard,
              border: `1px solid ${activeIdx === i ? active.color + "44" : T.border}`,
              color: activeIdx === i ? active.color : T.textSec,
              borderRadius: 10,
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: T.font,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>{item.emoji}</span> {item.category}
          </button>
        ))}
      </div>

      {/* Before/After cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          alignItems: "stretch",
        }}
      >
        {/* Before */}
        <div
          style={{
            background: T.bgCard,
            border: `1px solid ${T.border}`,
            borderRadius: T.radius,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              aspectRatio: "4/3",
              background: `linear-gradient(135deg, #1a1a22 0%, #252530 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Simulated messy photo */}
            <div
              style={{
                width: "70%",
                height: "60%",
                borderRadius: 8,
                background: "linear-gradient(135deg, #2a2520 0%, #352e28 50%, #2a2520 100%)",
                border: "3px solid #3a3530",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "rotate(-2deg)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              <span style={{ fontSize: 40, opacity: 0.5 }}>{active.emoji}</span>
            </div>
            {/* Label */}
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                borderRadius: 6,
                padding: "4px 10px",
                fontSize: 11,
                fontWeight: 600,
                color: "#EF4444",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Before
            </div>
          </div>
          <div style={{ padding: "18px 20px" }}>
            <div style={{ color: T.text, fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{active.before.label}</div>
            <div style={{ color: T.textMuted, fontSize: 13, lineHeight: 1.5 }}>{active.before.desc}</div>
          </div>
        </div>

        {/* After */}
        <div
          style={{
            background: T.bgCard,
            border: `1px solid ${active.color}33`,
            borderRadius: T.radius,
            overflow: "hidden",
            boxShadow: `0 0 40px ${active.color}08`,
          }}
        >
          <div
            style={{
              aspectRatio: "4/3",
              background: `linear-gradient(135deg, ${active.color}08 0%, ${active.color}15 50%, ${active.color}08 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Simulated pro photo */}
            <div
              style={{
                width: "70%",
                height: "60%",
                borderRadius: 12,
                background: `linear-gradient(135deg, ${active.color}20 0%, ${active.color}30 50%, ${active.color}15 100%)`,
                border: `2px solid ${active.color}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 8px 32px ${active.color}20`,
              }}
            >
              <span style={{ fontSize: 40 }}>{active.emoji}</span>
            </div>
            {/* Label */}
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: active.color + "22",
                backdropFilter: "blur(8px)",
                borderRadius: 6,
                padding: "4px 10px",
                fontSize: 11,
                fontWeight: 600,
                color: active.color,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              After
            </div>
            {/* AI badge */}
            <div
              style={{
                position: "absolute",
                bottom: 12,
                right: 12,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                borderRadius: 6,
                padding: "4px 10px",
                fontSize: 10,
                fontWeight: 600,
                color: T.accentLight,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Icons.Zap /> AI Generated
            </div>
          </div>
          <div style={{ padding: "18px 20px" }}>
            <div style={{ color: T.text, fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{active.after.label}</div>
            <div style={{ color: T.textSec, fontSize: 13, lineHeight: 1.5 }}>{active.after.desc}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ HOW IT WORKS ============
function HowItWorks() {
  return (
    <section
      style={{
        padding: "80px clamp(16px, 5vw, 60px)",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <SectionLabel color={T.green}>Cara Kerja</SectionLabel>
        <h2
          style={{
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 900,
            color: T.text,
            fontFamily: T.font,
            letterSpacing: "-0.03em",
            margin: "0 0 12px",
          }}
        >
          Semudah 1 — 2 — 3
        </h2>
        <p style={{ color: T.textSec, fontSize: 16, maxWidth: 460, margin: "0 auto" }}>Tidak perlu skill desain. Tidak perlu belajar prompt. Cukup 30 detik.</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
        }}
      >
        {[
          {
            step: "01",
            icon: <Icons.Upload />,
            title: "Upload Aset",
            desc: "Ambil foto atau video produk langsung dari HP. Tidak perlu edit, tidak perlu studio.",
            color: T.accent,
          },
          {
            step: "02",
            icon: <Icons.Palette />,
            title: "Pilih Gaya",
            desc: "Tempel link referensi dari Instagram/Pinterest, atau pilih dari kategori gaya yang tersedia.",
            color: T.pink,
          },
          {
            step: "03",
            icon: <Icons.Download />,
            title: "Download Hasil",
            desc: "AI memproses dalam 30 detik. Pilih dari 5 variasi, render kualitas pro, langsung download.",
            color: T.green,
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: T.bgCard,
              border: `1px solid ${T.border}`,
              borderRadius: T.radius,
              padding: "32px 28px",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}
          >
            {/* Step number bg */}
            <div
              style={{
                position: "absolute",
                top: -10,
                right: -5,
                fontSize: 100,
                fontWeight: 900,
                color: item.color,
                opacity: 0.04,
                fontFamily: T.fontMono,
                lineHeight: 1,
              }}
            >
              {item.step}
            </div>

            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: item.color + "12",
                color: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              {item.icon}
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: item.color,
                fontFamily: T.fontMono,
                marginBottom: 8,
                letterSpacing: "0.08em",
              }}
            >
              LANGKAH {item.step}
            </div>
            <h3
              style={{
                color: T.text,
                fontSize: 20,
                fontWeight: 800,
                fontFamily: T.font,
                margin: "0 0 10px",
                letterSpacing: "-0.02em",
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                color: T.textSec,
                fontSize: 14,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============ FEATURES SECTION ============
function FeaturesSection() {
  return (
    <section
      style={{
        padding: "80px clamp(16px, 5vw, 60px)",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <SectionLabel color={T.amber}>3 Fitur Utama</SectionLabel>
        <h2
          style={{
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 900,
            color: T.text,
            fontFamily: T.font,
            letterSpacing: "-0.03em",
            margin: "0 0 12px",
          }}
        >
          Semua Kebutuhan Konten dalam Satu Platform
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {[
          {
            emoji: "📸",
            title: "Photo to Pro",
            desc: "Foto produk dari HP langsung jadi foto studio profesional. Bonus: caption viral otomatis dari AI.",
            features: ["Foto HD 2048px", "Caption viral GPT-4o", "5 variasi pilihan"],
            color: T.accent,
          },
          {
            emoji: "🎬",
            title: "Photo to Video",
            desc: "Ubah 1 foto produk menjadi video dinamis 5-15 detik. Siap posting ke Reels, TikTok, Shorts.",
            features: ["Video 5-15 detik", "Gerakan dinamis", "Multi-format export"],
            color: T.pink,
            popular: true,
          },
          {
            emoji: "🎥",
            title: "Video to Pro",
            desc: "Video mentah dari HP berubah gaya jadi video profesional dengan AI style transfer.",
            features: ["Style transfer AI", "Auto color grading", "HD upscale"],
            color: T.green,
          },
        ].map((feat, i) => (
          <div
            key={i}
            style={{
              background: T.bgCard,
              border: `1px solid ${feat.popular ? feat.color + "44" : T.border}`,
              borderRadius: T.radius,
              padding: "32px 28px",
              position: "relative",
              overflow: "hidden",
              boxShadow: feat.popular ? `0 0 40px ${feat.color}10` : "none",
            }}
          >
            {feat.popular && (
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: feat.color + "18",
                  color: feat.color,
                  borderRadius: 6,
                  padding: "3px 10px",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Popular
              </div>
            )}
            <span style={{ fontSize: 36, display: "block", marginBottom: 16 }}>{feat.emoji}</span>
            <h3
              style={{
                color: T.text,
                fontSize: 22,
                fontWeight: 800,
                fontFamily: T.font,
                margin: "0 0 10px",
              }}
            >
              {feat.title}
            </h3>
            <p style={{ color: T.textSec, fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{feat.desc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {feat.features.map((f, j) => (
                <div
                  key={j}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: T.textSec,
                    fontSize: 13,
                  }}
                >
                  <div style={{ color: feat.color }}>
                    <Icons.Check />
                  </div>
                  {f}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============ PRICING ============
function PricingSection() {
  const [selectedPkg, setSelectedPkg] = useState(1);
  const packages = [
    { coins: 10, price: "20.000", perCoin: "2.000", save: null },
    { coins: 25, price: "45.000", perCoin: "1.800", save: "10%" },
    { coins: 50, price: "80.000", perCoin: "1.600", save: "20%" },
    { coins: 100, price: "150.000", perCoin: "1.500", save: "25%" },
  ];

  return (
    <section
      style={{
        padding: "80px clamp(16px, 5vw, 60px)",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <SectionLabel color={T.amber}>Harga</SectionLabel>
        <h2
          style={{
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 900,
            color: T.text,
            fontFamily: T.font,
            letterSpacing: "-0.03em",
            margin: "0 0 12px",
          }}
        >
          Mulai dari Rp2.000 per Konten
        </h2>
        <p style={{ color: T.textSec, fontSize: 16, maxWidth: 460, margin: "0 auto" }}>1 Koin = 5 Preview + 1 Hasil Final berkualitas profesional</p>
      </div>

      {/* Free trial highlight */}
      <div
        style={{
          background: `linear-gradient(135deg, ${T.accent}12 0%, ${T.pink}08 100%)`,
          border: `1px solid ${T.accent}33`,
          borderRadius: T.radius,
          padding: "20px 28px",
          textAlign: "center",
          marginBottom: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 28 }}>🎁</span>
        <div>
          <div style={{ color: T.text, fontSize: 16, fontWeight: 700 }}>Gratis 3 Koin untuk User Baru!</div>
          <div style={{ color: T.textSec, fontSize: 13 }}>Daftar sekarang dan langsung coba 3x generate tanpa bayar</div>
        </div>
      </div>

      {/* Packages grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
        }}
      >
        {packages.map((pkg, i) => (
          <button
            key={i}
            onClick={() => setSelectedPkg(i)}
            style={{
              background: selectedPkg === i ? T.accent + "12" : T.bgCard,
              border: `2px solid ${selectedPkg === i ? T.accent : T.border}`,
              borderRadius: T.radius,
              padding: "24px 20px",
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.2s",
              position: "relative",
            }}
          >
            {pkg.save && (
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  right: 12,
                  background: T.green,
                  color: "#000",
                  borderRadius: 6,
                  padding: "2px 8px",
                  fontSize: 10,
                  fontWeight: 800,
                }}
              >
                Hemat {pkg.save}
              </div>
            )}
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: T.text,
                fontFamily: T.fontMono,
                marginBottom: 4,
              }}
            >
              {pkg.coins}
            </div>
            <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 12 }}>Koin</div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: selectedPkg === i ? T.accent : T.text,
                fontFamily: T.font,
                marginBottom: 4,
              }}
            >
              Rp{pkg.price}
            </div>
            <div style={{ fontSize: 11, color: T.textMuted }}>Rp{pkg.perCoin}/koin</div>
          </button>
        ))}
      </div>
    </section>
  );
}

// ============ FINAL CTA ============
function CTAFinal() {
  return (
    <section
      style={{
        padding: "100px clamp(16px, 5vw, 60px)",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Glow bg */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 400,
          background: "radial-gradient(circle, rgba(99,91,255,0.08) 0%, rgba(255,59,139,0.04) 50%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 900,
            color: T.text,
            fontFamily: T.font,
            letterSpacing: "-0.04em",
            margin: "0 0 16px",
            lineHeight: 1.1,
          }}
        >
          Siap Upgrade Kontenmu?
        </h2>
        <p
          style={{
            color: T.textSec,
            fontSize: 17,
            maxWidth: 480,
            margin: "0 auto 36px",
            lineHeight: 1.6,
          }}
        >
          Gabung dengan ribuan UMKM Indonesia yang sudah menggunakan KontenKilat untuk membuat konten profesional setiap hari.
        </p>
        <GradientButton size="lg" onClick={() => {}}>
          <Icons.WhatsApp /> Daftar dengan WhatsApp
        </GradientButton>
        <p style={{ marginTop: 16, fontSize: 13, color: T.textMuted }}>Gratis 3x generate • Proses 30 detik • Tanpa skill desain</p>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${T.border}`,
        padding: "40px clamp(16px, 5vw, 60px)",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: T.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 900,
              color: "#fff",
            }}
          >
            KK
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: T.textSec, fontFamily: T.font }}>KontenKilat</span>
        </div>
        <div style={{ fontSize: 13, color: T.textMuted }}>© 2026 KontenKilat. Made with AI for Indonesian UMKM.</div>
      </div>
    </footer>
  );
}

// ============ MAIN APP ============
export default function KontenKilatLanding() {
  return (
    <div
      style={{
        background: T.bg,
        minHeight: "100vh",
        color: T.text,
        fontFamily: T.font,
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Satoshi:wght@400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <Navbar />
      <HeroSection />
      <BeforeAfterShowcase />
      <HowItWorks />
      <FeaturesSection />
      <PricingSection />
      <CTAFinal />
      <Footer />
    </div>
  );
}
