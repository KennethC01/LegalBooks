import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/header';
import { DocumentCard } from '../components/DocumentCard';
import { PdfViewerModal } from '../components/PdfViewerModal';
import { useFavorites } from '../context/FavoritesContext';
import { DocumentItem } from '../constants/types';
import { COLORS } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
export const Docs = () => {
  const navigation = useNavigation<any>();
  const { favorites } = useFavorites();
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectDocument = (doc: DocumentItem) => {
    setSelectedDoc(doc);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Cabecera con logo */}
      <Header 
       onNotificationPress={() => navigation.navigate('Notifications')}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>MIS DOCUMENTOS FAVORITOS</Text>

        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes documentos guardados en favoritos.</Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {favorites.map((doc) => (
              <DocumentCard key={doc.id} item={doc} onSelect={handleSelectDocument} />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Modal para visualizar el PDF */}
      <PdfViewerModal
        visible={modalVisible}
        document={selectedDoc}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 12,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Docs;