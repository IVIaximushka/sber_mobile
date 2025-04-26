import React, { useState, useCallback } from 'react';
import { ScrollView, BackHandler } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useNavigation } from '../../lib/navigationContext';

// Импорт компонентов
import { CameraHeader } from '../components/cameras/CameraHeader';
import { CameraItemComponent } from '../components/cameras/CameraItem';
import { CameraFooter } from '../components/cameras/CameraFooter';

// Импорт стилей и данных
import { styles } from '../components/cameras/CameraStyles';
import { defaultCameras } from '../components/cameras/CameraData';

export default function CamerasScreen() {
  const router = useRouter();
  const customNavigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null);
  const [recordingCameras, setRecordingCameras] = useState<number[]>([]);
  const [cameras, setCameras] = useState(defaultCameras);

  // Настраиваем обработку кнопки "назад"
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        const previousScreen = customNavigation.getPreviousScreen();
        if (previousScreen) {
          router.push(previousScreen);
        } else {
          router.push('/(tabs)');
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [router, customNavigation])
  );

  const handleCameraPress = (cameraId: number) => {
    if (selectedCamera === cameraId) {
      setSelectedCamera(null);
    } else {
      setSelectedCamera(cameraId);
      // Сбрасываем состояние загрузки при каждом переключении камеры
      setLoading(true);
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

  const handleLoadEnd = () => {
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <CameraHeader camerasCount={cameras.length} />

      {cameras.map((camera) => (
        <CameraItemComponent
          key={camera.id}
          camera={camera}
          isSelected={selectedCamera === camera.id}
          isRecording={recordingCameras.includes(camera.id)}
          loading={loading && selectedCamera === camera.id}
          onCameraPress={handleCameraPress}
          onRecordPress={handleRecordPress}
        />
      ))}

      <CameraFooter />
    </ScrollView>
  );
}