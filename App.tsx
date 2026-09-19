import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux'; // <-- 1. Importar Redux Provider
import { LanguageProvider } from './src/context/LanguageContext';
import { store } from './src/store'; // <-- 2. Importar el store creado
import { BottomNav } from './src/components/BottonNav';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { Login } from './src/Screens/Login';
import { COLORS } from './src/constants/theme';
import { NotificationProvider } from './src/context/NotificationContext';
import { ThemeProvider } from './src/context/ThemeContext';
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
    <Provider store={store}> 
      <ThemeProvider>
      <LanguageProvider>
      <SafeAreaProvider>
        <AuthProvider>
            <NotificationProvider>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </NotificationProvider>
        </AuthProvider>
      </SafeAreaProvider>
       </LanguageProvider>
       </ThemeProvider>
    </Provider>
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