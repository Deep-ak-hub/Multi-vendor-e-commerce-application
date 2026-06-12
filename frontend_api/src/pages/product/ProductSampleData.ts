export interface ProductSample {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
}

export const ProductSampleData: ProductSample[] = [
  {
    id: 'p1',
    title: 'Minimalist Leather Tote',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80',
    description: 'A sleek leather tote designed for everyday carry with durable straps and plenty of room.',
  },
  {
    id: 'p2',
    title: 'Wireless Noise-Canceling Headphones',
    price: 249.0,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'High-fidelity headphones with active noise cancellation and up to 30 hours of battery life.',
  },
  {
      id: 'p3',
      title: "MacBook Pro",
      price: 280000,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      description: "Premium laptop with M3 Max processor for professionals"
    },
  {
      id: 'p4',
      title: "iPad Air",
      price: 80000,
      image: "https://images.unsplash.com/photo-1648806030599-c963fd14a22f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Versatile tablet perfect for work and entertainment"
    },
    {
      id: 'p5',
      title: "Kindle Paperwhite",
      price: 18000,
      image: "https://images.unsplash.com/photo-1504598561342-6b76820ef3e6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "E-reader with waterproof design and warm light"
    },
    {
      id: 'p6',
      title: "Google Pixel 8",
      price: 85000,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      description: "AI-powered smartphone with exceptional computational photography"
    },
  {
    id: 'p7',
    title: 'Portable Bluetooth Speaker',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    description: 'Rugged wireless speaker with deep bass, waterproof design, and long-lasting battery.',
  },
   {
      id: 'p8',
      title: "OnePlus 12",
      price: 65000,
      image: "https://images.unsplash.com/photo-1600721502738-84bd123c8a99?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "High-performance Android phone with fast charging"
    },
  {
    id: 'p9',
    title: 'Gaming Mouse with RGB',
    price: 49.95,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80',
    description: 'Precision optical gaming mouse with customizable RGB lighting and programmable buttons.',
  },
  {
      id: 'p10',
      title: "Dell XPS 13",
      price: 150000,
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
      description: "Compact ultrabook with stunning InfinityEdge display"
    },
    {
      id: 'p11',
      title: "Kindle Paperwhite",
      price: 18000,
      image: "https://images.unsplash.com/photo-1504598561342-6b76820ef3e6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "E-reader with waterproof design and warm light"
    },
  {
    id: 'p12',
    title: 'Travel Backpack',
    price: 69.0,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    description: 'Durable travel backpack with padded laptop compartment and multiple organizer pockets.',
  },
  {
      id: 'p13',
      title: "Oculus Quest 3",
      price: 55000,
      image: "https://images.unsplash.com/photo-1698051149619-06ea4df4787c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Advanced VR headset for immersive gaming experience"
    },
    {
      id: 'p14',
      title: "GoPro Hero 12",
      price: 48000,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
      description: "Rugged action camera with 5.3K video recording"
    },
  {
    id: 'p15',
    title: 'Aromatic Soy Candle',
    price: 18.5,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&q=80',
    description: 'Hand-poured soy candle with a subtle botanical fragrance and long burn time.',
  },
  {
    id: 'p16',
    title: 'Adjustable Yoga Mat',
    price: 59.5,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80',
    description: 'Non-slip yoga mat with extra cushioning and alignment markers for a better practice.',
  },
   {
      id: 'p17',
      title: "iPhone 15",
      price: 120000,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
      description: "Latest iPhone with advanced camera system and A17 Pro chip"
    },
    {
      id: 'p18',
      title: "Samsung Galaxy S24",
      price: 110000,
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
      description: "Flagship Samsung phone with AI photography features"
    },
 {
      id: 'p19',
      title: "Sony WH-1000XM5",
      price: 35000,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      description: "Industry-leading noise-cancelling wireless headphones"
    },
    {
      id: 'p20',
      title: "Google Pixel 8",
      price: 85000,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      description: "AI-powered smartphone with exceptional computational photography"
    },
];
