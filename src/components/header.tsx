import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

interface HeaderProps {
  onNotificationPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNotificationPress,}) => (
  <View style={styles.header}>
    <Ionicons
      name="menu-outline"
      size={28}
      color={COLORS.textPrimary}
    />
    <View style={styles.logoContainer}>
      <FontAwesome5
        name="balance-scale"
        size={20}
        color={COLORS.accent}
      />
      <Text style={styles.logoText}>
        LEGALBOOKS
      </Text>
    </View>
    <TouchableOpacity
      onPress={onNotificationPress}
      activeOpacity={0.7}
      style={styles.notificationButton}
    >
      <Ionicons
        name="notifications-outline"
        size={24}
        color={COLORS.textPrimary}
      />
    </TouchableOpacity>
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

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },

  notificationButton: {
    padding: 4,
  },
});