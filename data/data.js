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
    { id: 'g1', cat: '新手指南', title: '第一盆植物該怎麼選？', sub: '從生活作息、空間光線、性格三個角度切入，找到最適合你的第一盆植物。', read: '5 分鐘', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80' },
    { id: 'g2', cat: '養護技巧', title: '澆水其實是一門哲學', sub: '為什麼「定期澆水」反而是壞習慣？學會觀察土壤，才是養活植物的關鍵。', read: '7 分鐘', img: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&q=80' },
    { id: 'g3', cat: '空間靈感', title: '十坪小套房植物配置法', sub: '三盆植物，三種高度，撐起整個客廳的綠意氛圍。', read: '6 分鐘', img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80' },
    { id: 'g4', cat: '新手指南', title: '植物買回家的前 72 小時', sub: '環境適應期是存活關鍵，別急著換盆、施肥，讓植物慢慢適應新家。', read: '4 分鐘', img: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80' },
    { id: 'g5', cat: '養護技巧', title: '黃葉不一定是缺水', sub: '常見的五種黃葉原因與對策，幫你精準判斷植物的健康狀態。', read: '5 分鐘', img: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80' },
    { id: 'g6', cat: '空間靈感', title: '辦公桌上的小森林', sub: '三種適合辦公室的桌上植物組合，讓你的工作空間也能呼吸。', read: '8 分鐘', img: 'https://images.unsplash.com/photo-1567748157439-651aca2ff064?w=600&q=80' },
  ],

  // Store locations
  stores: [
    {
      id: 'st1',
      name: '台北大安店',
      tag: '旗艦店',
      addr: '台北市大安區復興南路一段 126 號 1F',
      hours: '週一至週日 11:00 – 21:00',
      phone: '02-2700-1234',
      desc: '位於捷運大安站旁，三層樓旗艦空間。一樓為選品區，二樓養護教室，三樓植物咖啡廳。',
      img: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=800&q=80',
    },
    {
      id: 'st2',
      name: '台北信義店',
      tag: '新開幕',
      addr: '台北市信義區松壽路 12 號 2F',
      hours: '週一至週日 11:00 – 22:00',
      phone: '02-8780-5678',
      desc: '隱身於信義商圈的都市綠洲，專為小空間設計的迷你植栽與桌上盆景。',
      img: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80',
    },
    {
      id: 'st3',
      name: '台中草悟店',
      addr: '台中市西區英才路 530 號 1F',
      hours: '週二至週日 10:30 – 20:00（週一公休）',
      phone: '04-2305-9876',
      desc: '鄰近草悟道的老宅改建空間，主打中大型觀葉植物與手作陶盆。',
      img: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=800&q=80',
    },
    {
      id: 'st4',
      name: '高雄駁二店',
      addr: '高雄市鹽埕區大勇路 1 號 C7 倉庫',
      hours: '週二至週日 10:00 – 19:00（週一公休）',
      phone: '07-521-3456',
      desc: '駁二藝術特區倉庫改造空間，結合在地藝術家的植物裝置藝術。',
      img: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80',
    },
  ],
};
