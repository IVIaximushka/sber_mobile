import React, { useState } from 'react';
import { ScrollView } from 'react-native';

// Импорт компонентов
import { CameraHeader } from '@/app/components/cameras/CameraHeader';
import { CameraItemComponent } from '@/app/components/cameras/CameraItem';
import { CameraFooter } from '@/app/components/cameras/CameraFooter';

// Импорт стилей и данных
import { styles } from '@/app/components/cameras/CameraStyles';
import { defaultCameras } from '@/app/components/cameras/CameraData';

export default function CamerasScreen() {
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const [selectedCameras, setSelectedCameras] = useState<number[]>([]);
  const [recordingCameras, setRecordingCameras] = useState<number[]>([]);
  const [cameras, setCameras] = useState(defaultCameras);

  const handleCameraPress = (cameraId: number) => {
    setSelectedCameras(prev => {
      if (prev.includes(cameraId)) {
        // Если камера уже выбрана, убираем её из списка
        return prev.filter(id => id !== cameraId);
      } else {
        // Если камера не выбрана, добавляем её в список
        return [...prev, cameraId];
      }
    });
    
    // Устанавливаем состояние загрузки для новой камеры
    if (!selectedCameras.includes(cameraId)) {
      setLoading(prev => ({ ...prev, [cameraId]: true }));
    }
  };

  const handleRecordPress = (cameraId: number) => {
    setRecordingCameras(prev => {
      if (prev.includes(cameraId)) {
        return prev.filter(id => id !== cameraId);
      } else {
        return [...prev, cameraId];
      }
    });
  };

  const handleLoadEnd = (cameraId: number) => {
    setLoading(prev => ({ ...prev, [cameraId]: false }));
  };

  return (
    <ScrollView style={styles.container}>
      <CameraHeader camerasCount={cameras.length} />

      {cameras.map((camera) => (
        <CameraItemComponent
          key={camera.id}
          camera={camera}
          isSelected={selectedCameras.includes(camera.id)}
          isRecording={recordingCameras.includes(camera.id)}
          loading={loading[camera.id] || false}
          onCameraPress={handleCameraPress}
          onRecordPress={handleRecordPress}
          onLoadEnd={handleLoadEnd}
        />
      ))}

      <CameraFooter />
    </ScrollView>
  );
}