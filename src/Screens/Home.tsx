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

export const Home = () => {
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
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.headerBg} translucent={false} />
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <SearchBar query={searchQuery} onChangeQuery={setSearchQuery} />

        <Text style={styles.sectionTitle}>
          DOCUMENTOS DESTACADOS ({filteredDocuments.length})
        </Text>
        
        {filteredDocuments.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No se encontraron documentos.</Text>
          </View>
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