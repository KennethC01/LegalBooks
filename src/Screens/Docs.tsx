import React, {useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/header';
import { DocumentCard } from '../components/DocumentCard';
import { PdfViewerModal } from '../components/PdfViewerModal';
import { DocumentItem } from '../constants/types';
import { COLORS } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addDocument, removeDocument } from '../store/slices/inventorySlice';
import { useLanguage } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { setFavorites } from '../store/slices/favoritesSlice';
import { useTheme } from '../context/ThemeContext';
export const Docs = () => {
  const navigation = useNavigation<any>();
  const { language } = useLanguage();
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const reduxDocuments = useAppSelector(
    (state) => state.inventory.documents);
  console.log(
    'Documentos almacenados en Redux:',
    reduxDocuments
  );
const favorites = useAppSelector(state => state.favorites.documents); 
   useEffect(() => {
  const loadFavorites = async () => {
    if (!user?.email) {
      dispatch(setFavorites([]));
      return;
    }

    try {
      const storageKey = `@legalbooks_favorites_${user.email}`;

      const savedFavorites = await AsyncStorage.getItem(
        storageKey
      );

      if (savedFavorites) {
        dispatch(
          setFavorites(JSON.parse(savedFavorites))
        );
      } else {
        dispatch(setFavorites([]));
      }
    } catch (error) {
      console.error(
        'Error al cargar favoritos en Redux:',
        error
      );
    }
  };

  loadFavorites();
}, [user?.email, dispatch]);
const [selectedDoc, setSelectedDoc] =useState<DocumentItem | null>(null);
  const [modalVisible, setModalVisible] =useState(false);
  const handleSelectDocument = (doc: DocumentItem) => {setSelectedDoc(doc);setModalVisible(true);
  };

  /*const handleAddReduxDocument = () => {dispatch(addDocument({id: Date.now().toString(),name: 'Constitucion de Honduras',}));
  };
  const handleRemoveReduxDocument = (id: string) => {dispatch(removeDocument(id));
  };*/
  return (
      <SafeAreaView style={[styles.container,{ backgroundColor: colors.background },]}edges={['top', 'left', 'right']}>
    {/* Cabecera con logo */}
      <Header 
       onNotificationPress={() => navigation.navigate('Notifications')}
      />
       <ScrollView
  contentContainerStyle={styles.scrollContent}
  showsVerticalScrollIndicator={false}
>
       

        <Text style={[styles.sectionTitle, { color: colors.primary }]}>
  {language === 'es'
    ? 'MIS DOCUMENTOS FAVORITOS'
    : 'MY FAVORITE DOCUMENTS'}
</Text>

{favorites.length === 0 ? (
  <View style={styles.emptyContainer}>
    <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
      {language === 'es'
        ? 'No tienes documentos guardados en favoritos.'
        : 'You have no documents saved as favorites.'}
    </Text>
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