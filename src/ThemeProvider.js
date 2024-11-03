import React, { useState, useMemo } from 'react';
import { ThemeContext, DarkTheme, LightTheme } from './Context/ThemeContext';

const ThemeProvider = ({ children }) => {
  // Track whether dark mode is active
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Toggle function to switch themes
  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  // Memoize the theme object to avoid unnecessary re-renders
  const theme = useMemo(() => (isDarkTheme ? DarkTheme : LightTheme), [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ theme, isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
