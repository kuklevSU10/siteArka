"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

export function StrictPackages() {
    const packages = [
        {
            title: "Концепция + планировка",
            price: "от 15 000 ₽",
            list: [
                "Планировочное решение",
                "Цветовая палитра",
                "Стилистическое направление",
                "Схемы инженерных систем",
                "Базовые рабочие чертежи"
            ],
            button: "Заказать концепцию"
        },
        {
            title: "Полный дизайн-проект",
            price: "от 90 000 ₽",
            list: [
                "Всё из «Концепция + планировка»",
                "3D-визуализация",
                "Полный комплект рабочих чертежей",
                "Ведомость отделочных материалов",
                "Спецификация мебели и материалов"
            ],
            button: "Заказать проект"
        },
        {
            title: "Полный цикл",
            price: "от 90 000 ₽ + 30 000 ₽/мес",
            list: [
                "Полный дизайн-проект",
                "Авторский надзор",
                "Комплектация",
                "Закупка мебели и материалов",
                "Координация подрядчиков"
            ],
            button: "Обсудить проект"
        }
    ]

    return (
        <section id="packages" className="py-24 md:py-32 bg-white border-t border-border/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-heading text-4xl md:text-5xl uppercase tracking-wider text-foreground mb-16 text-center">
                    Пакеты услуг
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex flex-col p-8 lg:p-12 border border-border/50 bg-white/50 backdrop-blur-sm rounded-none",
                                "transition-all duration-300 ease-in-out",
                                "hover:bg-primary/5 hover:border-primary/30 hover:shadow-lg cursor-default"
                            )}
                        >
                            <h3 className="font-heading text-2xl uppercase tracking-wide mb-4 text-foreground">
                                {pkg.title}
                            </h3>
                            <p className="text-xl font-medium text-primary mb-8 pb-8 border-b border-border/50">
                                {pkg.price}
                            </p>

                            <ul className="flex-1 space-y-4 mb-12">
                                {pkg.list.map((item, j) => (
                                    <li key={j} className="text-muted-foreground flex items-start">
                                        <span className="mr-3 text-primary/50 text-sm mt-1">■</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="#contacts"
                                className={cn(
                                    "inline-flex items-center justify-center w-full py-4 px-6",
                                    "border border-foreground text-foreground uppercase tracking-wider text-sm font-medium",
                                    "transition-colors duration-300 hover:bg-foreground hover:text-background"
                                )}
                            >
                                {pkg.button}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
