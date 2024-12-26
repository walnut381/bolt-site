import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { Config } from '../types';

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [user]);

  async function loadFavorites() {
    try {
      const { data } = await supabase
        .from('favorites')
        .select('config_id')
        .eq('user_id', user?.id);

      setFavorites(data?.map(f => f.config_id) || []);
    } finally {
      setLoading(false);
    }
  }

  async function toggleFavorite(configId: string) {
    if (!user) return false;

    const isFavorited = favorites.includes(configId);

    if (isFavorited) {
      await supabase
        .from('favorites')
        .delete()
        .eq('config_id', configId)
        .eq('user_id', user.id);
      setFavorites(favorites.filter(id => id !== configId));
    } else {
      await supabase
        .from('favorites')
        .insert({ config_id: configId, user_id: user.id });
      setFavorites([...favorites, configId]);
    }

    return !isFavorited;
  }

  return {
    favorites,
    toggleFavorite,
    loading,
    isFavorited: (configId: string) => favorites.includes(configId)
  };
}