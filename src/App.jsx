import { useState, useEffect, useRef, createContext, useContext } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Brain, Code2, Database, Globe, Github, Linkedin,
  Mail, User, Send, ExternalLink, Menu, X,
  ChevronDown, Cpu, Layers, Network, ArrowRight,
  Sparkles, Terminal, Zap, Award, BookOpen, Coffee,
  MailCheck, Palette, Check
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────
// THEMES
// ─────────────────────────────────────────────────────────────────────

const THEMES = {
  midnight: {
    id: "midnight",
    name: "Midnight",
    preview: ["#7c3aed", "#030712", "#0e7490"],
    bg: "#030712",
    bgGradient: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(109,40,217,0.08) 0%, transparent 60%),
                 radial-gradient(ellipse 60% 40% at 80% 80%, rgba(6,182,212,0.05) 0%, transparent 55%)`,
    navBg: "rgba(3,7,18,0.80)",
    surface: "rgba(255,255,255,0.03)",
    surfaceHover: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.08)",
    borderHover: "rgba(255,255,255,0.15)",
    text: "#f8fafc",
    textSub: "#94a3b8",
    textMuted: "#475569",
    accent: "#8b5cf6",
    accentGrad: "linear-gradient(135deg, #7c3aed, #9333ea)",
    accentText: "#a78bfa",
    accentGradText: "linear-gradient(90deg, #a78bfa, #818cf8, #67e8f9)",
    heroGradText: "linear-gradient(90deg, #a78bfa, #c084fc, #67e8f9)",
    progressBar: "linear-gradient(90deg, #7c3aed, #9333ea, #06b6d4)",
    skillBar: "linear-gradient(90deg, #7c3aed, #06b6d4)",
    sectionBadgeBg: "rgba(139,92,246,0.10)",
    sectionBadgeBorder: "rgba(139,92,246,0.20)",
    sectionBadgeText: "#a78bfa",
    sectionLine: "linear-gradient(90deg, #7c3aed, transparent)",
    codeBlock: "#0d1117",
    scrollbar: "#3b0764",
    gridColor: "rgba(139,92,246,0.5)",
    blob1: "rgba(109,40,217,0.10)",
    blob2: "rgba(6,182,212,0.08)",
    blob3: "rgba(147,51,234,0.08)",
    particleColor: "rgba(167,139,250,0.40)",
    terminalColor: "#a78bfa",
    availableDot: "#34d399",
    availableText: "#34d399",
    availableCard: "linear-gradient(135deg, rgba(124,58,237,0.10), rgba(147,51,234,0.05))",
    availableCardBorder: "rgba(139,92,246,0.20)",
    footerBorder: "rgba(255,255,255,0.05)",
    statValue: "#ffffff",
    tagBg: "rgba(255,255,255,0.04)",
    tagBorder: "rgba(255,255,255,0.08)",
    tagHoverBorder: "rgba(139,92,246,0.30)",
    tagHoverBg: "rgba(139,92,246,0.05)",
    tagHoverText: "#a78bfa",
    buttonPrimary: "linear-gradient(135deg, #7c3aed, #9333ea)",
    buttonPrimaryHover: "linear-gradient(135deg, #6d28d9, #7c3aed)",
    buttonPrimaryShadow: "rgba(139,92,246,0.30)",
    buttonSecBg: "rgba(255,255,255,0.05)",
    buttonSecBorder: "rgba(255,255,255,0.10)",
    inputBg: "rgba(255,255,255,0.03)",
    inputBorder: "rgba(255,255,255,0.08)",
    inputFocusBorder: "rgba(139,92,246,0.60)",
    sentBg: "rgba(5,150,105,0.20)",
    sentBorder: "rgba(16,185,129,0.30)",
    sentText: "#34d399",
    skill1: { from: "#7c3aed", to: "#9333ea", icon: "#ffffff" },
    skill2: { from: "#0891b2", to: "#2563eb", icon: "#ffffff" },
    skill3: { from: "#059669", to: "#0d9488", icon: "#ffffff" },
  },

  cyber: {
    id: "cyber",
    name: "Cyber",
    preview: ["#00fff0", "#0a0a1a", "#ff00aa"],
    bg: "#060610",
    bgGradient: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,255,200,0.06) 0%, transparent 60%),
                 radial-gradient(ellipse 60% 40% at 90% 80%, rgba(255,0,170,0.05) 0%, transparent 55%)`,
    navBg: "rgba(6,6,16,0.85)",
    surface: "rgba(0,255,200,0.02)",
    surfaceHover: "rgba(0,255,200,0.05)",
    border: "rgba(0,255,200,0.10)",
    borderHover: "rgba(0,255,200,0.25)",
    text: "#e0fff8",
    textSub: "#7ecfbf",
    textMuted: "#3a7a70",
    accent: "#00d4aa",
    accentGrad: "linear-gradient(135deg, #00d4aa, #ff00aa)",
    accentText: "#00fff0",
    accentGradText: "linear-gradient(90deg, #00fff0, #00d4aa, #ff00aa)",
    heroGradText: "linear-gradient(90deg, #00fff0, #00d4aa, #ff44bb)",
    progressBar: "linear-gradient(90deg, #00d4aa, #00fff0, #ff00aa)",
    skillBar: "linear-gradient(90deg, #00d4aa, #00fff0)",
    sectionBadgeBg: "rgba(0,255,200,0.07)",
    sectionBadgeBorder: "rgba(0,255,200,0.20)",
    sectionBadgeText: "#00fff0",
    sectionLine: "linear-gradient(90deg, #00d4aa, transparent)",
    codeBlock: "#030811",
    scrollbar: "#004d3d",
    gridColor: "rgba(0,255,200,0.3)",
    blob1: "rgba(0,212,170,0.08)",
    blob2: "rgba(255,0,170,0.06)",
    blob3: "rgba(0,255,240,0.06)",
    particleColor: "rgba(0,255,200,0.50)",
    terminalColor: "#00fff0",
    availableDot: "#00fff0",
    availableText: "#00fff0",
    availableCard: "linear-gradient(135deg, rgba(0,212,170,0.08), rgba(0,255,200,0.03))",
    availableCardBorder: "rgba(0,255,200,0.20)",
    footerBorder: "rgba(0,255,200,0.05)",
    statValue: "#e0fff8",
    tagBg: "rgba(0,255,200,0.03)",
    tagBorder: "rgba(0,255,200,0.10)",
    tagHoverBorder: "rgba(0,255,200,0.30)",
    tagHoverBg: "rgba(0,255,200,0.06)",
    tagHoverText: "#00fff0",
    buttonPrimary: "linear-gradient(135deg, #00d4aa, #009980)",
    buttonPrimaryHover: "linear-gradient(135deg, #00fff0, #00d4aa)",
    buttonPrimaryShadow: "rgba(0,212,170,0.30)",
    buttonSecBg: "rgba(0,255,200,0.04)",
    buttonSecBorder: "rgba(0,255,200,0.12)",
    inputBg: "rgba(0,255,200,0.02)",
    inputBorder: "rgba(0,255,200,0.10)",
    inputFocusBorder: "rgba(0,255,200,0.50)",
    sentBg: "rgba(0,212,170,0.15)",
    sentBorder: "rgba(0,255,200,0.25)",
    sentText: "#00fff0",
    skill1: { from: "#00d4aa", to: "#009980", icon: "#ffffff" },
    skill2: { from: "#ff00aa", to: "#cc0088", icon: "#ffffff" },
    skill3: { from: "#0044cc", to: "#0066ff", icon: "#ffffff" },
  },

  ember: {
    id: "ember",
    name: "Ember",
    preview: ["#f97316", "#0f0a05", "#ef4444"],
    bg: "#0c0805",
    bgGradient: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(249,115,22,0.08) 0%, transparent 60%),
                 radial-gradient(ellipse 60% 40% at 80% 80%, rgba(239,68,68,0.05) 0%, transparent 55%)`,
    navBg: "rgba(12,8,5,0.85)",
    surface: "rgba(249,115,22,0.03)",
    surfaceHover: "rgba(249,115,22,0.06)",
    border: "rgba(249,115,22,0.10)",
    borderHover: "rgba(249,115,22,0.25)",
    text: "#fff7ed",
    textSub: "#c4a07a",
    textMuted: "#78500a",
    accent: "#f97316",
    accentGrad: "linear-gradient(135deg, #f97316, #ef4444)",
    accentText: "#fb923c",
    accentGradText: "linear-gradient(90deg, #fb923c, #f43f5e, #fbbf24)",
    heroGradText: "linear-gradient(90deg, #fb923c, #ef4444, #fbbf24)",
    progressBar: "linear-gradient(90deg, #f97316, #ef4444, #fbbf24)",
    skillBar: "linear-gradient(90deg, #f97316, #ef4444)",
    sectionBadgeBg: "rgba(249,115,22,0.08)",
    sectionBadgeBorder: "rgba(249,115,22,0.20)",
    sectionBadgeText: "#fb923c",
    sectionLine: "linear-gradient(90deg, #f97316, transparent)",
    codeBlock: "#0a0604",
    scrollbar: "#7c2d12",
    gridColor: "rgba(249,115,22,0.4)",
    blob1: "rgba(249,115,22,0.10)",
    blob2: "rgba(239,68,68,0.08)",
    blob3: "rgba(251,191,36,0.06)",
    particleColor: "rgba(251,146,60,0.50)",
    terminalColor: "#fb923c",
    availableDot: "#4ade80",
    availableText: "#4ade80",
    availableCard: "linear-gradient(135deg, rgba(249,115,22,0.10), rgba(239,68,68,0.05))",
    availableCardBorder: "rgba(249,115,22,0.20)",
    footerBorder: "rgba(249,115,22,0.06)",
    statValue: "#fff7ed",
    tagBg: "rgba(249,115,22,0.03)",
    tagBorder: "rgba(249,115,22,0.10)",
    tagHoverBorder: "rgba(249,115,22,0.30)",
    tagHoverBg: "rgba(249,115,22,0.06)",
    tagHoverText: "#fb923c",
    buttonPrimary: "linear-gradient(135deg, #f97316, #ef4444)",
    buttonPrimaryHover: "linear-gradient(135deg, #ea6a0a, #dc2626)",
    buttonPrimaryShadow: "rgba(249,115,22,0.30)",
    buttonSecBg: "rgba(249,115,22,0.05)",
    buttonSecBorder: "rgba(249,115,22,0.12)",
    inputBg: "rgba(249,115,22,0.02)",
    inputBorder: "rgba(249,115,22,0.10)",
    inputFocusBorder: "rgba(249,115,22,0.50)",
    sentBg: "rgba(74,222,128,0.12)",
    sentBorder: "rgba(74,222,128,0.25)",
    sentText: "#4ade80",
    skill1: { from: "#f97316", to: "#ef4444", icon: "#ffffff" },
    skill2: { from: "#fbbf24", to: "#f59e0b", icon: "#1a1a1a" },
    skill3: { from: "#dc2626", to: "#b91c1c", icon: "#ffffff" },
  },

  arctic: {
    id: "arctic",
    name: "Arctic",
    preview: ["#3b82f6", "#f8fafc", "#06b6d4"],
    bg: "#f8fafc",
    bgGradient: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.07) 0%, transparent 60%),
                 radial-gradient(ellipse 60% 40% at 80% 80%, rgba(6,182,212,0.05) 0%, transparent 55%)`,
    navBg: "rgba(248,250,252,0.85)",
    surface: "rgba(59,130,246,0.04)",
    surfaceHover: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.12)",
    borderHover: "rgba(59,130,246,0.30)",
    text: "#0f172a",
    textSub: "#475569",
    textMuted: "#94a3b8",
    accent: "#3b82f6",
    accentGrad: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    accentText: "#2563eb",
    accentGradText: "linear-gradient(90deg, #2563eb, #0891b2, #0e7490)",
    heroGradText: "linear-gradient(90deg, #3b82f6, #06b6d4, #2563eb)",
    progressBar: "linear-gradient(90deg, #3b82f6, #0891b2, #06b6d4)",
    skillBar: "linear-gradient(90deg, #3b82f6, #06b6d4)",
    sectionBadgeBg: "rgba(59,130,246,0.08)",
    sectionBadgeBorder: "rgba(59,130,246,0.20)",
    sectionBadgeText: "#2563eb",
    sectionLine: "linear-gradient(90deg, #3b82f6, transparent)",
    codeBlock: "#f1f5f9",
    scrollbar: "#bfdbfe",
    gridColor: "rgba(59,130,246,0.2)",
    blob1: "rgba(59,130,246,0.07)",
    blob2: "rgba(6,182,212,0.06)",
    blob3: "rgba(99,102,241,0.05)",
    particleColor: "rgba(59,130,246,0.40)",
    terminalColor: "#2563eb",
    availableDot: "#16a34a",
    availableText: "#16a34a",
    availableCard: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(6,182,212,0.04))",
    availableCardBorder: "rgba(59,130,246,0.20)",
    footerBorder: "rgba(59,130,246,0.08)",
    statValue: "#0f172a",
    tagBg: "rgba(59,130,246,0.04)",
    tagBorder: "rgba(59,130,246,0.12)",
    tagHoverBorder: "rgba(59,130,246,0.30)",
    tagHoverBg: "rgba(59,130,246,0.08)",
    tagHoverText: "#2563eb",
    buttonPrimary: "linear-gradient(135deg, #3b82f6, #0891b2)",
    buttonPrimaryHover: "linear-gradient(135deg, #2563eb, #0284c7)",
    buttonPrimaryShadow: "rgba(59,130,246,0.25)",
    buttonSecBg: "rgba(59,130,246,0.06)",
    buttonSecBorder: "rgba(59,130,246,0.15)",
    inputBg: "rgba(59,130,246,0.03)",
    inputBorder: "rgba(59,130,246,0.12)",
    inputFocusBorder: "rgba(59,130,246,0.50)",
    sentBg: "rgba(22,163,74,0.10)",
    sentBorder: "rgba(22,163,74,0.25)",
    sentText: "#16a34a",
    skill1: { from: "#3b82f6", to: "#2563eb", icon: "#ffffff" },
    skill2: { from: "#06b6d4", to: "#0891b2", icon: "#ffffff" },
    skill3: { from: "#6366f1", to: "#4f46e5", icon: "#ffffff" },
  },
};

// ─────────────────────────────────────────────────────────────────────
// THEME CONTEXT
// ─────────────────────────────────────────────────────────────────────

const ThemeContext = createContext(null);
const useTheme = () => useContext(ThemeContext);

// ─────────────────────────────────────────────────────────────────────
// THEME SWITCHER COMPONENT
// ─────────────────────────────────────────────────────────────────────

function ThemeSwitcher() {
  const { theme, setThemeId } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        style={{
          background: theme.surface,
          border: `1px solid ${theme.border}`,
          color: theme.textSub,
        }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-80"
      >
        <Palette size={14} style={{ color: theme.accentText }} />
        <span style={{ color: theme.textSub }} className="text-xs hidden sm:inline">{theme.name}</span>
        <div className="flex gap-0.5">
          {theme.preview.map((c, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: c }}
            />
          ))}
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            style={{
              background: theme.bg,
              border: `1px solid ${theme.border}`,
              boxShadow: `0 20px 40px rgba(0,0,0,0.3)`,
            }}
            className="absolute right-0 top-10 w-52 rounded-2xl p-2 z-[200]"
          >
            <p
              className="text-[10px] font-mono tracking-widest uppercase px-2 py-1.5 mb-1"
              style={{ color: theme.textMuted }}
            >
              Choose Theme
            </p>
            {Object.values(THEMES).map((t) => (
              <motion.button
                key={t.id}
                onClick={() => { setThemeId(t.id); setOpen(false); }}
                whileHover={{ x: 3 }}
                style={{
                  background: theme.id === t.id ? theme.surface : "transparent",
                  border: `1px solid ${theme.id === t.id ? theme.border : "transparent"}`,
                  color: theme.id === t.id ? theme.text : theme.textSub,
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
              >
                <div className="flex gap-1">
                  {t.preview.map((c, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full"
                      style={{ background: c, boxShadow: `0 0 4px ${c}50` }}
                    />
                  ))}
                </div>
                <span className="flex-1 text-left">{t.name}</span>
                {theme.id === t.id && (
                  <Check size={13} style={{ color: theme.accentText }} />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// DATA LAYER
// ─────────────────────────────────────────────────────────────────────

const SKILLS_DATA = [
  {
    category: "AI & Machine Learning",
    icon: Brain,
    items: [
      { name: "Natural Language Processing", level: 85 },
      { name: "Deep Learning", level: 88 },
      { name: "Convolutional Neural Networks", level: 82 },
      { name: "K-Nearest Neighbours", level: 90 },
      { name: "Artificial Neural Networks", level: 86 },
    ],
    skillKey: "skill1",
  },
  {
    category: "Full Stack Development",
    icon: Globe,
    items: [
      { name: "React.js", level: 92 },
      { name: "Node.js & Express", level: 88 },
      { name: "MongoDB", level: 85 },
      { name: "PHP", level: 78 },
      { name: "JavaScript (ES6+)", level: 93 },
    ],
    skillKey: "skill2",
  },
  {
    category: "Core Computer Science",
    icon: Cpu,
    items: [
      { name: "Data Structures", level: 91 },
      { name: "Algorithms", level: 88 },
      { name: "System Design", level: 76 },
      { name: "Object-Oriented Programming", level: 90 },
      { name: "Database Management", level: 84 },
    ],
    skillKey: "skill3",
  },
];

const PROJECTS_DATA = [
  {
    title: "Smart Class Attendance System",
    tagline: "AI-driven facial recognition for zero-effort attendance",
    description:
      "Engineered an end-to-end AI pipeline that replaces manual roll-call with real-time facial recognition. The system identifies students from a live camera feed, marks attendance in a database, and surfaces a live dashboard for faculty with analytics, alerts for defaulters, and exportable reports.",
    tech: ["Python", "OpenCV", "DeepFace", "Flask", "MongoDB", "React"],
    icon: "🎓",
    link: "#",
    github: "#",
  },
  {
    title: "Bus Management Dashboard",
    tagline: "Fleet tracking & operations for campus transit",
    description:
      "A full-featured MERN-stack admin dashboard for managing college bus fleets. Supports real-time location tracking via socket.io, CRUD operations on bus records, route management, driver assignment, and automated schedule notifications for students.",
    tech: ["MongoDB", "Express.js", "React", "Node.js", "Socket.io", "Leaflet"],
    icon: "🚌",
    link: "#",
    github: "#",
  },
  {
    title: "Smart Workspace Application",
    tagline: "Hackathon winner — workspace optimization tool",
    description:
      "Built during a 24-hour competitive hackathon, this dynamic SPA helps organizations optimize physical workspace utilization. Features include interactive floor-plan maps, live occupancy tracking, hot-desk booking, and team co-location suggestions powered by simple ML heuristics.",
    tech: ["React", "Tailwind CSS", "Chart.js", "Firebase", "Framer Motion"],
    icon: "🏢",
    link: "#",
    github: "#",
  },
];

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const TYPING_TEXTS = [
  "AI/ML Engineer",
  "Full-Stack Developer",
  "Deep Learning Enthusiast",
  "Open Source Contributor",
  "Problem Solver",
];

// ─────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────

function useTypingEffect(texts, typingSpeed = 80, deletingSpeed = 45, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), typingSpeed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), deletingSpeed);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx((i) => (i + 1) % texts.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

// ─────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = (delay = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});
const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─────────────────────────────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  const { theme } = useTheme();
  return (
    <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
      <span className="h-px w-8" style={{ background: theme.sectionLine }} />
      <span
        className="text-xs font-mono tracking-[0.2em] uppercase"
        style={{ color: theme.sectionBadgeText }}
      >
        {children}
      </span>
    </motion.div>
  );
}

function SectionHeading({ children }) {
  const { theme } = useTheme();
  return (
    <motion.h2
      variants={fadeUp}
      className="text-4xl md:text-5xl font-bold leading-tight mb-6"
      style={{ fontFamily: "'Syne', sans-serif", color: theme.text }}
    >
      {children}
    </motion.h2>
  );
}

function GradientText({ children, gradient }) {
  return (
    <span
      style={{
        background: gradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

function useScrollReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return [ref, isInView];
}

// ─────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────

function Navbar() {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActive(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: scrolled ? theme.navBg : "transparent",
          borderBottom: scrolled ? `1px solid ${theme.border}` : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: theme.buttonPrimary }}
            >
              <Terminal size={14} className="text-white" />
            </div>
            <span
              className="font-bold text-lg tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif", color: theme.text }}
            >
              dev<span style={{ color: theme.accentText }}>.</span>portfolio
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                style={{
                  color: active === link ? theme.accentText : theme.textSub,
                  background: active === link ? theme.surface : "transparent",
                }}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:opacity-80"
              >
                {link}
              </button>
            ))}
            <div className="ml-2">
              <ThemeSwitcher />
            </div>
            <motion.a
              href="/Satjot-Trident-Resume.docx"
              download="Satjot-Trident-Resume.docx"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{ background: theme.buttonPrimary, boxShadow: `0 4px 15px ${theme.buttonPrimaryShadow}` }}
              className="ml-2 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-200"
            >
              Resume ↓
            </motion.a>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeSwitcher />
            <button
              style={{ color: theme.textSub }}
              className="hover:opacity-80 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              background: theme.navBg,
              backdropFilter: "blur(20px)",
              borderBottom: `1px solid ${theme.border}`,
            }}
            className="fixed top-16 inset-x-0 z-40 md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  style={{ color: theme.textSub }}
                  className="text-left px-4 py-3 hover:opacity-80 rounded-lg transition text-sm font-medium"
                >
                  {link}
                </button>
              ))}
              <a
                href="/Satjot-Trident-Resume.docx"
                download="Satjot-Trident-Resume.docx"
                style={{ background: theme.buttonPrimary }}
                className="mt-2 px-4 py-3 text-sm font-semibold text-white rounded-lg text-center"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────

function GridBackground() {
  const { theme } = useTheme();
  const particles = useRef(
    [...Array(18)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(${theme.gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${theme.gridColor} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: theme.blob1 }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: theme.blob2 }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl" style={{ background: theme.blob3 }} />
      {particles.current.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ left: p.left, top: p.top, background: theme.particleColor }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const { theme } = useTheme();
  const typedText = useTypingEffect(TYPING_TEXTS);
  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
      <GridBackground />
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            background: theme.sectionBadgeBg,
            border: `1px solid ${theme.sectionBadgeBorder}`,
            color: theme.sectionBadgeText,
          }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: theme.availableDot }} />
          AVAILABLE FOR INTERNSHIPS & PROJECTS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.02] tracking-tighter mb-4"
          style={{ fontFamily: "'Syne', sans-serif", color: theme.text }}
        >
          Building the Future
          <br />
          <GradientText gradient={theme.heroGradText}>with AI & Code</GradientText>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="h-10 flex items-center justify-center mb-6"
        >
          <span className="text-xl md:text-2xl font-light" style={{ color: theme.textSub }}>
            I'm a{" "}
            <span className="font-semibold font-mono" style={{ color: theme.accentText }}>
              {typedText}
              <span className="animate-pulse" style={{ color: theme.accentText }}>|</span>
            </span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-lg max-w-xl mx-auto leading-relaxed mb-10"
          style={{ color: theme.textSub }}
        >
          3rd-year B.Tech CSE student passionate about crafting intelligent systems
          — from neural networks to production-grade web applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToProjects}
            style={{
              background: theme.buttonPrimary,
              boxShadow: `0 8px 25px ${theme.buttonPrimaryShadow}`,
            }}
            className="group flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl transition-all duration-300"
          >
            View Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.a
            href="/Satjot-Trident-Resume.docx"
            download="Satjot-Trident-Resume.docx"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: theme.buttonSecBg,
              border: `1px solid ${theme.buttonSecBorder}`,
              color: theme.text,
            }}
            className="flex items-center gap-2 px-7 py-3.5 font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:opacity-80"
          >
            Download Resume
            <span style={{ color: theme.accentText }}>↓</span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mt-16 pt-10"
          style={{ borderTop: `1px solid ${theme.border}` }}
        >
          {[
            { label: "Projects Built", value: "10+" },
            { label: "Hackathons", value: "3" },
            { label: "Technologies", value: "15+" },
            { label: "CGPA", value: "8.7" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-black" style={{ fontFamily: "'Syne', sans-serif", color: theme.statValue }}>
                {value}
              </div>
              <div className="text-xs mt-1 tracking-widest uppercase" style={{ color: theme.textMuted }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        style={{ color: theme.textMuted }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────────

function About() {
  const { theme } = useTheme();
  const [ref, isInView] = useScrollReveal();

  const highlights = [
    { icon: Brain, text: "Applied AI Research", colorKey: "accentText" },
    { icon: Code2, text: "Full Stack MERN", colorKey: "accentText" },
    { icon: Layers, text: "DSA & Problem Solving", colorKey: "accentText" },
    { icon: Award, text: "Hackathon Runner Up", colorKey: "accentText" },
  ];

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={stagger(0.12)}
        >
          <SectionLabel>About Me</SectionLabel>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading>
                Code. Learn.
                <br />
                <GradientText gradient={theme.accentGradText}>Innovate.</GradientText>
              </SectionHeading>

              <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-5" style={{ color: theme.textSub }}>
                I'm a 3rd-year B.Tech Computer Science student specializing in{" "}
                <span className="font-medium" style={{ color: theme.accentText }}>AI & Machine Learning</span>,
                with a strong command of full-stack web development.
              </motion.p>
              <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-8" style={{ color: theme.textSub }}>
                I thrive at the intersection of{" "}
                <span className="font-medium" style={{ color: theme.accentText }}>data structures, algorithms</span>, and{" "}
                <span className="font-medium" style={{ color: theme.accentText }}>applied intelligence</span> — building
                systems that are not only functional, but meaningfully smart.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                {[
                  { icon: Coffee, text: "Open to Collaborate" },
                  { icon: BookOpen, text: "Always Learning" },
                  { icon: Zap, text: "Fast Executor" },
                ].map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    style={{ background: theme.surface, border: `1px solid ${theme.border}`, color: theme.textSub }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                  >
                    <Icon size={13} style={{ color: theme.accentText }} />
                    {text}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div variants={stagger(0.1)} className="grid grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, text }) => (
                <motion.div
                  key={text}
                  variants={scaleIn}
                  whileHover={{ y: -4, scale: 1.02 }}
                  style={{ background: theme.surface, border: `1px solid ${theme.border}` }}
                  className="group p-5 rounded-2xl hover:opacity-90 transition-all duration-300 cursor-default"
                >
                  <Icon size={26} className="mb-3" style={{ color: theme.accentText }} />
                  <span className="text-sm font-medium leading-snug" style={{ color: theme.text }}>{text}</span>
                </motion.div>
              ))}

              <motion.div
                variants={scaleIn}
                className="col-span-2 p-4 rounded-2xl font-mono text-xs overflow-hidden"
                style={{ background: theme.codeBlock, border: `1px solid ${theme.border}` }}
              >
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <span className="ml-2 text-[10px]" style={{ color: theme.textMuted }}>about.py</span>
                </div>
                <pre className="leading-relaxed text-[11px]" style={{ color: theme.textSub }}>
                  <span style={{ color: theme.terminalColor }}>class</span>{" "}
                  <span style={{ color: theme.accentText }}>Developer</span>
                  {`:\n`}
                  {"  "}<span style={{ color: theme.textMuted }}>name</span> ={" "}
                  <span style={{ color: "#4ade80" }}>"Satjot Singh Saini"</span>
                  {`\n`}
                  {"  "}<span style={{ color: theme.textMuted }}>year</span> ={" "}
                  <span style={{ color: "#fb923c" }}>3</span>
                  {`\n`}
                  {"  "}<span style={{ color: theme.textMuted }}>focus</span> ={" "}
                  <span style={{ color: "#4ade80" }}>["AI", "ML", "MERN"]</span>
                  {`\n`}
                  {"  "}<span style={{ color: theme.textMuted }}>goal</span> ={" "}
                  <span style={{ color: "#4ade80" }}>"Build things that matter"</span>
                </pre>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────────────────────

function SkillBar({ name, level, delay }) {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm" style={{ color: theme.text }}>{name}</span>
        <span className="text-xs font-mono" style={{ color: theme.textMuted }}>{level}%</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: theme.border }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: theme.skillBar }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function Skills() {
  const { theme } = useTheme();
  const [ref, isInView] = useScrollReveal();

  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={stagger(0.15)}
          className="text-center mb-16"
        >
          <SectionLabel>Technical Skills</SectionLabel>
          <SectionHeading>My Tech Arsenal</SectionHeading>
          <motion.p variants={fadeUp} className="text-lg max-w-xl mx-auto" style={{ color: theme.textSub }}>
            A curated set of skills spanning intelligent systems, scalable web platforms, and
            rigorous CS fundamentals.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={stagger(0.15)}
          className="grid md:grid-cols-3 gap-6"
        >
          {SKILLS_DATA.map(({ category, icon: Icon, items, skillKey }) => {
            const sk = theme[skillKey];
            return (
              <motion.div
                key={category}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                style={{ background: theme.surface, border: `1px solid ${theme.border}` }}
                className="group relative p-6 rounded-2xl transition-all duration-400 shadow-xl hover:shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${sk.from}, ${sk.to})` }}
                  >
                    <Icon size={18} style={{ color: sk.icon }} />
                  </div>
                  <h3 className="font-bold text-base leading-tight" style={{ fontFamily: "'Syne', sans-serif", color: theme.text }}>
                    {category}
                  </h3>
                </div>
                {items.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} delay={i} />
                ))}
                <div
                  className="absolute inset-x-0 bottom-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${sk.from}, ${sk.to})` }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={stagger(0.04)}
          className="flex flex-wrap justify-center gap-2.5 mt-12"
        >
          {[
            "Python", "TensorFlow", "PyTorch", "scikit-learn", "OpenCV",
            "React", "Node.js", "MongoDB", "Express", "REST APIs",
            "Git", "Linux", "SQL", "PHP", "Figma",
          ].map((tech) => (
            <motion.span
              key={tech}
              variants={scaleIn}
              whileHover={{ scale: 1.08, y: -2 }}
              style={{
                background: theme.tagBg,
                border: `1px solid ${theme.tagBorder}`,
                color: theme.textSub,
              }}
              className="px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-default hover:opacity-80"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      style={{
        background: theme.surface,
        border: `1px solid ${theme.border}`,
      }}
      className="group relative rounded-2xl transition-all duration-400 shadow-xl hover:shadow-2xl cursor-default"
    >
      <div className="rounded-[15px] p-7 h-full flex flex-col">
        <div className="flex items-start justify-between mb-5">
          <div className="text-4xl leading-none">{project.icon}</div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {[{ Icon: Github, href: project.github }, { Icon: ExternalLink, href: project.link }].map(({ Icon, href }) => (
              <motion.a
                key={href}
                href={href}
                whileHover={{ scale: 1.15 }}
                style={{ background: theme.surface, border: `1px solid ${theme.border}`, color: theme.textSub }}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-80 transition"
                onClick={(e) => e.stopPropagation()}
              >
                <Icon size={14} />
              </motion.a>
            ))}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-1 leading-snug" style={{ fontFamily: "'Syne', sans-serif", color: theme.text }}>
          {project.title}
        </h3>
        <p className="text-xs font-mono mb-4" style={{ color: theme.textMuted }}>{project.tagline}</p>
        <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: theme.textSub }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((t) => (
            <span
              key={t}
              style={{ background: theme.tagBg, border: `1px solid ${theme.tagBorder}`, color: theme.textSub }}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Projects() {
  const { theme } = useTheme();
  const [ref, isInView] = useScrollReveal();

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={stagger(0.12)}
          className="text-center mb-16"
        >
          <SectionLabel>Featured Work</SectionLabel>
          <SectionHeading>
            Projects I'm
            <br />
            <GradientText gradient={theme.heroGradText}>Proud Of</GradientText>
          </SectionHeading>
          <motion.p variants={fadeUp} className="text-lg max-w-xl mx-auto" style={{ color: theme.textSub }}>
            From AI research prototypes to production-ready web platforms — each project
            represents a challenge solved with intention.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Satjot05"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: theme.textSub }}
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 group hover:opacity-80"
          >
            <Github size={16} />
            See all projects on GitHub
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────────────

function Contact() {
  const { theme } = useTheme();
  const [ref, isInView] = useScrollReveal();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1600));
    setStatus("sent");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com/Satjot05" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/satjot-singh-saini/" },
    { icon: Mail, label: "Email", href: "mailto:hello@example.com" },
  ];

  const inputStyle = {
    background: theme.inputBg,
    border: `1px solid ${theme.inputBorder}`,
    color: theme.text,
  };

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={stagger(0.12)}
          className="text-center mb-16"
        >
          <SectionLabel>Get In Touch</SectionLabel>
          <SectionHeading>
            Let's Build
            <br />
            <GradientText gradient={theme.accentGradText}>Something Great</GradientText>
          </SectionHeading>
          <motion.p variants={fadeUp} className="text-lg max-w-lg mx-auto" style={{ color: theme.textSub }}>
            Whether you have a project idea, an internship opportunity, or just want to talk
            tech — my inbox is always open.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {["name", "email"].map((field) => (
              <div key={field}>
                <label className="block text-xs font-mono uppercase tracking-widest mb-1.5" style={{ color: theme.textMuted }}>
                  {field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  required
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field === "name" ? "Your full name" : "your@email.com"}
                  style={inputStyle}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-200 placeholder-gray-600"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest mb-1.5" style={{ color: theme.textMuted }}>
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or idea..."
                style={inputStyle}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-200 resize-none placeholder-gray-600"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              style={
                status === "sent"
                  ? { background: theme.sentBg, border: `1px solid ${theme.sentBorder}`, color: theme.sentText }
                  : { background: theme.buttonPrimary, boxShadow: `0 6px 20px ${theme.buttonPrimaryShadow}` }
              }
              className="w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 text-white"
            >
              {status === "idle" && (<><Send size={15} /> Send Message</>)}
              {status === "sending" && (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Sending…
                </>
              )}
              {status === "sent" && (<><MailCheck size={15} /> Message Sent!</>)}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between gap-8"
          >
            <div
              className="p-6 rounded-2xl"
              style={{ background: theme.availableCard, border: `1px solid ${theme.availableCardBorder}` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: theme.availableDot }} />
                <span className="text-sm font-medium" style={{ color: theme.availableText }}>Currently Available</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: theme.text }}>
                Open to internships, part-time collaboration, freelance ML/web projects, and
                research opportunities. Let's build something impactful together.
              </p>
              <div className="mt-4 pt-4 text-xs font-mono" style={{ borderTop: `1px solid ${theme.border}`, color: theme.textMuted }}>
                📍 India · Remote friendly
              </div>
            </div>

            <div>
              <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: theme.textMuted }}>
                Find me online
              </p>
              <div className="flex flex-col gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    style={{ background: theme.surface, border: `1px solid ${theme.border}`, color: theme.textSub }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:opacity-80"
                  >
                    <Icon size={16} />
                    <span className="text-sm font-medium">{label}</span>
                    <ArrowRight size={13} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────

function Footer() {
  const { theme } = useTheme();
  return (
    <footer className="py-10 px-6" style={{ borderTop: `1px solid ${theme.footerBorder}` }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ color: theme.textMuted }}>
        <div className="flex items-center gap-2">
          <Terminal size={13} style={{ color: theme.accentText }} />
          <span>
            Designed & built by{" "}
            <span className="font-medium" style={{ color: theme.accentText }}>Satjot Singh Saini</span>
          </span>
        </div>
        <span>B.Tech CSE (AI & ML) · 2023–2027</span>
        <span>Built with React · Tailwind · Framer Motion</span>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SCROLL PROGRESS
// ─────────────────────────────────────────────────────────────────────

function ScrollProgress() {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{ scaleX, background: theme.progressBar }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [themeId, setThemeId] = useState("midnight");
  const theme = THEMES[themeId];

  return (
    <ThemeContext.Provider value={{ theme, setThemeId }}>
      <motion.div
        key={themeId}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          minHeight: "100vh",
          background: theme.bg,
          backgroundImage: theme.bgGradient,
          color: theme.text,
        }}
        className="antialiased"
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap');
          * { box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: ${theme.bg}; }
          ::-webkit-scrollbar-thumb { background: ${theme.scrollbar}; border-radius: 4px; }
          body { font-family: 'DM Sans', sans-serif; }
          input::placeholder, textarea::placeholder { color: ${theme.textMuted}; }
        `}</style>

        <ScrollProgress />
        <Navbar />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </motion.div>
    </ThemeContext.Provider>
  );
}