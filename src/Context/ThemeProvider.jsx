// // ThemeContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState(() => {
//     const saved = localStorage.getItem("theme");
//     if (saved === "light" || saved === "dark") return saved;

//     const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)")
//       .matches
//       ? "dark"
//       : "light";

//     return defaultTheme;
//   });

//   // 👇 تطبيق الثيم
//   useEffect(() => {
//     const root = document.documentElement;

//     root.classList.remove("light", "dark");
//     root.classList.add(theme);

//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// // custom hook
// export const useTheme = () => useContext(ThemeContext);
