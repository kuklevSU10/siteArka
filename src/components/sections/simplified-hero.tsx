"use client"

import { motion } from "framer-motion"

export function SimplifiedHero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/arka-hero.jpg')" }}
            />

            {/* Optional ultra-light overlay just to ensure text readability if needed, 
          but prompt asks for no darkening gradients. Let's keep it very minimal or none 
          if the image is light enough, but text needs to be readable. 
          Prompt says: "Светлая подача ... Без затемняющих градиентов". 
          Let's use a solid text color that contrasts well. */}

            <div className="relative z-10 flex flex-col items-center justify-center text-center text-foreground px-4 drop-shadow-md">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="font-heading text-6xl md:text-8xl lg:text-9xl tracking-[0.2em] uppercase font-semibold mb-4"
                >
                    АРКА
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="text-lg md:text-2xl tracking-[0.4em] uppercase font-light"
                >
                    дизайн-студия
                </motion.p>
            </div>
        </section>
    )
}
