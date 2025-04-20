import { User, Chrome as Home, Bell, Shield, LogOut, Edit } from 'lucide-react-native';

export const PRIMARY_COLOR = '#8B1E3F';

export interface ProfileData {
  username?: string;
  phone?: string;
  apartment?: string;
  email?: string;
}

export interface UserInfo {
  name: string;
  apartment: string;
  phone: string;
  email: string;
}

export interface MenuItemType {
  icon: any;
  title: string;
  onPress?: () => void;
}

export const defaultMenuItems: MenuItemType[] = [
  {
    icon: Home,
    title: 'Данные о квартире'
  },
  {
    icon: Bell,
    title: 'Уведомления'
  },
  {
    icon: Shield,
    title: 'Безопасность'
  }
]; 