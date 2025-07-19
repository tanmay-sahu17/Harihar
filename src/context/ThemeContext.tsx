import React, { createContext, useContext, ReactNode } from 'react';

// Simple theme context for initial setup
export interface Theme {
  colors: {
    primary: string;
    background: string;
    white: string;
  };
}

const theme: Theme = {
  colors: {
    primary: '#2E7D32',        // Dark Green
    background: '#E8F5E8',     // Very Light Green
    white: '#FFFFFF',
  },
};

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType>({ theme });

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
