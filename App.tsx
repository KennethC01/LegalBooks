import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Header } from './src/components/header';
import { SearchBar } from './src/components/SearchBar';
import { DocumentCard } from './src/components/DocumentCard';
import { BottomNav } from './src/components/BottonNav';
import { PdfViewerModal } from './src/components/PdfViewerModal';
import { DOCUMENTS } from './src/data/documents';
import { COLORS } from './src/constants/theme';
import { DocumentItem } from './src/constants/types';

export default function App() {
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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.headerBg} translucent={false} />
        <Header />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <SearchBar query={searchQuery} onChangeQuery={setSearchQuery} />

          <Text style={styles.sectionTitle}>DOCUMENTOS DESTACADOS</Text>
          
          <View style={styles.grid}>
            {filteredDocuments.map(doc => (
              <DocumentCard key={doc.id} item={doc} onSelect={handleSelectDocument} />
            ))}
          </View>
        </ScrollView>

        <BottomNav />

        {/* Modal para visualizar y descargar */}
        <PdfViewerModal
          visible={modalVisible}
          document={selectedDoc}
          onClose={() => setModalVisible(false)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background,
  },
  scrollContent: { 
    padding: 16, 
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 8,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});