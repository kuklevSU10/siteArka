/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://arkastudio.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
  additionalPaths: async () => [
    { loc: '/pricing', changefreq: 'monthly', priority: 0.8 },
    { loc: '/process', changefreq: 'monthly', priority: 0.7 },
    { loc: '/b2b', changefreq: 'monthly', priority: 0.7 },
    { loc: '/b2b/mop', changefreq: 'monthly', priority: 0.6 },
    { loc: '/b2b/parking', changefreq: 'monthly', priority: 0.6 },
    { loc: '/b2b/planning-audit', changefreq: 'monthly', priority: 0.6 },
    { loc: '/privacy', changefreq: 'yearly', priority: 0.3 },
    { loc: '/terms', changefreq: 'yearly', priority: 0.3 },
  ],
};
