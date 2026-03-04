import Image from "next/image"

export function AboutSection() {
    return (
        <section id="about" className="py-24 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 relative aspect-[4/5] overflow-hidden bg-muted/10 w-full max-w-md mx-auto lg:max-w-none">
                        {/* Using a placeholder or an existing image for About section. */}
                        <Image
                            src="/images/photo_main.jpg"
                            alt="О студии АРКА"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="order-1 lg:order-2 flex flex-col justify-center max-w-2xl">
                        <h2 className="font-heading text-4xl uppercase tracking-wider text-foreground mb-12">
                            О нас
                        </h2>

                        <div className="space-y-6 text-xl md:text-2xl font-light text-foreground leading-relaxed">
                            <p>
                                АРКА — студия, созданная тремя практикующими специалистами в сфере девелопмента и проектирования.
                            </p>
                            <p>
                                Мы работали над жилыми комплексами и коммерческими объектами, которые реализованы в городе. Этот опыт мы перенесли в частную практику — чтобы создавать продуманные интерьеры без завышенных бюджетов и лишних наценок.
                            </p>
                            <p>
                                Мы сами ведём проекты. Без посредников. Без искусственного усложнения.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
