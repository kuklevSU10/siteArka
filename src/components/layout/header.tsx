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
import { ThemeToggle } from "@/components/ui/theme-toggle"
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
            className="flex flex-col hover:opacity-80 transition-opacity"
          >
            <span className="font-heading text-3xl tracking-[0.1em] uppercase font-semibold text-foreground">
              АРКА
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-0.5">
              дизайн-студия
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Основная навигация" className="hidden lg:flex items-center gap-1">
            {mainNavigation.map((item) => (
              <div key={item.label} className="relative group">
                <Link
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
                {item.children && (
                  <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-background border border-border flex flex-col min-w-[280px] shadow-lg py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors uppercase tracking-wide"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
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
                  <SheetTitle className="flex flex-col items-center justify-center">
                    <span className="font-heading text-3xl tracking-[0.1em] uppercase text-foreground">
                      АРКА
                    </span>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-0.5">
                      дизайн-студия
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav aria-label="Мобильная навигация" className="flex flex-col gap-1 mt-8 px-4">
                  {mainNavigation.map((item, index) => (
                    <div key={item.label}>
                      {item.children ? (
                        <div className="py-3 px-4 text-lg tracking-wide text-foreground border-b border-border/50">
                          <span className="opacity-50">{item.label}</span>
                          <div className="flex flex-col gap-2 mt-3 ml-4">
                            {item.children.map((child) => (
                              <SheetClose asChild key={child.label}>
                                <Link
                                  href={child.href}
                                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {child.label}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        </div>
                      ) : (
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
                      )}
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
