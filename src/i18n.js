import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../public/locales/en.json";
import ar from "../public//locales/ar.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },

  lng: "en",          // اللغة الافتراضية
  fallbackLng: "en",  // لو key مش موجود

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;