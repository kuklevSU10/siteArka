"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Menu, Phone } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { mainNavigation } from "@/config/navigation"
import { fadeIn, defaultTransition } from "@/lib/animations"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ ...defaultTransition, duration: 0.8 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-3xl tracking-[0.1em] uppercase font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            ARKA
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Основная навигация" className="hidden lg:flex items-center gap-1">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm tracking-wide uppercase",
                  "text-muted-foreground hover:text-foreground",
                  "transition-colors duration-300",
                  "relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2",
                  "after:h-px after:w-0 after:bg-foreground",
                  "after:transition-all after:duration-300",
                  "hover:after:w-full"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* CTA Button — desktop only */}
            <Button
              asChild
              size="sm"
              className="hidden md:inline-flex"
            >
              <Link href="/contact">
                <Phone className="size-4 mr-2" />
                Консультация
              </Link>
            </Button>

            {/* Theme toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground"
                aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="size-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="size-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            )}

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-muted-foreground hover:text-foreground"
                  aria-label="Открыть меню"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:max-w-md border-l border-border"
              >
                <SheetHeader>
                  <SheetTitle className="font-heading text-3xl tracking-[0.1em] uppercase text-primary">
                    ARKA
                  </SheetTitle>
                </SheetHeader>
                <nav aria-label="Мобильная навигация" className="flex flex-col gap-1 mt-8 px-4">
                  {mainNavigation.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.08,
                        duration: 0.4,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "block py-3 px-4 text-lg tracking-wide",
                            "text-muted-foreground hover:text-foreground",
                            "transition-colors duration-300",
                            "border-b border-border/50"
                          )}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <div className="mt-8 px-4">
                  <SheetClose asChild>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/contact">
                        <Phone className="size-4 mr-2" />
                        Консультация
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
