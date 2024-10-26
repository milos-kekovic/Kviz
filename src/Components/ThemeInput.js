//https://reactnative.dev/docs/textinput
import React, { useContext, useState } from 'react'
import { Dimensions, Keyboard, TextInput, View, Text, Platform } from 'react-native'
import { ThemeText } from '../Components'
import { ThemeContext, Colors } from '../Context/ThemeContext'
const { height, width, fontScale } = Dimensions.get('window')
const isAndroid = Platform.OS === 'android'
export default ThemeInput = (props) => {
  const {
    style,
    inputStyle,
    placeholder = 'Enter ...',
    validationState,
    label,
    multiline = false,
    numeric = false,
    required = false,
    ...rest
  } = props
  const { theme } = useContext(ThemeContext)
  const [isFocused, setIsFocused] = useState(false)
  return (
    <View
      style={{
        width: '90%',
        borderColor: validationState ? 'red' : isFocused ? Colors.blue : theme.line,
        borderWidth: 1,
        borderBottomWidth: 1,
        paddingLeft: 10,
        borderRadius: 4,
        marginTop: (fontScale * 17) / 2,
        ...style,
      }}>
      {!!label && (
        <ThemeText
          style={{
            marginTop: (-fontScale * 17) / 2,
            backgroundColor: theme.background,
            paddingHorizontal: 10,
            alignSelf: 'flex-start',
            color: validationState ? 'red' : isFocused ? Colors.blue : theme.text,
          }}
          type={'input'}
          numberOfLines={1}
          text={`${label}${required ? ' *' : ''}`}
        />
      )}

      <TextInput
        style={[{ color: theme.text, marginLeft: 7.5, paddingVertical: multiline ? 25 : 3, fontSize: fontScale * 17, ...inputStyle }]}
        returnKeyType="done"
        blurOnSubmit={true}
        onSubmitEditing={() => Keyboard.dismiss()}
        keyboardType={isAndroid && numeric ? 'numeric' : numeric ? 'number-pad' : 'default'}
        placeholderTextColor={theme.subtext}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
    </View>
  )
}
