"use client"

import { motion } from "framer-motion"
import { fadeIn, defaultTransition } from "@/lib/animations"

export function StrictPackages() {
    const packages = [
        {
            title: "Концепция + планировка",
            price: "от 15 000 ₽",
            list: "Планировочное решение, Цветовая палитра, Стилистическое направление, Схемы инженерных систем, Базовые рабочие чертежи",
        },
        {
            title: "Полный дизайн-проект",
            price: "от 90 000 ₽",
            list: "Концепция + планировка, 3D-визуализация, Полный комплект рабочих чертежей, Ведомость отделочных материалов, Спецификация мебели и материалов",
        },
        {
            title: "Полный цикл",
            price: "от 120 000 ₽",
            list: "Полный дизайн-проект, Авторский надзор, Комплектация, Закупка мебели и материалов, Координация подрядчиков",
        }
    ]

    return (
        <section id="packages" className="py-24 md:py-40 bg-background">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn} transition={defaultTransition}
                    className="font-heading text-4xl md:text-6xl lg:text-7xl uppercase tracking-widest text-foreground mb-16 md:mb-32"
                >
                    Услуги<br />
                    <span className="text-muted-foreground">и цены</span>
                </motion.h2>

                <div className="flex flex-col border-t border-border">
                    {packages.map((pkg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ ...defaultTransition, delay: i * 0.1 }}
                            className="group flex flex-col md:flex-row py-8 md:py-12 border-b border-border hover:bg-muted/10 transition-colors duration-500"
                        >
                            <div className="md:w-1/3 mb-4 md:mb-0">
                                <h3 className="text-xs md:text-sm uppercase tracking-[0.2em] text-foreground font-medium">
                                    {pkg.title}
                                </h3>
                            </div>

                            <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0">
                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed tracking-wide">
                                    {pkg.list}
                                </p>
                            </div>

                            <div className="md:w-1/6 md:text-right">
                                <span className="text-xs md:text-sm uppercase tracking-widest text-foreground">
                                    {pkg.price}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
