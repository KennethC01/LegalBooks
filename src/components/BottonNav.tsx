import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export const BottomNav: React.FC = () => (
  <View style={styles.bottomNav}>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="home" size={22} color={COLORS.primary} />
      <Text style={[styles.navText, { color: COLORS.primary }]}>Inicio</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="search-outline" size={22} color={COLORS.textSecondary} />
      <Text style={styles.navText}>Buscar</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="folder-open-outline" size={22} color={COLORS.textSecondary} />
      <Text style={styles.navText}>Mis Docs</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="person-outline" size={22} color={COLORS.textSecondary} />
      <Text style={styles.navText}>Cuenta</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.surface,
    paddingTop: 10,
    // Aumentamos a 35 o 40 para elevar los iconos significativamente
    paddingBottom: Platform.OS === 'android' ? 60 : 40, 
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 10, color: COLORS.textSecondary, marginTop: 2 },
});