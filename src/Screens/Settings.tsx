import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../constants/theme';
import { useLanguage } from '../context/LanguageContext';

export default function Settings() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons
            name="settings-outline"
            size={28}
            color={COLORS.primary}
          />

          <Text style={styles.title}>
            {t('settings')}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          {t('language')}
        </Text>

        <TouchableOpacity
          style={[
            styles.option,
            language === 'es' && styles.selectedOption,
          ]}
          onPress={() => setLanguage('es')}
        >
          <View>
            <Text style={styles.optionTitle}>
              🇭🇳 {t('spanish')}
            </Text>

            <Text style={styles.optionDescription}>
              Usar LegalBooks en español
            </Text>
          </View>

          {language === 'es' && (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={COLORS.primary}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            language === 'en' && styles.selectedOption,
          ]}
          onPress={() => setLanguage('en')}
        >
          <View>
            <Text style={styles.optionTitle}>
              🇺🇸 {t('english')}
            </Text>

            <Text style={styles.optionDescription}>
              Use LegalBooks in English
            </Text>
          </View>

          {language === 'en' && (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={COLORS.primary}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>
          {t('appearance')}
        </Text>

        <View style={styles.disabledOption}>
          <View style={styles.appearanceRow}>
            <Ionicons
              name="sunny-outline"
              size={22}
              color={COLORS.primary}
            />

            <Text style={styles.optionTitle}>
              {t('lightMode')}
            </Text>
          </View>

          <Text style={styles.pendingText}>
            Próximamente
          </Text>
        </View>

        <View style={styles.disabledOption}>
          <View style={styles.appearanceRow}>
            <Ionicons
              name="moon-outline"
              size={22}
              color={COLORS.primary}
            />

            <Text style={styles.optionTitle}>
              {t('darkMode')}
            </Text>
          </View>

          <Text style={styles.pendingText}>
            Próximamente
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 28,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 14,
    marginBottom: 10,
    textTransform: 'uppercase',
  },

  option: {
    minHeight: 68,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectedOption: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  optionDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  disabledOption: {
    minHeight: 60,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 0.7,
  },

  appearanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  pendingText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});