import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      home: "Home",
      services: "Services",
      schemes: "Schemes",
      login: "Login",
      register: "Register",
      documents: "Documents",
      grievance: "Grievances",
      contact: "Contact",
      notice_board: "Notice Board",
      // add more keys and translations here as needed
    },
  },
  hi: {
    translation: {
      home: "मुख्य पृष्ठ",
      services: "सेवाएँ",
      schemes: "योजनाएँ",
      login: "लॉगिन",
      register: "रजिस्टर",
      documents: "दस्तावेज़",
      grievance: "शिकायतें",
      contact: "संपर्क करें",
      notice_board: "सूचना पट्ट",
      // add more keys here
    },
  },
  mr: {
    translation: {
      home: "मुख्यपृष्ठ",
      services: "सेवा",
      schemes: "योजना",
      login: "लॉगिन",
      register: "नोंदणी",
      documents: "कागदपत्रे",
      grievance: "तक्रारी",
      contact: "संपर्क",
      notice_board: "सूचना फलक",
      // add more keys here
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
