"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { fadeIn, defaultTransition } from "@/lib/animations"

export function SimplifiedHero() {
    return (
        <section className="relative h-screen w-full bg-background flex flex-col justify-end pb-12 pt-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/categories/residential.jpg"
                    alt="Интерьер АРКА"
                    fill
                    className="object-cover opacity-90 dark:opacity-60 grayscale-[20%]"
                    priority
                    sizes="100vw"
                />
                {/* Subtle gradient overlay to ensure text readability without heavy shadows */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ ...defaultTransition, delay: 0.2 }}
                    className="flex flex-col gap-6"
                >
                    <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] tracking-tight text-foreground uppercase leading-[0.85]">
                        АРКА
                        <br />
                        <span className="text-muted-foreground/80 tracking-[0.3em] text-2xl md:text-4xl">дизайн-студия</span>
                    </h1>
                    <p className="max-w-md mt-8 text-xs md:text-sm tracking-[0.2em] uppercase text-foreground/80 leading-relaxed font-medium">
                        Архитектурный подход к проектированию частных и коммерческих интерьеров. Строгая эстетика, где нет ничего лишнего.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
