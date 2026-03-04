import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SimplifiedHero } from "@/components/sections/simplified-hero";
import { ProjectCategory } from "@/components/sections/project-category";
import { StrictPackages } from "@/components/sections/strict-packages";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
// Using actual distinct photos for each category
const privateImages = ["/images/photo_1.jpg", "/images/photo_2.jpg", "/images/photo_3.jpg"];
const commercialImages = ["/images/photo_4.jpg", "/images/photo_5.jpg", "/images/photo_6.jpg"];
const developerImages = ["/images/photo_7.jpg", "/images/photo_8.jpg", "/images/photo_9.jpg"];

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
