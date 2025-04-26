import { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Image, Platform } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { ChevronRight, Square, Video, Camera } from 'lucide-react-native';

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
  const [loadError, setLoadError] = useState(false);
  const webViewRef = useRef<WebView>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout>();

  const handleWebViewMessage = useCallback((event: WebViewMessageEvent) => {
    try {
      const { data } = event.nativeEvent;
      if (data === 'error') {
        setLoadError(true);
        onLoadEnd(camera.id);
        // Пробуем перезагрузить через 5 секунд
        retryTimeoutRef.current = setTimeout(() => {
          if (webViewRef.current) {
            webViewRef.current.reload();
          }
        }, 5000);
      } else if (data === 'loaded') {
        setLoadError(false);
        onLoadEnd(camera.id);
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current);
        }
      }
    } catch (error) {
      console.error('Error handling WebView message:', error);
    }
  }, [camera.id, onLoadEnd]);

  // Очищаем таймер при размонтировании
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

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
            overflow: hidden;
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
          .error-message {
            color: white;
            text-align: center;
            font-family: Arial, sans-serif;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div style="position: relative; width: 100%; height: 100%;">
          <img src="${url}" onerror="handleImgError()" id="camera-image" />
          <div class="overlay"></div>
          <div id="error-container" style="display:none;" class="error-message">
            Не удалось загрузить камеру
          </div>
        </div>
        <script>
          function handleImgError() {
            document.getElementById('camera-image').style.display = 'none';
            document.getElementById('error-container').style.display = 'flex';
            window.ReactNativeWebView.postMessage('error');
          }
          
          // Проверка загрузки изображения
          document.getElementById('camera-image').onload = function() {
            window.ReactNativeWebView.postMessage('loaded');
          };

          // Периодическая перезагрузка изображения
          setInterval(function() {
            const img = document.getElementById('camera-image');
            if (img) {
              const currentSrc = img.src;
              img.src = currentSrc.split('?')[0] + '?' + new Date().getTime();
            }
          }, 30000);
        </script>
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
          {loadError ? (
            <View style={styles.errorContainer}>
              <Camera size={48} color="#8E8E93" />
              <Text style={styles.errorText}>Не удалось загрузить камеру</Text>
            </View>
          ) : (
            <WebView
              ref={webViewRef}
              source={{ html: htmlContent(camera.url) }}
              style={{ width: '100%', height: '100%', backgroundColor: '#000' }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              scalesPageToFit={true}
              scrollEnabled={false}
              bounces={false}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              incognito={true}
              cacheEnabled={false}
              onMessage={handleWebViewMessage}
              renderLoading={() => (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                  <ActivityIndicator size="large" color="#fff" />
                </View>
              )}
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView error: ', nativeEvent);
                setLoadError(true);
                onLoadEnd(camera.id);
              }}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
} 