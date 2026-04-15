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

  const loadGoogleMaps = () => {
    const script = document.createElement("script");

    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&v=weekly`;

    script.async = true;
    document.head.appendChild(script);
  };

  useEffect(() => {
    loadGoogleMaps();
  }, []);

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
