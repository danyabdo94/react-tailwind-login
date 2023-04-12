import React from 'react';
import './App.css';
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

import enTranslationFile from "./translations/en.json"
import Login from './pages/Login';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: { ...enTranslationFile }
      }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

function App() {
  const { t } = useTranslation();

  return (
    <>
      <Login />
      <h1>{t('signin')}</h1>
    </>
  );
}

export default App;
