"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer
      role="contentinfo"
      aria-label="Подвал сайта"
      className="bg-background pt-12 pb-8 border-t border-border"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

          <p className="text-[10px] tracking-[0.2em] text-foreground/50 uppercase">
            &copy; {new Date().getFullYear()} АРКА Студия. Все права защищены.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <Link
              href="/privacy"
              className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 hover:text-foreground transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/terms"
              className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 hover:text-foreground transition-colors"
            >
              Соглашение
            </Link>
            <Link
              href="/personal-data"
              className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 hover:text-foreground transition-colors"
            >
              Персональные данные
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
