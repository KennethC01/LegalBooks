import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/header';
import { DocumentCard } from '../components/DocumentCard';
import { PdfViewerModal } from '../components/PdfViewerModal';
import { useFavorites } from '../context/FavoritesContext';
import { DocumentItem } from '../constants/types';
import { COLORS } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addDocument, removeDocument } from '../store/slices/inventorySlice';
export const Docs = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const reduxDocuments = useAppSelector(
    (state) => state.inventory.documents);
  console.log(
    'Documentos almacenados en Redux:',
    reduxDocuments
  );
  const { favorites } = useFavorites();
  const [selectedDoc, setSelectedDoc] =useState<DocumentItem | null>(null);
  const [modalVisible, setModalVisible] =useState(false);
  const handleSelectDocument = (doc: DocumentItem) => {setSelectedDoc(doc);setModalVisible(true);
  };

  const handleAddReduxDocument = () => {dispatch(addDocument({id: Date.now().toString(),name: 'Constitucion de Honduras',}));
  };
  const handleRemoveReduxDocument = (id: string) => {dispatch(removeDocument(id));
  };
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Cabecera con logo */}
      <Header 
       onNotificationPress={() => navigation.navigate('Notifications')}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>DOCUMENTOS EN REDUX</Text>

<TouchableOpacity
  style={styles.reduxButton}
  onPress={handleAddReduxDocument}
>
  <Text style={styles.reduxButtonText}>
    AGREGAR DOCUMENTO A REDUX
  </Text>
</TouchableOpacity>

{reduxDocuments.map((doc) => (
  <View key={doc.id} style={styles.reduxDocument}>
    <Text style={styles.reduxDocumentText}>
      {doc.name}
    </Text>

    <TouchableOpacity
      onPress={() => handleRemoveReduxDocument(doc.id)}
    >
      <Text style={styles.removeText}>Eliminar</Text>
    </TouchableOpacity>
  </View>
))}
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
  reduxButton: {
  backgroundColor: COLORS.primary,
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginBottom: 12,
},

reduxButtonText: {
  color: '#FFFFFF',
  fontWeight: 'bold',
  fontSize: 13,
},

reduxDocument: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: COLORS.surface,
  padding: 12,
  borderRadius: 8,
  marginBottom: 8,
  borderWidth: 1,
  borderColor: COLORS.border,
},

reduxDocumentText: {
  color: COLORS.textPrimary,
  fontSize: 14,
  fontWeight: '600',
  flex: 1,
},

removeText: {
  color: '#DC3545',
  fontWeight: 'bold',
  marginLeft: 12,
},
});

export default Docs;