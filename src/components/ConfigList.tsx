import React from 'react';
import ConfigCard from './ConfigCard';
import type { Config } from '../types';

interface ConfigListProps {
  title: string;
  configs: Config[];
  showPerformance?: boolean;
}

export default function ConfigList({ title, configs, showPerformance = false }: ConfigListProps) {
  if (configs.length === 0) return null;

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {configs.map((config, index) => (
          <ConfigCard 
            key={config.id || `example-${index}`} 
            config={config}
            showPerformance={showPerformance}
            isExample={!config.id}
          />
        ))}
      </div>
    </div>
  );
}