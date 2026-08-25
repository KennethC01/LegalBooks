import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import { Home } from '../Screens/Home';
import { Docs } from '../Screens/Docs';
import { Account } from '../Screens/Account';
import { Notifications } from '../Screens/Notifications';

import { COLORS } from '../constants/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => {
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

          height: Platform.OS === 'ios' ? 140 : 120,
          paddingBottom: Platform.OS === 'ios' ? 25 : 12,
          paddingTop: 8,

          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },

        tabBarIconStyle: {
          marginTop: 0,
        },

        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Mis Docs') {
            iconName = focused
              ? 'folder-open'
              : 'folder-open-outline';
          } else if (route.name === 'Cuenta') {
            iconName = focused
              ? 'person'
              : 'person-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={22}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Mis Docs" component={Docs} />
      <Tab.Screen name="Cuenta" component={Account} />
    </Tab.Navigator>
  );
};

export const BottomNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
      />

      <Stack.Screen
        name="Notifications"
        component={Notifications}
      />
    </Stack.Navigator>
  );
};