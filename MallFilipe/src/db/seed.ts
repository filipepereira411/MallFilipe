import { sql } from "drizzle-orm";
import { db } from "@/db";
import { events, products, stores } from "@/db/schema";

const px = (id: number, w = 900, h = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

const futureDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const storeSeed: (typeof stores.$inferInsert)[] = [
  {
    slug: "aurora-moda",
    name: "Aurora Moda",
    tagline: "Peças contemporâneas para todos os dias",
    description: "Uma curadoria de vestuário intemporal, tecidos naturais e silhuetas urbanas. A Aurora Moda aposta em coleções versáteis, pensadas para acompanhar o seu ritmo.",
    category: "Moda",
    floor: "Piso 1",
    unit: "L101",
    hours: "10h – 22h",
    logo: "AM",
    coverImage: px(8743972, 1200, 760),
    accent: "#B96B66",
    rating: "4.9",
    featured: true,
  },
  {
    slug: "nexo-tech",
    name: "Nexo Tech",
    tagline: "Tecnologia que simplifica o seu dia",
    description: "Os gadgets mais desejados, áudio, imagem e produtividade num espaço onde é possível experimentar antes de comprar. Consultoria especializada incluída.",
    category: "Tecnologia",
    floor: "Piso 1",
    unit: "L112",
    hours: "10h – 22h",
    logo: "NX",
    coverImage: px(18311089, 1200, 760),
    accent: "#34728E",
    rating: "4.8",
    featured: true,
  },
  {
    slug: "bella-essencia",
    name: "Bella Essência",
    tagline: "Beleza, fragrância e rituais de cuidado",
    description: "Perfumaria de nicho, cosmética consciente e rituais de bem-estar. Uma boutique sensorial com aconselhamento personalizado.",
    category: "Beleza",
    floor: "Piso 1",
    unit: "L128",
    hours: "10h – 22h",
    logo: "BE",
    coverImage: px(24602077, 1200, 760),
    accent: "#A66B98",
    rating: "4.9",
    featured: true,
  },
  {
    slug: "casa-areia",
    name: "Casa Areia",
    tagline: "Objetos com textura para viver melhor",
    description: "Mobiliário, iluminação e peças de autor para casas com personalidade. Materiais naturais, formas simples e conforto duradouro.",
    category: "Casa",
    floor: "Piso 2",
    unit: "L204",
    hours: "10h – 22h",
    logo: "CA",
    coverImage: px(14781780, 1200, 760),
    accent: "#B4844F",
    rating: "4.7",
    featured: true,
  },
  {
    slug: "passo-urbano",
    name: "Passo Urbano",
    tagline: "Sneakers e calçado para a cidade",
    description: "Edições exclusivas, clássicos reinventados e novos essenciais. Um espaço dedicado a quem faz da rua a sua passarela.",
    category: "Calçados",
    floor: "Piso 1",
    unit: "L137",
    hours: "10h – 22h",
    logo: "PU",
    coverImage: px(19869759, 1200, 760),
    accent: "#3E756C",
    rating: "4.8",
    featured: true,
  },
  {
    slug: "tempo-e-co",
    name: "Tempo & Co.",
    tagline: "Acessórios que marcam momentos",
    description: "Relógios, joalharia discreta e acessórios de rigor. Peças escolhidas para atravessar tendências e guardar histórias.",
    category: "Acessórios",
    floor: "Piso 1",
    unit: "L145",
    hours: "10h – 22h",
    logo: "T&",
    coverImage: px(6157408, 1200, 760),
    accent: "#9B7B49",
    rating: "4.8",
    featured: false,
  },
  {
    slug: "grao-nobre-cafe",
    name: "Grão Nobre Café",
    tagline: "Da origem à chávena, sem atalhos",
    description: "Cafés de origem única, torras artesanais e chocolates premiados. Um balcão para descobrir sabores e levar um pouco do mall consigo.",
    category: "Gastronomia",
    floor: "Piso 0",
    unit: "L018",
    hours: "08h – 23h",
    logo: "GN",
    coverImage: px(3914060, 1200, 760),
    accent: "#8B5B3B",
    rating: "4.9",
    featured: true,
  },
  {
    slug: "doce-atelie",
    name: "Doce Ateliê",
    tagline: "Pastelaria fina feita todos os dias",
    description: "Bolos de autor, viennoiserie e boxes para partilhar. Cada doce é preparado de manhã pela nossa equipa de pasteleiros.",
    category: "Gastronomia",
    floor: "Piso 0",
    unit: "L024",
    hours: "08h – 22h",
    logo: "DA",
    coverImage: px(32265900, 1200, 760),
    accent: "#BF7380",
    rating: "4.9",
    featured: false,
  },
  {
    slug: "livraria-horizonte",
    name: "Livraria Horizonte",
    tagline: "Histórias, ideias e objectos de papel",
    description: "Livros, cadernos, ilustração e um cantinho de leitura com vista para o átrio. Programação cultural todas as semanas.",
    category: "Cultura",
    floor: "Piso 2",
    unit: "L218",
    hours: "10h – 21h",
    logo: "LH",
    coverImage: px(34299308, 1200, 760),
    accent: "#4F6E91",
    rating: "4.8",
    featured: false,
  },
  {
    slug: "vital-move",
    name: "Vital Move",
    tagline: "Movimento, equilíbrio e bem-estar",
    description: "Equipamento para treinar em casa, aulas no mall e uma seleção de produtos para abrandar e cuidar de si.",
    category: "Bem-estar",
    floor: "Piso 2",
    unit: "L226",
    hours: "09h – 22h",
    logo: "VM",
    coverImage: px(8436449, 1200, 760),
    accent: "#4E806B",
    rating: "4.7",
    featured: false,
  },
];

type ProductSeed = Omit<typeof products.$inferInsert, "storeId"> & { store: string };

const productSeed: ProductSeed[] = [
  { store: "aurora-moda", slug: "blazer-linho-areia", name: "Blazer de Linho Areia", description: "Blazer desestruturado em linho respirável, com forro leve e corte contemporâneo.", category: "Moda", price: "89.90", oldPrice: "129.90", imageUrl: px(8743972), badge: "-31%", highlights: "Linho natural,Corte relaxed,Feito em Portugal", rating: "4.9", stock: 18, sold: 124, featured: true },
  { store: "aurora-moda", slug: "camisa-essential-algodao", name: "Camisa Essential Algodão", description: "Camisa de algodão orgânico com caimento limpo e botões em madrepérola.", category: "Moda", price: "49.90", oldPrice: "64.90", imageUrl: px(13094187), badge: "-23%", highlights: "Algodão orgânico,Unissexo,Lavagem delicada", rating: "4.8", stock: 34, sold: 89, featured: false },
  { store: "aurora-moda", slug: "jaqueta-denim-vintage", name: "Jaqueta Denim Vintage", description: "Denim de lavagem suave, detalhes desgastados à mão e um clássico que nunca sai de moda.", category: "Moda", price: "119.00", oldPrice: null, imageUrl: px(38561616), badge: "Novo", highlights: "Edição limitada,Algodão reciclado", rating: "4.9", stock: 12, sold: 41, featured: false },

  { store: "nexo-tech", slug: "auscultadores-aura-pro", name: "Auscultadores Aura Pro", description: "Cancelamento ativo de ruído, 40 horas de autonomia e som equilibrado para qualquer momento.", category: "Tecnologia", price: "149.90", oldPrice: "199.90", imageUrl: px(3394650), badge: "-25%", highlights: "ANC,40h autonomia,Bluetooth 5.3", rating: "4.9", stock: 25, sold: 214, featured: true },
  { store: "nexo-tech", slug: "kit-produtividade-nexo", name: "Kit Produtividade Nexo", description: "Conjunto de portátil, smartphone e acessórios para um escritório completo e sem cabos.", category: "Tecnologia", price: "899.00", oldPrice: "1049.00", imageUrl: px(18311089), badge: "Mais vendido", highlights: "Garantia 2 anos,Configuração incluída", rating: "4.8", stock: 6, sold: 37, featured: false },
  { store: "nexo-tech", slug: "coluna-bluetooth-lumen", name: "Coluna Bluetooth Lumen", description: "Som de 360°, acabamento em alumínio e resistência a salpicos.", category: "Tecnologia", price: "119.00", oldPrice: null, imageUrl: px(29581125), badge: "Novo", highlights: "360° sound,IPX5,12h autonomia", rating: "4.7", stock: 21, sold: 58, featured: false },
  { store: "nexo-tech", slug: "camara-instantanea-neon", name: "Câmara Instantânea Neon", description: "Fotografias instantâneas com um toque criativo, flash automático e lentes intercambiáveis.", category: "Tecnologia", price: "99.90", oldPrice: "129.90", imageUrl: px(16045136), badge: "-23%", highlights: "Impressão imediata,Modo criativo", rating: "4.6", stock: 14, sold: 76, featured: false },

  { store: "bella-essencia", slug: "eau-de-parfum-iris-noite", name: "Eau de Parfum Íris Noite", description: "Fragrância envolvente com íris, âmbar e madeiras quentes. Um clássico da casa.", category: "Beleza", price: "74.90", oldPrice: "99.90", imageUrl: px(35930230), badge: "-25%", highlights: "50ml,Unissexo,Longa duração", rating: "4.9", stock: 30, sold: 182, featured: true },
  { store: "bella-essencia", slug: "ritual-hidratante-completo", name: "Ritual Hidratante Completo", description: "Trio de cuidado facial com sérum, creme e máscara para uma rotina luminosa.", category: "Beleza", price: "58.00", oldPrice: null, imageUrl: px(24602077), badge: "Novo", highlights: "Vegan,Pele sensível,Sem perfume", rating: "4.8", stock: 22, sold: 64, featured: false },
  { store: "bella-essencia", slug: "coffret-quatro-fragrancias", name: "Coffret 4 Fragrâncias", description: "Quatro miniaturas para descobrir a sua assinatura olfativa ou oferecer.", category: "Beleza", price: "89.00", oldPrice: "119.00", imageUrl: px(30999129), badge: "Presente", highlights: "4 × 10ml,Edição presente", rating: "4.9", stock: 16, sold: 95, featured: false },

  { store: "casa-areia", slug: "poltrona-tranca-natural", name: "Poltrona Trança Natural", description: "Estrutura em madeira maciça e assento entrançado à mão. Conforto com textura.", category: "Casa", price: "229.00", oldPrice: "299.00", imageUrl: px(5793641), badge: "-23%", highlights: "Feita à mão,Madeira certificada", rating: "4.8", stock: 8, sold: 42, featured: true },
  { store: "casa-areia", slug: "candeeiro-de-mesa-sol", name: "Candeeiro de Mesa Sol", description: "Luz quente e difusa, base em cerâmica e interruptor regulável.", category: "Casa", price: "79.90", oldPrice: null, imageUrl: px(31149584), badge: "Novo", highlights: "Luz regulável,Cerâmica artesanal", rating: "4.7", stock: 19, sold: 31, featured: false },
  { store: "casa-areia", slug: "vaso-ceramica-areia", name: "Vaso Cerâmica Areia", description: "Vaso esculpido à mão com acabamento mate, ideal para ramos secos ou frescos.", category: "Casa", price: "44.90", oldPrice: "59.90", imageUrl: px(29904622), badge: "-25%", highlights: "Peça única,Acabamento mate", rating: "4.8", stock: 26, sold: 88, featured: false },

  { store: "passo-urbano", slug: "sneakers-urban-azure", name: "Sneakers Urban Azure", description: "Sola amortecida, cabedal respirável e um azul que transforma qualquer look.", category: "Calçados", price: "89.90", oldPrice: "129.90", imageUrl: px(19869759), badge: "-31%", highlights: "Edição exclusiva,Sola EVA", rating: "4.9", stock: 24, sold: 167, featured: true },
  { store: "passo-urbano", slug: "tenis-metro-prata", name: "Ténis Metro Prata", description: "Acabamento metalizado discreto e palmilha ergonómica para uso diário.", category: "Calçados", price: "109.00", oldPrice: null, imageUrl: px(27988923), badge: "Novo", highlights: "Palmilha ergonómica,Unissexo", rating: "4.8", stock: 17, sold: 52, featured: false },
  { store: "passo-urbano", slug: "tenis-classic-laranja", name: "Ténis Classic Laranja", description: "Silhueta retro com detalhes em camurça e sola de borracha natural.", category: "Calçados", price: "79.90", oldPrice: "99.90", imageUrl: px(14703446), badge: "-20%", highlights: "Camurça,Sola natural", rating: "4.7", stock: 20, sold: 73, featured: false },

  { store: "tempo-e-co", slug: "relogio-heritage-couro", name: "Relógio Heritage Couro", description: "Mostrador minimalista, bracelete em couro legítimo e movimento de quartzo.", category: "Acessórios", price: "159.00", oldPrice: "219.00", imageUrl: px(6157408), badge: "-27%", highlights: "Couro legítimo,Resistente à água", rating: "4.9", stock: 13, sold: 101, featured: true },
  { store: "tempo-e-co", slug: "relogio-prata-precision", name: "Relógio Prata Precision", description: "Aço polido, cristal de safira e linhas finas para um uso elegante.", category: "Acessórios", price: "189.00", oldPrice: null, imageUrl: px(15210883), badge: "Clássico", highlights: "Aço inoxidável,Cristal safira", rating: "4.8", stock: 11, sold: 47, featured: false },
  { store: "tempo-e-co", slug: "cronografo-noir", name: "Cronógrafo Noir", description: "Mostrador escuro, três sub-registos e bracelete em pele gravada.", category: "Acessórios", price: "239.00", oldPrice: "299.00", imageUrl: px(28977357), badge: "-20%", highlights: "Cronógrafo,Edição limitada", rating: "4.9", stock: 7, sold: 28, featured: false },

  { store: "grao-nobre-cafe", slug: "cafe-especial-500g", name: "Café Especial 500g", description: "Grão de origem única com notas de chocolate e caramelo, torrado semanalmente.", category: "Gastronomia", price: "18.90", oldPrice: "24.90", imageUrl: px(25547393), badge: "-24%", highlights: "Torra artesanal,Origem única", rating: "4.9", stock: 45, sold: 248, featured: true },
  { store: "grao-nobre-cafe", slug: "caixa-chocolates-artesanais", name: "Caixa de Chocolates Artesanais", description: "Doze bombons de chocolate de origem, produzidos em pequenos lotes.", category: "Gastronomia", price: "24.90", oldPrice: null, imageUrl: px(37857736), badge: "Presente", highlights: "12 unidades,Produção artesanal", rating: "4.9", stock: 33, sold: 139, featured: false },
  { store: "grao-nobre-cafe", slug: "pack-pausa-gourmet", name: "Pack Pausa Gourmet", description: "Café, chocolates e pequenos doces para transformar uma pausa num ritual.", category: "Gastronomia", price: "39.90", oldPrice: "49.90", imageUrl: px(5995769), badge: "-20%", highlights: "Para partilhar,Seleção da casa", rating: "4.8", stock: 27, sold: 84, featured: false },

  { store: "doce-atelie", slug: "box-pastelaria-fina", name: "Box de Pastelaria Fina", description: "Seis peças de pastelaria de autor, preparadas na manhã do envio.", category: "Gastronomia", price: "29.90", oldPrice: "39.90", imageUrl: px(33313216), badge: "-25%", highlights: "6 peças,Feito no dia", rating: "4.9", stock: 18, sold: 116, featured: true },
  { store: "doce-atelie", slug: "brunch-para-dois", name: "Brunch para Dois", description: "Viennoiserie, fruta, compotas e bebidas quentes prontas para partilhar.", category: "Gastronomia", price: "44.00", oldPrice: null, imageUrl: px(32265900), badge: "Experiência", highlights: "2 pessoas,Reserva flexível", rating: "4.8", stock: 12, sold: 63, featured: false },
  { store: "doce-atelie", slug: "caixa-de-croissants", name: "Caixa de Croissants", description: "Croissants folhados com manteiga francesa, perfeitos para o pequeno-almoço.", category: "Gastronomia", price: "19.90", oldPrice: null, imageUrl: px(3914060), badge: "Fresco", highlights: "4 unidades,Forno próprio", rating: "4.8", stock: 22, sold: 97, featured: false },

  { store: "livraria-horizonte", slug: "colecao-leitura-e-pausa", name: "Coleção Leitura & Pausa", description: "Dois livros selecionados, chá e um caderno para anotar as melhores frases.", category: "Cultura", price: "34.90", oldPrice: "44.90", imageUrl: px(34299308), badge: "-22%", highlights: "Curadoria mensal,Inclui chá", rating: "4.8", stock: 20, sold: 71, featured: true },
  { store: "livraria-horizonte", slug: "caderno-de-autor", name: "Caderno de Autor", description: "Capa em linho, papel de gramatura superior e fita marcadora.", category: "Cultura", price: "16.90", oldPrice: null, imageUrl: px(37793421), badge: "Novo", highlights: "120 páginas,Capa em linho", rating: "4.7", stock: 40, sold: 55, featured: false },
  { store: "livraria-horizonte", slug: "kit-mesa-criativa", name: "Kit Mesa Criativa", description: "Objetos de escrita, câmara vintage e livro de fotografia para começar um projeto.", category: "Cultura", price: "42.00", oldPrice: "52.00", imageUrl: px(19194587), badge: "-19%", highlights: "Edição curada,Objetos únicos", rating: "4.7", stock: 9, sold: 24, featured: false },

  { store: "vital-move", slug: "tapete-yoga-essential", name: "Tapete Yoga Essential", description: "Superfície antiderrapante, espessura equilibrada e material de origem vegetal.", category: "Bem-estar", price: "39.90", oldPrice: "54.90", imageUrl: px(8436449), badge: "-27%", highlights: "Antiderrapante,Inclui alça", rating: "4.8", stock: 28, sold: 92, featured: true },
  { store: "vital-move", slug: "kit-bem-estar-em-casa", name: "Kit Bem-estar em Casa", description: "Acessórios de spa, sais de banho e vela aromática para uma noite de pausa.", category: "Bem-estar", price: "49.90", oldPrice: null, imageUrl: px(6634844), badge: "Novo", highlights: "Ritual completo,Aromas suaves", rating: "4.8", stock: 19, sold: 44, featured: false },
  { store: "vital-move", slug: "passe-mensal-movimento", name: "Passe Mensal Movimento", description: "Acesso a todas as aulas semanais no estúdio Vital Move, no Piso 2.", category: "Bem-estar", price: "59.00", oldPrice: "79.00", imageUrl: px(8436769), badge: "-25%", highlights: "30 dias,Aulas ilimitadas", rating: "4.9", stock: 50, sold: 83, featured: false },
];

const eventSeed: (typeof events.$inferInsert)[] = [
  {
    title: "Noite de Lançamentos MallFilipe",
    description: "Apresentação das novas coleções de outono com desfile, música ao vivo e acesso antecipado às lojas.",
    eventDate: futureDate(12),
    eventTime: "18:30",
    location: "Átrio Central",
    category: "Moda & Lifestyle",
    imageUrl: px(32212151, 1200, 760),
    capacity: 180,
    featured: true,
  },
  {
    title: "Feira de Sabores FLDA",
    description: "Provas, demonstrações e edições limitadas dos nossos parceiros de gastronomia. Entrada livre.",
    eventDate: futureDate(19),
    eventTime: "12:00",
    location: "Praça de Sabores · Piso 0",
    category: "Gastronomia",
    imageUrl: px(33313216, 1200, 760),
    capacity: 120,
    featured: true,
  },
  {
    title: "Cinema sob as Estrelas",
    description: "Uma sessão ao ar livre no terraço, com cadeiras confortáveis e menu especial do Doce Ateliê.",
    eventDate: futureDate(26),
    eventTime: "20:00",
    location: "Terraço Panorâmico",
    category: "Cultura",
    imageUrl: px(19840969, 1200, 760),
    capacity: 90,
    featured: false,
  },
  {
    title: "Manhã Vital Move",
    description: "Yoga, mobilidade e pequeno-almoço saudável para começar o fim de semana com energia.",
    eventDate: futureDate(33),
    eventTime: "09:30",
    location: "Estúdio · Piso 2",
    category: "Bem-estar",
    imageUrl: px(8436769, 1200, 760),
    capacity: 45,
    featured: false,
  },
];

async function createTables() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS stores (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      tagline TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      floor TEXT NOT NULL,
      unit TEXT NOT NULL,
      hours TEXT NOT NULL,
      logo TEXT NOT NULL,
      cover_image TEXT NOT NULL,
      accent TEXT NOT NULL,
      rating NUMERIC(2,1) NOT NULL DEFAULT 4.8,
      featured BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      store_id INTEGER NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      old_price NUMERIC(10,2),
      image_url TEXT NOT NULL,
      badge TEXT,
      highlights TEXT NOT NULL DEFAULT '',
      rating NUMERIC(2,1) NOT NULL DEFAULT 4.8,
      stock INTEGER NOT NULL DEFAULT 20,
      sold INTEGER NOT NULL DEFAULT 0,
      featured BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL,
      event_date TEXT NOT NULL,
      event_time TEXT NOT NULL,
      location TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT NOT NULL,
      capacity INTEGER NOT NULL DEFAULT 100,
      featured BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      code TEXT NOT NULL UNIQUE,
      customer_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      total NUMERIC(10,2) NOT NULL,
      status TEXT NOT NULL DEFAULT 'confirmado',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
      product_name TEXT NOT NULL,
      store_name TEXT NOT NULL,
      image_url TEXT NOT NULL,
      unit_price NUMERIC(10,2) NOT NULL,
      quantity INTEGER NOT NULL
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS event_registrations (
      id SERIAL PRIMARY KEY,
      event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (event_id, email)
    )
  `);
}

async function seedData() {
  const [storeCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(stores);

  if (!storeCount || storeCount.count === 0) {
    await db.insert(stores).values(storeSeed).onConflictDoNothing();
  }

  const [productCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products);

  if (!productCount || productCount.count === 0) {
    const allStores = await db.select().from(stores);
    const bySlug = new Map(allStores.map((store) => [store.slug, store.id]));
    const values = productSeed.map(({ store, ...product }) => {
      const storeId = bySlug.get(store);
      if (!storeId) throw new Error(`Loja não encontrada: ${store}`);
      return { ...product, storeId };
    });
    await db.insert(products).values(values).onConflictDoNothing();
  }

  const [eventCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(events);

  if (!eventCount || eventCount.count === 0) {
    await db.insert(events).values(eventSeed).onConflictDoNothing();
  }
}

async function initialize() {
  await createTables();
  await seedData();
}

const globalForSeed = globalThis as typeof globalThis & {
  __mallFilipeDatabaseReady?: Promise<void>;
};

export function ensureDatabase(): Promise<void> {
  if (!globalForSeed.__mallFilipeDatabaseReady) {
    globalForSeed.__mallFilipeDatabaseReady = initialize().catch((error) => {
      globalForSeed.__mallFilipeDatabaseReady = undefined;
      throw error;
    });
  }
  return globalForSeed.__mallFilipeDatabaseReady;
}
