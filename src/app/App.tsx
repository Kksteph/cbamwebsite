import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight, ArrowUpRight, Check, Plus, Minus } from "lucide-react";
import laptopImg from "../assets/laptop.png";
import dash1 from "../assets/Customer Web App/Dashboard.png";
import dash2 from "../assets/Customer Web App/Dashboard-1.png";
import dash3 from "../assets/Customer Web App/Dashboard-2.png";
import cbamLogo from "../assets/cbamlogo.png";

// ── Logo marquee ───────────────────────────────────────────────────────────────

const logoModules = import.meta.glob('../assets/2x/*.png', { eager: true });
const logos = Object.values(logoModules).map((m: any) => m.default) as string[];

function LogoMarquee() {
  const track = [...logos, ...logos];
  return (
    <div className="relative w-full overflow-hidden py-2">
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #fff 40%, transparent 100%)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #fff 40%, transparent 100%)" }} />
      <div className="flex items-center"
        style={{ width: "max-content", animation: "marquee 35s linear infinite", willChange: "transform" }}>
        {track.map((src, i) => (
          <img key={i} src={src} alt="" draggable={false}
            className="h-10 w-auto mx-8 object-contain select-none"
            style={{ opacity: 0.5, filter: "grayscale(100%)" }} />
        ))}
      </div>
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const loginRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function outside(e: MouseEvent) {
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) setLoginOpen(false);
    }
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  const navLinks = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
      style={{ background: scrolled ? "rgba(13,27,46,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">

        {/* Logo */}
        <a href="#">
          <img src={cbamLogo} alt="CBAM Logo" className="h-6 w-auto" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-white/70 text-sm">
          {navLinks.map(l => (
            <a key={l.href} href={l.href}
              className="hover:text-white transition-colors duration-200"
              onClick={e => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" }); }}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative" ref={loginRef}>
            <button onClick={() => setLoginOpen(o => !o)}
              className="text-white/80 text-sm px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer">
              Login <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${loginOpen ? "rotate-180" : ""}`} />
            </button>
            {loginOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-50 min-w-[170px]">
                <a href="#" onClick={() => setLoginOpen(false)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">Importer Login</a>
                <a href="#" onClick={() => setLoginOpen(false)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100">Supplier Login</a>
              </div>
            )}
          </div>
          <button
            onClick={() => document.querySelector("#final-cta")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-white text-[#0d1b2e] text-sm px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 active:scale-95 transition-all cursor-pointer">
            Book Demo
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(o => !o)}>
          <div className={`w-5 h-0.5 bg-white transition-all mb-1 ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <div className={`w-5 h-0.5 bg-white transition-all mb-1 ${mobileOpen ? "opacity-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-white transition-all ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4" style={{ background: "rgba(13,27,46,0.97)" }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="text-white/80 text-sm py-1"
              onClick={e => { e.preventDefault(); setMobileOpen(false); document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" }); }}>
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2 border-t border-white/10">
            <a href="#" className="text-white/70 text-sm px-4 py-2 border border-white/20 rounded-lg">Login</a>
            <button className="bg-white text-[#0d1b2e] text-sm px-4 py-2 rounded-lg font-semibold">Book Demo</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── Feature card (alternating, contained image) ───────────────────────────────

const features = [
  {
    title: "Import processing",
    description: "Streamline your data import pipeline with automated validation and error handling. Process thousands of records with confidence and maintain data integrity across your entire workflow.",
    tags: ["Automated Validation", "Error Handling", "Bulk Processing", "Audit Trail"],
    image: dash1,
  },
  {
    title: "Built-in data",
    description: "Access pre-configured datasets and industry-standard references. Eliminate manual data entry and reduce errors with our comprehensive built-in database of validated information.",
    tags: ["EU Default Values", "CN Code Library", "Material Data", "Methodology Refs"],
    image: dash2,
  },
  {
    title: "Proforma calculator",
    description: "Calculate complex financial models with precision. Our advanced calculator handles multiple scenarios, forecasting models, and sensitivity analysis with real-time updates.",
    tags: ["Multi-scenario", "Liability Forecast", "Sensitivity Analysis", "Real-time"],
    image: dash3,
  },
  {
    title: "Dashboard & forecasting",
    description: "Visualise your data with interactive charts and predictive analytics. Make informed decisions with powerful forecasting tools that adapt to your business patterns.",
    tags: ["Interactive Charts", "Predictive Analytics", "Custom Reports", "Data Export"],
    image: dash1,
  },
  {
    title: "Supplier & plant management",
    description: "Manage your entire supply chain from a single interface. Track suppliers, monitor plant operations, and optimise resource allocation with intelligent automation.",
    tags: ["Supplier Outreach", "Plant Tracking", "Data Collection", "Automation"],
    image: dash2,
  },
];

function FeatureCard({ title, description, tags, image, index, reversed }: {
  title: string; description: string; tags: string[]; image: string; index: number; reversed: boolean;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const textPane = (
    <div className="flex flex-col justify-center" style={{ maxWidth: 560 }}>
      <h3 className="font-medium text-[#0d1b2e] leading-tight mb-5" style={{ fontSize: "clamp(1.7rem, 2.6vw, 2.4rem)" }}>
        {title}
      </h3>
      <p className="text-gray-500 leading-relaxed mb-8" style={{ fontSize: "clamp(1rem, 1.15vw, 1.15rem)" }}>
        {description}
      </p>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, i) => (
          <div key={i} className="flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#0d1b2e" }}>
              <Check className="w-3.5 h-3.5 text-white" />
            </div>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );

  const imagePane = (
    <div className="flex justify-center">
      <div className="rounded-3xl p-5 md:p-6 w-full" style={{ background: "rgba(13,27,46,0.07)" }}>
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img src={image} alt={title} className="w-full h-auto block" />
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className={`flex flex-col items-center gap-14 md:gap-16 ${reversed ? "md:flex-row-reverse" : "md:flex-row"}`}
      >
        <div className="flex-1">{textPane}</div>
        <div className="flex-1">{imagePane}</div>
      </div>
    </div>
  );
}

// ── Stat card ──────────────────────────────────────────────────────────────────

function StatCard({ number, label, suffix = "", delay }: { number: string; label: string; suffix?: string; delay: number }) {
  const [inView, setInView] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !number.match(/^\d+$/)) return;
    const target = parseInt(number);
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [inView, number]);

  return (
    <div ref={ref}
      className={`text-center py-8 border-r border-white/10 last:border-r-0 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="text-white mb-2 font-light" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
        {number.match(/^\d+$/) ? `${count}${suffix}` : number}
      </div>
      <div className="text-white/40 text-xs uppercase tracking-widest">{label}</div>
    </div>
  );
}

// ── Mini chart SVGs ────────────────────────────────────────────────────────────

function BarChartMini({ inverted = false }: { inverted?: boolean }) {
  const bars = [40, 65, 45, 80, 55, 90, 60];
  const text = inverted ? "rgba(255,255,255,0.5)" : "#94a3b8";
  const active = inverted ? "rgba(255,255,255,0.9)" : "#2d4a6d";
  const inactive = inverted ? "rgba(255,255,255,0.2)" : "#e2e8f0";
  return (
    <svg viewBox="0 0 160 80" className="w-full h-auto">
      {bars.map((h, i) => (
        <rect key={i} x={i * 22 + 4} y={80 - h * 0.7} width={14} height={h * 0.7} rx={3}
          fill={i === 5 ? active : inactive} />
      ))}
      <text x="0" y="78" fontSize="8" fill={text}>Q1</text>
      <text x="88" y="78" fontSize="8" fill={text}>Q3</text>
      <text x="130" y="78" fontSize="8" fill={text}>Q4</text>
    </svg>
  );
}

function AnalyticsMini({ inverted = false }: { inverted?: boolean }) {
  const line = inverted ? "rgba(255,255,255,0.7)" : "#2d4a6d";
  const bg = inverted ? "rgba(255,255,255,0.08)" : "#f1f5f9";
  const text = inverted ? "rgba(255,255,255,0.5)" : "#94a3b8";
  return (
    <svg viewBox="0 0 160 80" className="w-full h-auto">
      <rect x="0" y="0" width="160" height="80" rx="6" fill={bg} />
      <text x="8" y="14" fontSize="7" fill={text}>Data · Analysis</text>
      <text x="8" y="60" fontSize="18" fontWeight="bold" fill={line}>452</text>
      <polyline points="10,70 40,55 70,62 100,40 130,48 155,30" fill="none" stroke={line} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ── Challenge card ─────────────────────────────────────────────────────────────

function ChallengeCard({ title, description, featured, chart }: {
  title: string; description: string; featured: boolean; chart: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 ${
      featured ? "text-white shadow-xl" : "bg-white border border-gray-100 shadow-sm text-[#0d1b2e]"
    }`}
      style={featured ? { background: "linear-gradient(145deg, #0d1b2e 0%, #1a3050 60%, #2d4a6d 100%)" } : {}}>
      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${featured ? "bg-white/20" : "bg-[#0d1b2e]"}`}>
        <ArrowUpRight className="w-4 h-4 text-white" />
      </div>
      <div>
        <h3 className={`font-semibold text-base mb-2 ${featured ? "text-white" : "text-[#0d1b2e]"}`}>{title}</h3>
        <p className={`text-sm leading-relaxed ${featured ? "text-white/60" : "text-gray-500"}`}>{description}</p>
      </div>
      <div className="mt-auto pt-4 border-t border-white/10">{chart}</div>
    </div>
  );
}

// ── How it works ───────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    title: "Connect",
    description: "Upload your import list or sync directly from your ERP. We support CSV, Excel, and API integrations with all major ERP systems.",
  },
  {
    number: "02",
    title: "Collect",
    description: "We automatically contact your suppliers, chase responses, and structure the emissions data — so your team doesn't have to.",
  },
  {
    number: "03",
    title: "Calculate",
    description: "Embedded EU methodology calculates embedded emissions, financial liability, and CBAM certificate forecasts automatically.",
  },
  {
    number: "04",
    title: "File",
    description: "Export an audit-ready quarterly report in the exact format the CBAM registry accepts — one click, zero stress.",
  },
];

function HowItWorks() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-24 px-6 md:px-12 bg-[#f8f9fb]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">The Process</p>
          <h2 className="font-bold text-[#0d1b2e] leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Four steps to full CBAM compliance
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            From raw import data to a filed quarterly report — all in one platform, without the spreadsheet chaos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
          {/* connector line */}
          <div className="hidden md:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gray-200 z-0" />

          {steps.map((step, i) => (
            <div key={i}
              className={`relative z-10 flex flex-col items-center text-center px-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 font-bold text-white text-sm shadow-lg"
                style={{ background: "#0d1b2e" }}>
                {step.number}
              </div>
              <h3 className="font-bold text-[#0d1b2e] text-lg mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Built for your industry ────────────────────────────────────────────────────

const industries = [
  { icon: "🏗️", name: "Steel", detail: "HRC, rebar, wire rod, sections" },
  { icon: "🏭", name: "Cement", detail: "Clinker, white cement, ready-mix" },
  { icon: "⚙️", name: "Aluminium", detail: "Unwrought, sheets, foil, profiles" },
  { icon: "🌿", name: "Fertilisers", detail: "Urea, ammonia, mixed NPK" },
  { icon: "⚡", name: "Hydrogen", detail: "Grey, blue, and green pathways" },
  { icon: "🔌", name: "Electricity", detail: "Grid imports across borders" },
];

function IndustriesSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">Built for your industry</p>
          <h2 className="font-bold text-[#0d1b2e] leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Built for the goods CBAM actually covers
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Purpose-built workflows for each regulated product category — not a generic compliance tool adapted to fit.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {industries.map((ind, i) => (
            <div key={i}
              className={`group rounded-2xl border border-gray-100 p-7 hover:border-[#0d1b2e]/20 hover:shadow-md transition-all duration-500 cursor-default ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="text-3xl mb-4">{ind.icon}</div>
              <h3 className="font-bold text-[#0d1b2e] text-lg mb-1">{ind.name}</h3>
              <p className="text-gray-400 text-sm">{ind.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Audit & Trust ──────────────────────────────────────────────────────────────

function AuditSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const badges = [
    { label: "EU CBAM Methodology", sub: "Aligned with EC implementing regulation" },
    { label: "Audit-ready Exports", sub: "Registry-accepted PDF & XML formats" },
    { label: "SOC 2 Type II", sub: "Third-party verified security controls" },
    { label: "GDPR Compliant", sub: "EU data residency, DPA available" },
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#f8f9fb]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">Audit & Trust</p>
            <h2 className="font-bold text-[#0d1b2e] leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Audit-ready by default.
            </h2>
            <p className="text-gray-500 text-base mt-4 max-w-lg">
              Every calculation is traceable, every export is signed, and every methodology is documented — so you're always ready for scrutiny.
            </p>
          </div>
          <a href="#" className="text-sm text-[#0d1b2e] font-medium underline underline-offset-4 whitespace-nowrap self-start md:self-end">
            How we calculate →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {badges.map((b, i) => (
            <div key={i}
              className={`bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-3 hover:shadow-md transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #0d1b2e, #2d4a6d)" }}>
                <Check className="w-4 h-4 text-white" />
              </div>
              <p className="font-semibold text-[#0d1b2e] text-sm">{b.label}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{b.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ────────────────────────────────────────────────────────────────────

const plans = [
  {
    name: "Starter",
    price: "€199",
    period: "/month",
    description: "Perfect for small importers managing a handful of suppliers.",
    features: [
      "Up to 10 suppliers",
      "3 CBAM product categories",
      "Quarterly report exports",
      "EU methodology calculations",
      "Email support",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "€599",
    period: "/month",
    description: "For scaling businesses with growing supplier networks.",
    features: [
      "Up to 100 suppliers",
      "All 6 CBAM categories",
      "Automated supplier outreach",
      "Real-time dashboard & forecasting",
      "Proforma calculator",
      "Priority support",
    ],
    cta: "Get started",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large importers with complex supply chains and bespoke needs.",
    features: [
      "Unlimited suppliers",
      "ERP / API integration",
      "White-label exports",
      "Dedicated account manager",
      "Custom SLA & DPA",
      "SSO & advanced permissions",
    ],
    cta: "Book to discuss",
    highlight: false,
  },
];

function PricingSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" className="py-24 px-6 md:px-12 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">Pricing</p>
          <h2 className="font-bold text-[#0d1b2e] leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Simple, transparent pricing
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            No hidden fees. No per-report charges. Scale up as your supplier network grows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div key={i}
              className={`rounded-2xl p-8 flex flex-col gap-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${plan.highlight ? "text-white shadow-2xl scale-105" : "border border-gray-100 bg-white"}`}
              style={{
                transitionDelay: `${i * 100}ms`,
                ...(plan.highlight ? { background: "linear-gradient(145deg, #0d1b2e 0%, #1a3050 60%, #2d4a6d 100%)" } : {}),
              }}>
              {plan.highlight && (
                <div className="inline-block self-start px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white">
                  Most popular
                </div>
              )}
              <div>
                <p className={`text-sm font-medium mb-2 ${plan.highlight ? "text-white/60" : "text-gray-500"}`}>{plan.name}</p>
                <div className="flex items-end gap-1">
                  <span className={`font-bold ${plan.highlight ? "text-white" : "text-[#0d1b2e]"}`} style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
                    {plan.price}
                  </span>
                  {plan.period && <span className={`text-sm mb-2 ${plan.highlight ? "text-white/60" : "text-gray-400"}`}>{plan.period}</span>}
                </div>
                <p className={`text-sm mt-2 leading-relaxed ${plan.highlight ? "text-white/60" : "text-gray-500"}`}>{plan.description}</p>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-white/70" : "text-[#0d1b2e]"}`} />
                    <span className={`text-sm ${plan.highlight ? "text-white/80" : "text-gray-600"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 cursor-pointer ${plan.highlight ? "bg-white text-[#0d1b2e] hover:bg-gray-100" : "bg-[#0d1b2e] text-white hover:bg-[#1a3050]"}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ────────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "What is CBAM and who does it apply to?",
    a: "The Carbon Border Adjustment Mechanism (CBAM) is an EU regulation that puts a carbon price on imports of certain goods — steel, cement, aluminium, fertilisers, hydrogen, and electricity. It applies to any company importing these goods into the EU, regardless of where the company is based.",
  },
  {
    q: "When do I need to start reporting?",
    a: "The transitional phase began in October 2023, with quarterly reports required. The definitive phase starts in 2026, when importers must purchase and surrender CBAM certificates. Our platform supports both phases.",
  },
  {
    q: "What if my suppliers don't share emissions data?",
    a: "No problem. If a supplier doesn't respond or provide data, we fall back to EU default values — the official emission factors published by the European Commission. Your report remains compliant, and we flag which suppliers need follow-up.",
  },
  {
    q: "How does this integrate with my ERP?",
    a: "We offer native integrations with SAP, Oracle NetSuite, and Microsoft Dynamics, as well as a REST API for custom setups. You can also upload a CSV or Excel file if you prefer a manual approach.",
  },
  {
    q: "Do you handle the CBAM declarant authorisation process?",
    a: "We guide you through the authorised declarant application and provide all the documentation you need. Our team has helped dozens of importers obtain their declarant status ahead of the 2026 deadline.",
  },
  {
    q: "What does it cost?",
    a: "Plans start at €199/month for smaller importers and scale up to €599/month for the Growth tier. Enterprise pricing is custom — book a call and we'll scope it together.",
  },
  {
    q: "How long does onboarding take?",
    a: "Most customers are fully onboarded within 20 minutes. We provide guided setup, a sample data import, and a live walkthrough with your account manager if you need it.",
  },
  {
    q: "Is my supplier data secure?",
    a: "Yes. We are SOC 2 Type II certified and GDPR compliant. All data is stored in EU data centres, encrypted at rest and in transit. We never share your supplier data with third parties.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group">
        <span className="font-medium text-[#0d1b2e] text-base group-hover:text-[#1a3050] transition-colors pr-4">{q}</span>
        {open
          ? <Minus className="w-5 h-5 text-gray-400 flex-shrink-0" />
          : <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />}
      </button>
      {open && <p className="pb-5 text-gray-500 text-base leading-relaxed">{a}</p>}
    </div>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="py-24 px-6 md:px-12 bg-[#f8f9fb]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">FAQ</p>
          <h2 className="font-bold text-[#0d1b2e] leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Questions we get asked a lot
          </h2>
        </div>
        <div>
          {faqs.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ──────────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section id="final-cta" className="py-32 px-6 md:px-12 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0d1b2e 0%, #1a3050 50%, #2d4a6d 100%)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <p className="text-white/50 text-sm uppercase tracking-widest mb-6">Get started today</p>
        <h2 className="font-bold text-white leading-tight mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
          Get CBAM off your<br />team's plate.
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          20-minute demo. No prep needed. See your first report ready before the call ends.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="px-12 py-4 bg-white text-[#0d1b2e] font-bold rounded-xl text-base hover:bg-gray-100 active:scale-95 transition-all shadow-xl cursor-pointer">
          Book a Demo
        </button>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/40 text-sm">
          {["SOC 2 Type II", "99.9% Uptime", "Setup in 20 min", "GDPR Compliant"].map(pill => (
            <div key={pill} className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              {pill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────

function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="bg-[#080f1a] text-white/50 text-sm">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <img src={cbamLogo} alt="CBAM Logo" className="h-8 object-contain object-left" style={{ maxWidth: 180, width: "100%" }} />
          <p className="text-white/40 text-sm leading-relaxed">
            The all-in-one CBAM compliance platform for EU importers.
          </p>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-3">
          <p className="text-white/70 font-medium text-sm mb-1">Company</p>
          {["About", "Customers", "Contact", "Careers"].map(l => (
            <a key={l} href="#" className="hover:text-white/80 transition-colors">{l}</a>
          ))}
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3">
          <p className="text-white/70 font-medium text-sm mb-1">Legal</p>
          {["Privacy Policy", "Terms of Service", "Security", "DPA"].map(l => (
            <a key={l} href="#" className="hover:text-white/80 transition-colors">{l}</a>
          ))}
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <p className="text-white/70 font-medium text-sm mb-1">Monthly CBAM updates</p>
          <p className="text-white/40 text-xs leading-relaxed">Regulation changes, deadline reminders, and product news.</p>
          {submitted ? (
            <p className="text-green-400 text-sm">You're on the list ✓</p>
          ) : (
            <form onSubmit={e => { e.preventDefault(); if (email) setSubmitted(true); }} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                required
              />
              <button type="submit"
                className="bg-white text-[#0d1b2e] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all cursor-pointer">
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-white/5 px-6 md:px-12 py-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/25">
        <p>© {new Date().getFullYear()} CBAM Desk. All rights reserved.</p>
        <p>Built for EU importers navigating CBAM compliance.</p>
      </div>
    </footer>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="w-full overflow-x-hidden">

      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0d1b2e 0%, #1a3050 40%, #2d4a6d 70%, #3a587a 100%)",
        }}>
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

        {/* Max-width container keeps layout from breaking on wide screens */}
        <div className="relative z-10 w-full px-6 md:px-12 pt-40 pb-36">
          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-10 lg:gap-16">

            {/* Text — fixed width so it doesn't shrink on wide screens */}
            <div className="w-full md:w-[420px] lg:w-[480px] flex-shrink-0 flex flex-col items-start text-left">
              <p className="text-white/60 text-sm tracking-wide mb-5">The CBAM Estimator Web App</p>
              <h1 className="font-bold text-white leading-[1.1] mb-6" style={{ fontSize: "clamp(2.6rem, 3.8vw, 4.2rem)" }}>
                Your all-in-one<br />CBAM platform
              </h1>
              <p className="text-white/70 text-base max-w-sm mb-10 leading-relaxed">
                Understand CBAM, plan costs, manage manufacturers and obtain real-world data – all in one platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => document.querySelector("#final-cta")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-white text-gray-900 px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer">
                  Book a demo <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-white px-7 py-3.5 rounded-lg font-semibold text-sm border border-white/25 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  style={{ background: "rgba(30, 55, 90, 0.8)" }}>
                  See the product
                </button>
              </div>
            </div>

            {/* Laptop — takes remaining space but capped so it never overwhelms */}
            <div className="flex-1 min-w-0 flex justify-center">
              <img
                src={laptopImg}
                alt="CBAM Dashboard"
                className="w-full h-auto"
                style={{ maxWidth: 740 }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── Social Proof ──────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-100" style={{ borderRadius: "72px 72px 0 0", marginTop: -72, position: "relative", zIndex: 10 }}>
        <div className="text-center mb-10 px-6">
          <p className="text-gray-500 text-base font-medium mb-5">Trusted by importers across steel, cement, and chemicals</p>
          <h2 className="leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            <span className="font-normal text-[#0d1b2e]/60">Join the companies </span>
            <span className="font-bold text-[#0d1b2e]">across industries</span>
            <br />
            <span className="font-bold text-[#0d1b2e]">that already trust us</span>
          </h2>
        </div>
        <LogoMarquee />
      </section>

      {/* ── Problem Statement ─────────────────────────────── */}
      <section id="why" className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
            <div className="max-w-lg">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Why CBAM Desk</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0d1b2e] leading-tight mb-4">
                The CBAM Challenge Every Importer Faces
              </h2>
              <p className="text-gray-500 text-base leading-relaxed">
                Managing CBAM compliance is complex and time-consuming. Our platform simplifies the process, enabling faster, smarter decisions.
              </p>
            </div>
            <button onClick={() => document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="text-sm text-[#0d1b2e] font-medium hover:underline whitespace-nowrap mt-1 self-start cursor-pointer">
              How It Works →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ChallengeCard
              title="Regulation that keeps moving"
              description="CN codes change, methodologies update, and default values shift. Staying current is a full-time job without the right tools."
              featured={false}
              chart={<BarChartMini inverted={false} />}
            />
            <ChallengeCard
              title="Supplier data you can't get"
              description="60% of importers report their suppliers don't respond. Without actual data, you're flying blind on cost and liability estimates."
              featured={true}
              chart={<AnalyticsMini inverted={true} />}
            />
            <ChallengeCard
              title="Penalties for getting it wrong"
              description="Fines of €10–50 per tonne CO₂ unreported, plus reputational risk. The stakes are high and the margin for error is zero."
              featured={false}
              chart={<BarChartMini inverted={false} />}
            />
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────── */}
      <HowItWorks />

      {/* ── Features ──────────────────────────────────────── */}
      <section id="features" className="bg-white" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="mx-auto px-8 md:px-16" style={{ maxWidth: 1280 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 100 }}>
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} index={i} reversed={i % 2 !== 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Built for your industry ───────────────────────── */}
      <IndustriesSection />

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="py-24 px-8 relative overflow-hidden" style={{ background: "#0d1b2e" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-white font-bold" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
              Making Compliance Effortless
            </h2>
            <p className="text-white/50 text-base max-w-2xl mx-auto leading-relaxed">
              Turn regulatory complexity into competitive advantage. Instant compliance visibility, automated reporting, and audit-ready documentation.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="2341" label="Suppliers Mapped" delay={0} />
            <StatCard number="98" label="Compliance Rate" suffix="%" delay={100} />
            <StatCard number="847" label="Reports Filed" delay={200} />
            <StatCard number="2.5hrs" label="Avg Report Time" delay={300} />
          </div>
        </div>
      </section>

      {/* ── Audit & Trust ─────────────────────────────────── */}
      <AuditSection />

      {/* ── Pricing ───────────────────────────────────────── */}
      <PricingSection />

      {/* ── FAQ ───────────────────────────────────────────── */}
      <FAQSection />

      {/* ── Final CTA ─────────────────────────────────────── */}
      <FinalCTA />

      {/* ── Footer ────────────────────────────────────────── */}
      <Footer />

    </div>
  );
}
