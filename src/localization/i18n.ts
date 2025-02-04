import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'
import en from './en'
import sl from './sl'
import de from './de'
import fr from './fr'
import sq from './sq'
import hrv from './hrv'
import it from './it'
import ru from './ru'

import sr_Cyrl from './sr_Cyrl'
import es from './es'
import ua from './ukr'
import el from './el'
import zh_TW from './zh_TW'

const resources = { // list of languages
  en,
  sl,
  de,
  fr,
  sq,
  hrv,
  it,
  ru,
  sr_Cyrl,
  es,
  ua,
  el,
  zh_TW
}

i18n.use(initReactI18next) // passes i18n down to react-i18next
 .init({
  compatibilityJSON: 'v4', //To make it work for Android devices, add this line.
  resources,
  lng: 'sl',//  default language to use.
  // if you're using a language detector, do not define the lng option
interpolation: {
   escapeValue: false,
  },
 });
export default i18n;