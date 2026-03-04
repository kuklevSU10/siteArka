"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { fadeIn, defaultTransition } from "@/lib/animations"

interface ProjectCategoryProps {
    id: string
    title: string
    subtitle: string
    images: string[]
}

export function ProjectCategory({ id, title, subtitle, images }: ProjectCategoryProps) {
    return (
        <section id={id} className="pt-24 pb-32 md:pt-32 md:pb-40 bg-background border-t border-border">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-20 md:mb-32 flex flex-col md:flex-row md:justify-between md:items-end gap-8">
                    <motion.h2
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                        variants={fadeIn} transition={defaultTransition}
                        className="font-heading text-4xl md:text-6xl lg:text-7xl uppercase tracking-widest text-foreground leading-none"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                        variants={fadeIn} transition={{ ...defaultTransition, delay: 0.1 }}
                        className="text-xs md:text-sm tracking-[0.15em] uppercase text-muted-foreground font-light max-w-sm md:text-right"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 gap-x-12 lg:gap-x-24">
                    {images.map((src, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ ...defaultTransition, delay: i * 0.1 }}
                            className="group cursor-pointer flex flex-col gap-4"
                        >
                            <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-muted/10 w-full">
                                <Image
                                    src={src}
                                    alt={`${title} - пример ${i + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                            </div>
                            <div className="flex justify-between items-center text-[10px] sm:text-xs tracking-[0.2em] uppercase text-foreground/60 group-hover:text-foreground transition-colors duration-300">
                                <span>Проект 0{i + 1}</span>
                                <span>Реализация</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
