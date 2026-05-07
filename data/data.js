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
    {
      id: 'g1', cat: '新手指南', title: '第一盆植物該怎麼選？', sub: '從生活作息、空間光線、性格三個角度切入，找到最適合你的第一盆植物。', read: '5 分鐘', date: '2026-04-12',
      img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
      img2: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=800&q=80',
      body: [
        { type: 'p', text: '選植物跟選室友有點像——你不需要找最漂亮的，而是最適合跟你一起生活的。很多人第一盆植物買回來沒多久就枯了，不是因為不用心，而是從一開始就選錯了。' },
        { type: 'h2', text: '從你的生活作息開始' },
        { type: 'p', text: '你是朝九晚十的上班族，還是時間比較彈性的自由工作者？如果你常常出差或加班到很晚，需要的是一盆「耐忽略」的植物——像虎尾蘭、ZZ 植物（美鐵芋）這類兩週澆一次水也活得好好的品種。' },
        { type: 'p', text: '相反地，如果你每天都有固定的晨間儀式，喜歡花十分鐘跟植物相處，那對澆水頻率和光照稍有要求的龜背芋、琴葉榕也很適合你。' },
        { type: 'h2', text: '看看你家的光線' },
        { type: 'p', text: '光線是決定植物存活的最關鍵因素。在挑選之前，先觀察你打算放植物的位置：' },
        { type: 'tip', title: '簡易光線判斷法', text: '在你想放植物的地方，伸出手看影子。影子清晰＝明亮散光，適合大部分植物；影子模糊＝中等光，選擇耐陰品種；幾乎沒有影子＝低光環境，只有少數植物能存活。' },
        { type: 'h2', text: '性格也是一種選擇指標' },
        { type: 'p', text: '聽起來很玄，但如果你是那種「看到土乾就焦慮」的類型，多肉植物反而不適合你——因為它們最怕被過度關愛（澆太多水）。這類人適合喜歡濕潤環境的蕨類或常春藤。' },
        { type: 'p', text: '如果你是「放著就好不想管太多」的人，空氣鳳梨和虎尾蘭是你的最佳夥伴。' },
        { type: 'h2', text: '我們的推薦清單' },
        { type: 'p', text: '如果你還是猶豫不決，以下三盆是綠洲所最推薦的「第一盆植物」：虎尾蘭（最耐操）、黃金葛（最便宜好養）、龜背芋（最有存在感）。從這裡開始，慢慢找到屬於你的植物風格。' },
      ]
    },
    {
      id: 'g2', cat: '養護技巧', title: '澆水其實是一門哲學', sub: '為什麼「定期澆水」反而是壞習慣？學會觀察土壤，才是養活植物的關鍵。', read: '7 分鐘', date: '2026-04-08',
      img: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&q=80',
      img2: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80',
      body: [
        { type: 'p', text: '「每週澆一次水」大概是最常聽到的養植物建議，也是最多植物因此死掉的原因。植物不是鬧鐘，它不會每七天準時口渴。' },
        { type: 'h2', text: '為什麼定期澆水是壞習慣？' },
        { type: 'p', text: '植物吸收水分的速度取決於非常多因素：季節、溫度、濕度、盆器材質、土壤配方、根系發展程度。夏天可能三天就乾了，冬天可能兩週都還濕。如果你不管三七二十一每週倒一杯水下去，輕則爛根，重則整盆腐爛。' },
        { type: 'h2', text: '學會用手指檢查' },
        { type: 'tip', title: '兩公分法則', text: '把手指插進土壤約兩公分深。如果感覺乾燥，就可以澆水了；如果還有濕潤感，再等幾天。這個方法雖然原始，但比任何澆水 App 都準確。' },
        { type: 'p', text: '不同植物對「乾」的定義也不同。多肉類要等整盆土完全乾透才澆；蕨類和常春藤則喜歡表土微濕的狀態。了解你的植物屬於哪一類，比死記澆水天數重要得多。' },
        { type: 'h2', text: '澆水的正確方式' },
        { type: 'p', text: '澆就要澆透。慢慢倒水，直到盆底開始流出水為止，然後把底盤的積水倒掉。半澆不澆的做法會讓根系只在表層生長，植物反而更脆弱。' },
        { type: 'p', text: '水溫也有講究——用放置一晚的室溫水最好，避免用冰水或剛從熱水龍頭接的水直接澆，溫差會讓根系受到衝擊。' },
        { type: 'h2', text: '季節調整是關鍵' },
        { type: 'p', text: '春夏是生長季，植物代謝旺盛，需水量較高。秋冬進入休眠期，澆水頻率應該自然減少。與其設定固定排程，不如養成「觀察再行動」的習慣。你的植物會感謝你的。' },
      ]
    },
    {
      id: 'g3', cat: '空間靈感', title: '十坪小套房植物配置法', sub: '三盆植物，三種高度，撐起整個客廳的綠意氛圍。', read: '6 分鐘', date: '2026-04-01',
      img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80',
      img2: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      body: [
        { type: 'p', text: '小空間不代表不能有植物。事實上，在有限的坪數裡，植物的存在感反而更強烈。關鍵不在數量多，而是在高度層次和位置的搭配。' },
        { type: 'h2', text: '三盆定律：高・中・低' },
        { type: 'p', text: '一個空間只需要三盆植物就能創造出「有綠意」的氛圍：一盆高的（落地型，100cm 以上）、一盆中的（桌面型，30-50cm）、一盆低的或垂吊型。三個高度層次會讓空間產生景深，視覺上感覺更大。' },
        { type: 'tip', title: '擺放原則', text: '高的植物放角落（不佔動線），中的放在視線水平的層架或桌面上，垂吊型掛在窗邊或書架頂端。避免三盆排成一排——錯落感才是重點。' },
        { type: 'h2', text: '小套房推薦組合' },
        { type: 'p', text: '組合一（朝南窗）：琴葉榕 + 龜背芋 + 黃金葛垂吊。組合二（朝北窗）：天堂鳥 + 虎尾蘭 + 常春藤垂吊。組合三（幾乎無光）：美鐵芋 + 萬年青 + 黃金葛水耕。' },
        { type: 'h2', text: '不要忽略盆器' },
        { type: 'p', text: '在小空間裡，盆器的顏色和材質會直接影響整體風格。建議統一色系（白色陶盆 or 水泥灰），避免太多花色混搭。盆器的尺寸也要跟植物匹配，太大的盆會讓土壤長時間過濕。' },
        { type: 'p', text: '最後，記得留白。不是每個角落都需要放植物，適度的空間感反而讓植物更有主角光環。' },
      ]
    },
    {
      id: 'g4', cat: '新手指南', title: '植物買回家的前 72 小時', sub: '環境適應期是存活關鍵，別急著換盆、施肥，讓植物慢慢適應新家。', read: '4 分鐘', date: '2026-03-25',
      img: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80',
      img2: 'https://images.unsplash.com/photo-1525498128493-380d1990a112?w=800&q=80',
      body: [
        { type: 'p', text: '你剛把一盆新植物帶回家，興奮地想幫它換個漂亮的盆、施點肥、找個完美的位置。但請先等一下——接下來的 72 小時，最好什麼都不要做。' },
        { type: 'h2', text: '為什麼需要適應期？' },
        { type: 'p', text: '植物從苗圃到花市到你家，經歷了至少兩三次環境變化。每一次光線、溫度、濕度的改變都會讓它產生壓力反應（stress response）。這時候如果再換盆、施肥，等於在它最脆弱的時候給予更多刺激。' },
        { type: 'h2', text: '前 72 小時該做的事' },
        { type: 'tip', title: '到家第一步', text: '先把植物放在你家光線最柔和的地方（避免直射陽光），不要澆水、不要施肥、不要換盆。就讓它靜靜待著，用三天的時間適應新環境的溫度和光線。' },
        { type: 'p', text: '第三天之後，再評估是否需要澆水（用兩公分法則檢查土壤），然後慢慢移動到你想放置的最終位置。換盆至少等一到兩週，確認植物已經穩定、開始長新葉之後再進行。' },
        { type: 'h2', text: '常見的新手衝動' },
        { type: 'p', text: '「葉子有點下垂，是不是該澆水？」——不一定，可能只是運輸過程中的正常反應，等幾天通常會恢復。「要不要先施肥補充營養？」——千萬不要，肥料在植物有壓力時反而會燒根。記住：前 72 小時的關鍵字是「不動」。' },
      ]
    },
    {
      id: 'g5', cat: '養護技巧', title: '黃葉不一定是缺水', sub: '常見的五種黃葉原因與對策，幫你精準判斷植物的健康狀態。', read: '5 分鐘', date: '2026-03-18',
      img: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80',
      img2: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=800&q=80',
      body: [
        { type: 'p', text: '植物黃葉是最常見的求救訊號，但很多人看到黃葉就猛澆水，結果反而加速惡化。黃葉的原因至少有五種，對策完全不同。' },
        { type: 'h2', text: '一、澆水過多（最常見）' },
        { type: 'p', text: '葉片整片均勻變黃、摸起來軟爛、土壤長時間濕潤。這是爛根的前兆。對策：立即停止澆水，把盆土翻鬆幫助通風，嚴重時需要脫盆檢查根系、剪掉黑色爛根後重新上盆。' },
        { type: 'h2', text: '二、缺水' },
        { type: 'p', text: '葉尖或葉緣先變黃、然後變乾變脆。通常從底部老葉開始。對策：澆透水，之後建立規律的觀察習慣（兩公分法則）。' },
        { type: 'h2', text: '三、光照不足' },
        { type: 'p', text: '植物整體徒長（節間拉長）、葉色變淡、新葉越長越小。對策：移到光線更好的位置，但不要一次從暗處移到強光下，需要漸進式調整。' },
        { type: 'h2', text: '四、正常代謝' },
        { type: 'p', text: '只有最底部的一兩片老葉變黃，其他部位生長正常。這是自然現象，不需要擔心。摘掉黃葉即可。' },
        { type: 'h2', text: '五、養分不足' },
        { type: 'p', text: '葉脈之間的區域變黃、葉脈本身還是綠色（缺鐵）；或整片葉片從深綠漸漸變淡黃（缺氮）。對策：在生長季（春夏）每月施一次稀釋液肥。' },
        { type: 'tip', title: '診斷口訣', text: '軟黃爛＝水太多。乾黃脆＝水太少。淡黃長＝光不夠。底部黃＝正常老化。脈間黃＝該施肥。' },
      ]
    },
    {
      id: 'g6', cat: '空間靈感', title: '辦公桌上的小森林', sub: '三種適合辦公室的桌上植物組合，讓你的工作空間也能呼吸。', read: '8 分鐘', date: '2026-03-10',
      img: 'https://images.unsplash.com/photo-1567748157439-651aca2ff064?w=600&q=80',
      img2: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      body: [
        { type: 'p', text: '根據研究，工作環境中有植物可以降低 37% 的焦慮感、提升 15% 的生產力。但辦公室的環境——空調乾燥、日光燈照明、假日沒人澆水——對植物來說其實很嚴苛。以下三種組合經過我們實測，在辦公環境中表現最好。' },
        { type: 'h2', text: '組合一：極簡派' },
        { type: 'p', text: '一盆虎尾蘭，放在螢幕旁邊。虎尾蘭是公認最強的辦公室植物：耐低光、耐旱、能忍受空調。兩到三週澆一次水就好，週末不在也完全沒問題。搭配一個白色或灰色的簡約陶盆，乾淨俐落。' },
        { type: 'h2', text: '組合二：療癒系' },
        { type: 'p', text: '多肉拼盤 + 空氣鳳梨。在一個淺盤裡組合三到四顆不同造型的多肉（玉露、熊童子、月兔耳），旁邊掛一株空氣鳳梨。多肉需要靠窗的光線，如果你的座位有自然光就很適合。空氣鳳梨每週噴水一次即可。' },
        { type: 'h2', text: '組合三：叢林感' },
        { type: 'p', text: '黃金葛（水耕）+ 小型觀葉。如果你想要更有「綠意包圍」的感覺，可以用透明玻璃瓶水耕一株黃金葛，再搭配一盆小型的白鶴芋或合果芋。水耕的好處是不需要擔心土壤和澆水問題，換水就好。' },
        { type: 'tip', title: '辦公室養護小提醒', text: '週五下班前澆一次水（確保週末不會乾死）。避免放在空調出風口正下方。如果座位完全沒有自然光，每兩到三週把植物拿到窗邊「日光浴」半天。' },
        { type: 'p', text: '選對植物、選對位置，你的辦公桌也能成為一座小小的都市綠洲。' },
      ]
    },
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
