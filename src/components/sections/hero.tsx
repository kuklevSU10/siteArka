"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import { trackCtaClick } from "@/lib/analytics";
import {
  fadeInUp,
  staggerContainerWithDelay,
  defaultTransition,
} from "@/lib/animations";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  trustHints?: string[];
  className?: string;
}

export function Hero({
  title = "Проектируем интерьеры с инженерной точностью",
  subtitle = "От планировки до последнего выключателя — 80 листов рабочей документации, по которой строители строят без вопросов",
  backgroundImage = "/images/photo_main.jpg",
  primaryCta = { label: "Обсудить проект", href: "/contact" },
  secondaryCta = { label: "Смотреть работы", href: "/portfolio" },
  trustHints = ["5 этапов", "3 контрольные точки", "0 сюрпризов"],
  className,
}: HeroProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section
      className={cn(
        "relative flex items-center justify-center min-h-screen overflow-hidden",
        className
      )}
    >
      {/* Background image */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={backgroundImage}
          alt="Интерьер, спроектированный студией Interior Studio"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={80}
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainerWithDelay(0.15, 0.3)}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32"
      >
        <motion.h1
          variants={fadeInUp}
          transition={{ ...defaultTransition, duration: 1 }}
          className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          transition={{ ...defaultTransition, duration: 0.8 }}
          className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-white/80"
        >
          {subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          transition={{ ...defaultTransition, duration: 0.8 }}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="min-w-[200px] text-base" onClick={() => trackCtaClick("hero_primary_cta", primaryCta.label)}>
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-w-[200px] text-base border-white/30 text-white hover:bg-white/10 hover:text-white"
            onClick={() => trackCtaClick("hero_secondary_cta", secondaryCta.label)}
          >
            <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
          </Button>
        </motion.div>

        {/* Trust hints */}
        {trustHints.length > 0 && (
          <motion.div
            variants={fadeInUp}
            transition={{ ...defaultTransition, duration: 0.8 }}
            className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-x-3 gap-y-3"
          >
            {trustHints.map((hint, index) => (
              <span key={index} className="flex items-center">
                <span className="text-sm md:text-base text-white/70 tracking-wide font-medium">
                  {hint}
                </span>
                {index < trustHints.length - 1 && (
                  <span className="ml-3 text-white/30 select-none" aria-hidden="true">
                    &bull;
                  </span>
                )}
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Bottom fade to blend into content below */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
