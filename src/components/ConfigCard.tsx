import React from 'react';
import type { Config } from '../types';
import ConfigModal from './ConfigModal';

const PC_IMAGES = [
  'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1587202372162-e5942991d1e3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1593640495253-23196b27a87f?auto=format&fit=crop&w=800&q=80'
];

interface ConfigCardProps {
  config: Config;
  isExample?: boolean;
  index?: number;
}

export default function ConfigCard({ config, isExample = false, index = 0 }: ConfigCardProps) {
  const [showModal, setShowModal] = React.useState(false);
  const imageUrl = PC_IMAGES[index % PC_IMAGES.length];

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="glass-card rounded-2xl overflow-hidden cursor-pointer group hover:transform hover:scale-105 transition-all duration-300"
      >
        <div className="relative">
          <img
            src={imageUrl}
            alt={config.title}
            className="config-image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-2xl font-bold text-white mb-2">{config.title}</h2>
            <div className="flex justify-between items-center">
              <span className="text-green-400 font-semibold">
                {config.price_range}€
              </span>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <ConfigModal
          config={config}
          onClose={() => setShowModal(false)}
          isExample={isExample}
        />
      )}
    </>
  );
}