export interface Component {
  name: string;
  type: 'CPU' | 'GPU' | 'RAM' | 'STORAGE' | 'MOTHERBOARD' | 'PSU' | 'CASE';
  price: number;
  amazon_url: string;
}

export interface PcConfig {
  id: string;
  title: string;
  price_range: number;
  description: string;
  components: Component[];
  likes: number;
  is_liked?: boolean;
  is_favorited?: boolean;
  created_at: string;
  user_id: string;
}

export interface User {
  id: string;
  email: string;
}