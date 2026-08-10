import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DocumentItem } from '../constants/types';
import { COLORS } from '../constants/theme';

interface Props {
  item: DocumentItem;
  onSelect: (item: DocumentItem) => void;
}

export const DocumentCard: React.FC<Props> = ({ item, onSelect }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(item)} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <Ionicons
          name={item.type === 'PDF' ? 'document-text' : 'create'}
          size={24}
          color={item.type === 'PDF' ? COLORS.primary : COLORS.accent}
        />
        {item.tag && <Text style={styles.badge}>{item.tag}</Text>}
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
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' },
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