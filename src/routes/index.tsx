import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { Department } from "@/data/products";
import { Header, type SearchCategory } from "@/components/shop/Header";
import { FlashDeals, Hero, ValueBar } from "@/components/shop/HeroSections";
import { StudentHub, type SortKey } from "@/components/shop/StudentHub";
import { EmiBanner, Footer, Testimonials } from "@/components/shop/LowerSections";
import { AccountModal, CartDrawer, CheckoutModal, Toast } from "@/components/shop/Overlays";
import { ShopProvider } from "@/components/shop/ShopProvider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShopVPay — Shop Smart, Pay Easy | Student Tech Hub" },
      {
        name: "description",
        content:
          "Student gadgets, coding kits, laptops and audio gear with 0% EMI on your college ID. Flash deals and campus discounts.",
      },
      { property: "og:title", content: "ShopVPay — Shop Smart, Pay Easy" },
      {
        property: "og:description",
        content: "College tech, engineering kits and audio gear with interest-free VPay EMI for students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function scrollToHub() {
  requestAnimationFrame(() => document.getElementById("student-hub")?.scrollIntoView({ behavior: "smooth" }));
}

function Index() {
  const [dept, setDept] = useState<Department>("mobile");
  const [sort, setSort] = useState<SortKey>("popular");
  const [search, setSearch] = useState<{ query: string; category: SearchCategory } | null>(null);

  const goToDept = (d: Department) => {
    setSearch(null);
    setDept(d);
    scrollToHub();
  };

  return (
    <ShopProvider>
      <Header
        onDepartment={goToDept}
        onSearch={(query, category) => {
          if (!query.trim() && category !== "all") {
            goToDept(category);
            return;
          }
          setSearch(query.trim() || category !== "all" ? { query: query.trim(), category } : null);
          scrollToHub();
        }}
      />
      <main className="space-y-12 pb-16">
        <Hero />
        <ValueBar />
        <FlashDeals />
        <StudentHub
          active={dept}
          onTab={(d) => {
            setSearch(null);
            setDept(d);
          }}
          sort={sort}
          onSort={setSort}
          search={search}
          onClearSearch={() => setSearch(null)}
        />
        <EmiBanner />
        <Testimonials />
      </main>
      <Footer />
      <CartDrawer />
      <CheckoutModal />
      <AccountModal />
      <Toast />
    </ShopProvider>
  );
}
