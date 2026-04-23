"use client";
import { useState, useEffect, useRef } from "react";

const CATEGORIES = [
  { id: "minimalist", label: "Minimalist", emoji: "◻️", color: "#94A3B8" },
  { id: "luxury", label: "Luxury Gold", emoji: "✦", color: "#F59E0B" },
  { id: "playful", label: "Playful Pop", emoji: "🎨", color: "#EC4899" },
  { id: "natural", label: "Natural Organic", emoji: "🌿", color: "#22C55E" },
  { id: "dark-bold", label: "Dark & Bold", emoji: "⬛", color: "#EF4444" },
  { id: "pastel", label: "Soft Pastel", emoji: "🩷", color: "#F9A8D4" },
  { id: "street", label: "Street Urban", emoji: "🔥", color: "#F97316" },
  { id: "vintage", label: "Vintage Retro", emoji: "📷", color: "#A78BFA" },
  { id: "neon", label: "Neon Glow", emoji: "💜", color: "#8B5CF6" },
  { id: "food", label: "Food & Bev", emoji: "🍽️", color: "#EAB308" },
  { id: "fashion", label: "Fashion Editorial", emoji: "👗", color: "#E11D48" },
  { id: "tech", label: "Tech Clean", emoji: "💻", color: "#06B6D4" },
];

const MOCK_PREVIEWS = [
  { id: 1, label: "Variasi 1" },
  { id: 2, label: "Variasi 2" },
  { id: 3, label: "Variasi 3" },
  { id: 4, label: "Variasi 4" },
  { id: 5, label: "Variasi 5" },
];

// ============ ICONS (inline SVG) ============
const Icons = {
  PhotoPro: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  ),
  PhotoVideo: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="m7 21 5-5 5 5" />
      <polygon points="10,8 16,11 10,14" />
    </svg>
  ),
  VideoPro: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 8-6 4 6 4V8Z" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  ),
  Coin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12M8 10h8M8 14h8" />
    </svg>
  ),
  Upload: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  Link: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  Grid: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Download: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Refresh: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  ),
  Sparkle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  History: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

// ============ STYLES ============
const S = {
  // Colors
  bg: "#0A0A0F",
  bgCard: "#12121A",
  bgElevated: "#1A1A25",
  bgHover: "#22222F",
  border: "#2A2A3A",
  borderFocus: "#6366F1",
  textPrimary: "#F1F1F6",
  textSecondary: "#8B8BA3",
  textMuted: "#5A5A72",
  accent: "#6366F1",
  accentHover: "#818CF8",
  accentGlow: "rgba(99,102,241,0.15)",
  success: "#22C55E",
  warning: "#F59E0B",
  gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)",
  gradientSubtle: "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.05) 100%)",
};

// ============ COMPONENTS ============

function TopBar({ credits, currentView, onBack, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${S.border}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {currentView !== "dashboard" && (
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              color: S.textSecondary,
              cursor: "pointer",
              padding: 4,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icons.ArrowLeft />
          </button>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: S.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            KK
          </div>
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: S.textPrimary,
              letterSpacing: "-0.02em",
              fontFamily: "'Outfit', 'SF Pro Display', sans-serif",
            }}
          >
            KontenKilat
          </span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: S.bgElevated,
            border: `1px solid ${S.border}`,
            borderRadius: 20,
            padding: "6px 14px",
          }}
        >
          <Icons.Coin />
          <span style={{ color: S.warning, fontWeight: 700, fontSize: 14, fontFamily: "'JetBrains Mono', monospace" }}>{credits}</span>
          <span style={{ color: S.textMuted, fontSize: 12 }}>Koin</span>
        </div>
        <button
          style={{
            background: S.gradient,
            border: "none",
            color: "#fff",
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            display: window.innerWidth > 600 ? "block" : "none",
          }}
        >
          + Beli Koin
        </button>

        {/* Mobile menu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: "none",
            border: "none",
            color: S.textSecondary,
            cursor: "pointer",
            padding: 4,
            display: "none",
            ...(window.innerWidth <= 768 ? { display: "flex" } : {}),
          }}
        >
          {mobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
        </button>
      </div>
    </div>
  );
}

function Sidebar({ currentView, onNavigate }) {
  const items = [
    { id: "dashboard", icon: <Icons.Home />, label: "Dashboard" },
    { id: "history", icon: <Icons.History />, label: "Riwayat" },
    { id: "settings", icon: <Icons.Settings />, label: "Pengaturan" },
  ];
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 60,
        bottom: 0,
        width: 72,
        background: S.bgCard,
        borderRight: `1px solid ${S.border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 16,
        gap: 4,
        zIndex: 90,
      }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          style={{
            width: 52,
            height: 52,
            borderRadius: 12,
            border: "none",
            background: currentView === item.id ? S.accentGlow : "transparent",
            color: currentView === item.id ? S.accent : S.textMuted,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            transition: "all 0.2s",
          }}
        >
          {item.icon}
          <span style={{ fontSize: 9, fontWeight: 500 }}>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

function FeatureCard({ icon, title, desc, color, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? S.bgHover : S.bgCard,
        border: `1px solid ${hovered ? color + "44" : S.border}`,
        borderRadius: 16,
        padding: "28px 24px",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? `0 8px 32px ${color}11` : "none",
        position: "relative",
        overflow: "hidden",
        flex: "1 1 280px",
        minWidth: 240,
        maxWidth: 400,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: color,
          opacity: 0.04,
          filter: "blur(20px)",
        }}
      />
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: color + "15",
          color: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          color: S.textPrimary,
          fontSize: 17,
          fontWeight: 700,
          marginBottom: 8,
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: S.textSecondary,
          fontSize: 13,
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        {desc}
      </p>
      <div
        style={{
          marginTop: 16,
          fontSize: 13,
          fontWeight: 600,
          color: color,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        Mulai Generate
        <span style={{ transition: "transform 0.2s", transform: hovered ? "translateX(4px)" : "none", display: "inline-block" }}>→</span>
      </div>
    </button>
  );
}

function Dashboard({ onSelectScheme }) {
  return (
    <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Greeting */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: S.textPrimary,
            marginBottom: 6,
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          Selamat Datang di KontenKilat <span style={{ fontSize: 24 }}>✨</span>
        </h1>
        <p style={{ color: S.textSecondary, fontSize: 15, margin: 0 }}>Ubah foto & video HP-mu jadi konten studio profesional dalam hitungan detik.</p>
      </div>

      {/* Feature Cards */}
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 40,
        }}
      >
        <FeatureCard icon={<Icons.PhotoPro />} title="Photo to Pro" desc="Foto produk dari HP → Foto studio profesional + caption viral otomatis" color="#6366F1" onClick={() => onSelectScheme("photo-to-pro")} />
        <FeatureCard icon={<Icons.PhotoVideo />} title="Photo to Video" desc="Foto produk → Video dinamis 5-15 detik siap posting" color="#EC4899" onClick={() => onSelectScheme("photo-to-video")} />
        <FeatureCard icon={<Icons.VideoPro />} title="Video to Pro" desc="Video mentah dari HP → Style transfer video profesional" color="#22C55E" onClick={() => onSelectScheme("video-to-pro")} />
      </div>

      {/* Quick Stats */}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Total Generate", value: "24", sub: "konten dibuat" },
          { label: "Bulan Ini", value: "8", sub: "konten" },
          { label: "Koin Terpakai", value: "24", sub: "dari 30 dibeli" },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              flex: "1 1 160px",
              background: S.bgCard,
              border: `1px solid ${S.border}`,
              borderRadius: 12,
              padding: "18px 20px",
            }}
          >
            <div style={{ color: S.textMuted, fontSize: 12, fontWeight: 500, marginBottom: 4 }}>{stat.label}</div>
            <div
              style={{
                color: S.textPrimary,
                fontSize: 28,
                fontWeight: 800,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {stat.value}
            </div>
            <div style={{ color: S.textMuted, fontSize: 11 }}>{stat.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ WORKSPACE ============

function Workspace({ scheme, onBack }) {
  const [step, setStep] = useState("upload"); // upload | style | confirm | preview | final
  const [uploadedFile, setUploadedFile] = useState(null);
  const [styleMethod, setStyleMethod] = useState(null); // "link" | "category"
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [refUrl, setRefUrl] = useState("");
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const schemeInfo = {
    "photo-to-pro": { title: "Photo to Pro", color: "#6366F1", accept: "image/*", icon: <Icons.PhotoPro /> },
    "photo-to-video": { title: "Photo to Video", color: "#EC4899", accept: "image/*", icon: <Icons.PhotoVideo /> },
    "video-to-pro": { title: "Video to Pro", color: "#22C55E", accept: "video/*", icon: <Icons.VideoPro /> },
  }[scheme];

  const simulateProgress = (targetStep) => {
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          setStep(targetStep);
          setProgress(0);
        }, 400);
      }
      setProgress(Math.min(p, 100));
    }, 300);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({ name: file.name, size: (file.size / 1024 / 1024).toFixed(1) + " MB", type: file.type });
      setStep("style");
    }
  };

  const handleConfirmGenerate = () => {
    setStep("generating-preview");
    simulateProgress("preview");
  };

  const handleSelectPreview = (id) => {
    setSelectedPreview(id);
  };

  const handleFinalRender = () => {
    setStep("generating-final");
    simulateProgress("final");
  };

  return (
    <div style={{ padding: "24px", maxWidth: 960, margin: "0 auto" }}>
      {/* Workspace Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 28,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: schemeInfo.color + "18",
            color: schemeInfo.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {schemeInfo.icon}
        </div>
        <div>
          <h2
            style={{
              color: S.textPrimary,
              fontSize: 22,
              fontWeight: 700,
              fontFamily: "'Outfit', sans-serif",
              margin: 0,
            }}
          >
            {schemeInfo.title}
          </h2>
          <p style={{ color: S.textSecondary, fontSize: 13, margin: 0 }}>
            {step === "upload" && "Langkah 1: Upload aset mentah"}
            {step === "style" && "Langkah 2: Pilih gaya referensi"}
            {step === "confirm" && "Langkah 3: Konfirmasi generate"}
            {step === "generating-preview" && "Memproses preview..."}
            {step === "preview" && "Langkah 4: Pilih preview terbaik"}
            {step === "generating-final" && "Memproses final render..."}
            {step === "final" && "Selesai! Download hasil Anda"}
          </p>
        </div>

        {/* Step indicator */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
          {["upload", "style", "preview", "final"].map((s, i) => {
            const stepOrder = { upload: 0, style: 1, confirm: 1, "generating-preview": 2, preview: 2, "generating-final": 3, final: 3 };
            const currentOrder = stepOrder[step] || 0;
            const isActive = i <= currentOrder;
            return (
              <div
                key={s}
                style={{
                  width: i === currentOrder ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: isActive ? schemeInfo.color : S.bgHover,
                  transition: "all 0.3s",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* ---- STEP: UPLOAD ---- */}
      {step === "upload" && (
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${S.border}`,
            borderRadius: 20,
            padding: "64px 32px",
            textAlign: "center",
            cursor: "pointer",
            background: S.gradientSubtle,
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = schemeInfo.color + "66";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = S.border;
          }}
        >
          <input ref={fileInputRef} type="file" accept={schemeInfo.accept} onChange={handleFileSelect} style={{ display: "none" }} />
          <div style={{ color: S.textMuted, marginBottom: 16 }}>
            <Icons.Upload />
          </div>
          <h3 style={{ color: S.textPrimary, fontSize: 18, fontWeight: 600, marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>{scheme === "video-to-pro" ? "Upload Video Mentah" : "Upload Foto Produk"}</h3>
          <p style={{ color: S.textSecondary, fontSize: 14, margin: 0, marginBottom: 8 }}>
            {scheme === "video-to-pro" ? "Drag & drop atau klik untuk pilih video (MP4, MOV — Maks 500MB)" : "Drag & drop atau klik untuk pilih foto (JPG, PNG — Maks 20MB)"}
          </p>
          <p style={{ color: S.textMuted, fontSize: 12, margin: 0 }}>Langsung dari HP, tidak perlu edit dulu</p>
        </div>
      )}

      {/* ---- STEP: STYLE ---- */}
      {step === "style" && (
        <div>
          {/* Uploaded file info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              background: S.bgCard,
              border: `1px solid ${S.border}`,
              borderRadius: 12,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                background: S.bgElevated,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: schemeInfo.color,
                fontSize: 20,
              }}
            >
              {scheme === "video-to-pro" ? "🎬" : "📷"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: S.textPrimary, fontSize: 14, fontWeight: 600 }}>{uploadedFile?.name}</div>
              <div style={{ color: S.textMuted, fontSize: 12 }}>{uploadedFile?.size}</div>
            </div>
            <button
              onClick={() => {
                setStep("upload");
                setUploadedFile(null);
              }}
              style={{
                background: "none",
                border: `1px solid ${S.border}`,
                color: S.textSecondary,
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Ganti
            </button>
          </div>

          {/* Style method selector */}
          <h3 style={{ color: S.textPrimary, fontSize: 16, fontWeight: 700, marginBottom: 16, fontFamily: "'Outfit', sans-serif" }}>Pilih Metode Referensi Gaya</h3>
          <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
            {[
              { id: "link", icon: <Icons.Link />, label: "Tempel Link URL", desc: "Paste URL foto/video referensi" },
              { id: "category", icon: <Icons.Grid />, label: "Pilih Kategori", desc: "Pilih dari gaya yang tersedia" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setStyleMethod(m.id);
                  setSelectedCategory(null);
                  setRefUrl("");
                }}
                style={{
                  flex: "1 1 200px",
                  background: styleMethod === m.id ? schemeInfo.color + "12" : S.bgCard,
                  border: `1px solid ${styleMethod === m.id ? schemeInfo.color + "55" : S.border}`,
                  borderRadius: 12,
                  padding: "16px 20px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ color: styleMethod === m.id ? schemeInfo.color : S.textMuted, marginBottom: 8 }}>{m.icon}</div>
                <div style={{ color: S.textPrimary, fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{m.label}</div>
                <div style={{ color: S.textSecondary, fontSize: 12 }}>{m.desc}</div>
              </button>
            ))}
          </div>

          {/* Link input */}
          {styleMethod === "link" && (
            <div style={{ marginBottom: 24 }}>
              <input
                type="url"
                placeholder="https://contoh.com/referensi-gaya..."
                value={refUrl}
                onChange={(e) => setRefUrl(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 12,
                  fontSize: 14,
                  background: S.bgCard,
                  border: `1px solid ${S.border}`,
                  color: S.textPrimary,
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                onFocus={(e) => (e.target.style.borderColor = schemeInfo.color)}
                onBlur={(e) => (e.target.style.borderColor = S.border)}
              />
              <p style={{ color: S.textMuted, fontSize: 12, marginTop: 6 }}>Tempel URL Instagram, Pinterest, atau website apapun sebagai referensi gaya</p>
            </div>
          )}

          {/* Category grid */}
          {styleMethod === "category" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: 10,
                marginBottom: 24,
              }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    background: selectedCategory === cat.id ? cat.color + "18" : S.bgCard,
                    border: `1px solid ${selectedCategory === cat.id ? cat.color + "55" : S.border}`,
                    borderRadius: 12,
                    padding: "16px 12px",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s",
                    position: "relative",
                  }}
                >
                  {selectedCategory === cat.id && (
                    <div
                      style={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: cat.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{cat.emoji}</div>
                  <div
                    style={{
                      color: selectedCategory === cat.id ? cat.color : S.textSecondary,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {cat.label}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Continue button */}
          {((styleMethod === "link" && refUrl.length > 5) || (styleMethod === "category" && selectedCategory)) && (
            <button
              onClick={() => setStep("confirm")}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 12,
                border: "none",
                background: S.gradient,
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Icons.Sparkle />
              Lanjut ke Konfirmasi
            </button>
          )}
        </div>
      )}

      {/* ---- STEP: CONFIRM ---- */}
      {step === "confirm" && (
        <div
          style={{
            background: S.bgCard,
            border: `1px solid ${S.border}`,
            borderRadius: 16,
            padding: "32px 28px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: S.textPrimary, fontSize: 20, fontWeight: 700, marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>Konfirmasi Generate</h3>
          <p style={{ color: S.textSecondary, fontSize: 14, marginBottom: 28 }}>Sistem akan membuat 5 variasi preview untuk Anda pilih</p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 28,
              maxWidth: 360,
              margin: "0 auto 28px",
            }}
          >
            {[
              { label: "Aset", value: uploadedFile?.name },
              { label: "Gaya", value: styleMethod === "link" ? `URL: ${refUrl.substring(0, 30)}...` : CATEGORIES.find((c) => c.id === selectedCategory)?.label },
              { label: "Skema", value: schemeInfo.title },
            ].map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 16px",
                  background: S.bgElevated,
                  borderRadius: 8,
                }}
              >
                <span style={{ color: S.textMuted, fontSize: 13 }}>{row.label}</span>
                <span style={{ color: S.textPrimary, fontSize: 13, fontWeight: 600 }}>{row.value}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: S.warning + "15",
              color: S.warning,
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            <Icons.Coin /> Biaya: 1 Koin
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setStep("style")}
              style={{
                padding: "12px 28px",
                borderRadius: 10,
                border: `1px solid ${S.border}`,
                background: "transparent",
                color: S.textSecondary,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Kembali
            </button>
            <button
              onClick={handleConfirmGenerate}
              style={{
                padding: "12px 36px",
                borderRadius: 10,
                border: "none",
                background: S.gradient,
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              <Icons.Sparkle /> Generate Preview
            </button>
          </div>
        </div>
      )}

      {/* ---- STEP: GENERATING ---- */}
      {(step === "generating-preview" || step === "generating-final") && (
        <div
          style={{
            background: S.bgCard,
            border: `1px solid ${S.border}`,
            borderRadius: 16,
            padding: "64px 32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: schemeInfo.color + "15",
              color: schemeInfo.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              animation: "pulse 2s ease-in-out infinite",
            }}
          >
            {schemeInfo.icon}
          </div>
          <h3 style={{ color: S.textPrimary, fontSize: 18, fontWeight: 700, marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>{step === "generating-preview" ? "Membuat 5 Variasi Preview..." : "Rendering Final Quality..."}</h3>
          <p style={{ color: S.textSecondary, fontSize: 14, marginBottom: 32 }}>{step === "generating-preview" ? "AI sedang menganalisis aset dan membuat variasi gaya" : "Meningkatkan resolusi ke kualitas profesional"}</p>

          {/* Progress bar */}
          <div
            style={{
              width: "100%",
              maxWidth: 400,
              height: 6,
              borderRadius: 3,
              background: S.bgElevated,
              margin: "0 auto",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                borderRadius: 3,
                background: S.gradient,
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <p style={{ color: S.textMuted, fontSize: 12, marginTop: 8, fontFamily: "'JetBrains Mono', monospace" }}>{Math.round(progress)}%</p>
        </div>
      )}

      {/* ---- STEP: PREVIEW ---- */}
      {step === "preview" && (
        <div>
          <h3 style={{ color: S.textPrimary, fontSize: 18, fontWeight: 700, marginBottom: 6, fontFamily: "'Outfit', sans-serif" }}>Pilih 1 Preview Terbaik</h3>
          <p style={{ color: S.textSecondary, fontSize: 14, marginBottom: 24 }}>Klik salah satu variasi yang paling sesuai, lalu render ke kualitas final</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: 12,
              marginBottom: 28,
            }}
          >
            {MOCK_PREVIEWS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPreview(p.id)}
                style={{
                  aspectRatio: "1",
                  background: S.bgCard,
                  border: `2px solid ${selectedPreview === p.id ? schemeInfo.color : S.border}`,
                  borderRadius: 12,
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Placeholder pattern */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    background: `linear-gradient(135deg, ${schemeInfo.color}08 0%, ${schemeInfo.color}15 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <span style={{ fontSize: 32, opacity: 0.3 }}>📷</span>
                  <span style={{ color: S.textMuted, fontSize: 11, fontWeight: 500 }}>{p.label}</span>
                </div>

                {selectedPreview === p.id && (
                  <div
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: schemeInfo.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2,
                    }}
                  >
                    <Icons.Check />
                  </div>
                )}
              </button>
            ))}
          </div>

          {selectedPreview && (
            <button
              onClick={handleFinalRender}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 12,
                border: "none",
                background: S.gradient,
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Icons.Sparkle /> Render Final — Kualitas Pro
            </button>
          )}
        </div>
      )}

      {/* ---- STEP: FINAL ---- */}
      {step === "final" && (
        <div>
          <div
            style={{
              background: S.bgCard,
              border: `1px solid ${S.border}`,
              borderRadius: 16,
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            {/* Final result placeholder */}
            <div
              style={{
                aspectRatio: "16/10",
                background: `linear-gradient(135deg, ${schemeInfo.color}10 0%, ${schemeInfo.color}20 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 48, opacity: 0.4 }}>{scheme === "video-to-pro" || scheme === "photo-to-video" ? "🎬" : "📸"}</span>
              <span style={{ color: S.textSecondary, fontSize: 14, fontWeight: 500 }}>Hasil Final — High Resolution</span>
            </div>

            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    background: S.success + "15",
                    color: S.success,
                    borderRadius: 6,
                    padding: "4px 10px",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  <Icons.Check /> Render Selesai
                </div>
                <span style={{ color: S.textMuted, fontSize: 12 }}>Pro Quality • 2048x2048px</span>
              </div>

              {/* Caption viral (only for Scheme A) */}
              {scheme === "photo-to-pro" && (
                <div
                  style={{
                    background: S.bgElevated,
                    borderRadius: 10,
                    padding: "14px 16px",
                    marginBottom: 12,
                    borderLeft: `3px solid ${schemeInfo.color}`,
                  }}
                >
                  <div style={{ color: S.textMuted, fontSize: 11, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Caption Viral — GPT-4o</div>
                  <p style={{ color: S.textSecondary, fontSize: 13, lineHeight: 1.6, margin: 0 }}>"Produk ini bukan sekadar barang, ini statement. ✨ Upgrade gaya hidupmu sekarang! 🔥 #UMKM #ProdukLokal #ViralProduct"</p>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              style={{
                flex: "1 1 200px",
                padding: "14px",
                borderRadius: 12,
                border: "none",
                background: S.gradient,
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Icons.Download /> Download Hasil
            </button>
            <button
              onClick={() => {
                setStep("style");
                setStyleMethod(null);
                setSelectedCategory(null);
                setRefUrl("");
                setSelectedPreview(null);
              }}
              style={{
                flex: "1 1 200px",
                padding: "14px",
                borderRadius: 12,
                border: `1px solid ${S.border}`,
                background: S.bgCard,
                color: S.textSecondary,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Icons.Refresh /> Coba Gaya Lain
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

// ============ MAIN APP ============

export default function KreativaApp() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [credits] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSelectScheme = (scheme) => {
    setSelectedScheme(scheme);
    setCurrentView("workspace");
  };

  const handleBack = () => {
    setCurrentView("dashboard");
    setSelectedScheme(null);
  };

  return (
    <div
      style={{
        background: S.bg,
        minHeight: "100vh",
        color: S.textPrimary,
        fontFamily: "'Outfit', 'SF Pro Display', -apple-system, sans-serif",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <TopBar credits={credits} currentView={currentView} onBack={handleBack} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {!isMobile && <Sidebar currentView={currentView} onNavigate={setCurrentView} />}

      <div
        style={{
          paddingTop: 60,
          marginLeft: isMobile ? 0 : 72,
          transition: "margin-left 0.3s",
        }}
      >
        {currentView === "dashboard" && <Dashboard onSelectScheme={handleSelectScheme} />}
        {currentView === "workspace" && selectedScheme && <Workspace scheme={selectedScheme} onBack={handleBack} />}
        {currentView === "history" && (
          <div style={{ padding: 24, textAlign: "center", color: S.textMuted, paddingTop: 80 }}>
            <Icons.History />
            <p style={{ marginTop: 12 }}>Riwayat generate akan tampil di sini</p>
          </div>
        )}
        {currentView === "settings" && (
          <div style={{ padding: 24, textAlign: "center", color: S.textMuted, paddingTop: 80 }}>
            <Icons.Settings />
            <p style={{ marginTop: 12 }}>Pengaturan akun akan tampil di sini</p>
          </div>
        )}
      </div>

      {/* Mobile bottom nav */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: 64,
            background: "rgba(10,10,15,0.95)",
            backdropFilter: "blur(20px)",
            borderTop: `1px solid ${S.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            zIndex: 100,
          }}
        >
          {[
            { id: "dashboard", icon: <Icons.Home />, label: "Home" },
            { id: "history", icon: <Icons.History />, label: "Riwayat" },
            { id: "settings", icon: <Icons.Settings />, label: "Setting" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                setSelectedScheme(null);
              }}
              style={{
                background: "none",
                border: "none",
                color: currentView === item.id ? S.accent : S.textMuted,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
                padding: "8px 16px",
              }}
            >
              {item.icon}
              <span style={{ fontSize: 10, fontWeight: 500 }}>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
