import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/header';
import { SearchBar } from '../components/SearchBar';
import { DocumentCard } from '../components/DocumentCard';
import { PdfViewerModal } from '../components/PdfViewerModal';
import { DOCUMENTS } from '../data/documents';
import { COLORS } from '../constants/theme';
import { DocumentItem } from '../constants/types';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
export const Home = () => {
  const navigation = useNavigation<any>();
  const { language } = useLanguage();
  const { isDark, colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredDocuments = DOCUMENTS.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectDocument = (doc: DocumentItem) => {
    setSelectedDoc(doc);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={[ styles.container,{ backgroundColor: colors.background },]}edges={['top', 'left', 'right']}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'}backgroundColor={colors.background}translucent={false}/>
      <Header 
       onNotificationPress={() => navigation.navigate('Notifications')}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <SearchBar query={searchQuery} onChangeQuery={setSearchQuery} />

        <Text style={[styles.sectionTitle, { color: colors.primary }]}>
       {language === 'es'
        ? `DOCUMENTOS DESTACADOS (${filteredDocuments.length})`
       : `FEATURED DOCUMENTS (${filteredDocuments.length})`}
       </Text>
        
        {filteredDocuments.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          {language === 'es'
           ? 'No se encontraron documentos.'
            : 'No documents found.'}
            </Text>
        ) : (
          <View style={styles.grid}>
            {filteredDocuments.map(doc => (
              <DocumentCard key={doc.id} item={doc} onSelect={handleSelectDocument} />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Modal para visualizar y descargar */}
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
  },
  scrollContent: { 
    padding: 16, 
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 8,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
});

export default Home;