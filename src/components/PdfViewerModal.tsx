import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { WebView } from 'react-native-webview';
import { DocumentItem } from '../constants/types';
import { COLORS } from '../constants/theme';

interface Props {
  visible: boolean;
  document: DocumentItem | null;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<Props> = ({ visible, document, onClose }) => {
  const [base64Pdf, setBase64Pdf] = useState<string | null>(null);
  const [localUri, setLocalUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPdf() {
      if (!document || !document.pdfFile) return;

      try {
        setLoading(true);
        const asset = Asset.fromModule(document.pdfFile);
        await asset.downloadAsync();

        if (asset.localUri) {
          if (isMounted) setLocalUri(asset.localUri);

          const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          if (isMounted) setBase64Pdf(base64);
        }
      } catch (error) {
        console.error('Error al procesar PDF:', error);
        Alert.alert('Error', 'No se pudo cargar el archivo PDF.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (visible) {
      loadPdf();
    } else {
      setBase64Pdf(null);
      setLocalUri(null);
    }

    return () => {
      isMounted = false;
    };
  }, [visible, document]);

  if (!document) return null;

  const handleDownload = async () => {
    if (!localUri || !base64Pdf) {
      Alert.alert('Aviso', 'El archivo no está listo.');
      return;
    }

    try {
      const fileName = `${document.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;

      if (Platform.OS === 'android') {
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (permissions.granted) {
          const directoryUri = permissions.directoryUri;
          const createdFileUri = await FileSystem.StorageAccessFramework.createFileAsync(
            directoryUri,
            fileName,
            'application/pdf'
          );

          await FileSystem.writeAsStringAsync(createdFileUri, base64Pdf, {
            encoding: FileSystem.EncodingType.Base64,
          });

          Alert.alert('¡Éxito!', `El documento se guardó correctamente como "${fileName}".`);
        }
      } else {
        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
          await Sharing.shareAsync(localUri, {
            mimeType: 'application/pdf',
            dialogTitle: `Guardar ${document.title}`,
            UTI: 'com.adobe.pdf',
          });
        }
      }
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
        <style>
          * { box-sizing: border-box; }
          html, body {
            margin: 0;
            padding: 0;
            background-color: #525659;
            height: 100%;
            overflow: hidden;
          }

          /* Contenedor principal con scroll interno */
          #scroll-container {
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }

          #pdf-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 16px 0;
          }

          canvas {
            margin-bottom: 12px;
            width: 90% !important;
            height: auto !important;
            box-shadow: 0 4px 10px rgba(0,0,0,0.4);
            background-color: white;
            border-radius: 4px;
          }

          /* Pista de la barra lateral derecha */
          #custom-scrollbar-track {
            position: fixed;
            top: 0;
            right: 0;
            width: 23px; /* 👈 Ancho de la zona de arrastre */
            height: 100%;
            background: rgba(0, 0, 0, 0.47);
            z-index: 9999;
            touch-action: none;
          }

          /* Botón/Arrastrador grueso */
          #custom-scrollbar-thumb {
            position: absolute;
            top: 0;
            right: 2px;
            width: 20px; /* 👈 Ancho del botón */
            height: 50px; /* 👈 Largo del botón */
            background-color: #969696; /* Color visible (Azul) */
            border-radius: 12px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.5);
          }
        </style>
      </head>
      <body>
        <div id="scroll-container">
          <div id="pdf-container"></div>
        </div>

        <!-- Arrastrador Lateral Flotante -->
        <div id="custom-scrollbar-track">
          <div id="custom-scrollbar-thumb"></div>
        </div>

        <script>
          const rawData = "${base64Pdf || ''}";
          if (rawData) {
            const pdfData = atob(rawData);
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

            const container = document.getElementById('pdf-container');
            const scrollContainer = document.getElementById('scroll-container');
            const thumb = document.getElementById('custom-scrollbar-thumb');
            const track = document.getElementById('custom-scrollbar-track');

            // Renderizar páginas PDF
            pdfjsLib.getDocument({ data: pdfData }).promise.then(pdf => {
              for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                pdf.getPage(pageNum).then(page => {
                  const viewport = page.getViewport({ scale: 1.5 });
                  const canvas = document.createElement('canvas');
                  const context = canvas.getContext('2d');
                  canvas.height = viewport.height;
                  canvas.width = viewport.width;
                  container.appendChild(canvas);
                  page.render({ canvasContext: context, viewport: viewport });
                });
              }
            });

            // Lógica del Arrastrador
            function updateThumbPosition() {
              const scrollTop = scrollContainer.scrollTop;
              const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
              const trackHeight = track.clientHeight - thumb.clientHeight;

              if (scrollHeight > 0) {
                const thumbY = (scrollTop / scrollHeight) * trackHeight;
                thumb.style.transform = 'translateY(' + thumbY + 'px)';
              }
            }

            scrollContainer.addEventListener('scroll', updateThumbPosition);

            // Permitir arrastrar el botón azul con el dedo
            let isDragging = false;
            let startY = 0;
            let startScrollTop = 0;

            thumb.addEventListener('touchstart', (e) => {
              isDragging = true;
              startY = e.touches[0].clientY;
              startScrollTop = scrollContainer.scrollTop;
            });

            window.addEventListener('touchmove', (e) => {
              if (!isDragging) return;
              const deltaY = e.touches[0].clientY - startY;
              const trackHeight = track.clientHeight - thumb.clientHeight;
              const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;

              const scrollDelta = (deltaY / trackHeight) * scrollHeight;
              scrollContainer.scrollTop = startScrollTop + scrollDelta;
            });

            window.addEventListener('touchend', () => {
              isDragging = false;
            });
          }
        </script>
      </body>
    </html>
  `;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.modalContainer}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <Ionicons name="close-outline" size={28} color="#FFF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle} numberOfLines={1}>
            {document.title}
          </Text>

          <TouchableOpacity onPress={handleDownload} style={styles.downloadButton}>
            <Ionicons name="download-outline" size={18} color="#FFF" />
            <Text style={styles.downloadText}>Descargar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewerContainer}>
          {loading || !base64Pdf ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={styles.loadingText}>Cargando documento...</Text>
            </View>
          ) : (
            <WebView
              originWhitelist={['*']}
              source={{ html: htmlContent }}
              style={styles.webview}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowFileAccess={true}
            />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  modalHeader: {
    height: 56,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  headerButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  downloadText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  viewerContainer: {
    flex: 1,
    backgroundColor: '#525659',
  },
  webview: {
    flex: 1,
    backgroundColor: '#525659',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});