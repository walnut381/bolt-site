import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import type { Config } from '../types';
import ConfigCard from '../components/ConfigCard';

export default function Favorites() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = React.useState<Config[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (user) {
      loadFavorites();
    }
  }, [user, loading]);

  async function loadFavorites() {
    try {
      const { data } = await supabase
        .from('favorites')
        .select(`
          config:pc_configs (*)
        `)
        .eq('user_id', user?.id);

      setFavorites(data?.map(f => f.config) || []);
    } finally {
      setIsLoading(false);
    }
  }

  if (loading || isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Star className="w-8 h-8 text-yellow-500" />
        <h1 className="text-3xl font-bold">Mes Configurations Favorites</h1>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((config, index) => (
            <ConfigCard
              key={config.id}
              config={config}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-800 rounded-lg">
          <Star className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-xl text-gray-400">Vous n'avez pas encore de configurations favorites</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Découvrir des configurations
          </button>
        </div>
      )}
    </div>
  );
}