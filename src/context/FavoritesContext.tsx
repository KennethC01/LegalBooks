import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  type?: string;
  category?: string;
  [key: string]: any;
}

interface FavoritesContextType {
  favorites: Book[];
  toggleFavorite: (book: Book) => Promise<void>;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({} as FavoritesContextType);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const { user } = useAuth(); // Obtenemos la información del usuario autenticado

  // Clave dinámica en AsyncStorage asociada al correo de la cuenta activa
  const storageKey = user?.email
    ? `@legalbooks_favorites_${user.email}`
    : '@legalbooks_favorites_guest';

  // Carga los favoritos específicos cuando el usuario inicia sesión o cambia de cuenta
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user?.email) {
        setFavorites([]);
        return;
      }
      try {
        const savedFavorites = await AsyncStorage.getItem(storageKey);
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error('Error al cargar favoritos del usuario:', error);
      }
    };

    loadFavorites();
  }, [user?.email, storageKey]);

  // Guarda o elimina el favorito dentro de la clave del usuario actual
  const toggleFavorite = async (book: Book) => {
    if (!user?.email) return;

    try {
      let updatedFavorites: Book[];
      const exists = favorites.some((fav) => fav.id === book.id);

      if (exists) {
        updatedFavorites = favorites.filter((fav) => fav.id !== book.id);
      } else {
        updatedFavorites = [...favorites, book];
      }

      setFavorites(updatedFavorites);
      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error al guardar favoritos:', error);
    }
  };

  const isFavorite = (id: string) => {
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);