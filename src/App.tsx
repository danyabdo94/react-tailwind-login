import React from 'react';
import './App.css';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import enTranslationFile from "./translations/en.json"
import Login from './pages/Login';


// Create a client
const queryClient = new QueryClient()
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
  return (
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  );
}

export default App;
