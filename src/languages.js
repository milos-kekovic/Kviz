import { t } from 'i18next';

const languages = [ // Language List
 { code: 'en', label: t('language:english'), icon: require('../assets/flags/united-kingdom.png') },
 { code: 'sl', label: t('language:slovenian'), icon: require('../assets/flags/slovenia.png') },
 { code: 'de', label: t('language:german'), icon: require('../assets/flags/germany.png') },
 { code: 'fr', label: t('language:french'), icon: require('../assets/flags/france.png') },
 
 { code: 'sq', label: t('language:albanian'), icon: require('../assets/flags/albania.png') },
 { code: 'hrv', label: t('language:croatian'), icon: require('../assets/flags/croatia.png') },
 { code: 'it', label: t('language:italian'), icon: require('../assets/flags/italy.png') },
 { code: 'ru', label: t('language:russian'), icon: require('../assets/flags/russia.png') },
 
 { code: 'sr_Cyrl', label: t('language:serbian_cyrillic'), icon: require('../assets/flags/serbia.png') },
 { code: 'es', label: t('language:spanish'), icon: require('../assets/flags/spain.png') },
 { code: 'ukr', label: t('language:ukrainian'), icon: require('../assets/flags/ukraine.png') },
 { code: 'el', label: t('language:greek'), icon: require('../assets/flags/greece.png') },
 { code: 'zh_TW', label: t('language:chinese_traditional'), icon: require('../assets/flags/china.png') },
]

export { languages }
