import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomNav } from './src/components/BottonNav';
import { FavoritesProvider } from './src/context/FavoritesContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <BottomNav />
        </NavigationContainer>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}