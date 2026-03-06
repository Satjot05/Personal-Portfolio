/**
 * ============================================================
 *  AI/ML Full-Stack Developer Portfolio
 *  B.Tech CSE — 3rd Year
 * ============================================================
 *
 *  FOLDER STRUCTURE (for a real React + Tailwind + Framer Motion project):
 *
 *  my-portfolio/
 *  ├── public/
 *  │   ├── resume.pdf
 *  │   └── favicon.ico
 *  ├── src/
 *  │   ├── components/
 *  │   │   ├── Navbar.jsx
 *  │   │   ├── Hero.jsx
 *  │   │   ├── About.jsx
 *  │   │   ├── Skills.jsx
 *  │   │   ├── Projects.jsx
 *  │   │   ├── Contact.jsx
 *  │   │   └── Footer.jsx
 *  │   ├── hooks/
 *  │   │   └── useTypingEffect.js
 *  │   ├── data/
 *  │   │   ├── skills.js
 *  │   │   └── projects.js
 *  │   ├── App.jsx
 *  │   ├── main.jsx
 *  │   └── index.css
 *  ├── tailwind.config.js
 *  ├── vite.config.js
 *  └── package.json
 *
 *  DEPENDENCIES:
 *    npm install framer-motion lucide-react
 *    npm install -D tailwindcss postcss autoprefixer
 *
 *  All components are combined below for this single-file delivery.
 *  In a real project, split each section into its own file as shown above.
 * ============================================================
 */

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Brain, Code2, Database, Globe, Github, Linkedin,
  Mail, User, Send, ExternalLink, Menu, X,
  ChevronDown, Cpu, Layers, Network, ArrowRight,
  Sparkles, Terminal, Zap, Award, BookOpen, Coffee,
  MailCheck
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────
// DATA LAYER  (in real project: src/data/skills.js & src/data/projects.js)
// ─────────────────────────────────────────────────────────────────────

const SKILLS_DATA = [
  {
    category: "AI & Machine Learning",
    icon: Brain,
    color: "from-violet-500 to-purple-600",
    glow: "group-hover:shadow-violet-500/20",
    items: [
      { name: "Natural Language Processing", level: 85 },
      { name: "Deep Learning", level: 88 },
      { name: "Convolutional Neural Networks", level: 82 },
      { name: "K-Nearest Neighbours", level: 90 },
      { name: "Artificial Neural Networks", level: 86 },
    ],
  },
  {
    category: "Full Stack Development",
    icon: Globe,
    color: "from-cyan-500 to-blue-600",
    glow: "group-hover:shadow-cyan-500/20",
    items: [
      { name: "React.js", level: 92 },
      { name: "Node.js & Express", level: 88 },
      { name: "MongoDB", level: 85 },
      { name: "PHP", level: 78 },
      { name: "JavaScript (ES6+)", level: 93 },
    ],
  },
  {
    category: "Core Computer Science",
    icon: Cpu,
    color: "from-emerald-500 to-teal-600",
    glow: "group-hover:shadow-emerald-500/20",
    items: [
      { name: "Data Structures", level: 91 },
      { name: "Algorithms", level: 88 },
      { name: "System Design", level: 76 },
      { name: "Object-Oriented Programming", level: 90 },
      { name: "Database Management", level: 84 },
    ],
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
    accent: "violet",
    gradient: "from-violet-600/20 via-purple-600/10 to-transparent",
    border: "border-violet-500/30 hover:border-violet-400/60",
    glow: "hover:shadow-violet-500/10",
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
    accent: "cyan",
    gradient: "from-cyan-600/20 via-blue-600/10 to-transparent",
    border: "border-cyan-500/30 hover:border-cyan-400/60",
    glow: "hover:shadow-cyan-500/10",
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
    accent: "emerald",
    gradient: "from-emerald-600/20 via-teal-600/10 to-transparent",
    border: "border-emerald-500/30 hover:border-emerald-400/60",
    glow: "hover:shadow-emerald-500/10",
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
// HOOKS  (in real project: src/hooks/useTypingEffect.js)
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
  return (
    <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
      <span className="h-px w-8 bg-gradient-to-r from-violet-500 to-transparent" />
      <span className="text-xs font-mono tracking-[0.2em] text-violet-400 uppercase">
        {children}
      </span>
    </motion.div>
  );
}

function SectionHeading({ children }) {
  return (
    <motion.h2
      variants={fadeUp}
      className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      {children}
    </motion.h2>
  );
}

function useScrollReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return [ref, isInView];
}

// ─────────────────────────────────────────────────────────────────────
// NAVBAR  (src/components/Navbar.jsx)
// ─────────────────────────────────────────────────────────────────────

function Navbar() {
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
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#030712]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
              <Terminal size={14} className="text-white" />
            </div>
            <span
              className="text-white font-bold text-lg tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              dev<span className="text-violet-400">.</span>portfolio
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  active === link
                    ? "text-violet-300"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {active === link && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/5 rounded-lg"
                  />
                )}
                {link}
              </button>
            ))}
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="ml-4 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg hover:from-violet-500 hover:to-purple-500 transition-all duration-200 shadow-lg shadow-violet-500/20"
            >
              Resume ↓
            </motion.a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-400 hover:text-white transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 inset-x-0 z-40 bg-[#030712]/95 backdrop-blur-xl border-b border-white/5 md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition text-sm font-medium"
                >
                  {link}
                </button>
              ))}
              <a
                href="/resume.pdf"
                download
                className="mt-2 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg text-center"
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
// HERO  (src/components/Hero.jsx)
// ─────────────────────────────────────────────────────────────────────

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-600/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-600/8 rounded-full blur-3xl" />

      {/* Floating particles */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-violet-400/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const typedText = useTypingEffect(TYPING_TEXTS);

  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      <GridBackground />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono tracking-widest mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AVAILABLE FOR INTERNSHIPS & PROJECTS
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.02] tracking-tighter text-white mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Building the Future
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            with AI & Code
          </span>
        </motion.h1>

        {/* Typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="h-10 flex items-center justify-center mb-6"
        >
          <span className="text-xl md:text-2xl text-slate-400 font-light">
            I'm a{" "}
            <span className="text-violet-300 font-semibold font-mono">
              {typedText}
              <span className="animate-pulse text-violet-400">|</span>
            </span>
          </span>
        </motion.div>

        {/* Sub-description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed mb-10"
        >
          3rd-year B.Tech CSE student passionate about crafting intelligent systems
          — from neural networks to production-grade web applications.
        </motion.p>

        {/* CTA Buttons */}
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
            className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300"
          >
            View Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-7 py-3.5 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300"
          >
            Download Resume
            <span className="text-violet-400">↓</span>
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mt-16 pt-10 border-t border-white/5"
        >
          {[
            { label: "Projects Built", value: "10+" },
            { label: "Hackathons", value: "3" },
            { label: "Technologies", value: "15+" },
            { label: "CGPA", value: "8.7" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div
                className="text-3xl font-black text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {value}
              </div>
              <div className="text-slate-500 text-xs mt-1 tracking-widest uppercase">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 cursor-pointer"
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ABOUT  (src/components/About.jsx)
// ─────────────────────────────────────────────────────────────────────

function About() {
  const [ref, isInView] = useScrollReveal();

  const highlights = [
    { icon: Brain, text: "Applied AI Research", color: "text-violet-400" },
    { icon: Code2, text: "Full Stack MERN", color: "text-cyan-400" },
    { icon: Layers, text: "DSA & Problem Solving", color: "text-emerald-400" },
    { icon: Award, text: "Hackathon Winner", color: "text-amber-400" },
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
            {/* Left: Text */}
            <div>
              <SectionHeading>
                Code. Learn.
                <br />
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Innovate.
                </span>
              </SectionHeading>

              <motion.p variants={fadeUp} className="text-slate-400 text-lg leading-relaxed mb-5">
                I'm a 3rd-year B.Tech Computer Science student specializing in{" "}
                <span className="text-violet-300 font-medium">AI & Machine Learning</span>,
                with a strong command of full-stack web development.
              </motion.p>
              <motion.p variants={fadeUp} className="text-slate-400 text-lg leading-relaxed mb-8">
                I thrive at the intersection of{" "}
                <span className="text-cyan-300 font-medium">data structures, algorithms</span>, and{" "}
                <span className="text-emerald-300 font-medium">applied intelligence</span> — building
                systems that are not only functional, but meaningfully smart. Whether it's a neural
                network classifying complex patterns or a real-time web app serving thousands of
                users, I care deeply about both correctness and craft.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                {[
                  { icon: Coffee, text: "Open to Collaborate" },
                  { icon: BookOpen, text: "Always Learning" },
                  { icon: Zap, text: "Fast Executor" },
                ].map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/8 rounded-full text-sm text-slate-400"
                  >
                    <Icon size={13} className="text-violet-400" />
                    {text}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right: Highlight cards */}
            <motion.div variants={stagger(0.1)} className="grid grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, text, color }) => (
                <motion.div
                  key={text}
                  variants={scaleIn}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 hover:bg-white/[0.06] transition-all duration-300 cursor-default"
                >
                  <Icon size={26} className={`${color} mb-3`} />
                  <span className="text-slate-300 text-sm font-medium leading-snug">{text}</span>
                </motion.div>
              ))}

              {/* Code snippet card */}
              <motion.div
                variants={scaleIn}
                className="col-span-2 p-4 rounded-2xl bg-[#0d1117] border border-white/8 font-mono text-xs overflow-hidden"
              >
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <span className="ml-2 text-slate-600 text-[10px]">about.py</span>
                </div>
                <pre className="text-slate-400 leading-relaxed text-[11px]">
                  <span className="text-violet-400">class</span>{" "}
                  <span className="text-cyan-300">Developer</span>
                  {`:\n`}
                  {"  "}
                  <span className="text-slate-500">name</span> ={" "}
                  <span className="text-emerald-300">"Satjot Singh Saini"</span>
                  {`\n`}
                  {"  "}
                  <span className="text-slate-500">year</span> ={" "}
                  <span className="text-orange-300">3</span>
                  {`\n`}
                  {"  "}
                  <span className="text-slate-500">focus</span> ={" "}
                  <span className="text-emerald-300">["AI", "ML", "MERN"]</span>
                  {`\n`}
                  {"  "}
                  <span className="text-slate-500">goal</span> ={" "}
                  <span className="text-emerald-300">"Build things that matter"</span>
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
// SKILLS  (src/components/Skills.jsx)
// ─────────────────────────────────────────────────────────────────────

function SkillBar({ name, level, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-slate-300 text-sm">{name}</span>
        <span className="text-xs text-slate-500 font-mono">{level}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function Skills() {
  const [ref, isInView] = useScrollReveal();

  return (
    <section id="skills" className="py-28 px-6 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent">
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
          <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-xl mx-auto">
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
          {SKILLS_DATA.map(({ category, icon: Icon, color, glow, items }) => (
            <motion.div
              key={category}
              variants={scaleIn}
              whileHover={{ y: -6 }}
              className={`group relative p-6 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 transition-all duration-400 shadow-xl ${glow} hover:shadow-2xl`}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
                >
                  <Icon size={18} className="text-white" />
                </div>
                <h3
                  className="text-white font-bold text-base leading-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {category}
                </h3>
              </div>

              {/* Skill bars */}
              {items.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} delay={i} />
              ))}

              {/* Subtle gradient accent */}
              <div
                className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r ${color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Tech pill cloud */}
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
              className="px-3 py-1.5 bg-white/4 border border-white/8 hover:border-violet-500/30 hover:bg-violet-500/5 rounded-full text-slate-400 hover:text-violet-300 text-xs font-mono transition-all duration-200 cursor-default"
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
// PROJECTS  (src/components/Projects.jsx)
// ─────────────────────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className={`group relative rounded-2xl border ${project.border} bg-gradient-to-br ${project.gradient} p-0.5 transition-all duration-400 shadow-xl ${project.glow} hover:shadow-2xl cursor-default`}
    >
      <div className="rounded-[15px] bg-[#0a0a14] p-7 h-full flex flex-col">
        {/* Icon + links */}
        <div className="flex items-start justify-between mb-5">
          <div className="text-4xl leading-none">{project.icon}</div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <motion.a
              href={project.github}
              whileHover={{ scale: 1.15 }}
              className="w-8 h-8 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center text-slate-400 hover:text-white transition"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={14} />
            </motion.a>
            <motion.a
              href={project.link}
              whileHover={{ scale: 1.15 }}
              className="w-8 h-8 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center text-slate-400 hover:text-white transition"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} />
            </motion.a>
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-white text-xl font-bold mb-1 leading-snug"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {project.title}
        </h3>
        <p className="text-xs font-mono text-slate-500 mb-4">{project.tagline}</p>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md bg-white/5 border border-white/8 text-slate-400 text-[11px] font-mono"
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
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Proud Of
            </span>
          </SectionHeading>
          <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-xl mx-auto">
            From AI research prototypes to production-ready web platforms — each project
            represents a challenge solved with intention.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* View more CTA */}
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
            className="inline-flex items-center gap-2 text-slate-400 hover:text-violet-300 text-sm font-medium transition-colors duration-200 group"
          >
            <Github size={16} />
            See all projects on GitHub
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// CONTACT  (src/components/Contact.jsx)
// ─────────────────────────────────────────────────────────────────────

function Contact() {
  const [ref, isInView] = useScrollReveal();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate async send (hook up to EmailJS / Formspree in production)
    await new Promise((r) => setTimeout(r, 1600));
    setStatus("sent");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const socials = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Satjot05",
      color: "hover:border-slate-400/40 hover:text-slate-300",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "www.linkedin.com/in/satjot-singh-saini",
      color: "hover:border-blue-400/40 hover:text-blue-400",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:hello@example.com",
      color: "hover:border-violet-400/40 hover:text-violet-400",
    },
  ];

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
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Something Great
            </span>
          </SectionHeading>
          <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-lg mx-auto">
            Whether you have a project idea, an internship opportunity, or just want to talk
            tech — my inbox is always open.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {["name", "email"].map((field) => (
              <div key={field}>
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                  {field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  required
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field === "name" ? "Your full name" : "your@email.com"}
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/8 rounded-xl text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-violet-500/3 transition-all duration-200"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or idea..."
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/8 rounded-xl text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-violet-500/3 transition-all duration-200 resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                status === "sent"
                  ? "bg-emerald-600/20 border border-emerald-500/30 text-emerald-400"
                  : "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
              }`}
            >
              {status === "idle" && (
                <>
                  <Send size={15} /> Send Message
                </>
              )}
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
              {status === "sent" && (
                <>
                  <MailCheck size={15} /> Message Sent!
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Info + socials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between gap-8"
          >
            {/* Availability card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-600/10 to-purple-600/5 border border-violet-500/20">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Currently Available</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Open to internships, part-time collaboration, freelance ML/web projects, and
                research opportunities. Let's build something impactful together.
              </p>
              <div className="mt-4 pt-4 border-t border-white/6 text-xs font-mono text-slate-500">
                📍 India · Remote friendly
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
                Find me online
              </p>
              <div className="flex flex-col gap-3">
                {socials.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/8 ${color} text-slate-500 transition-all duration-200 group`}
                  >
                    <Icon size={16} />
                    <span className="text-sm font-medium">{label}</span>
                    <ArrowRight
                      size={13}
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    />
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
// FOOTER  (src/components/Footer.jsx)
// ─────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-slate-600 text-sm">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-violet-500" />
          <span>
            Designed & built by{" "}
            <span className="text-violet-400 font-medium">Satjot Singh Saini</span>
          </span>
        </div>
        <span>B.Tech CSE (AI & ML) · 2023–2027</span>
        <span>
          Built with React · Tailwind · Framer Motion
        </span>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SCROLL PROGRESS BAR
// ─────────────────────────────────────────────────────────────────────

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────
// APP ROOT  (src/App.jsx)
// ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div
      className="min-h-screen bg-[#030712] text-white antialiased"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 60% at 50% -10%, rgba(109,40,217,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 80%, rgba(6,182,212,0.05) 0%, transparent 55%)
        `,
      }}
    >
      {/* Fonts loaded via Google Fonts — add to index.html: */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" /> */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #030712; }
        ::-webkit-scrollbar-thumb { background: #3b0764; border-radius: 4px; }
        body { font-family: 'DM Sans', sans-serif; }
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
    </div>
  );
}
