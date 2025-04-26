import React, { createContext, useContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    // Игнорируем смену вкладок - они не считаются частью истории навигации
    if (pathname && !isTabSwitch(pathname, navigationHistory)) {
      if (navigationHistory.length === 0 || navigationHistory[navigationHistory.length - 1] !== pathname) {
        setNavigationHistory(prev => [...prev, pathname]);
        console.log('Navigation history updated:', [...navigationHistory, pathname]);
      }
    }
  }, [pathname, navigationHistory]);

  // Проверка, что переход был между вкладками
  const isTabSwitch = (currentPath: string, history: string[]) => {
    if (history.length === 0) return false;
    
    const lastPath = history[history.length - 1];
    // Проверка, являются ли оба пути вкладками
    return isTabPath(currentPath) && isTabPath(lastPath) && currentPath !== lastPath;
  };

  // Проверка, является ли путь вкладкой
  const isTabPath = (path: string) => {
    return path.startsWith('/(tabs)/');
  };

  const addToHistory = (path: string) => {
    if (path && (navigationHistory.length === 0 || navigationHistory[navigationHistory.length - 1] !== path)) {
      setNavigationHistory(prev => [...prev, path]);
      console.log('Path added to history:', path);
    }
  };

  const getPreviousScreen = (): string | null => {
    // Если мы находимся на любой из главных вкладок, возвращаем null,
    // это приведет к вызову BackHandler.exitApp()
    if (isTabPath(pathname)) {
      return null;
    }
    
    if (navigationHistory.length <= 1) {
      // Если история пуста или содержит только текущий экран
      // Возвращаем главный экран для обычных экранов
      return '/(tabs)';
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