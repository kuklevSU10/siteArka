import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SimplifiedHero } from "@/components/sections/simplified-hero";
import { ProjectCategory } from "@/components/sections/project-category";
import { StrictPackages } from "@/components/sections/strict-packages";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { featuredProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "АРКА — дизайн-студия",
  description: "Дизайн-студия АРКА. Частные интерьеры, коммерческие пространства, проекты для девелоперов.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "АРКА — дизайн-студия",
    description: "Проектные решения для жилых и коммерческих объектов.",
    images: ["/images/arka-hero.jpg"],
  },
};

// Getting some placeholder images from the existing data if available
const privateImages = featuredProjects.slice(0, 3).map(p => p.coverImage);
const commercialImages = featuredProjects.slice(3, 6).map(p => p.coverImage);
// fallback for missing images
while (commercialImages.length < 3) commercialImages.push("/images/photo_main.jpg");
const developerImages = Array(3).fill("/images/photo_main.jpg");

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-white">
        {/* 1. Hero */}
        <SimplifiedHero />

        {/* 2. Частные интерьеры */}
        <ProjectCategory
          id="private"
          title="Частные интерьеры"
          subtitle="Интерьеры для жизни — продуманные и функциональные."
          images={privateImages}
        />

        {/* 3. Коммерческие пространства */}
        <ProjectCategory
          id="commercial"
          title="Коммерческие пространства"
          subtitle="Пространства, которые работают на бизнес."
          images={commercialImages}
        />

        {/* 4. Проекты для девелоперов */}
        <ProjectCategory
          id="developers"
          title="Проекты для девелоперов"
          subtitle="Проектные решения для жилых и коммерческих объектов."
          images={developerImages}
        />

        {/* 5. Пакеты услуг */}
        <StrictPackages />

        {/* 6. О нас */}
        <AboutSection />

        {/* 7. Контакты */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
