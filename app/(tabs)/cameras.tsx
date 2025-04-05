import { View, StyleSheet, ScrollView, Text, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useState } from 'react';
import { Camera, ChevronRight, Shield, AlertCircle, Video, Square } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function CamerasScreen() {
  const [loading, setLoading] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null);
  const [recordingCameras, setRecordingCameras] = useState<number[]>([]);
  const [cameras, setCameras] = useState([
    { 
      id: 1, 
      url: 'http://91.210.87.140:8082/mjpg/video.mjpg', 
      title: 'Подъезд №1',
      status: 'online',
      location: 'Вход в подъезд'
    },
    { 
      id: 2, 
      url: 'http://78.36.19.87/mjpg/video.mjpg', 
      title: 'Парковка',
      status: 'offline',
      location: 'Внутренний двор'
    },
    { 
      id: 3, 
      url: 'http://91.210.87.140:8081/mjpg/video.mjpg', 
      title: 'Детская площадка',
      status: 'online',
      location: 'Внутренний двор'
    },
  ]);

  const handleCameraPress = (cameraId: number) => {
    if (selectedCamera === cameraId) {
      setSelectedCamera(null);
    } else {
      setSelectedCamera(cameraId);
    }
  };

  const handleRecordPress = (cameraId: number) => {
    setRecordingCameras(prev => {
      if (prev.includes(cameraId)) {
        // Останавливаем запись
        return prev.filter(id => id !== cameraId);
      } else {
        // Начинаем запись
        return [...prev, cameraId];
      }
    });
  };

  const htmlContent = (url: string) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            margin: 0; 
            padding: 0; 
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          img { 
            width: 100%; 
            height: 100%; 
            object-fit: cover;
            border-radius: 12px;
          }
          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%);
            border-radius: 12px;
          }
        </style>
      </head>
      <body>
        <div style="position: relative; width: 100%; height: 100%;">
          <img src="${url}" />
          <div class="overlay"></div>
        </div>
      </body>
    </html>
  `;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return '#34C759';
      case 'offline':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Shield size={24} color="#007AFF" />
          <Text style={styles.headerTitle}>Система видеонаблюдения</Text>
        </View>
        <Text style={styles.headerSubtitle}>Всего камер: {cameras.length}</Text>
      </View>

      {cameras.map((camera) => (
        <TouchableOpacity 
          key={camera.id} 
          style={[
            styles.cameraContainer,
            selectedCamera === camera.id && styles.selectedCamera
          ]}
          onPress={() => handleCameraPress(camera.id)}
        >
          <View style={styles.cameraHeader}>
            <View style={styles.cameraTitleContainer}>
              <Text style={styles.cameraTitle}>{camera.title}</Text>
              <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(camera.status) }]} />
            </View>
            <View style={styles.headerControls}>
              {selectedCamera === camera.id && (
                <TouchableOpacity 
                  style={[
                    styles.recordButton,
                    recordingCameras.includes(camera.id) && styles.recordingButtonActive
                  ]}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleRecordPress(camera.id);
                  }}
                >
                  {recordingCameras.includes(camera.id) ? (
                    <Square size={16} color="#FFFFFF" />
                  ) : (
                    <Video size={16} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              )}
              <ChevronRight 
                size={20} 
                color="#8E8E93"
                style={[
                  styles.chevron,
                  selectedCamera === camera.id && styles.chevronRotated
                ]}
              />
            </View>
          </View>

          <View style={styles.cameraInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Расположение:</Text>
              <Text style={styles.infoValue}>{camera.location}</Text>
            </View>
            {recordingCameras.includes(camera.id) && (
              <View style={styles.recordingIndicator}>
                <View style={styles.recordingDot} />
                <Text style={styles.recordingText}>Запись...</Text>
              </View>
            )}
          </View>

          {selectedCamera === camera.id && (
            <View style={styles.cameraWrapper}>
              {loading && <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />}
              <WebView
                source={{ html: htmlContent(camera.url) }}
                style={styles.camera}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
                onLoadEnd={() => setLoading(false)}
                onError={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  console.warn('WebView error: ', nativeEvent);
                  setLoading(false);
                }}
              />
            </View>
          )}
        </TouchableOpacity>
      ))}

      <View style={styles.footer}>
        <AlertCircle size={16} color="#8E8E93" />
        <Text style={styles.footerText}>
          Нажмите на камеру для просмотра видеопотока
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  cameraContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCamera: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  cameraTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cameraTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronRotated: {
    transform: [{ rotate: '90deg' }],
  },
  cameraInfo: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  cameraWrapper: {
    height: 300,
    backgroundColor: '#000000',
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    zIndex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
  },
  footerText: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 8,
  },
  recordButton: {
    backgroundColor: '#FF3B30',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingButtonActive: {
    backgroundColor: '#34C759',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    marginRight: 8,
  },
  recordingText: {
    fontSize: 14,
    color: '#FF3B30',
    fontWeight: '500',
  },
});