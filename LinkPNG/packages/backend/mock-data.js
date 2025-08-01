// Authentic PNG Product Catalog - Demo Data
const products = [
  // TRADITIONAL CRAFTS & CULTURAL ITEMS
  { 
    id: 1, 
    name: 'Traditional Bilum Bag - Highlands Style', 
    nameKey: 'bilumBagHighlands',
    category: 'Traditional Crafts', 
    price: 85.00, 
    originalPrice: 120.00,
    image: '/images/products/bilum-highlands.svg',
    province: 'Western Highlands',
    description: 'Hand-woven bilum bag from the Western Highlands, featuring traditional geometric patterns in natural fiber',
    culturalNote: 'Made by women\'s cooperatives using traditional weaving techniques passed down through generations'
  },
  { 
    id: 2, 
    name: 'Sepik River Wood Carving - Crocodile Spirit', 
    nameKey: 'sepikWoodCarving',
    category: 'Traditional Crafts', 
    price: 450.00, 
    originalPrice: 600.00,
    image: '/images/products/sepik-carving.webp',
    province: 'East Sepik',
    description: 'Authentic Sepik River wood carving representing the crocodile spirit, carved from traditional kwila wood',
    culturalNote: 'Each carving tells ancestral stories and represents spiritual connections to the Sepik River'
  },
  { 
    id: 3, 
    name: 'Traditional Shell Jewelry Set - Manus', 
    nameKey: 'manusShellJewelry',
    category: 'Traditional Crafts', 
    price: 180.00, 
    image: '/images/products/manus-shells.webp',
    province: 'Manus',
    description: 'Beautiful shell jewelry set from Manus Province, featuring traditional Pacific pearl arrangements',
    culturalNote: 'Crafted by master artisans using shells from pristine Manus waters'
  },
  { 
    id: 4, 
    name: 'Tapa Cloth Wall Hanging - Oro Style', 
    nameKey: 'oroTapaCloth',
    category: 'Traditional Crafts', 
    price: 320.00, 
    image: '/images/products/oro-tapa.webp',
    province: 'Oro (Northern)',
    description: 'Traditional tapa cloth featuring intricate Oro Province patterns, made from mulberry bark',
    culturalNote: 'Ancient art form representing tribal identity and ceremonial significance'
  },

  // PNG COFFEE - WORLD RENOWNED
  { 
    id: 5, 
    name: 'PNG Arabica Coffee - Western Highlands', 
    nameKey: 'westernHighlandsCoffee',
    category: 'PNG Coffee', 
    price: 42.00, 
    originalPrice: 55.00,
    image: '/images/products/highlands-coffee.svg',
    province: 'Western Highlands',
    description: 'Premium single-origin arabica coffee from the Western Highlands, known for its rich flavor and mountain-grown quality',
    culturalNote: 'Grown by smallholder farmers in the highlands, supporting local communities'
  },
  { 
    id: 6, 
    name: 'Sigri Estate Coffee - Wahgi Valley', 
    nameKey: 'sigriEstateCoffee',
    category: 'PNG Coffee', 
    price: 65.00, 
    image: '/images/products/sigri-coffee.webp',
    province: 'Western Highlands',
    description: 'World-famous Sigri Estate coffee, consistently rated among the world\'s best coffees',
    culturalNote: 'Estate established in 1950s, combining traditional methods with modern processing'
  },
  { 
    id: 7, 
    name: 'Eastern Highlands Organic Coffee', 
    nameKey: 'easternHighlandsCoffee',
    category: 'PNG Coffee', 
    price: 38.00, 
    image: '/images/products/eastern-coffee.webp',
    province: 'Eastern Highlands',
    description: 'Certified organic coffee from Eastern Highlands, shade-grown and bird-friendly',
    culturalNote: 'Supports sustainable farming practices and bird conservation'
  },

  // LOCAL FOOD PRODUCTS
  { 
    id: 8, 
    name: 'Traditional Sago Flour - Western Province', 
    nameKey: 'westernSagoFlour',
    category: 'Local Foods', 
    price: 25.00, 
    image: '/images/products/sago-flour.webp',
    province: 'Western Province',
    description: 'Pure sago flour from Western Province, a traditional staple food of PNG',
    culturalNote: 'Harvested from sago palms using traditional extraction methods'
  },
  { 
    id: 9, 
    name: 'Dried Fish - Milne Bay Traditional', 
    nameKey: 'milneBayDriedFish',
    category: 'Local Foods', 
    price: 35.00, 
    image: '/images/products/dried-fish.webp',
    province: 'Milne Bay',
    description: 'Traditional dried fish from Milne Bay, prepared using ancestral smoking techniques',
    culturalNote: 'Sustainable fishing practices supporting coastal communities'
  },
  { 
    id: 10, 
    name: 'Taro Chips - Morobe Style', 
    nameKey: 'morobeTaroChips',
    category: 'Local Foods', 
    price: 18.00, 
    originalPrice: 25.00,
    image: '/images/products/taro-chips.webp',
    province: 'Morobe',
    description: 'Crispy taro chips from Morobe Province, made from locally grown taro',
    culturalNote: 'Traditional root vegetable prepared with modern processing techniques'
  },
  { 
    id: 11, 
    name: 'Wild Honey - Madang Forest', 
    nameKey: 'madangWildHoney',
    category: 'Local Foods', 
    price: 55.00, 
    image: '/images/products/madang-honey.webp',
    province: 'Madang',
    description: 'Pure wild honey from Madang rainforests, collected using traditional methods',
    culturalNote: 'Supports forest conservation and traditional honey gathering practices'
  },

  // PNG FASHION & MODERN CULTURAL ITEMS
  { 
    id: 12, 
    name: 'PNG Flag T-Shirt - Premium Cotton', 
    nameKey: 'pngFlagTshirt',
    category: 'PNG Fashion', 
    price: 28.00, 
    originalPrice: 35.00,
    image: '/images/products/png-flag-shirt.webp',
    description: 'High-quality PNG flag t-shirt made from premium cotton, perfect for showing national pride',
    culturalNote: 'Features the Bird of Paradise and Southern Cross constellation'
  },
  { 
    id: 13, 
    name: 'Traditional Patterns Laptop Bag', 
    nameKey: 'traditionalPatternsLaptop',
    category: 'PNG Fashion', 
    price: 95.00, 
    image: '/images/products/traditional-laptop-bag.webp',
    description: 'Modern laptop bag featuring traditional PNG patterns, perfect for urban professionals',
    culturalNote: 'Blends traditional motifs with contemporary design for the modern PNG professional'
  },
  { 
    id: 14, 
    name: 'Kundu Drum Miniature - Decorative', 
    nameKey: 'kunduDrumMiniature',
    category: 'Traditional Crafts', 
    price: 125.00, 
    image: '/images/products/kundu-drum.svg',
    description: 'Miniature kundu drum, perfect for decoration or cultural education',
    culturalNote: 'Traditional communication instrument used across many PNG cultures'
  },

  // HOUSEHOLD & PRACTICAL ITEMS
  { 
    id: 15, 
    name: 'Coconut Oil Soap - Bougainville Natural', 
    nameKey: 'bougainvilleCoconutSoap',
    category: 'Personal Care', 
    price: 15.00, 
    image: '/images/products/coconut-soap.webp',
    province: 'Bougainville',
    description: 'Natural coconut oil soap from Bougainville, made with traditional ingredients',
    culturalNote: 'Supporting Bougainville recovery through sustainable local production'
  },
  { 
    id: 16, 
    name: 'Woven Grass Sleeping Mat - Gulf Province', 
    nameKey: 'gulfWovenMat',
    category: 'Traditional Crafts', 
    price: 75.00, 
    image: '/images/products/grass-mat.webp',
    province: 'Gulf',
    description: 'Traditional woven sleeping mat from Gulf Province, made from native grass',
    culturalNote: 'Traditional bedding still used in many rural PNG communities'
  },
  { 
    id: 17, 
    name: 'PNG Spices Mix - Traditional Recipe', 
    nameKey: 'pngSpicesMix',
    category: 'Local Foods', 
    price: 22.00, 
    image: '/images/products/png-spices.webp',
    description: 'Traditional PNG spice mix featuring local herbs and seasonings',
    culturalNote: 'Secret family recipes passed down through generations'
  },
  { 
    id: 18, 
    name: 'Bird of Paradise Artwork - Digital Print', 
    nameKey: 'birdOfParadiseArt',
    category: 'Modern PNG', 
    price: 45.00, 
    image: '/images/products/bird-paradise-art.webp',
    description: 'Beautiful Bird of Paradise artwork, perfect for home or office decoration',
    culturalNote: 'PNG national bird representing the spirit of independence'
  },
  { 
    id: 19, 
    name: 'Traditional Clay Pot - Pottery Village', 
    nameKey: 'traditionalClayPot',
    category: 'Traditional Crafts', 
    price: 65.00, 
    image: '/images/products/clay-pot.webp',
    description: 'Handmade clay pot from traditional pottery villages, perfect for cooking or decoration',
    culturalNote: 'Ancient pottery techniques still practiced in remote villages'
  },
  { 
    id: 20, 
    name: 'PNG Independence T-Shirt Collection', 
    nameKey: 'pngIndependenceTshirt',
    category: 'PNG Fashion', 
    price: 32.00, 
    image: '/images/products/independence-shirt.webp',
    description: 'Commemorative PNG Independence t-shirt featuring cultural symbols and national colors',
    culturalNote: 'Celebrating PNG independence and cultural heritage'
  },
];

// Product categories for navigation
const categories = [
  { id: 1, name: 'Traditional Crafts', nameKey: 'traditionalCrafts', icon: '🏺' },
  { id: 2, name: 'PNG Coffee', nameKey: 'pngCoffee', icon: '☕' },
  { id: 3, name: 'Local Foods', nameKey: 'localFoods', icon: '🥥' },
  { id: 4, name: 'PNG Fashion', nameKey: 'pngFashion', icon: '👕' },
  { id: 5, name: 'Personal Care', nameKey: 'personalCare', icon: '🧴' },
  { id: 6, name: 'Modern PNG', nameKey: 'modernPng', icon: '🎨' },
];

// PNG Provinces for location-based features
const provinces = [
  'Central', 'Chimbu (Simbu)', 'Eastern Highlands', 'East New Britain', 'East Sepik',
  'Enga', 'Gulf', 'Hela', 'Jiwaka', 'Madang', 'Manus', 'Milne Bay', 'Morobe',
  'National Capital District', 'New Ireland', 'Oro (Northern)', 'Sandaun (West Sepik)',
  'Southern Highlands', 'Western', 'Western Highlands', 'West New Britain', 'Bougainville'
];

module.exports = { products, categories, provinces }; 