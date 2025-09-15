import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Theme, ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>({ mode: 'light' });

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('devconnect-theme');
    if (savedTheme) {
      const parsedTheme = JSON.parse(savedTheme) as Theme;
      setTheme(parsedTheme);
      updateDocumentClass(parsedTheme.mode);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme: Theme = { mode: prefersDark ? 'dark' : 'light' };
      setTheme(initialTheme);
      updateDocumentClass(initialTheme.mode);
    }
  }, []);

  const updateDocumentClass = (mode: 'light' | 'dark') => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme: Theme = { mode: theme.mode === 'light' ? 'dark' : 'light' };
    setTheme(newTheme);
    updateDocumentClass(newTheme.mode);
    localStorage.setItem('devconnect-theme', JSON.stringify(newTheme));
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
