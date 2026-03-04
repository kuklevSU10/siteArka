export function ContactSection() {
    return (
        <section id="contacts" className="py-24 md:py-32 bg-muted/5 border-t border-border/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                    <div>
                        <h2 className="font-heading text-4xl md:text-5xl uppercase tracking-wider text-foreground mb-12">
                            Контакты
                        </h2>
                        <div className="flex flex-col gap-8 text-xl md:text-2xl font-light text-foreground">
                            <a href="tel:+7XXXXXXXXXX" className="hover:text-primary transition-colors">
                                +7 (XXX) XXX-XX-XX
                            </a>
                            <a href="mailto:hello@arkastudio.test" className="hover:text-primary transition-colors block">
                                hello@arkastudio.test
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col justify-end md:items-end">
                        <h3 className="font-heading text-xl uppercase tracking-widest text-muted-foreground mb-8">
                            Мессенджеры и соцсети
                        </h3>
                        <div className="flex flex-col gap-6 text-xl font-light text-foreground md:items-end">
                            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                Telegram
                            </a>
                            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                WhatsApp
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                Instagram
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
