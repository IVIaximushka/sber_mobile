import React, { useState } from 'react';
import { ScrollView } from 'react-native';

// Импорт компонентов
import { CameraHeader } from '../components/cameras/CameraHeader';
import { CameraItemComponent } from '../components/cameras/CameraItem';
import { CameraFooter } from '../components/cameras/CameraFooter';

// Импорт стилей и данных
import { styles } from '../components/cameras/CameraStyles';
import { defaultCameras } from '../components/cameras/CameraData';

export default function CamerasScreen() {
  const [loading, setLoading] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null);
  const [recordingCameras, setRecordingCameras] = useState<number[]>([]);
  const [cameras, setCameras] = useState(defaultCameras);

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