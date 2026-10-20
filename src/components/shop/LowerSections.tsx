import { LOGO_URL } from "@/data/products";
import { Icon, useShop } from "./ShopProvider";

export function EmiBanner() {
  const { setModal } = useShop();
  return (
    <section id="emi-calculator" className="mx-auto max-w-7xl scroll-mt-32 px-4 md:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-on-surface via-inverse-surface to-on-surface p-8 text-on-primary shadow-xl md:p-10">
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-1/2 bg-gradient-to-l from-primary/30 to-transparent" />
        <div className="relative z-10 grid grid-cols-1 items-center gap-8 md:grid-cols-12">
          <div className="space-y-4 md:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-on-primary/10 px-3 py-1 text-xs font-semibold tracking-wider">
              <span className="h-2 w-2 rounded-full bg-success-soft" /> ZERO PROCESSING FEE
            </div>
            <h3 className="text-headline-md md:text-headline-lg">
              Shop with ShopVPay: Split any order into 3 or 6 Interest-Free EMIs
            </h3>
            <p className="max-w-2xl text-sm text-on-primary/80">
              Specially designed for university students. Verify with your .edu email or College Identity Card. No credit
              history or traditional bank cards required.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setModal("account")}
                className="rounded-lg bg-primary-container px-6 py-2.5 text-sm font-semibold text-on-primary shadow-md transition-all hover:bg-primary active:scale-95"
              >
                Activate VPay Campus Credit
              </button>
              <div className="text-xs text-on-primary/70">Instant ₹25,000 credit limit for enrolled students.</div>
            </div>
          </div>
          <div className="flex justify-center md:col-span-4">
            <div className="flex h-44 w-72 flex-col justify-between rounded-2xl border border-on-primary/20 bg-gradient-to-tr from-primary to-secondary p-4 shadow-2xl transition-transform hover:rotate-0 md:rotate-3">
              <div className="flex items-start justify-between">
                <span className="text-sm font-bold tracking-tight">ShopVPay Student</span>
                <Icon name="contactless" className="text-on-primary/90" />
              </div>
              <div className="space-y-1">
                <div className="font-mono text-base tracking-widest text-on-primary/90">•••• 8824 0192</div>
                <div className="flex items-end justify-between font-mono text-[10px] text-on-primary/75">
                  <span>CAMPUS VIP ACCESS</span>
                  <span>0% EMI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const reviews = [
  {
    quote:
      "Got my Raspberry Pi 5 starter kit and ESP32 boards delivered right to my hostel within 48 hours. Used the CAMPUSVIP coupon and got flat ₹300 off!",
    initials: "AK",
    name: "Aarav Kulkarni",
    meta: "B.Tech CSE, IIT Bombay • Verified Buyer",
    tone: "bg-primary-fixed text-primary",
  },
  {
    quote:
      "The 0% interest EMI option on VPay made buying the ANC headphones so manageable without bothering my parents. Flawless audio for study sessions.",
    initials: "RM",
    name: "Rhea Menon",
    meta: "Design Major, NID • Verified Buyer",
    tone: "bg-secondary-fixed text-secondary",
  },
  {
    quote:
      "Finding genuine Casio scientific calculators and reliable 100W GaN chargers in local shops was tough. ShopVPay is a lifesaver for engineering kids.",
    initials: "TS",
    name: "Tanmay Sharma",
    meta: "ECE Student, BITS Pilani • Verified Buyer",
    tone: "bg-tertiary-fixed text-tertiary",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h3 className="text-headline-md text-on-surface">Loved by 45,000+ Students Across 120 Campuses</h3>
        <p className="mt-1 text-xs text-on-surface-variant">
          Real feedback from coders, designers, and students shopping with ShopVPay.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <figure
            key={r.name}
            className="flex flex-col justify-between rounded-xl border border-outline-variant/40 bg-surface-lowest p-6 shadow-sm"
          >
            <div>
              <div className="mb-3 flex text-star" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" fill className="text-sm" />
                ))}
              </div>
              <blockquote className="text-sm italic text-on-surface">“{r.quote}”</blockquote>
            </div>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-outline-variant/20 pt-4">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${r.tone}`}>
                {r.initials}
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface">{r.name}</div>
                <div className="text-[11px] text-outline">{r.meta}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

const footerCols = [
  {
    title: "Student Programs",
    links: [
      ["Student Perks", "#student-hub"],
      ["VPay Financing", "#emi-calculator"],
      ["0% Interest EMI", "#emi-calculator"],
      ["College Campus Ambassadors", "#"],
    ],
  },
  {
    title: "Customer Support",
    links: [
      ["Warranty & Returns", "#"],
      ["Track Your Order", "#"],
      ["Developer IoT API", "#"],
      ["Hostel Bulk Orders", "#"],
    ],
  },
  {
    title: "Legal & Safety",
    links: [
      ["Privacy Policy", "#"],
      ["Terms of Service", "#"],
      ["Fair Usage EMI Policy", "#"],
      ["Security Disclosure", "#"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-outline-variant/40 bg-surface-low">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="space-y-4 md:col-span-2">
            <img src={LOGO_URL} alt="ShopVPay Logo" className="h-8 w-auto" />
            <p className="max-w-sm text-xs text-on-surface-variant">
              India's premiere student-first technology commerce portal. Providing high-performance gear, verified
              discounts, and zero-friction financing.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant">
              <span className="flex items-center gap-1">
                <Icon name="verified_user" className="text-sm text-secondary" /> 256-Bit SSL Encrypted
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Icon name="school" className="text-sm text-secondary" /> Verified Campus Hub
              </span>
            </div>
          </div>
          {footerCols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-semibold text-on-surface">{col.title}</h4>
              <ul className="space-y-2 text-xs text-on-surface-variant">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="transition-colors hover:text-primary">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant/30 pt-6 md:flex-row">
          <p className="text-center text-xs text-on-surface-variant md:text-left">
            © {new Date().getFullYear()} ShopVPay Technologies Inc. All rights reserved. SHOP SMART • PAY EASY.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-on-surface-variant">
            {["UPI", "GPay", "PhonePe", "RuPay", "Visa / MC"].map((b) => (
              <span key={b} className="rounded border border-outline-variant/50 bg-surface-lowest px-2 py-1 font-bold">
                {b}
              </span>
            ))}
            <span className="rounded bg-primary-fixed px-2 py-1 font-bold text-primary">0% VPay EMI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
