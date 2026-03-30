import { useState, useMemo, useEffect } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import App from "./App";
import "./index.css";
import { DirectionContext } from "./Context/DirectionContext";

export default function Wrapper() {
  const [direction, setDirection] = useState(
    localStorage.getItem("dir") || "ltr",
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
        <DirectionContext.Provider value={{ direction, handleChangeDirection }}>
          <App />
        </DirectionContext.Provider>
    </CacheProvider>
  );
}
