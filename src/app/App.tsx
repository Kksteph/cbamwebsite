import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight, ArrowUpRight } from "lucide-react";
import laptopImg from "../assets/laptop.png";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

// ── Feature card (alternating) ────────────────────────────────────────────────

const features = [
  {
    icon: "📊",
    title: "Import processing",
    description: "Streamline your data import pipeline with automated validation and error handling. Process thousands of records with confidence and maintain data integrity across your entire workflow.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    icon: "🗄️",
    title: "Built-in data",
    description: "Access pre-configured datasets and industry-standard references. Eliminate manual data entry and reduce errors with our comprehensive built-in database of validated information.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    icon: "🧮",
    title: "Proforma calculator",
    description: "Calculate complex financial models with precision. Our advanced calculator handles multiple scenarios, forecasting models, and sensitivity analysis with real-time updates.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    icon: "📈",
    title: "Dashboard & forecasting",
    description: "Visualize your data with interactive charts and predictive analytics. Make informed decisions with powerful forecasting tools that adapt to your business patterns.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    icon: "🏭",
    title: "Supplier & plant management",
    description: "Manage your entire supply chain from a single interface. Track suppliers, monitor plant operations, and optimise resource allocation with intelligent automation.",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

function FeatureCard({ icon, title, description, image, index, reversed }: {
  icon: string; title: string; description: string; image: string; index: number; reversed: boolean;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-2 gap-12 items-center mb-24 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`${reversed ? "md:order-2" : ""} space-y-4`}>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg" style={{ background: "linear-gradient(135deg, #1a3050, #2d4a6d)" }}>
          {icon}
        </div>
        <h3 className="text-[#0d1b2e] font-bold" style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)" }}>{title}</h3>
        <p className="text-[#0d1b2e]/60 text-base leading-relaxed">{description}</p>
      </div>

      <div className={`${reversed ? "md:order-1" : ""} relative group`}>
        <div className="absolute -inset-4 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(29,78,137,0.15), rgba(45,74,109,0.15))" }} />
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-[#0d1b2e]/8 group-hover:-translate-y-1 transition-transform duration-500">
          <div className="px-4 py-3 flex items-center gap-2" style={{ background: "#0d1b2e" }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
          </div>
          <div className="aspect-video bg-gray-50 overflow-hidden">
            <ImageWithFallback src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        </div>
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
    <div
      ref={ref}
      className={`text-center py-8 border-r border-white/10 last:border-r-0 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
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

function NetworkMini() {
  return (
    <svg viewBox="0 0 160 80" className="w-full h-auto">
      {[
        [80, 40], [30, 20], [130, 20], [30, 60], [130, 60], [80, 70],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i === 0 ? 10 : 6}
          fill={i === 0 ? "#2d4a6d" : "#e2e8f0"} />
      ))}
      {[[80,40,30,20],[80,40,130,20],[80,40,30,60],[80,40,130,60],[80,40,80,70]].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#cbd5e1" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

// ── Challenge card ─────────────────────────────────────────────────────────────

function ChallengeCard({ title, description, featured, chart }: {
  title: string; description: string; featured: boolean; chart: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 ${
      featured
        ? "text-white shadow-xl"
        : "bg-white border border-gray-100 shadow-sm text-[#0d1b2e]"
    }`}
      style={featured ? { background: "linear-gradient(145deg, #0d1b2e 0%, #1a3050 60%, #2d4a6d 100%)" } : {}}
    >
      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${featured ? "bg-white/20" : "bg-[#0d1b2e]"}`}>
        <ArrowUpRight className={`w-4 h-4 ${featured ? "text-white" : "text-white"}`} />
      </div>
      <div>
        <h3 className={`font-semibold text-base mb-2 ${featured ? "text-white" : "text-[#0d1b2e]"}`}>{title}</h3>
        <p className={`text-sm leading-relaxed ${featured ? "text-white/60" : "text-gray-500"}`}>{description}</p>
      </div>
      <div className="mt-auto pt-4 border-t border-white/10">
        {chart}
      </div>
    </div>
  );
}


// ── Main ───────────────────────────────────────────────────────────────────────

// ── Logo marquee ──────────────────────────────────────────────────────────────

const logoModules = import.meta.glob('../assets/2x/*.png', { eager: true });
const logos = Object.values(logoModules).map((m: any) => m.default) as string[];

function LogoMarquee() {
  const track = [...logos, ...logos];
  return (
    <div className="relative w-full overflow-hidden py-2">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #fff 40%, transparent 100%)" }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #fff 40%, transparent 100%)" }} />

      {/* Scrolling track — GPU accelerated */}
      <div
        className="flex items-center"
        style={{
          width: "max-content",
          animation: "marquee 35s linear infinite",
          willChange: "transform",
        }}
      >
        {track.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            draggable={false}
            className="h-10 w-auto mx-8 object-contain select-none"
            style={{ opacity: 0.5, filter: "grayscale(100%)" }}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const loginRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) setLoginOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0d1b2e 0%, #1a3050 40%, #2d4a6d 70%, #3a587a 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-10">
          <p className="text-white/60 text-sm tracking-wide mb-2">The CBAM Estimator Web App</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight whitespace-nowrap">
            Your all-in-one CBAM platform
          </h1>
          <p className="text-white/70 text-base max-w-[30rem] mx-auto mb-8">
            Understand CBAM, plan costs, manage manufacturers and obtain<br />
            real-world data – all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
            <button
              onClick={() => document.getElementById("why")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold text-sm hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Request a demo <ChevronRight className="w-4 h-4" />
            </button>

            <div className="relative" ref={loginRef}>
              <button
                onClick={() => setLoginOpen((o) => !o)}
                className="w-full sm:w-auto text-white px-8 py-3 rounded-lg font-semibold text-sm border border-white/25 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                style={{ background: "rgba(30, 55, 90, 0.8)" }}
              >
                Login
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${loginOpen ? "rotate-180" : ""}`} />
              </button>
              {loginOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50 min-w-[160px]">
                  <a href="#" onClick={() => setLoginOpen(false)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">Importer Login</a>
                  <a href="#" onClick={() => setLoginOpen(false)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100">Supplier Login</a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-24">
          <img src={laptopImg} alt="CBAM Dashboard" className="w-full h-auto" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-0" style={{ height: "30%" }}>
          <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <ellipse cx="720" cy="100" rx="900" ry="100" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Trusted Sources ───────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="text-center mb-10 px-6">
          <p className="text-gray-500 text-base font-medium mb-5">Our Customers</p>
          <h2 className="leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            <span className="font-normal text-[#0d1b2e]/60">Join the companies </span>
            <span className="font-bold text-[#0d1b2e]">across industries</span>
            <br />
            <span className="font-normal text-[#0d1b2e]/60">that already </span>
            <span className="font-bold text-[#0d1b2e]">trust us</span>
          </h2>
        </div>
        <LogoMarquee />
      </section>

      {/* ── Why CBAM Desk ─────────────────────────────────── */}
      <section id="why" className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">

          {/* Header row */}
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
            <button
              onClick={() => document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" })}
              className="text-sm text-[#0d1b2e] font-medium hover:underline whitespace-nowrap mt-1 self-start"
            >
              How It Works →
            </button>
          </div>

          {/* Challenge cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ChallengeCard
              title="Complex Regulations"
              description="Managing CBAM certificates and compliance requirements across multiple suppliers is overwhelming without the right tools."
              featured={false}
              chart={<BarChartMini inverted={false} />}
            />
            <ChallengeCard
              title="Time-Consuming Manual Work"
              description="Teams often spend hours on manual data entry and supplier outreach, slowing decisions and increasing error risk."
              featured={true}
              chart={<AnalyticsMini inverted={true} />}
            />
            <ChallengeCard
              title="Missed Compliance Deadlines"
              description="Without the right tools, critical CBAM reporting deadlines get missed, resulting in penalties and reputational damage."
              featured={false}
              chart={<BarChartMini inverted={false} />}
            />
          </div>
        </div>
      </section>

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

      {/* ── Feature cards ─────────────────────────────────── */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} index={i} reversed={i % 2 !== 0} />
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-24 px-8 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0d1b2e 0%, #1a3050 50%, #2d4a6d 100%)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="mb-4 text-white font-bold" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Ready to Begin?
          </h2>
          <p className="text-white/60 text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Trusted by organisations worldwide for critical CBAM compliance operations. Scale with confidence.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-10 py-4 bg-white text-[#0d1b2e] font-semibold rounded-lg text-sm hover:bg-gray-100 active:scale-95 transition-all shadow-lg mb-16 cursor-pointer"
          >
            Book a Demo
          </button>

          <div className="flex flex-wrap items-center justify-center gap-8 text-white/40 text-sm border-t border-white/10 pt-12">
            {[
              { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "SOC 2 Certified" },
              { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "99.9% Uptime" },
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "Instant Setup" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                </svg>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
