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
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 3;

  const handleWebViewMessage = useCallback((event: WebViewMessageEvent) => {
    try {
      const { data } = event.nativeEvent;
      if (data === 'error') {
        setLoadError(true);
        onLoadEnd(camera.id);
        
        // Пробуем перезагрузить с экспоненциальной задержкой
        if (retryCountRef.current < MAX_RETRIES) {
          const delay = Math.pow(2, retryCountRef.current) * 1000;
          retryCountRef.current++;
          
          retryTimeoutRef.current = setTimeout(() => {
            if (webViewRef.current) {
              webViewRef.current.reload();
            }
          }, delay);
        }
      } else if (data === 'loaded') {
        setLoadError(false);
        retryCountRef.current = 0;
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
  const htmlContent = (url: string) => {
    // Use a different approach for direct type cameras
    if (camera.type === 'direct') {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <style>
              html, body { 
                margin: 0; 
                padding: 0; 
                background: #000;
                width: 100%;
                height: 100%;
                overflow: hidden;
              }
              .video-container {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
              }
              img {
                position: absolute;
                width: 100%;
                height: 100%;
                object-fit: contain;
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
                pointer-events: none;
                z-index: 10;
              }
              .error-message {
                color: white;
                text-align: center;
                font-family: Arial, sans-serif;
                font-size: 14px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 20;
                background-color: rgba(0,0,0,0.7);
                padding: 10px;
                border-radius: 8px;
              }
            </style>
          </head>
          <body>
            <div class="video-container">
              <img 
                id="camera-img" 
                src="${url}?cacheBuster=${Date.now()}"
                onerror="handleError()"
              />
              <div class="overlay"></div>
              <div id="error-container" style="display:none;" class="error-message">
                Не удалось загрузить видео
              </div>
            </div>
            <script>
              let lastReloadTime = Date.now();
              let errorCount = 0;
              const MAX_ERRORS = 3;
              
              function handleError() {
                errorCount++;
                if (errorCount > MAX_ERRORS) {
                  document.getElementById('camera-img').style.display = 'none';
                  document.getElementById('error-container').style.display = 'block';
                  window.ReactNativeWebView.postMessage('error');
                } else {
                  // Try again with a delay
                  setTimeout(reloadImage, 1000);
                }
              }
              
              function reloadImage() {
                const img = document.getElementById('camera-img');
                img.src = "${url}?cacheBuster=" + Date.now();
              }
              
              // Successfully loaded
              document.getElementById('camera-img').onload = function() {
                document.getElementById('camera-img').style.display = 'block';
                document.getElementById('error-container').style.display = 'none';
                window.ReactNativeWebView.postMessage('loaded');
                errorCount = 0;
              };
              
              // Periodically refresh the image (every 500ms)
              setInterval(reloadImage, 500);
            </script>
          </body>
        </html>
      `;
    }
    
    // Default approach for other cameras
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          html, body { 
            margin: 0; 
            padding: 0; 
            background: #000;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          .video-container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
          iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 12px;
            background-color: #000;
          }
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 12px;
            background-color: #000;
          }
          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%);
            border-radius: 12px;
            pointer-events: none;
            z-index: 10;
          }
          .error-message {
            color: white;
            text-align: center;
            font-family: Arial, sans-serif;
            font-size: 14px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 20;
          }
        </style>
      </head>
      <body>
        <div class="video-container">
          <!-- Try with iframe first -->
          <iframe 
            id="camera-iframe"
            src="${url}" 
            sandbox="allow-same-origin"
            allow="accelerometer; autoplay; camera"
            onload="handleFrameLoad()"
            onerror="tryFallbackMethod()"
          ></iframe>
          
          <!-- Fallback to refreshing image -->
          <img 
            id="camera-image" 
            src="${url}?t=${Date.now()}" 
            onerror="handleImageError()" 
            onload="handleImageLoad()"
            style="display:none;"
          />
          <div class="overlay"></div>
          <div id="error-container" style="display:none;" class="error-message">
            Не удалось загрузить видео
          </div>
        </div>
        <script>
          let retryCount = 0;
          const MAX_RETRIES = 3;
          let lastUpdateTime = Date.now();
          let useFallbackMethod = false;
          let updateInterval;
          
          function handleFrameLoad() {
            if (!useFallbackMethod) {
              document.getElementById('camera-iframe').style.display = 'block';
              document.getElementById('camera-image').style.display = 'none';
              document.getElementById('error-container').style.display = 'none';
              window.ReactNativeWebView.postMessage('loaded');
              lastUpdateTime = Date.now();
            }
          }
          
          function handleFrameError() {
            tryFallbackMethod();
          }
          
          function tryFallbackMethod() {
            // Switch to image refresh approach
            useFallbackMethod = true;
            document.getElementById('camera-iframe').style.display = 'none';
            document.getElementById('camera-image').style.display = 'block';
            
            // Set up periodic refresh
            if (updateInterval) clearInterval(updateInterval);
            updateInterval = setInterval(refreshImage, 500);
          }
          
          function refreshImage() {
            const img = document.getElementById('camera-image');
            if (img && useFallbackMethod) {
              img.src = "${url}?t=" + Date.now();
            }
          }
          
          function handleImageLoad() {
            if (useFallbackMethod) {
              document.getElementById('camera-image').style.display = 'block';
              document.getElementById('error-container').style.display = 'none';
              window.ReactNativeWebView.postMessage('loaded');
              retryCount = 0;
            }
          }
          
          function handleImageError() {
            if (useFallbackMethod) {
              retryCount++;
              if (retryCount > MAX_RETRIES) {
                document.getElementById('camera-image').style.display = 'none';
                document.getElementById('error-container').style.display = 'block';
                window.ReactNativeWebView.postMessage('error');
                if (updateInterval) clearInterval(updateInterval);
              }
            }
          }
          
          // Monitor iframe status
          setInterval(function() {
            if (!useFallbackMethod) {
              try {
                const iframe = document.getElementById('camera-iframe');
                if (!iframe || !iframe.contentWindow) {
                  tryFallbackMethod();
                }
              } catch (error) {
                tryFallbackMethod();
              }
            }
          }, 3000);
        </script>
      </body>
    </html>
  `;
  };

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
              <Text style={styles.errorText}>Не удалось загрузить видео</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={() => {
                  if (webViewRef.current) {
                    webViewRef.current.reload();
                  }
                }}
              >
                <Text style={styles.retryButtonText}>Повторить попытку</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <WebView
              ref={webViewRef}
              source={{ html: htmlContent(camera.url) }}
              style={{ width: '100%', height: '100%', backgroundColor: '#000' }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              scalesPageToFit={false}
              scrollEnabled={false}
              bounces={false}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              incognito={true}
              cacheEnabled={false}
              originWhitelist={['*']}
              mixedContentMode="always"
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