import React, { useContext, useState } from 'react'
import { Text, Dimensions, View, SafeAreaView } from 'react-native'
import { ThemeContext, Colors } from '../Context/ThemeContext'

const { fontScale } = Dimensions.get('window')
const fontSize = {
  normal: { fontSize: fontScale * 15 },
  errorMessage: { fontSize: fontScale * 15 },
  subHeader: { fontSize: fontScale * 14 },
  link: { fontSize: fontScale * 17 },
  input: { fontSize: fontScale * 17 },
  header: { fontSize: fontScale * 20 },
  paginationOn: { fontSize: fontScale * 17.5 },
  paginationOff: { fontSize: fontScale * 17.5 },
}
export default ThemeText = ({ type, text, style, onPress, ...rest }) => {
  // * * * * * * * * * * *
  // * Props
  // * * * * * * * * * * *
  //type = {string} Current Types: normal,
  //text = {string} Text to display
  //style= {object} Other styles

  const { theme } = useContext(ThemeContext)
  const colors = {
    normal: { color: theme.text },
    errorMessage: { color: Colors.red },
    subHeader: { /*color: theme.subtext*/color: theme.highlight2 },
    link: { color: Colors.blue, textDecorationLine: 'underline' },
    input: { color: theme.text },
    header: { color: theme.text },
    paginationOn: { color: theme.text, textDecorationLine: 'underline', fontWeight: 'bold' },
    paginationOff: { color: theme.subtext },
  }

  return (
    <>
      <Text style={[fontSize[type], colors[type], style]} {...rest} onPress={onPress} >
        {text}
      </Text>
    </>
  )
}
