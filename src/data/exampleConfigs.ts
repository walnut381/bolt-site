import { type Config } from '../types';

export const exampleConfigs: Config[] = [
  {
    title: 'Config Gaming Budget',
    price_range: 800,
    description: 'Configuration idéale pour le gaming 1080p',
    components: [
      {
        name: 'AMD Ryzen 5 5600X',
        type: 'CPU',
        price: 200,
        amazon_url: 'https://www.amazon.fr/dp/B08166SLDF'
      },
      {
        name: 'NVIDIA RTX 3060',
        type: 'GPU',
        price: 350,
        amazon_url: 'https://www.amazon.fr/dp/B08WPJ5P4R'
      },
      {
        name: '16GB DDR4 3200MHz',
        type: 'RAM',
        price: 80,
        amazon_url: 'https://www.amazon.fr/dp/B0143UM4TC'
      }
    ],
    performance: {
      gaming: '1080p Ultra 60+ FPS',
      work: 'Multitâche fluide'
    }
  },
  {
    title: 'Config Gaming Premium',
    price_range: 1500,
    description: 'Pour du gaming 2K/4K sans compromis',
    components: [
      {
        name: 'AMD Ryzen 7 5800X',
        type: 'CPU',
        price: 350,
        amazon_url: 'https://www.amazon.fr/dp/B0815XFSGK'
      },
      {
        name: 'NVIDIA RTX 3080',
        type: 'GPU',
        price: 700,
        amazon_url: 'https://www.amazon.fr/dp/B08HR6ZBYJ'
      },
      {
        name: '32GB DDR4 3600MHz',
        type: 'RAM',
        price: 160,
        amazon_url: 'https://www.amazon.fr/dp/B081XWLQKS'
      }
    ],
    performance: {
      gaming: '4K Ultra 60+ FPS',
      work: 'Workstation performante'
    }
  }
];