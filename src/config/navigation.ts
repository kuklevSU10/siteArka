export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// B2C main navigation
export const mainNavigation: NavItem[] = [
  {
    label: 'Наши работы',
    href: '#portfolio',
    children: [
      { label: 'Частные интерьеры', href: '#private' },
      { label: 'Коммерческие пространства', href: '#commercial' },
      { label: 'Проекты для девелоперов', href: '#developers' },
    ]
  },
  { label: 'Пакеты услуг', href: '#packages' },
  { label: 'О нас', href: '#about' },
  { label: 'Контакты', href: '#contacts' },
];

// B2B navigation items
export const b2bNavigation: NavItem[] = [
  { label: 'B2B Услуги', href: '/b2b' },
  { label: 'Дизайн МОП', href: '/b2b/mop' },
  { label: 'Дизайн паркинга', href: '/b2b/parking' },
  { label: 'Планировочный аудит', href: '/b2b/planning-audit' },
];

// Footer navigation
export const footerNavigation = {
  services: [
    { label: 'Дизайн интерьера', href: '/services' },
    { label: 'Пакеты и цены', href: '/pricing' },
    { label: 'Процесс работы', href: '/process' },
    { label: 'Портфолио', href: '/portfolio' },
  ],
  b2b: [
    { label: 'B2B Услуги', href: '/b2b' },
    { label: 'Дизайн МОП', href: '/b2b/mop' },
    { label: 'Дизайн паркинга', href: '/b2b/parking' },
    { label: 'Планировочный аудит', href: '/b2b/planning-audit' },
  ],
  company: [
    { label: 'О нас', href: '/about' },
    { label: 'Журнал', href: '/journal' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Контакты', href: '/contact' },
  ],
  legal: [
    { label: 'Политика конфиденциальности', href: '/privacy' },
    { label: 'Пользовательское соглашение', href: '/terms' },
  ],
} as const;
