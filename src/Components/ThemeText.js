import React, { useContext } from 'react'
import { Text, Dimensions } from 'react-native'
import { ThemeContext, Colors } from '../Context/ThemeContext'

const { fontScale } = Dimensions.get('window')
const fontSize = {
  headerText: { fontSize: fontScale * 20, fontWeight: 'bold' },
  freeText: { fontSize: fontScale * 16 },
  buttonText: { fontSize: fontScale * 20, fontWeight: 'bold' },
  errorMessage: { fontSize: fontScale * 15 },
  subHeader: { fontSize: fontScale * 14 },
  link: { fontSize: fontScale * 17 },
  input: { fontSize: fontScale * 17 },
  paginationOn: { fontSize: fontScale * 17.5 },
  paginationOff: { fontSize: fontScale * 17.5 },
}

export default ThemeText = ({ type, text, style, onPress, ...rest }) => {
  const { theme } = useContext(ThemeContext)
  const colors = {
    headerText: { color: theme.freeTextColor },
    freeText: { color: theme.freeTextColor },
    buttonText: { color: theme.buttonTextColor },
    errorMessage: { color: Colors.red },
    subHeader: { color: theme.highlight2 },
    link: { color: Colors.blue, textDecorationLine: 'underline' },
    input: { color: theme.text },
    paginationOn: { color: theme.text, textDecorationLine: 'underline', fontWeight: 'bold' },
    paginationOff: { color: theme.subtext },
  }

  return (
    <Text style={[fontSize[type], colors[type], style]} {...rest} onPress={onPress}>
      {text}
    </Text>
  )
}
