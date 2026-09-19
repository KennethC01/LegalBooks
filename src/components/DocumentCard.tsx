import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DocumentItem } from '../constants/types';
import { COLORS } from '../constants/theme';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
interface Props {
  item: DocumentItem;
  onSelect: (item: DocumentItem) => void;
}

export const DocumentCard: React.FC<Props> = ({ item, onSelect }) => {
  // Conexión con el contexto de favoritos
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { colors } = useTheme();
  const favorites = useAppSelector(state => state.favorites.documents);
  const favorite = favorites.some(document => document.id === item.id);
  const handleToggleFavorite = async () => {
  if (!user?.email) return;

  const exists = favorites.some(
    document => document.id === item.id
  );

  const updatedFavorites = exists
    ? favorites.filter(document => document.id !== item.id)
    : [...favorites, item];

  dispatch(toggleFavorite(item));

  try {
    const storageKey = `@legalbooks_favorites_${user.email}`;

    await AsyncStorage.setItem(
      storageKey,
      JSON.stringify(updatedFavorites)
    );
  } catch (error) {
    console.error(
      'Error al guardar favoritos en Redux:',
      error
    );
  }
};
  return (
    <TouchableOpacity
  style={[
    styles.card,
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
  ]}
  onPress={() => onSelect(item)}
  activeOpacity={0.7}
>
      <View style={styles.cardHeader}>
        {/* Agrupamos el icono y la etiqueta a la izquierda */}
        <View style={styles.leftHeader}>
          <Ionicons
            name={item.type === 'PDF' ? 'document-text' : 'create'}
            size={24}
            color={item.type === 'PDF' ? COLORS.primary : COLORS.accent}
          />
          {item.tag && <Text style={styles.badge}>{item.tag}</Text>}
        </View>

        {/* Botón de Estrella a la derecha */}
        <TouchableOpacity
          onPress={handleToggleFavorite}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={favorite ? 'star' : 'star-outline'}
            size={20}
            color={favorite ? '#270767' : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <Text
  style={[styles.cardTitle, { color: colors.textPrimary }]}numberOfLines={2}>{item.title}
</Text>

<Text
  style={[styles.cardSubtitle, { color: colors.textSecondary }]}numberOfLines={2}>{item.subtitle}
</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 8, 
    alignItems: 'center' 
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badge: {
    backgroundColor: COLORS.accent,
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cardTitle: { fontSize: 13, fontWeight: 'bold', color: COLORS.primary, marginBottom: 4 },
  cardSubtitle: { fontSize: 11, color: COLORS.textSecondary },
});