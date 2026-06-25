// book-data.js - контент каталога. Меняется только здесь при появлении реальных данных.
var PROJECTS = [
  {
    number: "01",
    name: "Studio",
    subtitle: "Светлый сценарий",
    description: "Тёплый нейтральный фон, дерево и пыльно-голубой акцент. Открытая планировка, где кухня, гостиная и зона сна собраны в одну спокойную среду.",
    palette: ["#E7E1D6", "#9DB0BE", "#8C6A4A"],
    pageBg: "#E7E1D6",
    accent: "#7E94A4",
    text: "#1A1A1A",
    layout: "stack",
    hero: { src: "assets/interiors/arka-int01-studio-kitchen-living", caption: "Кухня-гостиная" },
    photos: [
      { src: "assets/interiors/arka-int01-studio-living-sleep", caption: "Гостиная-спальня" },
      { src: "assets/interiors/arka-int01-studio-kitchen", caption: "Кухня" },
      { src: "assets/interiors/arka-int01-studio-blue-bath", caption: "Ванная" }
    ]
  },
  {
    number: "02",
    name: "Classic",
    subtitle: "Неоклассика без избыточности",
    description: "Лепнина, фарфорово-голубой рисунок и кремовая палитра. Пропорция и свет важнее декора.",
    palette: ["#EDE7DB", "#9FB3C7", "#C8A968"],
    pageBg: "#EDE7DB",
    accent: "#8FA6BC",
    text: "#1A1A1A",
    layout: "band",
    hero: { src: "assets/interiors/arka-int02-classic-bedroom", caption: "Спальня" },
    photos: [
      { src: "assets/interiors/arka-int02-classic-kitchen-living", caption: "Кухня-гостиная" },
      { src: "assets/interiors/arka-int02-classic-kids", caption: "Детская" },
      { src: "assets/interiors/arka-int02-classic-bath", caption: "Ванная" }
    ]
  },
  {
    number: "03",
    name: "Burgundy",
    subtitle: "Тёмная тёплая палитра",
    description: "Морёное дерево, терракота и приглушённый свет. Камерная среда, где статус считывается через материал.",
    palette: ["#A6442E", "#C8A968", "#3A2A22"],
    pageBg: "#A6442E",
    accent: "#C8A968",
    text: "#F8F6F2",
    layout: "climax",
    hero: { src: "assets/interiors/arka-int03-burgundy-kitchen", caption: "Кухня" },
    photos: [
      { src: "assets/interiors/arka-int03-burgundy-bedroom", caption: "Спальня" },
      { src: "assets/interiors/arka-int03-burgundy-shower", caption: "Душевая" },
      { src: "assets/interiors/arka-int03-burgundy-wardrobe", caption: "Гардеробная" }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) { module.exports = { PROJECTS: PROJECTS }; }
if (typeof window !== "undefined") { window.ARKA_PROJECTS = PROJECTS; }
