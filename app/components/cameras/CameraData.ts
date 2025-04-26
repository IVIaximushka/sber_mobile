export const PRIMARY_COLOR = '#8B1E3F';

export interface CameraItem {
  id: number;
  url: string;
  title: string;
  location: string;
}

export const defaultCameras: CameraItem[] = [
  { 
    id: 1, 
    url: 'http://91.210.87.140:8082/mjpg/video.mjpg', 
    title: 'Подъезд №1',
    location: 'Вход в подъезд'
  },
  { 
    id: 2, 
    url: 'http://78.36.19.87/mjpg/video.mjpg', 
    title: 'Парковка',
    location: 'Внутренний двор'
  },
  { 
    id: 3, 
    url: 'http://91.210.87.140:8081/mjpg/video.mjpg', 
    title: 'Детская площадка',
    location: 'Внутренний двор'
  },
]; 