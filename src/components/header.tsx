import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export const Header: React.FC = () => (
  <View style={styles.header}>
    <Ionicons name="menu-outline" size={28} color={COLORS.textPrimary} />
    <View style={styles.logoContainer}>
      <FontAwesome5 name="balance-scale" size={20} color={COLORS.accent} />
      <Text style={styles.logoText}>LEGALBOOKS</Text>
    </View>
    <Ionicons name="notifications-outline" size={24} color={COLORS.textPrimary} />
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.headerBg,
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoText: { fontSize: 18, fontWeight: 'bold', color: COLORS.textPrimary, letterSpacing: 1 },
});