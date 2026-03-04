import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Providers } from "@/providers";
import { siteConfig } from "@/config/site";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { CustomCursor } from "@/components/ui/custom-cursor";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "АРКА | Дизайн-студия интерьера",
    template: "%s | АРКА",
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "АРКА | Дизайн-студия интерьера",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "АРКА — студия дизайна интерьера в Москве",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "АРКА | Дизайн-студия интерьера",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${cormorantGaramond.variable} ${manrope.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none"
        >
          Перейти к содержимому
        </a>
        <OrganizationJsonLd />
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
