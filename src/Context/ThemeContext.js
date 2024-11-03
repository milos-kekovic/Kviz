import { createContext } from 'react'

export const Colors = {
  green: '#00c914',
  red: '#fd1c00',
  pink: '#BC60C5',
  purple: '#5D63F8',
  orange: '#F69332',
  white: '#FFFFFF',
  offWhite: '#F5F5F8',
  transparent: 'transparent',
  offBlack: '#21212C',
  blackMetal: '#16161f',
  darkGrey: '#393948',
  darkGrey2: '#2B2B38',
  grey: '#959DAD',
  lightGrey: '#454F63',
  veryLightGrey: '#a2a2a3',
  blueGrey: '#384152',
  yellow: '#FDFF5F',
  blue: '#3883fc',
  beige: '#F7F1D9',
  lightBrown: '#895B44',
  mediumBrown: '#351008',
  darkBrown: '#371C0B',
}

export const DarkTheme = {
  mode: 'dark',
  primaryColor: Colors.darkBrown,
  secondaryColor: Colors.beige,
  selected: Colors.green,
  background: Colors.offBlack,
  darkBackground: Colors.blackMetal,
  secondaryBackground: Colors.mediumBrown,
  freeTextColor: Colors.beige,
  buttonBackgroundColor: Colors.beige,
  buttonTextColor: Colors.darkBrown,
  subtext: Colors.lightGrey,
  highlight: Colors.blue,
  shadow: Colors.transparent,
  backgroundReverse: Colors.offWhite,
  line: Colors.lightGrey,
  highlight2: Colors.orange,
  popupHeaderBackgroundColor: Colors.darkBrown,
  popupBodyBackgroundColor: Colors.beige
}

export const LightTheme = {
  mode: 'light',
  primaryColor: Colors.darkBrown,
  secondaryColor: Colors.beige,
  selected: Colors.green,
  background: Colors.offWhite,
  secondaryBackground: Colors.mediumBrown,
  freeTextColor: Colors.darkBrown,
  buttonBackgroundColor: Colors.darkBrown,
  buttonTextColor: Colors.beige,
  subtext: Colors.grey,
  highlight: Colors.purple,
  shadow: Colors.lightGrey,
  backgroundReverse: Colors.offBlack,
  line: Colors.blueGrey,
  highlight2: Colors.blue,
  popupHeaderBackgroundColor: Colors.darkBrown,
  popupBodyBackgroundColor: Colors.beige
}

export const ThemeContext = createContext(null)
