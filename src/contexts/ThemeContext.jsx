// // src/contexts/ThemeContext.jsx
// import React, { createContext, useState, useEffect } from 'react';

// export const ThemeContext = createContext();

// const ThemeProvider = ({ children }) => {
//   const [themeMode, setThemeMode] = useState('light');

//   const lightTheme = () => {
//     document.documentElement.setAttribute('data-theme', 'light');
//     setThemeMode('light');
//   };

//   const darkTheme = () => {
//     document.documentElement.setAttribute('data-theme', 'dark');
//     setThemeMode('dark');
//   };

//   useEffect(() => {
//     // Initialize theme on first render
//     document.documentElement.setAttribute('data-theme', themeMode);
//   }, [themeMode]);

//   return (
//     <ThemeContext.Provider value={{ themeMode, lightTheme, darkTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export default ThemeProvider;
