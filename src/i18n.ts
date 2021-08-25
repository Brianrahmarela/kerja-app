import i18n from "i18next";
import XHR from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      /* translation file path */
      loadPath: "./assets/i18n/{{lng}}/{{ns}}.json",
    },
    fallbackLng: "id",
    debug: true,
    /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
    ns: [
      "common",
      "login",
      "register",
      "forgotPassword",
      "resetPassword",
      "logout",
    ],
    defaultNS: "common",
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
    react: {
      wait: true,
    },
  });

export default i18n;
