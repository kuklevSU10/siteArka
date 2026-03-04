"use client"

import Image from "next/image"

interface ProjectCategoryProps {
    id: string
    title: string
    subtitle: string
    images: string[]
}

export function ProjectCategory({ id, title, subtitle, images }: ProjectCategoryProps) {
    return (
        <section id={id} className="py-24 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <h2 className="font-heading text-4xl md:text-5xl uppercase tracking-wider text-foreground mb-4">
                        {title}
                    </h2>
                    <p className="text-xl md:text-2xl text-muted-foreground font-light">
                        {subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {images.map((src, i) => (
                        <div key={i} className="relative aspect-[4/5] overflow-hidden bg-muted/20">
                            {/* Note: placeholder logic for actual implementation */}
                            <Image
                                src={src}
                                alt={`${title} - пример ${i + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
