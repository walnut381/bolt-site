import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Bookmark, ExternalLink, Cpu, MonitorSmartphone, Database, HardDrive, CircuitBoard, Power, Box } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PcConfig } from '../types';
import { useAuth } from '../hooks/useAuth';

const COMPONENT_ICONS = {
  CPU: Cpu,
  GPU: MonitorSmartphone,
  RAM: Database, // Changé de Memory à Database
  STORAGE: HardDrive,
  MOTHERBOARD: CircuitBoard,
  PSU: Power,
  CASE: Box,
};

export default function ConfigDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [config, setConfig] = useState<PcConfig | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (id) {
      loadConfig();
      if (user) {
        checkLikeStatus();
        checkFavoriteStatus();
      }
    }
  }, [id, user]);

  async function loadConfig() {
    const { data, error } = await supabase
      .from('pc_configs')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      setConfig(data);
    }
  }

  async function checkLikeStatus() {
    const { data } = await supabase
      .from('likes')
      .select('id')
      .eq('config_id', id)
      .eq('user_id', user?.id)
      .single();

    setIsLiked(!!data);
  }

  async function checkFavoriteStatus() {
    const { data } = await supabase
      .from('favorites')
      .select('id')
      .eq('config_id', id)
      .eq('user_id', user?.id)
      .single();

    setIsFavorited(!!data);
  }

  async function toggleLike() {
    if (!user || !config) return;

    if (isLiked) {
      await supabase
        .from('likes')
        .delete()
        .eq('config_id', config.id)
        .eq('user_id', user.id);
    } else {
      await supabase
        .from('likes')
        .insert({ config_id: config.id, user_id: user.id });
    }

    setIsLiked(!isLiked);
    loadConfig();
  }

  async function toggleFavorite() {
    if (!user || !config) return;

    if (isFavorited) {
      await supabase
        .from('favorites')
        .delete()
        .eq('config_id', config.id)
        .eq('user_id', user.id);
    } else {
      await supabase
        .from('favorites')
        .insert({ config_id: config.id, user_id: user.id });
    }

    setIsFavorited(!isFavorited);
  }

  if (!config) {
    return <div className="text-white text-center">Chargement...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{config.title}</h1>
            <p className="text-gray-400">{config.description}</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={toggleLike}
              className={`p-2 rounded-full ${
                isLiked ? 'bg-pink-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'text-white' : 'text-gray-400'}`} />
            </button>
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full ${
                isFavorited ? 'bg-yellow-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Bookmark className={`w-6 h-6 ${isFavorited ? 'text-white' : 'text-gray-400'}`} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {config.components.map((component, index) => {
            const IconComponent = COMPONENT_ICONS[component.type];
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-800 rounded-full">
                    <IconComponent className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{component.name}</h3>
                    <p className="text-gray-400">{component.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-green-400 font-medium">{component.price}€</span>
                  <a
                    href={component.amazon_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-white">
              Budget Total: {config.price_range}€
            </span>
            <span className="text-gray-400">
              Créé le {new Date(config.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}