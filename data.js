// 綠洲所 Oasis Studio — shared data
// Unsplash plant photos (real URLs, content-addressable)

window.OASIS_DATA = {
  brand: {
    name: '綠洲所',
    nameEn: 'Oasis Studio',
    slogan: '打造屬於你的城市綠洲',
    tagline: '為都市生活注入一抹綠意',
  },

  nav: ['首頁', '商品', '情境推薦', '養護指南', '門市', '關於我們'],

  // Hero rotating slides
  heroSlides: [
    {
      eyebrow: '春季新品 — 04/28 上市',
      title: '在城市裡\n種一片自己的森林',
      sub: '為十坪小套房、為加班的辦公桌、為剛搬離家的你。\n從一盆植物開始，慢慢長出生活的形狀。',
      cta: '逛逛新品',
      ctaSub: '探索養護指南',
      img: 'https://images.unsplash.com/photo-1525498128493-380d1990a112?w=1200&q=80',
      imgAlt: 'Monstera 龜背芋',
    },
    {
      eyebrow: '本週主打 — 新手友善',
      title: '從第一盆\n開始的儀式感',
      sub: '精選 12 款耐陰、耐旱、不挑光的植物，\n適合朝北窗、無自然光的小空間。',
      cta: '查看耐陰選集',
      ctaSub: '我是新手',
      img: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=1200&q=80',
      imgAlt: '虎尾蘭',
    },
  ],

  // Promo banner — countdown to end of week
  promo: {
    label: '春季限定',
    title: '滿 1,200 折 200',
    sub: '全館植物 + 陶盆 5 折起｜首購再送養護手冊',
    code: 'OASIS200',
    endsAt: '2026-05-05T23:59:59',
  },

  // Featured products
  featured: [
    {
      id: 'p1',
      name: '龜背芋',
      latin: 'Monstera deliciosa',
      tag: '熱賣',
      price: 880,
      original: 1080,
      light: '中等光',
      water: '一週一次',
      pet: false,
      img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80',
      img2: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80',
    },
    {
      id: 'p2',
      name: '虎尾蘭',
      latin: 'Sansevieria',
      tag: '新手友善',
      price: 480,
      light: '低光也行',
      water: '兩週一次',
      pet: false,
      img: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=800&q=80',
      img2: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=800&q=80',
    },
    {
      id: 'p3',
      name: '琴葉榕',
      latin: 'Ficus lyrata',
      tag: '空間主角',
      price: 1480,
      original: 1680,
      light: '明亮散光',
      water: '一週一次',
      pet: false,
      img: 'https://images.unsplash.com/photo-1502810190503-8303352d0dd1?w=800&q=80',
      img2: 'https://images.unsplash.com/photo-1591958911259-bee2173bdccc?w=800&q=80',
    },
    {
      id: 'p4',
      name: '橘子小盆栽',
      latin: 'Citrus mitis',
      tag: '陽光最愛',
      price: 680,
      light: '需要陽光',
      water: '兩三天一次',
      pet: true,
      img: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&q=80',
      img2: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    },
    {
      id: 'p5',
      name: '空氣鳳梨組',
      latin: 'Tillandsia',
      tag: '免土壤',
      price: 380,
      light: '明亮散光',
      water: '一週浸泡',
      pet: true,
      img: 'https://images.unsplash.com/photo-1567748157439-651aca2ff064?w=800&q=80',
      img2: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=800&q=80',
    },
    {
      id: 'p6',
      name: '愛心榕',
      latin: 'Ficus umbellata',
      tag: '本週新到',
      price: 1280,
      light: '明亮散光',
      water: '一週一次',
      pet: false,
      img: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800&q=80',
      img2: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80',
    },
  ],

  // Categories
  categories: [
    { id: 'indoor', name: '室內植物', count: 42, img: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80' },
    { id: 'succulent', name: '多肉植物', count: 28, img: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80' },
    { id: 'air', name: '空氣鳳梨', count: 14, img: 'https://images.unsplash.com/photo-1567748157439-651aca2ff064?w=600&q=80' },
    { id: 'pot', name: '陶盆器皿', count: 36, img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80' },
    { id: 'tool', name: '養護工具', count: 22, img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80' },
  ],

  // Scenario picks
  scenarios: [
    {
      id: 's1',
      title: '給辦公室',
      sub: '耐陰、耐忙、不需要每天澆水',
      tags: ['低光', '一週一次', '小尺寸'],
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    },
    {
      id: 's2',
      title: '給小套房',
      sub: '十坪也能養出叢林感',
      tags: ['垂吊型', '中型', '空間主角'],
      img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80',
    },
    {
      id: 's3',
      title: '給新手',
      sub: '殺不死系列，從這裡開始',
      tags: ['好照顧', '不挑光', '價格親民'],
      img: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80',
    },
  ],

  // Reviews
  reviews: [
    {
      id: 'r1',
      name: '林小姐',
      role: '台北・大安區・工程師',
      text: '搬到台北的小套房本來覺得很冷清，買了一盆龜背芋之後，每天回家都覺得有人在等我。包裝很細心，植物狀況也比想像中好。',
      rating: 5,
      product: '龜背芋',
      img: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80',
    },
    {
      id: 'r2',
      name: 'Wei',
      role: '台中・西區・自由工作者',
      text: '第一次養植物選了虎尾蘭，店家附的養護卡很清楚，三個月過去長出新葉，很有成就感。下次想試試空氣鳳梨。',
      rating: 5,
      product: '虎尾蘭',
      img: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=800&q=80',
    },
    {
      id: 'r3',
      name: '阿哲',
      role: '高雄・前金區・設計師',
      text: '工作室買了三盆琴葉榕當主視覺，氣場直接上來。客服回覆很快，也願意幫忙建議搭配陶盆。',
      rating: 5,
      product: '琴葉榕',
      img: 'https://images.unsplash.com/photo-1591958911259-bee2173bdccc?w=800&q=80',
    },
  ],

  // Blog / care guide
  guides: [
    { id: 'g1', cat: '新手指南', title: '第一盆植物該怎麼選？', sub: '從生活作息、空間光線、性格三個角度切入', read: '5 分鐘', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80' },
    { id: 'g2', cat: '養護技巧', title: '澆水其實是一門哲學', sub: '為什麼「定期澆水」反而是壞習慣？', read: '7 分鐘', img: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&q=80' },
    { id: 'g3', cat: '空間靈感', title: '十坪小套房植物配置法', sub: '三盆植物，三種高度，撐起整個客廳', read: '6 分鐘', img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80' },
  ],
};
