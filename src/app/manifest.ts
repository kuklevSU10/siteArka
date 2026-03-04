import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'АРКА',
    short_name: 'АРКА',
    description: 'Студия дизайна интерьера в Москве. Проектируем пространства с инженерной точностью.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F0EB',
    theme_color: '#C09683',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
