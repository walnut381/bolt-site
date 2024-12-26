import React from 'react';
import { supabase } from '../lib/supabase';
import ConfigCard from '../components/ConfigCard';
import { exampleConfigs } from '../data/exampleConfigs';
import type { Config } from '../types';

export default function Home() {
  const [configs, setConfigs] = React.useState<Config[]>([]);

  React.useEffect(() => {
    loadConfigs();
  }, []);

  async function loadConfigs() {
    const { data, error } = await supabase
      .from('pc_configs')
      .select('*, likes(count)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setConfigs(data.map(config => ({
        ...config,
        likes: config.likes[0]?.count || 0
      })));
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            PC Gaming Elite
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Découvrez nos configurations gaming optimisées pour une expérience ultime
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exampleConfigs.map((config, index) => (
            <ConfigCard
              key={`example-${index}`}
              config={config}
              isExample={true}
            />
          ))}
          {configs.map((config) => (
            <ConfigCard
              key={config.id}
              config={config}
            />
          ))}
        </div>
      </div>
    </div>
  );
}