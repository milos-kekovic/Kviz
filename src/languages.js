import { t } from 'i18next';

const languages = [ // Language List
 { code: 'en', label: t('language:english'), icon: require('../assets/flags/united-kingdom.png') },
 { code: 'si', label: t('language:slovenian'), icon: require('../assets/flags/slovenia.png') },
 { code: 'de', label: t('language:german'), icon: require('../assets/flags/germany.png') },
 { code: 'fr', label: t('language:french'), icon: require('../assets/flags/france.png') },
]

export { languages }
