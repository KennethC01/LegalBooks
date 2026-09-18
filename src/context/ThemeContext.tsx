import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = "light" | "dark";

const lightColors = {
  background: "#F5F7FA",
  surface: "#FFFFFF",
  textPrimary: "#1F2937",
  textSecondary: "#6B7280",
  primary: "#163A5F",
  border: "#E5E7EB",
};

const darkColors = {
  background: "#121212",
  surface: "#1E1E1E",
  textPrimary: "#F5F5F5",
  textSecondary: "#BDBDBD",
  primary: "#6EA8D9",
  border: "#333333",
};

interface ThemeContextData {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof lightColors;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const THEME_STORAGE_KEY = '@legalbooks_theme_mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    loadStoredTheme();
  }, []);

  const loadStoredTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      }
    } catch (error) {
      console.error("Error al cargar el tema desde AsyncStorage:", error);
    }
  };

  const toggleTheme = async () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (error) {
      console.error("Error al guardar el tema en AsyncStorage:", error);
    }
  };

  const isDark = theme === "dark";
  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
