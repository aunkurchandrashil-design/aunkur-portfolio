``` "use client"; ```import React, { useEffect, useRef, useState } from "react";

/**
 * Aunkur Chandra Shil — Portfolio
 * Styled after https://shanta-shil-protfolio.vercel.app/
 * (orbit hero, gradient-glow dark theme, terminal accents)
 *
 * Drop-in single-file React component. Requires Tailwind CSS.
 * Place "aunkur-profile.jpg" next to this file (or update the import).
 */
import profilePhoto from "./aunkur-profile.jpg";

/* ------------------------------------------------------------------ */
/* Reveal-on-scroll wrapper                                            */
/* ------------------------------------------------------------------ */
function Reveal({ as: Tag = "div", className = "", delay = 0, children }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={
        className +
        " transition-all duration-700 ease-out " +
        (inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")
      }
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Terminal-style typing line (used in hero + footer)                  */
/* ------------------------------------------------------------------ */
function useTyping(phrases, speed = 55, pause = 1400) {
  const [text, setText] = useState("");
  useEffect(() => {
    let pIndex = 0,
      chIndex = 0,
      deleting = false,
      id;
    const tick = () => {
      const current = phrases[pIndex];
      if (!deleting) {
        chIndex++;
        setText(current.slice(0, chIndex));
        if (chIndex === current.length) {
          deleting = true;
          id = setTimeout(tick, pause);
          return;
        }
      } else {
        chIndex--;
        setText(current.slice(0, chIndex));
        if (chIndex === 0) {
          deleting = false;
          pIndex = (pIndex + 1) % phrases.length;
        }
      }
      id = setTimeout(tick, deleting ? 30 : speed);
    };
    id = setTimeout(tick, 400);
    return () => clearTimeout(id);
  }, []);
  return text;
}

/* ------------------------------------------------------------------ */
/* Background glow / atmosphere                                        */
/* ------------------------------------------------------------------ */
function Atmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full opacity-40 blur-[90px]"
        style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }}
      />
      <div
        className="absolute right-[-10%] top-1/3 h-[380px] w-[380px] rounded-full opacity-30 blur-[90px]"
        style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)" }}
      />
      <div
        className="absolute left-1/3 bottom-[-15%] h-[360px] w-[360px] rounded-full opacity-25 blur-[90px]"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Nav                                                                  */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  ["#home", "Home"],
  ["#about", "About"],
  ["#skills", "Skills"],
  ["#experience", "Experience"],
  ["#projects", "Projects"],
  ["#achievements", "Achievements"],
  ["#contact", "Contact"],
];

function Nav() {
  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 72,
        behavior: "smooth",
      });
    }
  };
  return (
    <nav className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 font-semibold text-neutral-100">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-400 to-cyan-400 flex items-center justify-center text-sm font-bold text-neutral-950">
            A
          </span>
          Aunkur Shil
        </div>
        <div className="flex gap-5 flex-wrap">
          {NAV_LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleClick(e, href)}
              className="font-mono text-xs uppercase tracking-wide text-neutral-400 hover:text-cyan-300 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */
function Eyebrow({ children }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300 mb-3 flex items-center gap-2">
      <span className="w-5 h-px bg-cyan-300 inline-block" />
      {children}
    </p>
  );
}

function H2({ children, sub }) {
  return (
    <div className="mb-9">
      <h2 className="font-serif font-bold text-3xl md:text-4xl text-neutral-50 tracking-tight">
        {children}
      </h2>
      {sub && <p className="mt-2 text-neutral-400 max-w-xl">{sub}</p>}
    </div>
  );
}

function StatCard({ num, label }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
      <div className="font-serif text-2xl font-bold text-neutral-50">{num}</div>
      <div className="font-mono text-[11px] uppercase tracking-wide text-neutral-400 mt-1">
        {label}
      </div>
    </div>
  );
}

function Chip({ children }) {
  return (
    <span className="text-[12.5px] rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-neutral-200">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Hero — orbit portrait with skill badges                             */
/* ------------------------------------------------------------------ */
const ORBIT_BADGES = [
  { label: "SEO", sub: "Technical & On-Page", color: "#22d3ee" },
  { label: "WordPress", sub: "CMS & WooCommerce", color: "#818cf8" },
  { label: "Google Ads", sub: "Paid Search", color: "#f59e0b" },
  { label: "GA4 & GSC", sub: "Analytics", color: "#34d399" },
  { label: "CRO", sub: "Conversion Growth", color: "#c084fc" },
  { label: "Sales", sub: "Leadership", color: "#fb7185" },
];

function OrbitHero() {
  const radius = 190;
  return (
    <div className="relative mx-auto h-[420px] w-[420px] max-w-[86vw] max-h-[86vw]">
      {/* rings */}
      <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />
      <div className="absolute inset-[-18px] rounded-full border border-white/10" />
      <div className="absolute inset-[-38px] rounded-full border border-white/[0.06]" />
      {/* glow */}
      <div
        className="absolute inset-[14%] rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(34,211,238,0.2) 55%, transparent 80%)",
        }}
      />
      {/* photo */}
      <div className="absolute inset-[16%] rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
        <img
          src={profilePhoto}
          alt="Aunkur Chandra Shil"
          className="h-full w-full object-cover"
        />
      </div>
      {/* orbit badges */}
      {ORBIT_BADGES.map((b, i) => {
        const angle = (360 / ORBIT_BADGES.length) * i - 90;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <div
            key={b.label}
            className="absolute left-1/2 top-1/2 flex items-center gap-2 rounded-xl border border-white/15 bg-neutral-900/90 px-3 py-2 shadow-lg backdrop-blur-sm"
            style={{
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              boxShadow: `0 0 24px -6px ${b.color}88`,
            }}
          >
            <span
              className="h-2 w-2 rounded-full shrink-0"
              style={{ background: b.color, boxShadow: `0 0 10px ${b.color}` }}
            />
            <span className="flex flex-col leading-tight">
              <span className="text-[12.5px] font-semibold text-neutral-100">
                {b.label}
              </span>
              <span className="text-[10px] text-neutral-400">{b.sub}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Hero() {
  const typed = useTyping([
    "seo & digital marketing specialist",
    "wordpress + woocommerce expert",
    "local seo & gbp specialist",
    "sales-driven growth marketer",
  ]);
  return (
    <header id="home" className="relative pt-16 pb-20 overflow-hidden">
      <Atmosphere />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300">
                Open to collaborate
              </span>
            </div>
            <p className="text-lg font-semibold text-neutral-300 mb-2">Hi, I'm</p>
            <h1 className="font-serif font-bold text-4xl sm:text-5xl leading-[1.08] text-neutral-50 mb-3">
              Aunkur Chandra Shil
            </h1>
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent mb-4">
              SEO &amp; Digital Marketing Specialist
            </h3>
            <div className="font-mono text-[13px] text-neutral-400 h-5 mb-6 flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>{typed}</span>
              <span className="inline-block w-[6px] h-3.5 bg-cyan-300 animate-pulse" />
            </div>
            <p className="max-w-md text-neutral-400 mb-7">
              I rank websites, grow organic traffic, and turn search
              visibility into revenue — backed by three years of frontline
              sales leadership that keeps every strategy tied to real
              business results.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:aunkurchandrashil@gmail.com"
                className="rounded-xl px-6 py-3 text-sm font-semibold text-neutral-950 bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-300 hover:brightness-110 transition"
              >
                Contact Me
              </a>
              <a
                href="https://linkedin.com/in/aunkurroy"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl px-6 py-3 text-sm font-semibold border border-white/15 text-neutral-200 hover:border-cyan-300 hover:text-cyan-300 transition"
              >
                LinkedIn
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <OrbitHero />
          </Reveal>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* About                                                                */
/* ------------------------------------------------------------------ */
function About() {
  const points = [
    "Full-funnel SEO — technical, on-page, off-page, local & e-commerce",
    "WordPress & WooCommerce site management end-to-end",
    "Schema markup for rich search results",
    "GA4 / Google Search Console performance reporting",
    "Sales leadership background, always tying SEO back to revenue",
  ];
  return (
    <section id="about" className="relative py-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <Eyebrow>About</Eyebrow>
        <H2>Sales instincts, search-engine discipline.</H2>
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10">
          <Reveal className="space-y-4 text-neutral-400">
            <p>
              I started my career on the sales floor — managing a Bata Shoe
              Company branch, coaching a sales team, and living or dying by
              monthly targets. That gave me something a lot of marketers
              skip: a gut sense of what actually moves a customer to buy.
            </p>
            <p>
              I brought that instinct into digital marketing. Today I'm a{" "}
              <strong className="text-neutral-100">
                results-oriented Sales and Digital Marketing professional
              </strong>{" "}
              running full-funnel SEO for e-commerce brands in Bangladesh
              and the UAE.
            </p>
            <ul className="mt-5 space-y-2.5">
              {points.map((p) => (
                <li key={p} className="flex gap-2.5 text-[14.5px] text-neutral-300">
                  <span className="text-cyan-300">▹</span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100} className="grid grid-cols-2 gap-3.5 content-start">
            <StatCard num="3+ yrs" label="Sales & Marketing" />
            <StatCard num="4" label="Brands Grown" />
            <StatCard num="10.7M" label="Impressions / Qtr" />
            <StatCard num="12×" label="Organic Clicks YoY" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Skills                                                               */
/* ------------------------------------------------------------------ */
const SKILL_GROUPS = [
  {
    title: "SEO & Analytics",
    desc: "Core discipline — research, audits, and measurement.",
    items: ["Technical SEO", "On-Page & Off-Page", "Local SEO", "E-commerce SEO", "Keyword Research", "Schema Markup", "GA4", "Search Console", "SEMrush", "Ahrefs", "Screaming Frog"],
  },
  {
    title: "CMS & E-commerce",
    desc: "Where the strategy actually gets shipped.",
    items: ["WordPress", "WooCommerce", "Shopify", "Wix", "Conversion Rate Optimization"],
  },
  {
    title: "Marketing & Ads",
    desc: "Paid, social, and local visibility.",
    items: ["Facebook Ads Manager", "Google Ads", "LinkedIn Campaign Manager", "Content Strategy", "Google Business Profile", "Hootsuite", "Buffer", "Canva"],
  },
  {
    title: "Sales & Leadership",
    desc: "The instinct behind every strategy.",
    items: ["Sales Management", "Revenue Growth", "Team Leadership", "Market Research", "CRM", "Strategic Planning"],
  },
];

function Skills() {
  return (
    <section id="skills" className="relative py-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <Eyebrow>Skills</Eyebrow>
        <H2 sub="A toolkit shaped by real e-commerce and retail campaigns — chosen for measurable growth.">
          Technical arsenal
        </H2>
        <div className="grid sm:grid-cols-2 gap-5">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal
              key={group.title}
              delay={i * 60}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5"
            >
              <h4 className="font-semibold text-neutral-100 mb-1">{group.title}</h4>
              <p className="text-[13px] text-neutral-500 mb-4">{group.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */
const EXPERIENCE = [
  {
    title: "SEO & Digital Marketing Specialist",
    org: "RM Trading International",
    place: "Dhaka, Bangladesh",
    time: "2025 — Present",
    desc: "Own end-to-end SEO strategy for a leading Bangladeshi gadget & smartphone retailer — technical, on-page, off-page, local and e-commerce SEO, WooCommerce management, schema markup, content strategy, CRO and GA4/GSC reporting.",
    tags: ["Technical SEO", "WooCommerce", "Schema", "GA4"],
    bullets: [
      "Grew organic search clicks ~12× and impressions ~20× year-over-year.",
      "Maintain 1,320+ indexed pages with consistently successful crawl status.",
      "Drive 131k+ new users and 135k+ sessions in a 28-day window.",
    ],
  },
  {
    title: "Full Website SEO",
    org: "The Daily Need Store",
    place: "",
    time: "2022 — 2023",
    desc: "Managed complete SEO for the store's website: keyword research, on-page optimization, and technical SEO, alongside content writing and link-building campaigns to grow organic traffic. Also managed social media presence.",
    tags: ["On-Page SEO", "Content", "Social Media"],
  },
  {
    title: "SEO Expert",
    org: "Cleaning Service (Florida, USA)",
    place: "Remote / Freelance",
    time: "2021 — 2022",
    desc: "Identified the most profitable keywords, ran competitor research, and performed full SEO audits — on-page, technical and page speed. Built high-quality backlinks and delivered weekly and monthly performance reports.",
    tags: ["Keyword Research", "Backlinks", "Audits"],
  },
  {
    title: "Branch Manager",
    org: "Bata Shoe Company BD Ltd, Demra",
    place: "",
    time: "Jan 2022 — Nov 2024",
    desc: "Ran daily branch operations, coached a sales team to consistently exceed revenue targets, managed inventory, analyzed sales trends and kept the store floor customer-ready.",
    tags: ["Sales Leadership", "Operations"],
  },
  {
    title: "Sales Representative",
    org: "Bata Shoe Company BD Ltd, Demra",
    place: "",
    time: "Dec 2020 — Dec 2021",
    desc: "Guided customers through product selection, consistently beat individual sales targets, and kept shelves stocked and accurate through attentive inventory management.",
    tags: ["Sales", "Inventory"],
  },
  {
    title: "Sales Representative",
    org: "BANG! Clothing Brand, Demra",
    place: "",
    time: "Jan 2017 — Sep 2020",
    desc: "Helped customers build their wardrobe with personalized recommendations, managed store displays, handled cash transactions, and supported team-run promotional campaigns.",
    tags: ["Retail Sales", "Merchandising"],
  },
];

function Experience() {
  return (
    <section id="experience" className="relative py-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <Eyebrow>Career Timeline</Eyebrow>
        <H2 sub="From the sales floor to full-funnel SEO — every role fed the next.">
          Professional experience
        </H2>
        <div className="relative pl-6 border-l border-white/10 space-y-8">
          {EXPERIENCE.map((job, i) => (
            <Reveal key={job.title + job.org} delay={i * 60} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full bg-gradient-to-br from-violet-400 to-cyan-300 ring-4 ring-neutral-950" />
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5">
                <div className="flex flex-wrap justify-between gap-2 mb-1.5">
                  <h4 className="font-semibold text-neutral-100">{job.title}</h4>
                  <span className="font-mono text-xs text-neutral-500">{job.time}</span>
                </div>
                <p className="text-sm text-cyan-300 mb-2.5">
                  {job.org}
                  {job.place && ` · ${job.place}`}
                </p>
                <p className="text-[14.5px] text-neutral-400 mb-3">{job.desc}</p>
                {job.bullets && (
                  <ul className="space-y-1.5 mb-3">
                    {job.bullets.map((b) => (
                      <li key={b} className="text-sm text-neutral-400 flex gap-2">
                        <span className="text-violet-300">›</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {job.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Education                                                            */
/* ------------------------------------------------------------------ */
const EDUCATION = [
  { title: "Bachelor of Business Administration (BBA)", sub: "Major in Marketing · Siddheswari College", time: "Graduated 2022", score: "CGPA 2.73 / 4.00" },
  { title: "Higher Secondary Certificate (HSC)", sub: "Business Studies · Govt. Adamjeenagar M.W. College, Narayanganj", time: "2018", score: "GPA 2.42" },
  { title: "Secondary School Certificate (SSC)", sub: "Business Studies · Hajee Moazzem Ali High School", time: "2015", score: "GPA 3.78" },
];

function Education() {
  return (
    <section id="education" className="relative py-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <Eyebrow>Education</Eyebrow>
        <H2>Academic background</H2>
        <div className="grid sm:grid-cols-3 gap-5">
          {EDUCATION.map((edu, i) => (
            <Reveal
              key={edu.title}
              delay={i * 60}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5"
            >
              <span className="text-xl">🎓</span>
              <h4 className="font-semibold text-neutral-100 mt-3 mb-1">{edu.title}</h4>
              <p className="text-[13px] text-neutral-500 mb-3">{edu.sub}</p>
              <div className="flex justify-between font-mono text-[11px] text-neutral-400">
                <span>{edu.time}</span>
                <span className="text-emerald-300">{edu.score}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Projects / Case studies                                              */
/* ------------------------------------------------------------------ */
const PROJECTS = [
  {
    tag: "E-commerce",
    time: "2025 – Present",
    title: "RM Trading International",
    sub: "Smartphone & Gadget E-commerce",
    desc: "Full-funnel SEO for a Bangladeshi electronics retailer: technical SEO, keyword-mapped category and product pages, schema markup, content strategy and WooCommerce optimization.",
    stats: ["29.7k clicks / 3mo", "10.7M impressions / 3mo", "1,320 indexed pages", "2.2k leads / mo"],
  },
  {
    tag: "Local SEO",
    time: "2023",
    title: "Vape Zozo",
    sub: "Google Business Profile — Dubai, UAE",
    desc: 'Set up and optimized the Google Business Profile, mapped priority local keywords, and built out social profiles and directory listings for a UAE-based retailer.',
    stats: ["GBP setup", "Local keyword mapping", "Multi-platform social"],
  },
  {
    tag: "On-Page & Links",
    time: "2023",
    title: "Vapes Dubai Shop",
    sub: "On-Page SEO & Backlink Strategy — Dubai, UAE",
    desc: "Wrote SEO-optimized meta titles and descriptions, defined the target keyword set, and planned a diversified backlink program for a UAE e-commerce store.",
    stats: ["Meta & on-page SEO", "Backlink roadmap", "Competitor analysis"],
  },
];

function Projects() {
  return (
    <section id="projects" className="relative py-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <Eyebrow>Case Studies</Eyebrow>
        <H2 sub="SEO work, in numbers.">Selected projects</H2>
        <div className="grid md:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 80}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] uppercase tracking-wide text-violet-300">
                  {p.tag}
                </span>
                <span className="font-mono text-[11px] text-neutral-500">{p.time}</span>
              </div>
              <h4 className="font-semibold text-neutral-100">{p.title}</h4>
              <p className="text-[13px] text-cyan-300 mb-3">{p.sub}</p>
              <p className="text-[14px] text-neutral-400 mb-4 flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.stats.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Achievements / Certifications                                        */
/* ------------------------------------------------------------------ */
const ACHIEVEMENTS = [
  { icon: "📈", title: "12× Organic Growth", sub: "Trailing 3-month YoY organic clicks at RM Trading International." },
  { icon: "🔍", title: "1,320+ Pages Indexed", sub: "Sitemap-wide, consistently successful crawl status maintained." },
  { icon: "🎓", title: "Digital Marketing Certification", sub: "BASIS Institute of Technology & Management (BITM)." },
  { icon: "✅", title: "Fundamentals of Digital Marketing", sub: "Google Digital Garage, 2024." },
  { icon: "✅", title: "Content Marketing", sub: "HubSpot Academy, 2024." },
  { icon: "🏆", title: "3+ Years in Sales Leadership", sub: "Branch operations and team coaching at Bata Shoe Company." },
];

function Achievements() {
  return (
    <section id="achievements" className="relative py-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <Eyebrow>Recognition</Eyebrow>
        <H2 sub="Certifications and results that back the strategy up.">Achievements & certifications</H2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal
              key={a.title}
              delay={i * 50}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5"
            >
              <span className="text-2xl">{a.icon}</span>
              <h4 className="font-semibold text-neutral-100 mt-3 mb-1">{a.title}</h4>
              <p className="text-[13.5px] text-neutral-400">{a.sub}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                              */
/* ------------------------------------------------------------------ */
function Contact() {
  return (
    <section id="contact" className="relative py-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <Eyebrow>Contact</Eyebrow>
        <H2>Let's grow your search traffic.</H2>
        <Reveal className="rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-9 flex flex-wrap justify-between gap-8">
          <div className="max-w-sm">
            <p className="text-neutral-400 text-[14.5px]">
              Open to SEO, digital marketing and sales-growth roles across
              Bangladesh and remote/UAE-based teams. Usually replies within a
              day.
            </p>
          </div>
          <div className="flex flex-col gap-3 font-mono text-[13.5px]">
            <a href="mailto:aunkurchandrashil@gmail.com" className="text-neutral-200 hover:text-cyan-300 transition-colors flex items-center gap-2">
              ✉ aunkurchandrashil@gmail.com
            </a>
            <a href="tel:+8801857363342" className="text-neutral-200 hover:text-cyan-300 transition-colors flex items-center gap-2">
              ☎ 01857-363342
            </a>
            <a
              href="https://linkedin.com/in/aunkurroy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-200 hover:text-cyan-300 transition-colors flex items-center gap-2"
            >
              in linkedin.com/in/aunkurroy
            </a>
            <span className="text-neutral-200 flex items-center gap-2">
              📍 Demra, Dhaka-1360, Bangladesh
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="font-mono text-xs text-neutral-500">
          © {new Date().getFullYear()} Aunkur Chandra Shil · Built with care,
          ranked with data.
        </div>
        <div className="flex gap-4 font-mono text-xs text-neutral-500">
          <span>Next.js</span>
          <span>Tailwind</span>
          <span className="text-emerald-400">● Online</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Root                                                                 */
/* ------------------------------------------------------------------ */
export default function AunkurPortfolioV2() {
  return (
    <div className="bg-neutral-950 text-neutral-100 antialiased font-sans selection:bg-cyan-300 selection:text-neutral-950">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}
