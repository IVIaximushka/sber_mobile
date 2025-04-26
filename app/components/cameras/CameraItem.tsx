import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { ChevronRight, Square, Video } from 'lucide-react-native';

import { styles } from './CameraStyles';
import { CameraItem } from './CameraData';

interface CameraItemProps {
  camera: CameraItem;
  isSelected: boolean;
  isRecording: boolean;
  loading: boolean;
  onCameraPress: (id: number) => void;
  onRecordPress: (id: number) => void;
  onLoadEnd: (id: number) => void;
}

export function CameraItemComponent({
  camera,
  isSelected,
  isRecording,
  loading,
  onCameraPress,
  onRecordPress,
  onLoadEnd
}: CameraItemProps) {
  // HTML-контент для веб-представления камеры
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

  return (
    <TouchableOpacity 
      style={[
        styles.cameraContainer,
        isSelected && styles.selectedCamera
      ]}
      onPress={() => onCameraPress(camera.id)}
    >
      <View style={styles.cameraHeader}>
        <View style={styles.cameraTitleContainer}>
          <Text style={styles.cameraTitle}>{camera.title}</Text>
        </View>
        <View style={styles.headerControls}>
          {isSelected && (
            <TouchableOpacity 
              style={[
                styles.recordButton,
                isRecording && styles.recordingButtonActive
              ]}
              onPress={(e) => {
                e.stopPropagation();
                onRecordPress(camera.id);
              }}
            >
              {isRecording ? (
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
              isSelected && styles.chevronRotated
            ]}
          />
        </View>
      </View>

      <View style={isSelected ? styles.cameraInfoSelected : styles.cameraInfoNormal}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Расположение:</Text>
          <Text style={styles.infoValue}>{camera.location}</Text>
        </View>
        {isRecording && (
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>Запись...</Text>
          </View>
        )}
      </View>

      {isSelected && (
        <View style={styles.cameraWrapper}>
          {loading && <ActivityIndicator size="large" color="#8E8E93" style={styles.loader} />}
          <WebView
            source={{ html: htmlContent(camera.url) }}
            style={styles.camera}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            scalesPageToFit={true}
            originWhitelist={['*']}
            mixedContentMode="always"
            onLoadEnd={() => onLoadEnd(camera.id)}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
} 