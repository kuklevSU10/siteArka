"use client"

import Link from "next/link"
import { Instagram, Linkedin, ArrowRight, Phone } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

import { cn } from "@/lib/utils"
import { footerNavigation } from "@/config/navigation"
import { fadeInUp, staggerContainer, defaultTransition } from "@/lib/animations"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// Pinterest icon is not available in lucide-react, create a simple SVG component
function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="17" x2="12" y2="22" />
      <path d="M8 22l2-5" />
      <path d="M16.5 7.5a4.5 4.5 0 1 0-5.7 6.3L12 17l1.2-3.2a4.5 4.5 0 0 0 3.3-6.3z" />
    </svg>
  )
}

// Map footer navigation section keys to Russian display titles
const sectionTitles: Record<string, string> = {
  services: "Услуги",
  b2b: "Для бизнеса",
  company: "Компания",
  legal: "Юридическое",
}

export function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Set the current year or use a static year
  const currentYear = new Date().getFullYear()

  return (
    <footer
      ref={ref}
      role="contentinfo"
      aria-label="Подвал сайта"
      className="bg-muted/30 border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          transition={defaultTransition}
          className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12"
        >
          {/* Logo and Contact info */}
          <motion.div
            variants={fadeInUp}
            transition={defaultTransition}
            className="lg:col-span-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <Link
                  href="/"
                  className="font-heading text-3xl tracking-[0.1em] uppercase font-semibold text-primary"
                >
                  ARKA
                </Link>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href="tel:+7XXXXXXXXXX"
                    className="text-sm text-foreground hover:text-primary transition-colors duration-300"
                  >
                    +7 (XXX) XXX-XX-XX
                  </a>
                  <a
                    href="mailto:hello@arkastudio.test"
                    className="text-sm text-foreground hover:text-primary transition-colors duration-300"
                  >
                    hello@arkastudio.test
                  </a>
                </div>
              </div>

              {/* Social links */}
              <div className="flex flex-col gap-4">
                <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground hidden md:block">
                  Следите за нами
                </span>
                <div className="flex items-center gap-6">
                  <a
                    href="https://t.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                    aria-label="Telegram"
                  >
                    Telegram
                  </a>
                  <a
                    href="https://whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                    aria-label="WhatsApp"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                    aria-label="Instagram"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <Separator />

        {/* Copyright and Legal Links */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">
            &copy; АРКА
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Пользовательское соглашение
            </Link>
            <Link
              href="/personal-data"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Обработка персональных данных
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
