import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface FavoriteButtonProps {
  configId: string;
  className?: string;
}

export default function FavoriteButton({ configId, className = '' }: FavoriteButtonProps) {
  const { user } = useAuth();
  const { isFavorited, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const isFavorite = isFavorited(configId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate('/auth');
      return;
    }

    await toggleFavorite(configId);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2.5 rounded-full transition-all duration-300 transform hover:scale-110 ${
        isFavorite 
          ? 'bg-red-600 text-white' 
          : 'bg-gray-800/50 text-red-400 hover:bg-gray-800/80'
      } ${className}`}
      aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <Heart 
        className={`w-5 h-5 transition-transform duration-300 ${
          isFavorite ? 'fill-current scale-110' : 'scale-100'
        }`}
      />
    </button>
  );
}