import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname } from 'expo-router';

interface NavigationContextType {
  navigationHistory: string[];
  addToHistory: (path: string) => void;
  getPreviousScreen: () => string | null;
}

const NavigationContext = createContext<NavigationContextType>({
  navigationHistory: [],
  addToHistory: () => {},
  getPreviousScreen: () => null,
});

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const pathname = usePathname();
  const isProcessingUpdate = useRef(false);
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname === previousPathname.current || isProcessingUpdate.current) return;
    
    // Запоминаем текущий путь для предотвращения лишних обновлений
    previousPathname.current = pathname;
    isProcessingUpdate.current = true;

    try {
      // Проверяем, является ли текущий переход сменой вкладок
      if (isTabPath(pathname) && navigationHistory.length > 0 && isTabPath(navigationHistory[navigationHistory.length - 1])) {
        // Если переход между вкладками - заменяем последнюю запись в истории
        setNavigationHistory(prev => [...prev.slice(0, prev.length - 1), pathname]);
      } else if (navigationHistory.length === 0 || navigationHistory[navigationHistory.length - 1] !== pathname) {
        // В остальных случаях добавляем новую запись
        setNavigationHistory(prev => [...prev, pathname]);
      }
    } finally {
      isProcessingUpdate.current = false;
    }
  }, [pathname]);

  // Проверка, является ли путь вкладкой (одним из главных экранов)
  const isTabPath = (path: string): boolean => {
    // Проверяем пути в формате /(tabs)/... и /...
    return path === '/(tabs)' || 
           path.startsWith('/(tabs)/') ||
           path === '/index' || 
           path === '/chat' || 
           path === '/services' || 
           path === '/cameras' || 
           path === '/profile';
  };

  const addToHistory = (path: string) => {
    if (!path || isProcessingUpdate.current) return;
    
    isProcessingUpdate.current = true;
    try {
      if (isTabPath(path) && navigationHistory.length > 0 && isTabPath(navigationHistory[navigationHistory.length - 1])) {
        // Если добавляем таб и последняя запись тоже таб - заменяем
        setNavigationHistory(prev => [...prev.slice(0, prev.length - 1), path]);
      } else if (navigationHistory.length === 0 || navigationHistory[navigationHistory.length - 1] !== path) {
        // В остальных случаях добавляем новую запись
        setNavigationHistory(prev => [...prev, path]);
      }
    } finally {
      isProcessingUpdate.current = false;
    }
  };

  const getPreviousScreen = (): string | null => {
    // Если мы на любой из главных вкладок, выходим из приложения
    if (isTabPath(pathname)) {
      return null;
    }
    
    if (navigationHistory.length <= 1) {
      // Если история пуста или содержит только текущий экран
      // Возвращаем главный экран для обычных экранов
      return '/index';
    }
    
    // Находим предыдущий экран (пропускаем текущий экран)
    for (let i = navigationHistory.length - 2; i >= 0; i--) {
      const prevPath = navigationHistory[i];
      
      // Если текущий путь в истории не совпадает с текущим экраном,
      // значит это подходящий предыдущий экран
      if (prevPath !== pathname) {
        return prevPath;
      }
    }
    
    // Если не нашли подходящий предыдущий экран, возвращаем первый экран из истории
    return navigationHistory[0];
  };

  return (
    <NavigationContext.Provider value={{ navigationHistory, addToHistory, getPreviousScreen }}>
      {children}
    </NavigationContext.Provider>
  );
}; 