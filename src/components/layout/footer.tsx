"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer
      role="contentinfo"
      aria-label="Подвал сайта"
      className="bg-muted/30 border-t border-border mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-foreground font-medium uppercase tracking-wider">
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
