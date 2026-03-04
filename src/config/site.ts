import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'АРКА',
  description: 'Студия дизайна интерьера в Москве. Проектируем пространства с инженерной точностью — от планировки до последнего выключателя.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://arkastudio.com',
  ogImage: '/og-image.jpg',
  links: {
    instagram: 'https://instagram.com/arkastudio',
    telegram: 'https://t.me/arkastudio',
    whatsapp: 'https://wa.me/79991234567',
  },
};
