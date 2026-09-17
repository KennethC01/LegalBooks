import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'es' | 'en';

type TranslationKey =
  | 'home'
  | 'documents'
  | 'favorites'
  | 'account'
  | 'settings'
  | 'notifications'
  | 'search'
  | 'language'
  | 'appearance'
  | 'spanish'
  | 'english'
  | 'lightMode'
  | 'darkMode'
  | 'logout'
  | 'welcome';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const translations: Record<
  Language,
  Record<TranslationKey, string>
> = {
  es: {
    home: 'Inicio',
    documents: 'Documentos',
    favorites: 'Favoritos',
    account: 'Cuenta',
    settings: 'Configuracion',
    notifications: 'Notificaciones',
    search: 'Buscar documentos',
    language: 'Idioma',
    appearance: 'Apariencia',
    spanish: 'Español',
    english: 'Ingles',
    lightMode: 'Modo claro',
    darkMode: 'Modo oscuro',
    logout: 'Cerrar sesión',
    welcome: 'Bienvenido',
  },

  en: {
    home: 'Home',
    documents: 'Documents',
    favorites: 'Favorites',
    account: 'Account',
    settings: 'Settings',
    notifications: 'Notifications',
    search: 'Search documents',
    language: 'Language',
    appearance: 'Appearance',
    spanish: 'Spanish',
    english: 'English',
    lightMode: 'Light mode',
    darkMode: 'Dark mode',
    logout: 'Log out',
    welcome: 'Welcome',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const LANGUAGE_STORAGE_KEY = '@legalbooks_language';

export const LanguageProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(
          LANGUAGE_STORAGE_KEY
        );

        if (savedLanguage === 'es' || savedLanguage === 'en') {
          setLanguageState(savedLanguage);
        }
      } catch (error) {
        console.log('Error al cargar el idioma:', error);
      }
    };

    loadLanguage();
  }, []);

  const setLanguage = async (newLanguage: Language) => {
    try {
      setLanguageState(newLanguage);

      await AsyncStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        newLanguage
      );
    } catch (error) {
      console.log('Error al guardar el idioma:', error);
    }
  };

  const t = (key: TranslationKey) => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      'useLanguage debe usarse dentro de LanguageProvider'
    );
  }

  return context;
};