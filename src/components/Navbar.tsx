import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, User, LogIn, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Home className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">PC Builder</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user && (
              <Link 
                to="/favorites" 
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                <Star className="w-5 h-5" />
                <span>Favoris</span>
              </Link>
            )}
            {user ? (
              <>
                <Link to="/profile" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => supabase.auth.signOut().then(() => navigate('/'))}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/auth" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}