import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import { Home } from '../Screens/Home';
import { Docs } from '../Screens/Docs';
import { Account } from '../Screens/Account';
import { COLORS } from '../constants/theme';

const Tab = createBottomTabNavigator();

export const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          // Convertimos la barra en flotante
          position: 'absolute',
          bottom: Platform.OS === 'android' ? 40 : 40, // Despega toda la barra del borde inferior
          left: 16,
          right: 16,
          borderRadius: 20, // Bordes redondeados estéticos
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          // Sombra para Android y iOS
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
        },
        tabBarIconStyle: {
          marginTop: -7,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Mis Docs') {
            iconName = focused ? 'folder-open' : 'folder-open-outline';
          } else if (route.name === 'Cuenta') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Mis Docs" component={Docs} />
      <Tab.Screen name="Cuenta" component={Account} />
    </Tab.Navigator>
  );
};