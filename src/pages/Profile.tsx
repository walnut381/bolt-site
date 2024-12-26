import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import type { PcConfig } from '../types';

export default function Profile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<PcConfig[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (user) {
      loadFavorites();
    }
  }, [user, loading]);

  async function loadFavorites() {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        config:pc_configs (
          id,
          title,
          price_range,
          description,
          created_at
        )
      `)
      .eq('user_id', user?.id);

    if (!error && data) {
      setFavorites(data.map(f => f.config));
    }
  }

  if (loading) {
    return <div className="text-white text-center">Chargement...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-gray-700 rounded-full">
            <Bookmark className="w-6 h-6 text-yellow-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Mes Configurations Favorites</h1>
        </div>

        <div className="space-y-4">
          {favorites.map((config) => (
            <div
              key={config.id}
              className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
              onClick={() => navigate(`/config/${config.id}`)}
            >
              <h2 className="text-xl font-semibold text-white mb-2">
                {config.title}
              </h2>
              <p className="text-gray-300 mb-4">{config.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-green-400 font-medium">
                  Budget: {config.price_range}€
                </span>
                <span className="text-gray-400">
                  Ajouté le {new Date(config.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}

          {favorites.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              Vous n'avez pas encore de configurations favorites
            </div>
          )}
        </div>
      </div>
    </div>
  );
}