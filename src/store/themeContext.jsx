import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const darkTheme = {
  mode: "dark",
  background: "#181C2A", // deep navy
  card: "#232946", // soft indigo
  accent: "#7F56D9", // modern purple
  text: "#F4F4F5", // off-white
  glass: "rgba(35, 41, 70, 0.7)", // glassy indigo
  border: "rgba(127, 86, 217, 0.3)", // subtle accent border
  headerBg: "rgb(9, 11, 44)",
};
const lightTheme = {
  mode: "light",
  background: "#F4F4F5", // off-white
  card: "#FFFFFF", // pure white
  accent: "#7F56D9", // modern purple
  text: "#232946", // indigo
  glass: "rgba(255, 255, 255, 0.7)", // glassy white
  border: "rgba(127, 86, 217, 0.15)", // subtle accent border
  headerBg: "rgba(255,255,255 )",
};
// ... existing code ...

function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light") return lightTheme;
  return darkTheme;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme.mode);
    localStorage.setItem("theme", theme.mode);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev.mode === "dark" ? lightTheme : darkTheme));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
