import { useMemo, useEffect } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import App from "./App";
import "./i18n";
import { useSelector } from "react-redux";
import { StrictMode } from "react";

export default function Wrapper() {
  const direction = useSelector((state) => state.language.direction);

  const cache = useMemo(() => {
    return createCache({
      key: direction === "rtl" ? "mui-rtl" : "mui-ltr",
      stylisPlugins: direction === "rtl" ? [prefixer, rtlPlugin] : [],
    });
  }, [direction]);

  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  return (
    <CacheProvider value={cache} key={direction}>
      <App />
    </CacheProvider>
  );
}
