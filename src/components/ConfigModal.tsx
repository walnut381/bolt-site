import React from 'react';
import { X, Heart, ExternalLink, Cpu, MonitorSmartphone, Database, HardDrive, CircuitBoard, Power, Box } from 'lucide-react';
import type { Config } from '../types';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import { useNavigate } from 'react-router-dom';

const COMPONENT_ICONS = {
  CPU: Cpu,
  GPU: MonitorSmartphone,
  RAM: Database,
  STORAGE: HardDrive,
  MOTHERBOARD: CircuitBoard,
  PSU: Power,
  CASE: Box,
};

interface ConfigModalProps {
  config: Config;
  onClose: () => void;
  isExample?: boolean;
}

export default function ConfigModal({ config, onClose, isExample = false }: ConfigModalProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isFavorited, toggleFavorite } = useFavorites();
  const isFavorite = !isExample && user ? isFavorited(config.id) : false;

  const handleFavoriteClick = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    await toggleFavorite(config.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="modal-backdrop absolute inset-0" onClick={onClose} />
      <div className="glass-card relative w-full max-w-4xl mx-4 rounded-2xl overflow-hidden z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">{config.title}</h2>
              <p className="text-gray-400">{config.description}</p>
            </div>
            {!isExample && (
              <button
                onClick={handleFavoriteClick}
                className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  isFavorite 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-700 text-red-400 hover:bg-gray-600'
                }`}
                aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                <Heart 
                  className={`w-6 h-6 transition-transform duration-300 ${
                    isFavorite ? 'fill-current scale-110' : 'scale-100'
                  }`}
                />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Composants</h3>
              <div className="space-y-4">
                {config.components.map((component, index) => {
                  const IconComponent = COMPONENT_ICONS[component.type];
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-800 rounded-full">
                          <IconComponent className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">{component.name}</p>
                          <p className="text-sm text-gray-400">{component.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-green-400">{component.price}€</span>
                        <a
                          href={component.amazon_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              {config.performance && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Performance</h3>
                  <div className="grid gap-4">
                    <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                      <p className="text-blue-400 font-medium">Gaming</p>
                      <p className="text-lg">{config.performance.gaming}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-800">
                      <p className="text-purple-400 font-medium">Work</p>
                      <p className="text-lg">{config.performance.work}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-lg">Budget Total</p>
                <p className="text-3xl font-bold text-green-400">{config.price_range}€</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}