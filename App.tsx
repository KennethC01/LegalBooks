import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { BottomNav } from './src/components/BottonNav';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { Login } from './src/Screens/Login';
import { COLORS } from './src/constants/theme';
import { NotificationProvider } from './src/context/NotificationContext';
const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary || '#D4AF37'} />
      </View>
    );
  }

  return isAuthenticated ? <BottomNav /> : <Login />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <FavoritesProvider>
          <NotificationProvider>
          <NavigationContainer>
            <RootNavigator />
           </NavigationContainer>
          </NotificationProvider>
        </FavoritesProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background || '#FFFFFF',
  },
});