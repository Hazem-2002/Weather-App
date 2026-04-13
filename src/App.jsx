import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import History from "./Pages/History/History";
import Layout from "./Pages/Layout/Layout";
import Settings from "./Pages/Settings/Settings";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { changeTheme } from "./features/ThemeSlice";
import { changeLanguage } from "./features/LanguageSlice";
import { useDispatch, useSelector } from "react-redux";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const themeDispatch = useDispatch();
  const languageDispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const language = useSelector((state) => state.language);

  useEffect(() => {
    languageDispatch(changeLanguage(language.lang));
    // eslint-disable-next-line
  }, [window.navigator.language]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (theme) => {
      themeDispatch(changeTheme(theme));
    };

    handleChange(theme);
    media.addEventListener("change", () => handleChange(theme));

    return () => {
      media.removeEventListener("change", handleChange);
    };
    // eslint-disable-next-line
  }, [theme]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
