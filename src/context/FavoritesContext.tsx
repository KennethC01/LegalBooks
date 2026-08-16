import React, { createContext, useContext, useState } from 'react';
import { DocumentItem } from '../constants/types';

interface FavoritesContextType {
  favorites: DocumentItem[];
  toggleFavorite: (doc: DocumentItem) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<DocumentItem[]>([]);

  const toggleFavorite = (doc: DocumentItem) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === doc.id);
      if (exists) {
        return prev.filter(item => item.id !== doc.id);
      } else {
        return [...prev, doc];
      }
    });
  };

  const isFavorite = (id: string) => favorites.some(doc => doc.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  }
  return context;
};