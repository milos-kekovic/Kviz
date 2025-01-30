import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'
import en from './en'
import si from './si'
import de from './de'
import fr from './fr'
import al from './al'
import hr from './hr'
import it from './it'
import ru from './ru'

import rs from './rs'
import es from './es'
import ua from './ua'
import gr from './gr'
import cn from './cn'

const resources = { // list of languages
  en,
  si,
  de,
  fr,
  al,
  hr,
  it,
  ru,
  rs,
  es,
  ua,
  gr,
  cn
}

i18n.use(initReactI18next) // passes i18n down to react-i18next
 .init({
  compatibilityJSON: 'v4', //To make it work for Android devices, add this line.
  resources,
  lng: 'si',//  default language to use.
  // if you're using a language detector, do not define the lng option
interpolation: {
   escapeValue: false,
  },
 });
export default i18n;