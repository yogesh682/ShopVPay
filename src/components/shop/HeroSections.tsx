import { useEffect, useState } from "react";
import { flashDeals, HERO_URL } from "@/data/products";
import { FlashCard } from "./ProductCard";
import { Icon } from "./ShopProvider";

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 md:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-gradient-to-br from-surface-container via-surface-high to-surface-lowest shadow-lg">
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary-container/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-10 h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />
        <div className="relative z-10 grid grid-cols-1 items-center gap-8 p-6 md:p-12 lg:grid-cols-12">
          <div className="space-y-5 text-center lg:col-span-6 lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-fixed/80 px-3 py-1 text-xs font-semibold text-on-primary-fixed">
              <Icon name="verified" className="text-xs text-primary" /> ShopVPay Guaranteed 0% EMI for Students
            </div>
            <h1 className="text-display-mobile leading-tight tracking-tight text-on-surface md:text-display">
              Shop More. <br />
              <span className="text-brand-gradient">Pay Easy.</span>
            </h1>
            <p className="mx-auto max-w-xl text-body-lg text-on-surface-variant lg:mx-0">
              Your One-Stop Online Shopping Destination for College Tech, Engineering Kits, Audio Gear &amp; Student
              Gadgets. Zero interest EMI on your college ID.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
              <a
                href="#student-hub"
                className="inline-flex items-center gap-2 rounded-lg bg-cta-gradient px-6 py-3 text-title-md text-on-primary shadow-glow transition-all hover:opacity-95 active:scale-95"
              >
                Shop Deals Now <Icon name="arrow_forward" className="text-lg" />
              </a>
              <a
                href="#student-hub"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-secondary bg-surface-lowest px-5 py-3 text-title-md text-secondary transition-all hover:bg-secondary/5"
              >
                <Icon name="school" className="text-lg" /> Explore Student Packs
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs font-semibold text-on-surface-variant lg:justify-start">
              <span className="flex items-center gap-1.5">
                <Icon name="bolt" className="text-base text-secondary" /> Instant Approval
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="shield" className="text-base text-secondary" /> Safe VPay Gate
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="cached" className="text-base text-secondary" /> 7 Days Return
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center lg:col-span-6">
            <div className="relative flex aspect-square w-full max-w-lg items-center justify-center">
              <div className="absolute h-80 w-80 rounded-full bg-gradient-to-tr from-secondary-fixed/50 to-primary-fixed/40 blur-xl" />
              <img
                src={HERO_URL}
                alt="Featured student tech bundle: laptop, earbuds, smartphone, smartwatch and headphones"
                className="relative z-10 h-full w-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 rounded-xl border border-outline-variant/40 bg-surface-lowest/95 p-3 shadow-lg backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container font-bold text-on-primary">
                  VP
                </div>
                <div>
                  <div className="text-xs font-bold text-on-surface">VPay Flexi-Credit</div>
                  <div className="text-[11px] font-medium text-primary">Pay ₹499/mo with 0% Interest</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const values = [
  { icon: "local_shipping", title: "Free Shipping", text: "On all orders above ₹499", tone: "bg-secondary-fixed text-secondary" },
  { icon: "published_with_changes", title: "Easy 7-Day Returns", text: "Hassle-free doorstep pickup", tone: "bg-primary-fixed text-primary" },
  { icon: "lock_clock", title: "100% Safe Payments", text: "UPI, EMI, RuPay & VPay", tone: "bg-secondary-fixed text-secondary" },
  { icon: "support_agent", title: "24/7 Tech Support", text: "Dedicated college helpline", tone: "bg-tertiary-fixed text-tertiary" },
  { icon: "local_offer", title: "Student Perks", text: "Extra 15% Campus Rebate", tone: "bg-primary-fixed text-primary-container" },
];

export function ValueBar() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <div className="grid grid-cols-2 gap-3 rounded-xl border border-outline-variant/40 bg-surface-lowest p-5 text-center shadow-sm md:grid-cols-5 md:gap-4 md:text-left">
        {values.map((v, i) => (
          <div
            key={v.title}
            className={`flex items-center gap-3 p-2 ${i === values.length - 1 ? "col-span-2 justify-center md:col-span-1 md:justify-start" : ""}`}
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${v.tone}`}>
              <Icon name={v.icon} />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-on-surface md:text-sm">{v.title}</h4>
              <p className="text-[11px] text-on-surface-variant">{v.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const START = 5 * 3600 + 42 * 60 + 19;
const pad = (n: number) => String(n).padStart(2, "0");

function Countdown() {
  const [left, setLeft] = useState(START);
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s <= 1 ? 24 * 3600 : s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(left / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = left % 60;
  const box = "rounded bg-inverse-surface px-2.5 py-1 text-sm font-bold text-inverse-on-surface";
  return (
    <div className="flex items-center gap-2 font-mono" aria-label="Flash deals end in">
      <span className="mr-1 text-xs font-bold uppercase text-on-surface-variant">Ends In:</span>
      <div className={box}>{pad(h)}</div>
      <span className="font-bold text-on-surface">:</span>
      <div className={box}>{pad(m)}</div>
      <span className="font-bold text-on-surface">:</span>
      <div className={`${box} text-error`}>{pad(s)}</div>
    </div>
  );
}

export function FlashDeals() {
  return (
    <section id="flash-deals" className="mx-auto max-w-7xl scroll-mt-32 px-4 md:px-8">
      <div className="rounded-2xl border border-outline-variant/30 bg-gradient-to-r from-surface-high to-surface-low p-6">
        <div className="flex flex-col items-center justify-between gap-4 border-b border-outline-variant/30 pb-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 animate-ping rounded-full bg-error" />
            <div>
              <h2 className="flex flex-wrap items-center gap-2 text-headline-md text-on-surface">
                Lightning Flash Deals
                <span className="rounded-full border border-error/20 bg-error/10 px-2.5 py-0.5 text-xs font-semibold text-error">
                  Limited Stock
                </span>
              </h2>
              <p className="text-xs text-on-surface-variant">Unbeatable prices on high-demand essentials. Resets nightly.</p>
            </div>
          </div>
          <Countdown />
        </div>
        <div className="grid grid-cols-1 gap-5 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {flashDeals.map((p) => (
            <FlashCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
