import heroBeachTube from '../assets/hero-beach-tube.jpg';
import heroGardenNature from '../assets/hero-garden-nature.jpg';
import smilingGlowTube from '../assets/smiling-glow-tube.jpg';
import handCreamDrop from '../assets/hand-cream-drop.png';
import flatlayTubes from '../assets/flatlay-tubes.jpg';
import twinTubesSky from '../assets/twin-tubes-sky.jpg';
import clearSkyMan from '../assets/clear-sky-man.jpg';
import clearSkyWoman1 from '../assets/clear-sky-woman-1.jpg';
import clearSkyWoman2 from '../assets/clear-sky-woman-2.jpg';
import studioWorkspace from '../assets/studio-workspace.jpg';
import studioBluePortrait from '../assets/studio-blue-portrait.jpg';
import twinTubesCloseup from '../assets/twin-tubes-closeup.jpg';
import scienceUvShield from '../assets/science-uv-shield.png';
import scienceVeganPdrn from '../assets/science-vegan-pdrn.png';
import scienceCybright from '../assets/science-cybright.png';
import scienceHyaluronan from '../assets/science-hyaluronan.png';

export type Language = 'en' | 'id';

export type ModalKind =
  | 'product'
  | 'pillar'
  | 'ingredient'
  | 'story'
  | 'all-ingredients'
  | 'routine'
  | 'positioning'
  | 'legal';

export interface ModalTarget {
  kind: ModalKind;
  id: string;
}

export interface PillarSlide {
  id: string;
  eyebrow: string;
  cardLabel: string;
  leftTitle: string;
  cardDesc: string;
  rightTitle: string;
  rightTagline: string;
  supportLine: string;
  leftImage: string;
  leftObjectPosition: string;
  rightVisual: string;
  isProductCutout?: boolean;
  pillarBadge: string;
  mechanism: string;
  cardTags: string[];
  actives: string[];
  clinicalNote: string;
}

export interface TubeCard {
  id: string;
  title: string;
  aspect: 'landscape' | 'portrait';
  image: string;
  surfaceTone?: 'sky' | 'warm' | 'sage' | 'clean';
  isTransparentCutout?: boolean;
  tags: string[];
  pillarRef: string;
  roleSummary: string;
  mechanismDetail: string;
  benefits: string[];
}

export interface StoryTab {
  id: string;
  tabLabel: string;
  headline: string;
  subtitle: string;
  scriptAccent?: string;
  supportLine?: string;
  image: string;
  objectPosition: string;
  ctaLabel: string;
  modal: ModalTarget;
  bodyParagraphs: string[];
  highlights: { label: string; value: string }[];
}

export interface ActiveSpec {
  id: string;
  name: string;
  pillar: string;
  benefit: string;
  detail: string;
}

export interface ProductSpecRow {
  label: string;
  value: string;
}

export interface SiteContent {
  lang: Language;
  regionLabel: string;
  seo: {
    title: string;
    description: string;
  };
  nav: {
    about: string;
    product: string;
    contact: string;
    shopNow: string;
    privacyTerms: string;
  };
  hero: {
    curtainTitle: string;
    scrollCue: string;
    subtitle: string;
    shopNow: string;
  };
  horizontalSection: {
    heading: string;
    pillarMetrics: [string, string, string];
    routineCard: {
      label: string;
      title: string;
      desc: string;
      metrics: [string, string, string];
      tags: string[];
    };
    textureCard: {
      label: string;
      title: string;
      desc: string;
      metrics: [string, string, string];
      tags: string[];
    };
    formulaCard: {
      label: string;
      title: string;
      desc: string;
      metrics: [string, string, string];
      tags: string[];
    };
  };
  aboutSection: {
    eyebrow: string;
    heading: string;
    whereWeStandStats: { label: string; value: string }[];
    whereWeStandCta: string;
    clearSkyTitle: string;
    clearSkyDesc: string;
  };
  productPage: {
    backToHome: string;
    eyebrow: string;
    equationNote: string;
    choosePillarTitle: string;
    keyIngredientsTitle: string;
    seeAll: string;
    howToUseTitle: string;
    patchTestNote: string;
  };
  modals: {
    shopNow: string;
    tenKeyIngredients: string;
    whereWeStand: string;
    allIngredientsTitle: string;
    productSpecs: string;
    featuredIngredients: string;
    brandPositioningEyebrow: string;
    whyItExistsTitle: string;
    whyItExistsCopy: string;
    contactTitle: string;
    contactSubtitle: string;
    contactBody: string;
  };
  sectionTitles: {
    viewDetail: string;
  };
  pillarSlides: PillarSlide[];
  tubeCards: TubeCard[];
  storyTabs: StoryTab[];
  debutProduct: {
    name: string;
    volume: string;
    spfRating: string;
    tagline: string;
    supportLine: string;
    conceptLabel: string;
    routineEquation: string;
    summary: string;
    valueScript: string;
    valueText: string;
    promiseScript: string;
    promiseText: string;
    heroImage: string;
    cutoutImage: string;
    twinImage: string;
    flatlayImage: string;
    specs: ProductSpecRow[];
    howToUse: string[];
    disclaimer: string;
  };
  allActives: ActiveSpec[];
  positioningData: {
    title: string;
    subtitle: string;
    positionStatement: string;
    axes: {
      top: string;
      bottom: string;
      left: string;
      right: string;
      centerLabel: string;
      centerSub: string;
    };
    brandPoint: { name: string; spec: string; detail: string };
    peers: { name: string; spec: string; x: number; y: number }[];
  };
  footer: {
    copyright: string;
  };
  legalContent: Record<string, { title: string; subtitle: string; paragraphs: string[] }>;
}

export const BRAND_IMAGES = {
  heroBeachTube,
  heroGardenNature,
  smilingGlowTube,
  handCreamDrop,
  flatlayTubes,
  twinTubesSky,
  clearSkyMan,
  clearSkyWoman1,
  clearSkyWoman2,
  studioWorkspace,
  studioBluePortrait,
  twinTubesCloseup,
  scienceUvShield,
  scienceVeganPdrn,
  scienceCybright,
  scienceHyaluronan,
};

const ALL_ACTIVES_EN: ActiveSpec[] = [
  {
    id: 'hybrid-uv-filters',
    name: 'Hybrid UV Filters (Encapsulated)',
    pillar: '01 PROTECT',
    benefit: 'Broad-spectrum protection',
    detail:
      'Organic and mineral filters work together, kept stable and evenly spread by encapsulation, so protection feels light.',
  },
  {
    id: 'lumicease-blue',
    name: 'Lumicease™ Blue',
    pillar: '01 PROTECT',
    benefit: 'Blue light defense',
    detail: 'Helps defend your skin from blue light, from the sun and your screen.',
  },
  {
    id: 'helichrysum-artemisia',
    name: 'Helichrysum & Artemisia Extracts',
    pillar: '01 PROTECT',
    benefit: 'Extra environmental defense',
    detail:
      'Root and flower extracts that help shield skin from daily stressors such as heat and pollution.',
  },
  {
    id: 'rice-pdrn',
    name: 'Rice PDRN',
    pillar: '02 RESTORE',
    benefit: 'Skin barrier care',
    detail:
      'Plant-derived PDRN from rice that helps care for the skin barrier, so skin looks healthier and more resilient.',
  },
  {
    id: 'postbiotic-microbiome',
    name: 'Postbiotic Microbiome Technology',
    pillar: '02 RESTORE',
    benefit: 'Keeps skin balanced',
    detail:
      "Ferments from Lactobacillus, Bifida, Lactococcus, and Saccharomyces help keep your skin's microbiome balanced.",
  },
  {
    id: 'panthenol-allantoin',
    name: 'Panthenol & Allantoin',
    pillar: '02 RESTORE',
    benefit: 'Soothing comfort',
    detail: 'Help calm the skin, reduce the look of redness, and keep skin soft and comfortable.',
  },
  {
    id: 'cybright',
    name: '1.5% Cybright™',
    pillar: '03 BRIGHTEN',
    benefit: 'Brighter-looking skin',
    detail:
      'A premium brightening complex that helps skin tone look more even. Journal research shows Cybright™ 1.5% can brighten skin in as fast as 7 days*.',
  },
  {
    id: 'vitamin-c-hyaluronate',
    name: 'Vitamin C–Hyaluronate Derivatives',
    pillar: '03 BRIGHTEN',
    benefit: 'Fresher, radiant look',
    detail: 'Vitamin C combined with hyaluronate helps skin look fresher and more radiant.',
  },
  {
    id: 'hyaluronate-16x',
    name: '16x Hyaluronate Complex',
    pillar: '04 HYDRATE',
    benefit: 'Multi-layer hydration',
    detail:
      "16 forms of hyaluronate help hydrate the skin's surface layers, so skin feels moisturized all day.",
  },
  {
    id: 'glycerin-trehalose',
    name: 'Glycerin & Trehalose',
    pillar: '04 HYDRATE',
    benefit: 'Locks in moisture',
    detail: 'Help lock moisture in, so skin stays soft without feeling heavy.',
  },
];

const ALL_ACTIVES_ID: ActiveSpec[] = [
  {
    id: 'hybrid-uv-filters',
    name: 'Hybrid UV Filters (Encapsulated)',
    pillar: '01 PROTECT',
    benefit: 'Perlindungan spektrum luas',
    detail:
      'Filter organik dan mineral bekerja bersama, dijaga stabil dan merata lewat enkapsulasi, jadi perlindungan terasa ringan.',
  },
  {
    id: 'lumicease-blue',
    name: 'Lumicease™ Blue',
    pillar: '01 PROTECT',
    benefit: 'Perlindungan dari blue light',
    detail: 'Membantu melindungi kulit dari blue light, baik dari matahari maupun layar gadget.',
  },
  {
    id: 'helichrysum-artemisia',
    name: 'Helichrysum & Artemisia Extracts',
    pillar: '01 PROTECT',
    benefit: 'Perlindungan ekstra dari lingkungan',
    detail:
      'Ekstrak akar dan bunga yang membantu melindungi kulit dari paparan harian seperti panas dan polusi.',
  },
  {
    id: 'rice-pdrn',
    name: 'Rice PDRN',
    pillar: '02 RESTORE',
    benefit: 'Merawat skin barrier',
    detail:
      'PDRN dari beras yang membantu merawat skin barrier, sehingga kulit tampak lebih sehat dan kuat.',
  },
  {
    id: 'postbiotic-microbiome',
    name: 'Postbiotic Microbiome Technology',
    pillar: '02 RESTORE',
    benefit: 'Menjaga keseimbangan kulit',
    detail:
      'Fermentasi dari Lactobacillus, Bifida, Lactococcus, dan Saccharomyces membantu menjaga keseimbangan mikrobioma kulit.',
  },
  {
    id: 'panthenol-allantoin',
    name: 'Panthenol & Allantoin',
    pillar: '02 RESTORE',
    benefit: 'Menenangkan kulit',
    detail:
      'Membantu menenangkan kulit, menyamarkan kemerahan, dan menjaga kulit tetap halus serta nyaman.',
  },
  {
    id: 'cybright',
    name: '1.5% Cybright™',
    pillar: '03 BRIGHTEN',
    benefit: 'Kulit tampak lebih cerah',
    detail:
      'Kompleks pencerah premium yang membantu warna kulit tampak lebih merata. Menurut jurnal penelitiannya, Cybright™ 1.5% dapat mencerahkan kulit dalam waktu secepat 7 hari*.',
  },
  {
    id: 'vitamin-c-hyaluronate',
    name: 'Vitamin C–Hyaluronate Derivatives',
    pillar: '03 BRIGHTEN',
    benefit: 'Kulit tampak segar dan bercahaya',
    detail:
      'Vitamin C yang dipadukan dengan hyaluronate membantu kulit tampak lebih segar dan bercahaya.',
  },
  {
    id: 'hyaluronate-16x',
    name: '16x Hyaluronate Complex',
    pillar: '04 HYDRATE',
    benefit: 'Hidrasi berlapis',
    detail:
      '16 jenis hyaluronate membantu menghidrasi lapisan permukaan kulit, sehingga kulit terasa lembap sepanjang hari.',
  },
  {
    id: 'glycerin-trehalose',
    name: 'Glycerin & Trehalose',
    pillar: '04 HYDRATE',
    benefit: 'Mengunci kelembapan',
    detail: 'Membantu mengunci kelembapan, sehingga kulit tetap lembut tanpa terasa berat.',
  },
];

const DISCLAIMER_EN =
  '*The 7-day brightening result refers to the CYBRIGHT™ 1.5% ingredient, based on its journal research. It is not a claim of the Hy·Me·Up! product itself. Individual results may vary.';

const DISCLAIMER_ID =
  '*Hasil cerah 7 hari merujuk pada bahan CYBRIGHT™ 1.5% berdasarkan jurnal penelitiannya, bukan klaim produk Hy·Me·Up!. Hasil dapat berbeda pada tiap individu.';

export const SITE_CONTENT: Record<Language, SiteContent> = {
  en: {
    lang: 'en',
    regionLabel: 'INT',
    seo: {
      title: 'Hy·Me·Up! Hybrid Complete Sunscreen SPF 50+ PA++++ | Do Less. Full Bless.',
      description:
        'Serum, moisturizer, and sunscreen in one step. SPF 50+ PA++++ that helps protect, restore, brighten, and hydrate for a simpler morning routine.',
    },
    nav: {
      about: 'About',
      product: 'Product',
      contact: 'Contact',
      shopNow: 'Shop Now',
      privacyTerms: 'Privacy & Terms',
    },
    hero: {
      curtainTitle: 'Meet Our New Face',
      scrollCue: 'Scroll to unveil',
      subtitle: 'Serum, moisturizer, and sunscreen in one step. Complete skincare, simplified.',
      shopNow: 'Shop Now',
    },
    horizontalSection: {
      heading: 'NOT JUST A SUNSCREEN',
      pillarMetrics: ['UV DEFENSE', 'BARRIER CARE', 'DAILY COMFORT'],
      routineCard: {
        label: '3 STEPS IN 1',
        title: 'A SIMPLER MORNING ROUTINE',
        desc: 'Serum + Moisturizer + Sunscreen in one step. Less time in front of the mirror, the same complete care.',
        metrics: ['TIME-SAVING', 'COMPLETE CARE', 'LIGHTWEIGHT FEEL'],
        tags: ['#Serum', '#Moisturizer', '#Sunscreen'],
      },
      textureCard: {
        label: 'TEXTURE & FEEL',
        title: 'FEATHERLIGHT CREAM-GEL',
        desc: 'Blends in easily with a velvety powdery finish. Non-greasy, non-sticky, zero white cast, and makeup-friendly.',
        metrics: ['EASY TO BLEND', 'ZERO WHITE CAST', 'MAKEUP-FRIENDLY'],
        tags: ['#NoWhiteCast', '#PowderyFinish', '#MakeupBase'],
      },
      formulaCard: {
        label: 'THE FORMULA',
        title: '10 KEY INGREDIENTS',
        desc: 'From Hybrid UV Filters and Lumicease™ Blue to Rice PDRN, 1.5% Cybright™, and 16x Hyaluronate Complex.',
        metrics: ['SERUM ACTIVES', 'MICROBIOME BALANCE', 'DAILY COMFORT'],
        tags: ['#RicePDRN', '#Cybright', '#16xHyaluronate'],
      },
    },
    aboutSection: {
      eyebrow: 'ABOUT HY·ME·UP!',
      heading: 'COMPLETE SKINCARE, SIMPLIFIED.',
      whereWeStandStats: [
        { label: 'MORNING STEPS', value: '3-in-1' },
        { label: 'RESTORE', value: 'Rice PDRN' },
        { label: 'BRIGHTENING', value: '1.5% Cybright™' },
        { label: 'HYDRATION', value: '16x Hyaluronate' },
      ],
      whereWeStandCta: 'See Where We Stand',
      clearSkyTitle: 'CLEAR SKY, CLEAR SKIN',
      clearSkyDesc:
        'Protected under the sun, comfortable all day. A simpler morning, a better day.',
    },
    productPage: {
      backToHome: 'Back to Home',
      eyebrow: 'OUR DEBUT PRODUCT · 3-IN-1',
      equationNote: 'Simplify your morning routine without compromising your skincare.',
      choosePillarTitle: 'CHOOSE A PILLAR',
      keyIngredientsTitle: '10 KEY INGREDIENTS',
      seeAll: 'See All',
      howToUseTitle: 'HOW TO USE',
      patchTestNote:
        'Sensitive skin or specific allergies? Check the full ingredient list and patch test first.',
    },
    modals: {
      shopNow: 'Shop Now',
      tenKeyIngredients: '10 Key Ingredients',
      whereWeStand: 'Where We Stand',
      allIngredientsTitle: 'KEY INGREDIENTS & BENEFITS',
      productSpecs: 'Product Specs',
      featuredIngredients: 'Key Ingredients',
      brandPositioningEyebrow: 'BRAND POSITIONING',
      whyItExistsTitle: 'A SIMPLER MORNING ROUTINE',
      whyItExistsCopy:
        "Skincare keeps adding steps, but mornings never get longer. You don't want fewer benefits. You want fewer steps to get them.",
      contactTitle: 'Contact',
      contactSubtitle: 'Hy·Me·Up! Official Channels',
      contactBody:
        'Questions about Hy·Me·Up!? Reach us on Instagram or TikTok @hmu.beauty.',
    },
    sectionTitles: {
      viewDetail: 'View Detail',
    },
    pillarSlides: [
      {
        id: 'protection',
        eyebrow: 'PILLAR 01',
        cardLabel: 'PILLAR',
        leftTitle: '01 PROTECT',
        cardDesc:
          'Protection from every angle. SPF 50+ PA++++ against UVA, UVB, and blue light in one lightweight layer.',
        rightTitle: 'PROTECTION FROM EVERY ANGLE',
        rightTagline:
          'Protection from every angle. SPF 50+ PA++++ against UVA, UVB, and blue light in one lightweight layer.',
        supportLine: 'PROTECT · RESTORE · BRIGHTEN · HYDRATE',
        leftImage: heroBeachTube,
        leftObjectPosition: 'center 22%',
        rightVisual: handCreamDrop,
        isProductCutout: true,
        pillarBadge: 'SPF 50+ PA++++',
        mechanism:
          'SPF 50+ PA++++ in one lightweight layer that helps protect your skin from UVA, UVB, and blue light.',
        cardTags: ['Hybrid UV Filters', 'Lumicease™ Blue'],
        actives: ['Hybrid UV Filters', 'Encapsulated Technology', 'Lumicease™ Blue'],
        clinicalNote:
          'Organic and mineral filters work together, kept stable and evenly spread by encapsulation, so high protection still feels light on skin.',
      },
      {
        id: 'restore',
        eyebrow: 'PILLAR 02',
        cardLabel: 'PILLAR',
        leftTitle: '02 RESTORE',
        cardDesc:
          "Care that works while you're protected. Helps care for your skin barrier so skin looks healthy, all day long.",
        rightTitle: "CARE THAT WORKS WHILE YOU'RE PROTECTED",
        rightTagline:
          "Care that works while you're protected. Helps care for your skin barrier so skin looks healthy, all day long.",
        supportLine: 'PROTECT · RESTORE · BRIGHTEN · HYDRATE',
        leftImage: smilingGlowTube,
        leftObjectPosition: 'center 18%',
        rightVisual: scienceVeganPdrn,
        pillarBadge: 'RICE PDRN',
        mechanism: 'Helps care for your skin barrier so skin looks healthy, all day long.',
        cardTags: ['Rice PDRN', 'Postbiotic Microbiome Technology'],
        actives: ['Rice PDRN', 'Postbiotic Microbiome Technology', 'Panthenol & Allantoin'],
        clinicalNote:
          'Rice PDRN helps care for the skin barrier, postbiotic ferments help keep skin balanced, and panthenol with allantoin help soothe and comfort.',
      },
      {
        id: 'brightening',
        eyebrow: 'PILLAR 03',
        cardLabel: 'PILLAR',
        leftTitle: '03 BRIGHTEN',
        cardDesc:
          'Skin that looks brighter, every day. Helps even out your skin tone and bring back your natural glow.',
        rightTitle: 'SKIN THAT LOOKS BRIGHTER, EVERY DAY',
        rightTagline:
          'Skin that looks brighter, every day. Helps even out your skin tone and bring back your natural glow.',
        supportLine: 'PROTECT · RESTORE · BRIGHTEN · HYDRATE',
        leftImage: studioBluePortrait,
        leftObjectPosition: '60% 20%',
        rightVisual: scienceCybright,
        pillarBadge: '1.5% CYBRIGHT™',
        mechanism: 'Helps even out your skin tone and bring back your natural glow.',
        cardTags: ['1.5% Cybright™', 'Vitamin C–Hyaluronate'],
        actives: ['1.5% Cybright™', 'Vitamin C–Hyaluronate', 'Daily UV Protection'],
        clinicalNote:
          'Powered by premium 1.5% Cybright™, an ingredient that journal research shows can brighten skin in as fast as 7 days*.',
      },
      {
        id: 'hydration',
        eyebrow: 'PILLAR 04',
        cardLabel: 'PILLAR',
        leftTitle: '04 HYDRATE',
        cardDesc:
          "Hydration you can't even feel. Soft, moisturized, and comfortable, without the heavy or sticky feeling.",
        rightTitle: "HYDRATION YOU CAN'T EVEN FEEL",
        rightTagline:
          "Hydration you can't even feel. Soft, moisturized, and comfortable, without the heavy or sticky feeling.",
        supportLine: 'PROTECT · RESTORE · BRIGHTEN · HYDRATE',
        leftImage: heroGardenNature,
        leftObjectPosition: 'center 25%',
        rightVisual: scienceHyaluronan,
        pillarBadge: '16X HYALURONATE',
        mechanism:
          'Soft, moisturized, and comfortable, without the heavy or sticky feeling.',
        cardTags: ['16x Hyaluronate Complex', 'Glycerin & Trehalose'],
        actives: ['16x Hyaluronate Complex', 'Allantoin & Panthenol', 'Glycerin & Trehalose'],
        clinicalNote:
          "16 forms of hyaluronate help hydrate the skin's surface layers, while glycerin and trehalose help lock moisture in.",
      },
    ],
    tubeCards: [
      {
        id: 'cream-gel-sensory',
        title: 'FEATHERLIGHT CREAM-GEL',
        aspect: 'portrait',
        image: handCreamDrop,
        surfaceTone: 'sky',
        isTransparentCutout: true,
        tags: ['#NoWhiteCast', '#PowderyFinish', '#MakeupBase'],
        pillarRef: '06 · TEXTURE & FEEL',
        roleSummary:
          'Blends in easily with a velvety powdery finish. Non-greasy, non-sticky, zero white cast, and makeup-friendly.',
        mechanismDetail:
          'Designed for effortless everyday wear across skin tones—featherlight cream-gel texture, fragrance-free, and housed in a hygienic 30 ml ℮ 1.014 fl.oz. airless pump tube.',
        benefits: [
          'Featherlight, blends in easily, zero white cast',
          'Velvety powdery, non-greasy, non-sticky finish',
          'Fragrance-free · 30 ml ℮ 1.014 fl.oz. airless pump tube',
        ],
      },
    ],
    storyTabs: [
      {
        id: 'brand-story',
        tabLabel: 'OUR STORY',
        headline: 'WHY COMPLICATE YOUR MORNING?',
        subtitle:
          "Skincare keeps adding steps, but mornings never get longer. You don't want fewer benefits. You want fewer steps to get them.",
        image: studioWorkspace,
        objectPosition: 'center 32%',
        ctaLabel: 'View Detail',
        modal: { kind: 'story', id: 'brand-story' },
        bodyParagraphs: [
          "Hy·Me·Up! is a beauty brand that believes skincare should be simple and effective. We understand every woman's desire to look and feel her best without spending too much time on her routine.",
          "Skincare keeps adding steps, but mornings never get longer. You don't want fewer benefits. You want fewer steps to get them.",
          'So we made one tube that works as your serum, moisturizer, and sunscreen. Self care should feel easy, comfortable, and fit naturally into everyday life.',
        ],
        highlights: [
          { label: 'Value', value: 'Less effort. Complete care.' },
          { label: 'Our promise', value: 'Do Less. Full Bless.' },
          { label: 'Our debut product', value: 'Hybrid Complete Sunscreen 30 ml ℮' },
        ],
      },
      {
        id: 'clear-sky-skin',
        tabLabel: 'CLEAR SKY, CLEAR SKIN',
        headline: 'CLEAR SKY, CLEAR SKIN',
        subtitle:
          'Protected under the sun, comfortable all day. A simpler morning, a better day.',
        image: clearSkyMan,
        objectPosition: 'center 25%',
        ctaLabel: 'View Detail',
        modal: { kind: 'story', id: 'clear-sky-skin' },
        bodyParagraphs: [
          'Protected under the sun, comfortable all day. A simpler morning, a better day.',
          'Bright, airy, and effortless—our visual mood celebrates stepping out into open sunlight with skin that feels calm, hydrated, and naturally radiant.',
        ],
        highlights: [
          { label: 'Protection', value: 'SPF 50+ PA++++ (UVA, UVB + blue light)' },
          { label: 'Finish', value: 'Velvety powdery, non-greasy, non-sticky' },
          { label: 'Net Volume', value: '30 ml ℮ 1.014 fl.oz. · Airless pump tube' },
        ],
      },
    ],
    debutProduct: {
      name: 'Hybrid Complete Sunscreen',
      volume: '30 ml ℮ 1.014 fl.oz.',
      spfRating: 'SPF 50+ PA++++',
      tagline: 'Do Less. Full Bless.',
      supportLine: 'PROTECT · RESTORE · BRIGHTEN · HYDRATE',
      conceptLabel: '3 STEPS IN 1',
      routineEquation: 'Serum + Moisturizer + Sunscreen in one step',
      summary:
        'A 1-step morning skincare that brings serum, moisturizer, and sunscreen together in one tube. SPF 50+ PA++++ protection with Rice PDRN, 1.5% Cybright™, and 16x Hyaluronate Complex.',
      valueScript: 'Value',
      valueText: 'Less effort. Complete care.',
      promiseScript: 'Our promise',
      promiseText: 'Do Less. Full Bless.',
      heroImage: heroBeachTube,
      cutoutImage: handCreamDrop,
      twinImage: twinTubesCloseup,
      flatlayImage: flatlayTubes,
      specs: [
        { label: 'Product Type', value: 'Cream-gel sunscreen' },
        { label: 'Protection', value: 'SPF 50+ PA++++ (UVA, UVB + blue light)' },
        { label: 'Texture', value: 'Featherlight, blends in easily, zero white cast' },
        { label: 'Finish', value: 'Velvety powdery, non-greasy, non-sticky' },
        { label: 'Scent', value: 'Fragrance-free' },
        { label: 'Net Volume', value: '30 ml ℮ 1.014 fl.oz. · Airless pump tube' },
      ],
      howToUse: [
        'After cleansing, use as your one and only morning skincare step.',
        'Apply 2–3 pumps to your fingertips and spread evenly over face and neck.',
        'Let it absorb for a smooth powdery finish. Ready for bare skin or makeup.',
      ],
      disclaimer: DISCLAIMER_EN,
    },
    allActives: ALL_ACTIVES_EN,
    positioningData: {
      title: 'Where We Stand',
      subtitle: 'Complete care formula, at an accessible price.',
      positionStatement: 'SPF 50+ PA++++ · Protect + Restore + Brighten + Hydrate',
      axes: {
        top: 'Accessible',
        bottom: 'Premium',
        left: 'Basic Protection',
        right: 'Complete Care',
        centerLabel: 'Protect + Restore + Brighten + Hydrate',
        centerSub: '4 benefits in 1 step',
      },
      brandPoint: {
        name: 'Hy·Me·Up!',
        spec: 'SPF 50+ PA++++',
        detail: '4 benefits in 1 step',
      },
      peers: [
        { name: 'Basic sunscreen', spec: 'UV protection only', x: 22, y: 20 },
        { name: 'Daily sunscreen', spec: 'everyday UV defense', x: 38, y: 17 },
        { name: 'Moisturizing sunscreen', spec: 'UV + hydration', x: 30, y: 40 },
        { name: 'Premium treatment sunscreen', spec: 'higher price', x: 68, y: 74 },
      ],
    },
    footer: {
      copyright: '© 2026 HY·ME·UP! ALL RIGHTS RESERVED.',
    },
    legalContent: {
      privacy: {
        title: 'Product Information & Terms',
        subtitle: 'Hy·Me·Up! Hybrid Complete Sunscreen SPF 50+ PA++++',
        paragraphs: [
          '30 ml ℮ 1.014 fl.oz. cream-gel sunscreen with Hybrid UV Filters, Lumicease™ Blue, Rice PDRN, Postbiotic Microbiome Technology, 1.5% Cybright™, Vitamin C–Hyaluronate Derivatives, 16x Hyaluronate Complex, Panthenol, Allantoin, Glycerin, and Trehalose.',
          'Claim note: The 7-day brightening result refers to the CYBRIGHT™ 1.5% ingredient, based on its journal research. It is not a claim of the Hy·Me·Up! product itself. Individual results may vary.',
          'For external use only. If you have sensitive skin or specific allergies, check the full ingredient list and patch test before use. Stop use if irritation occurs.',
          'This website does not collect personal data. Purchases are processed by the marketplace and follow its privacy policy.',
        ],
      },
    },
  },
  id: {
    lang: 'id',
    regionLabel: 'ID',
    seo: {
      title: 'Hy·Me·Up! Hybrid Complete Sunscreen SPF 50+ PA++++ | Do Less. Full Bless.',
      description:
        'Serum, moisturizer, dan sunscreen dalam satu langkah. SPF 50+ PA++++ yang membantu melindungi, merawat skin barrier, mencerahkan, dan melembapkan kulit untuk pagi yang lebih simpel.',
    },
    nav: {
      about: 'Tentang',
      product: 'Produk',
      contact: 'Kontak',
      shopNow: 'Beli Sekarang',
      privacyTerms: 'Privasi & Ketentuan',
    },
    hero: {
      curtainTitle: 'Kenalan dengan Wajah Baru Kami',
      scrollCue: 'Scroll untuk melihat',
      subtitle:
        'Serum, moisturizer, dan sunscreen dalam satu langkah. Perawatan lengkap, jadi lebih simpel.',
      shopNow: 'Beli Sekarang',
    },
    horizontalSection: {
      heading: 'BUKAN SEKADAR SUNSCREEN',
      pillarMetrics: ['PERLINDUNGAN UV', 'PERAWATAN BARRIER', 'NYAMAN SEHARIAN'],
      routineCard: {
        label: '3 LANGKAH JADI 1',
        title: 'RUTINITAS PAGI LEBIH SIMPEL',
        desc: 'Serum + Moisturizer + Sunscreen dalam satu langkah. Lebih cepat di depan cermin, perawatan tetap lengkap.',
        metrics: ['HEMAT WAKTU', 'PERAWATAN LENGKAP', 'RINGAN DI KULIT'],
        tags: ['#Serum', '#Moisturizer', '#Sunscreen'],
      },
      textureCard: {
        label: 'TEKSTUR & RASA DI KULIT',
        title: 'CREAM-GEL SUPER RINGAN',
        desc: 'Mudah dibaurkan dengan hasil akhir powdery yang lembut. Tidak berminyak, tidak lengket, tanpa white cast, dan cocok untuk base makeup.',
        metrics: ['MUDAH DIBAURKAN', 'TANPA WHITE CAST', 'COCOK UNTUK MAKEUP'],
        tags: ['#NoWhiteCast', '#PowderyFinish', '#MakeupBase'],
      },
      formulaCard: {
        label: 'FORMULANYA',
        title: '10 BAHAN UTAMA',
        desc: 'Dari Hybrid UV Filters dan Lumicease™ Blue hingga Rice PDRN, 1.5% Cybright™, dan 16x Hyaluronate Complex.',
        metrics: ['BAHAN AKTIF SERUM', 'MIKROBIOMA SEIMBANG', 'NYAMAN SEHARIAN'],
        tags: ['#RicePDRN', '#Cybright', '#16xHyaluronate'],
      },
    },
    aboutSection: {
      eyebrow: 'TENTANG HY·ME·UP!',
      heading: 'PERAWATAN LENGKAP, JADI LEBIH SIMPEL.',
      whereWeStandStats: [
        { label: 'LANGKAH PAGI', value: '3-in-1' },
        { label: 'RESTORE', value: 'Rice PDRN' },
        { label: 'PENCERAH', value: '1.5% Cybright™' },
        { label: 'HIDRASI', value: '16x Hyaluronate' },
      ],
      whereWeStandCta: 'Lihat Posisi Kami',
      clearSkyTitle: 'CLEAR SKY, CLEAR SKIN',
      clearSkyDesc:
        'Terlindungi di bawah matahari, nyaman seharian. Pagi lebih simpel, hari lebih baik.',
    },
    productPage: {
      backToHome: 'Kembali ke Beranda',
      eyebrow: 'PRODUK PERDANA · 3-IN-1',
      equationNote: 'Rutinitas pagi jadi lebih simpel tanpa mengorbankan perawatan kulit.',
      choosePillarTitle: 'PILIH PILAR',
      keyIngredientsTitle: '10 BAHAN UTAMA',
      seeAll: 'Lihat Semua',
      howToUseTitle: 'CARA PAKAI',
      patchTestNote:
        'Punya kulit sensitif atau alergi bahan tertentu? Cek daftar bahan lengkap dan lakukan patch test terlebih dahulu.',
    },
    modals: {
      shopNow: 'Beli Sekarang',
      tenKeyIngredients: '10 Bahan Utama',
      whereWeStand: 'Posisi Kami',
      allIngredientsTitle: 'BAHAN UTAMA & MANFAATNYA',
      productSpecs: 'Spesifikasi Produk',
      featuredIngredients: 'Bahan Utama',
      brandPositioningEyebrow: 'POSISI BRAND',
      whyItExistsTitle: 'RUTINITAS PAGI LEBIH SIMPEL',
      whyItExistsCopy:
        'Langkah skincare terus bertambah, tapi waktu pagi tidak ikut bertambah. Kamu tidak butuh manfaat yang lebih sedikit, cukup langkah yang lebih sedikit.',
      contactTitle: 'Kontak',
      contactSubtitle: 'Kanal Resmi Hy·Me·Up!',
      contactBody:
        'Ada pertanyaan seputar Hy·Me·Up!? Hubungi kami lewat Instagram atau TikTok @hmu.beauty.',
    },
    sectionTitles: {
      viewDetail: 'Lihat Detail',
    },
    pillarSlides: [
      {
        id: 'protection',
        eyebrow: 'PILAR 01',
        cardLabel: 'PILAR',
        leftTitle: '01 PROTECT',
        cardDesc:
          'Perlindungan dari segala arah. SPF 50+ PA++++ dari UVA, UVB, dan blue light dalam satu lapisan ringan.',
        rightTitle: 'PERLINDUNGAN DARI SEGALA ARAH',
        rightTagline:
          'Perlindungan dari segala arah. SPF 50+ PA++++ dari UVA, UVB, dan blue light dalam satu lapisan ringan.',
        supportLine: 'PROTECT · RESTORE · BRIGHTEN · HYDRATE',
        leftImage: heroBeachTube,
        leftObjectPosition: 'center 22%',
        rightVisual: handCreamDrop,
        isProductCutout: true,
        pillarBadge: 'SPF 50+ PA++++',
        mechanism:
          'SPF 50+ PA++++ dalam satu lapisan ringan yang membantu melindungi kulit dari UVA, UVB, dan blue light.',
        cardTags: ['Hybrid UV Filters', 'Lumicease™ Blue'],
        actives: ['Hybrid UV Filters', 'Encapsulated Technology', 'Lumicease™ Blue'],
        clinicalNote:
          'Filter organik dan mineral bekerja bersama, dijaga stabil dan merata lewat teknologi enkapsulasi, jadi perlindungan tinggi tetap terasa ringan.',
      },
      {
        id: 'restore',
        eyebrow: 'PILAR 02',
        cardLabel: 'PILAR',
        leftTitle: '02 RESTORE',
        cardDesc:
          'Perawatan yang tetap bekerja saat kulit terlindungi. Membantu merawat skin barrier agar kulit tampak sehat sepanjang hari.',
        rightTitle: 'TETAP MERAWAT SAAT MELINDUNGI',
        rightTagline:
          'Perawatan yang tetap bekerja saat kulit terlindungi. Membantu merawat skin barrier agar kulit tampak sehat sepanjang hari.',
        supportLine: 'PROTECT · RESTORE · BRIGHTEN · HYDRATE',
        leftImage: smilingGlowTube,
        leftObjectPosition: 'center 18%',
        rightVisual: scienceVeganPdrn,
        pillarBadge: 'RICE PDRN',
        mechanism: 'Membantu merawat skin barrier agar kulit tampak sehat sepanjang hari.',
        cardTags: ['Rice PDRN', 'Postbiotic Microbiome Technology'],
        actives: ['Rice PDRN', 'Postbiotic Microbiome Technology', 'Panthenol & Allantoin'],
        clinicalNote:
          'Rice PDRN membantu merawat skin barrier, fermentasi postbiotik membantu menjaga keseimbangan kulit, serta panthenol dan allantoin membantu menenangkan dan memberi rasa nyaman.',
      },
      {
        id: 'brightening',
        eyebrow: 'PILAR 03',
        cardLabel: 'PILAR',
        leftTitle: '03 BRIGHTEN',
        cardDesc:
          'Kulit tampak lebih cerah setiap hari. Membantu meratakan warna kulit agar glow alami tampak kembali.',
        rightTitle: 'KULIT TAMPAK LEBIH CERAH SETIAP HARI',
        rightTagline:
          'Kulit tampak lebih cerah setiap hari. Membantu meratakan warna kulit agar glow alami tampak kembali.',
        supportLine: 'PROTECT · RESTORE · BRIGHTEN · HYDRATE',
        leftImage: studioBluePortrait,
        leftObjectPosition: '60% 20%',
        rightVisual: scienceCybright,
        pillarBadge: '1.5% CYBRIGHT™',
        mechanism: 'Membantu meratakan warna kulit agar glow alami tampak kembali.',
        cardTags: ['1.5% Cybright™', 'Vitamin C–Hyaluronate'],
        actives: ['1.5% Cybright™', 'Vitamin C–Hyaluronate', 'Daily UV Protection'],
        clinicalNote:
          'Diperkuat 1.5% Cybright™, bahan premium yang menurut jurnal penelitiannya dapat mencerahkan kulit dalam waktu secepat 7 hari*.',
      },
      {
        id: 'hydration',
        eyebrow: 'PILAR 04',
        cardLabel: 'PILAR',
        leftTitle: '04 HYDRATE',
        cardDesc:
          'Lembapnya terasa, beratnya tidak. Kulit halus, lembap, dan nyaman tanpa rasa berat atau lengket.',
        rightTitle: 'LEMBAP TANPA TERASA BERAT',
        rightTagline:
          'Lembapnya terasa, beratnya tidak. Kulit halus, lembap, dan nyaman tanpa rasa berat atau lengket.',
        supportLine: 'PROTECT · RESTORE · BRIGHTEN · HYDRATE',
        leftImage: heroGardenNature,
        leftObjectPosition: 'center 25%',
        rightVisual: scienceHyaluronan,
        pillarBadge: '16X HYALURONATE',
        mechanism: 'Kulit halus, lembap, dan nyaman tanpa rasa berat atau lengket.',
        cardTags: ['16x Hyaluronate Complex', 'Glycerin & Trehalose'],
        actives: ['16x Hyaluronate Complex', 'Allantoin & Panthenol', 'Glycerin & Trehalose'],
        clinicalNote:
          '16 jenis hyaluronate membantu menghidrasi lapisan permukaan kulit, sementara glycerin dan trehalose membantu mengunci kelembapan.',
      },
    ],
    tubeCards: [
      {
        id: 'cream-gel-sensory',
        title: 'CREAM-GEL SUPER RINGAN',
        aspect: 'portrait',
        image: handCreamDrop,
        surfaceTone: 'sky',
        isTransparentCutout: true,
        tags: ['#NoWhiteCast', '#PowderyFinish', '#MakeupBase'],
        pillarRef: '06 · TEKSTUR & RASA DI KULIT',
        roleSummary:
          'Mudah dibaurkan dengan hasil akhir powdery yang lembut. Tidak berminyak, tidak lengket, tanpa white cast, dan cocok untuk base makeup.',
        mechanismDetail:
          'Dirancang nyaman untuk pemakaian harian—tekstur sunscreen cream-gel super ringan, tanpa pewangi, dalam tube pompa airless 30 ml ℮ 1.014 fl.oz.',
        benefits: [
          'Sangat ringan, mudah dibaurkan, tanpa white cast',
          'Powdery lembut, tidak berminyak, tidak lengket',
          'Tanpa pewangi · 30 ml ℮ 1.014 fl.oz. tube pompa airless',
        ],
      },
    ],
    storyTabs: [
      {
        id: 'brand-story',
        tabLabel: 'CERITA KAMI',
        headline: 'KENAPA PAGI HARUS RIBET?',
        subtitle:
          'Langkah skincare terus bertambah, tapi waktu pagi tidak ikut bertambah. Kamu tidak butuh manfaat yang lebih sedikit, cukup langkah yang lebih sedikit.',
        image: studioWorkspace,
        objectPosition: 'center 32%',
        ctaLabel: 'Lihat Detail',
        modal: { kind: 'story', id: 'brand-story' },
        bodyParagraphs: [
          'Hy·Me·Up! adalah brand kecantikan yang percaya bahwa skincare seharusnya simpel dan efektif. Kami paham setiap perempuan ingin tampil dan merasa terbaik tanpa menghabiskan banyak waktu untuk rutinitasnya.',
          'Langkah skincare terus bertambah, tapi waktu pagi tidak ikut bertambah. Kamu tidak butuh manfaat yang lebih sedikit, cukup langkah yang lebih sedikit.',
          'Karena itu kami membuat satu tube yang bekerja sebagai serum, moisturizer, dan sunscreen. Merawat diri seharusnya terasa mudah, nyaman, dan menyatu dengan keseharian.',
        ],
        highlights: [
          { label: 'Nilai', value: 'Lebih sedikit usaha. Perawatan tetap lengkap.' },
          { label: 'Janji kami', value: 'Do Less. Full Bless.' },
          { label: 'Produk perdana', value: 'Hybrid Complete Sunscreen 30 ml ℮' },
        ],
      },
      {
        id: 'clear-sky-skin',
        tabLabel: 'CLEAR SKY, CLEAR SKIN',
        headline: 'CLEAR SKY, CLEAR SKIN',
        subtitle:
          'Terlindungi di bawah matahari, nyaman seharian. Pagi lebih simpel, hari lebih baik.',
        image: clearSkyMan,
        objectPosition: 'center 25%',
        ctaLabel: 'Lihat Detail',
        modal: { kind: 'story', id: 'clear-sky-skin' },
        bodyParagraphs: [
          'Terlindungi di bawah matahari, nyaman seharian. Pagi lebih simpel, hari lebih baik.',
          'Cerah, ringan, dan nyaman—suasana visual kami merayakan pagi yang lebih simpel di bawah langit terbuka dengan kulit yang terasa lembap dan tampak sehat alami.',
        ],
        highlights: [
          { label: 'Perlindungan', value: 'SPF 50+ PA++++ (UVA, UVB + blue light)' },
          { label: 'Hasil Akhir', value: 'Powdery lembut, tidak berminyak, tidak lengket' },
          { label: 'Isi Bersih', value: '30 ml ℮ 1.014 fl.oz. · Tube pompa airless' },
        ],
      },
    ],
    debutProduct: {
      name: 'Hybrid Complete Sunscreen',
      volume: '30 ml ℮ 1.014 fl.oz.',
      spfRating: 'SPF 50+ PA++++',
      tagline: 'Do Less. Full Bless.',
      supportLine: 'PROTECT · RESTORE · BRIGHTEN · HYDRATE',
      conceptLabel: '3 LANGKAH JADI 1',
      routineEquation: 'Serum + Moisturizer + Sunscreen dalam satu langkah',
      summary:
        'Skincare pagi 1 langkah yang menggabungkan serum, moisturizer, dan sunscreen dalam satu tube. Perlindungan SPF 50+ PA++++ dengan Rice PDRN, 1.5% Cybright™, dan 16x Hyaluronate Complex.',
      valueScript: 'Nilai',
      valueText: 'Lebih sedikit usaha. Perawatan tetap lengkap.',
      promiseScript: 'Janji kami',
      promiseText: 'Do Less. Full Bless.',
      heroImage: heroBeachTube,
      cutoutImage: handCreamDrop,
      twinImage: twinTubesCloseup,
      flatlayImage: flatlayTubes,
      specs: [
        { label: 'Tipe Produk', value: 'Sunscreen cream-gel' },
        { label: 'Perlindungan', value: 'SPF 50+ PA++++ (UVA, UVB + blue light)' },
        { label: 'Tekstur', value: 'Sangat ringan, mudah dibaurkan, tanpa white cast' },
        { label: 'Hasil Akhir', value: 'Powdery lembut, tidak berminyak, tidak lengket' },
        { label: 'Aroma', value: 'Tanpa pewangi' },
        { label: 'Isi Bersih', value: '30 ml ℮ 1.014 fl.oz. · Tube pompa airless' },
      ],
      howToUse: [
        'Setelah mencuci muka, gunakan sebagai satu-satunya langkah skincare pagi.',
        'Ambil 2–3 pump ke ujung jari, lalu ratakan ke wajah dan leher.',
        'Biarkan meresap hingga hasil akhirnya powdery dan halus. Siap tampil polos atau lanjut makeup.',
      ],
      disclaimer: DISCLAIMER_ID,
    },
    allActives: ALL_ACTIVES_ID,
    positioningData: {
      title: 'Posisi Kami',
      subtitle: 'Formula perawatan lengkap dengan harga terjangkau.',
      positionStatement: 'SPF 50+ PA++++ · Protect + Restore + Brighten + Hydrate',
      axes: {
        top: 'Terjangkau',
        bottom: 'Premium',
        left: 'Perlindungan Dasar',
        right: 'Perawatan Lengkap',
        centerLabel: 'Protect + Restore + Brighten + Hydrate',
        centerSub: '4 manfaat dalam 1 langkah',
      },
      brandPoint: {
        name: 'Hy·Me·Up!',
        spec: 'SPF 50+ PA++++',
        detail: '4 manfaat dalam 1 langkah',
      },
      peers: [
        { name: 'Sunscreen dasar', spec: 'hanya perlindungan UV', x: 22, y: 20 },
        { name: 'Sunscreen harian', spec: 'perlindungan UV sehari-hari', x: 38, y: 17 },
        { name: 'Sunscreen pelembap', spec: 'UV + hidrasi', x: 30, y: 40 },
        { name: 'Sunscreen treatment premium', spec: 'harga lebih tinggi', x: 68, y: 74 },
      ],
    },
    footer: {
      copyright: '© 2026 HY·ME·UP! HAK CIPTA DILINDUNGI.',
    },
    legalContent: {
      privacy: {
        title: 'Informasi Produk & Ketentuan',
        subtitle: 'Hy·Me·Up! Hybrid Complete Sunscreen SPF 50+ PA++++',
        paragraphs: [
          'Sunscreen cream-gel 30 ml ℮ 1.014 fl.oz. dengan Hybrid UV Filters, Lumicease™ Blue, Rice PDRN, Postbiotic Microbiome Technology, 1.5% Cybright™, turunan Vitamin C–Hyaluronate, 16x Hyaluronate Complex, Panthenol, Allantoin, Glycerin, dan Trehalose.',
          'Catatan klaim: Hasil cerah 7 hari merujuk pada bahan CYBRIGHT™ 1.5% berdasarkan jurnal penelitiannya, bukan klaim produk Hy·Me·Up!. Hasil dapat berbeda pada tiap individu.',
          'Hanya untuk pemakaian luar. Jika kulit sensitif atau punya alergi bahan tertentu, cek daftar bahan lengkap dan lakukan patch test sebelum pemakaian. Hentikan pemakaian jika terjadi iritasi.',
          'Website ini tidak mengumpulkan data pribadi. Pembelian diproses oleh marketplace dan mengikuti kebijakan privasinya.',
        ],
      },
    },
  },
};
