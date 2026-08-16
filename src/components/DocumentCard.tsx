import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DocumentItem } from '../constants/types';
import { COLORS } from '../constants/theme';
import { useFavorites } from '../context/FavoritesContext';

interface Props {
  item: DocumentItem;
  onSelect: (item: DocumentItem) => void;
}

export const DocumentCard: React.FC<Props> = ({ item, onSelect }) => {
  // Conexión con el contexto de favoritos
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(item.id);

  return (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(item)} activeOpacity={0.7}>
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
          onPress={() => toggleFavorite(item)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={favorite ? 'star' : 'star-outline'}
            size={20}
            color={favorite ? '#270767' : COLORS.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.cardSubtitle} numberOfLines={2}>{item.subtitle}</Text>
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