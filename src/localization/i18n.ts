import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'
import en from './en'
import si from './si'
import de from './de'
import fr from './fr'

const resources = { // list of languages
  en,
  si,
  de,
  fr,
}

i18n.use(initReactI18next) // passes i18n down to react-i18next
 .init({
  compatibilityJSON: 'v3', //To make it work for Android devices, add this line.
  resources,
  lng: 'si',//  default language to use.
  // if you're using a language detector, do not define the lng option
interpolation: {
   escapeValue: false,
  },
 });
export default i18n;