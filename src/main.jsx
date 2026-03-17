import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./index.css";
import App from "./App.jsx";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

const cacheRtl = createCache({
  key: "mui-rtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#3f51b5",
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

createRoot(document.getElementById("root")).render(
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <StrictMode>
        <App />
      </StrictMode>
    </ThemeProvider>
  </CacheProvider>,
);
