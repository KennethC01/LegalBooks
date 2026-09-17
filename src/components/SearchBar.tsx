import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useLanguage } from '../context/LanguageContext';
interface Props {
  query: string;
  onChangeQuery: (text: string) => void;
}

export const SearchBar: React.FC<Props> = ({ query, onChangeQuery }) => {
  const { language } = useLanguage();

  return (
    <View style={{ marginBottom: 16 }}>
      <View style={styles.searchSection}>
        <Ionicons
          name="search"
          size={20}
          color={COLORS.textSecondary}
          style={styles.searchIcon}
        />

        <TextInput
          style={styles.input}
          placeholder={
            language === 'es'
              ? 'Buscar leyes, sentencias, contratos...'
              : 'Search laws, rulings, contracts...'
          }
          value={query}
          onChangeText={onChangeQuery}
          placeholderTextColor="#94A3B8"
        />
      </View>

      <TouchableOpacity style={styles.filterButton}>
        <Ionicons
          name="options-outline"
          size={18}
          color="#FFF"
        />

        <Text style={styles.filterButtonText}>
          {language === 'es'
            ? 'FILTRAR BÚSQUEDA'
            : 'FILTER SEARCH'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
  },
  searchIcon: { marginRight: 8 },
  input: { flex: 1, height: 44, color: COLORS.textPrimary },
  filterButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  filterButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
});