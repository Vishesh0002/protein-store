"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PRODUCTS = [
  {
    name: "Advance Formula Mass Gainer",
    short: "Advance Formula",
    flavor: "Chocolate · Vanilla · Kesar Pista",
    desc:
      "Engineered for clean mass with a precision blend of fast & slow proteins, complex carbs and BCAAs.",
    img: "/images/muzafernagar MOCKUP.png",
    badge: "BESTSELLER",
    stats: { protein: "24g", carbs: "62g", bcaa: "5.5g", servings: "30" },
  },
  {
    name: "Super Deca Weight Gainer",
    short: "Super Deca",
    flavor: "Chocolate · Strawberry",
    desc:
      "Heavy-duty calorie surplus formula crafted for hard gainers who want serious size, fast.",
    img: "/images/muzaffarnagar  MOCK 1kg 2.png",
    badge: "MASS BUILDER",
    stats: { protein: "20g", carbs: "78g", bcaa: "4.8g", servings: "20" },
  },
  {
    name: "Super Deca Weight Gainer (Premium)",
    short: "Super Deca Premium",
    flavor: "Double Chocolate · Cookies & Cream",
    desc:
      "Pro-grade upgrade — more whey isolate, more digestive enzymes, zero filler.",
    img: "/images/muzaffarnagar mock 1kg 3.png",
    badge: "PREMIUM",
    stats: { protein: "26g", carbs: "70g", bcaa: "6.2g", servings: "20" },
  },
  {
    name: "F1 Mass Gainer",
    short: "F1 Mass Gainer",
    flavor: "Chocolate · Mango",
    desc:
      "Track-tested calorie matrix for athletes who train hard and recover harder.",
    img: "/images/muzaffarnagar MOCK 1KG.png",
    badge: "PERFORMANCE",
    stats: { protein: "22g", carbs: "65g", bcaa: "5g", servings: "20" },
  },
  {
    name: "WHEY ABC",
    short: "WHEY ABC",
    flavor: "Pista Kulfi · Vanilla",
    desc:
      "Premium fast-absorbing whey protein isolate blend designed for rapid post-workout recovery and muscle protein synthesis.",
    img: "/images/abc_png-removebg-preview.png",
    badge: "RECOVERY",
    stats: { protein: "25g", carbs: "3g", bcaa: "5.5g", servings: "30" },
  },
];

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Why Us", href: "#why" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];


export default function Home() {
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto carousel
  useEffect(() => {
    timerRef.current = setInterval(
      () => setActive((i) => (i + 1) % PRODUCTS.length),
      5000,
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  const restartTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setActive((i) => (i + 1) % PRODUCTS.length),
      5000,
    );
  };

  // Header scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const product = PRODUCTS[active];
  return (
    <div id="home" className="relative flex flex-1 flex-col overflow-hidden">
      {/* ---------- HEADER ---------- */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 sm:px-8 sm:py-4">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-[var(--accent)] text-black">
              <span className="text-base font-black tracking-tighter">M</span>
            </span>
            <div className="leading-tight">
              <div className="text-sm font-black tracking-[0.18em] text-white">
                MAX POWER
              </div>
              <div className="text-[9px] font-medium tracking-[0.32em] text-white/55">
                NUTRITION
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#products"
              className="hidden items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-bold text-black transition hover:scale-[1.03] sm:inline-flex"
            >
              Our Products
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 md:hidden"
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 top-0 h-0.5 w-5 bg-white transition ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-0.5 w-5 bg-white transition ${menuOpen ? "-translate-y-1 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-[max-height] duration-500 ${menuOpen ? "max-h-96" : "max-h-0"}`}>
          <nav className="mx-5 mt-2 flex flex-col rounded-2xl border border-white/10 bg-black/85 p-2 backdrop-blur-xl">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#products"
              onClick={() => setMenuOpen(false)}
              className="mt-1 rounded-xl bg-[var(--accent)] px-4 py-3 text-center text-sm font-bold text-black"
            >
              Our Products
            </a>
          </nav>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="relative flex min-h-screen items-center pt-28 pb-20">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 soft-grid opacity-50" />
          <div className="animate-blob absolute -left-24 top-12 h-[420px] w-[420px] rounded-full bg-[var(--accent-2)]/25 blur-3xl" />
          <div className="animate-blob absolute -right-20 top-40 h-[420px] w-[420px] rounded-full bg-[var(--accent)]/20 blur-3xl" style={{ animationDelay: "-6s" }} />
        </div>

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
          {/* Copy */}
          <div className="animate-fade-up lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-white/85 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              LAB-TESTED · ATHLETE APPROVED
            </div>

            <h1 className="display-num text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-[5.5rem]">
              Build the
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-black">body</span>
                <span className="absolute inset-x-0 bottom-1.5 -z-0 h-[55%] rounded-md bg-[var(--accent)]" />
              </span>{" "}
              you train for.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Premium mass gainers and performance fuel from{" "}
              <span className="font-semibold text-white">Max Power Nutrition</span>.
              Built for serious lifters. No fluff. Just gains.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#products"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-bold tracking-wide text-black transition hover:scale-[1.04]"
              >
                Explore Products
                <svg className="h-4 w-4 transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a
                href="#why"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold backdrop-blur transition hover:bg-white/10"
              >
                Why Max Power?
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-white/60">
              {[
                "GMP Certified",
                "FSSAI Approved",
                "Third-Party Tested",
                "No Banned Substances",
              ].map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero product */}
          <div className="relative mx-auto w-full max-w-lg animate-fade-up [animation-delay:200ms] lg:col-span-5">
            <div className="relative mx-auto h-[460px] w-full max-w-[460px] sm:h-[520px] sm:max-w-[520px]">
              <div className="absolute inset-6 animate-spin-slow rounded-full border border-dashed border-white/15" />
              <div className="absolute inset-1/4 rounded-full bg-gradient-to-br from-[var(--accent)]/30 via-[var(--accent-2)]/20 to-transparent blur-3xl" />
              <div className="animate-float relative z-10 h-full w-full">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 520px"
                  className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* Floating tags */}
              <div className="absolute -left-2 top-8 hidden rounded-2xl border border-white/15 bg-black/70 px-4 py-3 backdrop-blur-xl sm:block">
                <div className="text-[10px] uppercase tracking-widest text-white/55">
                  Featured
                </div>
                <div className="text-sm font-bold text-white">{product.short}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute inset-x-0 bottom-0 overflow-hidden border-y border-white/10 bg-black/40 py-3.5">
          <div className="animate-marquee flex w-max gap-12 whitespace-nowrap text-xs font-bold uppercase tracking-[0.32em] text-white/60">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-12">
                <span>★ 100% Authentic</span>
                <span>★ Lab Tested</span>
                <span>★ Made For Athletes</span>
                <span>★ Premium Quality</span>
                <span>★ 50,000+ Happy Lifters</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PRODUCTS ---------- */}
      <section id="products" className="relative py-24 sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="reveal mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                Our Products
              </div>
              <h2 className="display-num text-4xl font-black tracking-tight sm:text-5xl">
                Built for serious gains.
              </h2>
              <p className="mt-3 max-w-xl text-white/65">
                Four premium formulations engineered for clean mass, faster recovery
                and elite performance.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous product"
                onClick={() => { setActive((i) => (i - 1 + PRODUCTS.length) % PRODUCTS.length); restartTimer(); }}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 6l-6 6 6 6" /></svg>
              </button>
              <button
                aria-label="Next product"
                onClick={() => { setActive((i) => (i + 1) % PRODUCTS.length); restartTimer(); }}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>

          {/* Featured carousel */}
          <div className="reveal relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--card)] p-6 sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--accent)]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[var(--accent-2)]/10 blur-3xl" />

            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              {/* Image stack */}
              <div className="relative mx-auto h-[360px] w-full max-w-[420px] sm:h-[440px]">
                <div className="absolute inset-1/4 rounded-full bg-gradient-to-br from-[var(--accent)]/20 to-transparent blur-2xl" />
                {PRODUCTS.map((p, i) => (
                  <div
                    key={p.name}
                    className={`absolute inset-0 transition-all duration-700 ${
                      i === active ? "scale-100 opacity-100" : "scale-90 opacity-0"
                    }`}
                  >
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      sizes="(max-width: 1024px) 80vw, 460px"
                      className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]"
                    />
                  </div>
                ))}
              </div>

              {/* Details */}
              <div key={product.name} className="animate-fade-up">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                  {product.badge}
                </div>
                <h3 className="text-3xl font-black leading-tight sm:text-4xl">
                  {product.name}
                </h3>
                <div className="mt-1 text-sm text-white/55">{product.flavor}</div>
                <p className="mt-4 max-w-md text-white/70">{product.desc}</p>

                {/* Stat strip */}
                <div className="mt-6 grid grid-cols-4 gap-2 rounded-2xl border border-white/10 bg-black/40 p-3">
                  {[
                    { k: "Protein", v: product.stats.protein },
                    { k: "Carbs", v: product.stats.carbs },
                    { k: "BCAA", v: product.stats.bcaa },
                    { k: "Servings", v: product.stats.servings },
                  ].map((s) => (
                    <div key={s.k} className="text-center">
                      <div className="display-num text-xl font-black text-white sm:text-2xl">
                        {s.v}
                      </div>
                      <div className="mt-0.5 text-[10px] uppercase tracking-widest text-white/50">
                        {s.k}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-7">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition hover:scale-[1.04]"
                  >
                    Get In Touch
                    <svg className="h-4 w-4 transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="mt-10 flex justify-center gap-2">
              {PRODUCTS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => { setActive(i); restartTimer(); }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-12 bg-[var(--accent)]" : "w-5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product grid */}
          <div className="reveal mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.name}
                  onClick={() => { setActive(i); restartTimer(); }}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-[var(--card)] p-5 text-left transition hover:-translate-y-1 ${
                    isActive ? "border-[var(--accent)]" : "border-white/10 hover:border-white/25"
                  }`}
                >
                  <div className="relative mx-auto h-56 w-full max-w-[220px]">
                    <div className="absolute inset-4 rounded-full bg-white/5 blur-2xl transition group-hover:bg-[var(--accent)]/20" />
                    <div className="shine relative h-full w-full">
                      <Image
                        src={p.img}
                        alt={p.name}
                        fill
                        sizes="240px"
                        className="object-contain transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-1 flex-col">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
                      {p.badge}
                    </div>
                    <div className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-white">
                      {p.name}
                    </div>
                    <div className="mt-1 text-xs text-white/45">{p.flavor.split(" · ")[0]}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- WHY US ---------- */}
      <section id="why" className="relative py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 soft-grid opacity-30" />
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="reveal mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
              Why Max Power
            </div>
            <h2 className="display-num text-4xl font-black tracking-tight sm:text-5xl">
              Engineered for real results.
            </h2>
            <p className="mt-4 text-white/65">
              Every scoop is a promise — clean ingredients, transparent labels,
              championship results.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "Lab-Tested Purity",
                d: "Every batch independently tested for protein content & banned substances.",
                icon: <path d="M9 2v6l-5 8a4 4 0 0 0 3.5 6h9A4 4 0 0 0 20 16l-5-8V2M9 2h6" />,
              },
              {
                t: "Faster Recovery",
                d: "Premium whey + casein blend with BCAAs to bounce back stronger.",
                icon: <path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z" />,
              },
              {
                t: "Real Mass, No Bloat",
                d: "Smart calorie matrix tuned for clean weight gain without the bloat.",
                icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l8.84 8.84 8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />,
              },
              {
                t: "Athlete Approved",
                d: "Trusted by 50,000+ lifters, runners and combat athletes nationwide.",
                icon: <path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z" />,
              },
            ].map((f, i) => (
              <div
                key={f.t}
                className="reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--card)] p-6 transition hover:-translate-y-1 hover:border-white/25"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[var(--accent)]/0 blur-2xl transition group-hover:bg-[var(--accent)]/25" />
                <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-[var(--accent)] text-black">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    {f.icon}
                  </svg>
                </div>
                <h3 className="relative mt-5 text-lg font-bold text-white">{f.t}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-white/65">
                  {f.d}
                </p>
              </div>
            ))}
          </div>

          {/* Stats banner */}
          <div className="reveal mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
            {[
              { n: "50K+", l: "Happy Athletes" },
              { n: "12+", l: "Cities Delivered" },
              { n: "4.9★", l: "Average Rating" },
              { n: "0", l: "Banned Substances" },
            ].map((s) => (
              <div key={s.l} className="bg-[var(--background)] p-6 text-center">
                <div className="display-num text-3xl font-black text-white sm:text-4xl">
                  {s.n}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/55">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- REVIEWS ---------- */}
      <section id="reviews" className="relative py-24 sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="reveal mb-14 max-w-2xl">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
              Athlete Voices
            </div>
            <h2 className="display-num text-4xl font-black tracking-tight sm:text-5xl">
              Real lifters. Real gains.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                n: "Rohan S.",
                r: "Powerlifter · Delhi",
                q: "Gained 6kgs of clean mass in 3 months on F1. Mixability is unreal — no clumps, no bloat.",
              },
              {
                n: "Aisha M.",
                r: "CrossFit Athlete · Bangalore",
                q: "Super Deca Premium hits different. Recovery is faster and I'm finally PR-ing again.",
              },
              {
                n: "Kabir T.",
                r: "S&C Coach · Mumbai",
                q: "I put 8 of my clients on Advance Formula. Every single one is hitting bulk targets.",
              },
            ].map((t, i) => (
              <figure
                key={t.n}
                className="reveal flex flex-col rounded-2xl border border-white/10 bg-[var(--card)] p-6"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-1 text-[var(--accent)]">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <svg key={k} className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-white/85">
                  &ldquo;{t.q}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--accent)] text-sm font-black text-black">
                    {t.n.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{t.n}</div>
                    <div className="text-xs text-white/55">{t.r}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section id="contact" className="relative py-24 sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="reveal relative overflow-hidden rounded-3xl bg-[var(--accent)] px-6 py-14 sm:px-14">
            <div className="pointer-events-none absolute inset-0 soft-grid opacity-30" />
            <div className="animate-blob pointer-events-none absolute -right-10 -top-10 h-60 w-60 rounded-full bg-[var(--accent-2)]/40 blur-3xl" />
            <div className="relative mx-auto max-w-2xl text-center">
              <h3 className="display-num text-4xl font-black leading-tight text-black sm:text-5xl">
                Ready to fuel your gains?
              </h3>
              <p className="mt-4 text-black/75">
                Join 50,000+ lifters who trust Max Power Nutrition for clean, premium mass gainers.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="mailto:contact@maxpowernutrition.com"
                  className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-bold text-white transition hover:scale-[1.04]"
                >
                  Contact Us
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 rounded-full border border-black/30 px-7 py-3.5 text-sm font-bold text-black transition hover:bg-black/10"
                >
                  View Products
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-white/10 bg-black/60 py-12">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 px-5 sm:px-8 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-[var(--accent)] text-black">
                <span className="text-base font-black">M</span>
              </span>
              <div className="leading-tight">
                <div className="text-sm font-black tracking-[0.18em] text-white">
                  MAX POWER
                </div>
                <div className="text-[9px] tracking-[0.32em] text-white/55">
                  NUTRITION
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-white/60">
              Premium mass gainers and performance fuel. Built by athletes, for
              athletes. Train hard. Eat smart. Grow loud.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {["instagram", "youtube", "x"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <span className="text-xs font-black uppercase">{s.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/50">
              Products
            </div>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {PRODUCTS.map((p) => (
                <li key={p.name}>
                  <a href="#products" className="transition hover:text-[var(--accent)]">
                    {p.short}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/50">
              Company
            </div>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li><a className="transition hover:text-[var(--accent)]" href="#why">Why Us</a></li>
              <li><a className="transition hover:text-[var(--accent)]" href="#reviews">Reviews</a></li>
              <li><a className="transition hover:text-[var(--accent)]" href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col items-start justify-between gap-3 border-t border-white/10 px-5 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:px-8">
          <div> 2023 Max Power Nutrition. All rights reserved.</div>
          <div>Made with grit. Forged for gains.</div>
        </div>
      </footer>
    </div>
  );
}
