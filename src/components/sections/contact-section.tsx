"use client"

import { motion } from "framer-motion"
import { fadeIn, defaultTransition } from "@/lib/animations"

export function ContactSection() {
    return (
        <section id="contacts" className="py-24 md:py-40 bg-background border-t border-border">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn} transition={defaultTransition}
                    className="flex flex-col gap-16 md:gap-32"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl uppercase tracking-widest text-foreground leading-none">
                            Контакты
                        </h2>

                        <div className="flex gap-8 md:gap-16 text-xs sm:text-sm tracking-[0.2em] uppercase font-medium text-foreground">
                            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                                Telegram
                            </a>
                            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                                WhatsApp
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                                Instagram
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 md:gap-12">
                        <a
                            href="mailto:info@arkastudio.ru"
                            className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] tracking-tight uppercase text-foreground hover:opacity-70 transition-opacity leading-[0.85] break-all"
                        >
                            info@arkastudio.ru
                        </a>
                        <a
                            href="tel:+74951234567"
                            className="text-lg md:text-2xl font-light tracking-[0.3em] uppercase text-foreground hover:opacity-70 transition-opacity"
                        >
                            +7 (495) 123-45-67
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
