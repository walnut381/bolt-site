import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent, isSignUp: boolean) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = isSignUp
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        if (error.message === 'User already registered') {
          setError('Cet email est déjà utilisé. Veuillez vous connecter.');
        } else {
          setError(error.message === 'Invalid login credentials'
            ? 'Email ou mot de passe incorrect'
            : error.message);
        }
      } else {
        if (isSignUp) {
          setError('Compte créé avec succès! Vous pouvez maintenant vous connecter.');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-8 shadow-xl border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Connexion / Inscription
      </h2>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
            required
            minLength={6}
          />
        </div>

        {error && (
          <div className={`text-sm p-3 rounded ${
            error.includes('succès') ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
          }`}>
            {error}
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={(e) => handleSubmit(e, false)}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Chargement...' : 'Connexion'}
          </button>
          <button
            onClick={(e) => handleSubmit(e, true)}
            disabled={loading}
            className="flex-1 bg-green-600 text-white rounded-md py-2 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Chargement...' : 'Inscription'}
          </button>
        </div>
      </form>
    </div>
  );
}