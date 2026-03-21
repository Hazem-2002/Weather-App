import { useState, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import App from "./App";
import "./index.css";
import { DirectionContext } from "./Context/DirectionContext";

export default function Wrapper() {
  const [direction, setDirection] = useState(
    localStorage.getItem("dir") || "rtl",
  );

  useEffect(() => {
    localStorage.setItem("dir", direction);
  }, [direction]);

  const cache = useMemo(() => {
    return createCache({
      key: direction === "rtl" ? "mui-rtl" : "mui-ltr",
      stylisPlugins: direction === "rtl" ? [prefixer, rtlPlugin] : [],
    });
  }, [direction]);

  const theme = useMemo(() => {
    return createTheme({
      direction,

      palette: {
        primary: {
          main: "#0C45A8",
          light: "#9fa8da",
          dark: "#0A3F9D",
        },
        text: {
          primary: "#eee",
          secondary: "#dddddd",
        },
        divider: "#dddddd80",
      },
    });
  }, [direction]);

  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  const handleChangeDirection = () => {
    if (direction === "rtl") {
      setDirection("ltr");
    } else {
      setDirection("rtl");
    }
  };

  return (
    <CacheProvider value={cache} key={direction}>
      <ThemeProvider theme={theme} >
        <DirectionContext.Provider value={{ direction, handleChangeDirection }}>
          <App />
        </DirectionContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
