import React, { useContext, useState, useCallback } from 'react'
// import { Picker} from 'react-native-root-toast'
// import { Picker } from '@react-native-community/picker'
import { Picker } from '@react-native-picker/picker'
import { Dimensions, View } from 'react-native'
import { ThemeContext } from '../../Context'
import { ThemeText } from '../../Components'

// import { ThemeContext } from '../../Context/ThemeContext'
const { width, height, fontScale } = Dimensions.get('window')
export default function CustomPicker(props) {
  const { theme } = useContext(ThemeContext)
  const [size, onLayout] = useComponentSize()
  const {
    defaultText = 'Select One',
    style,
    label,
    sort = true,
    selectedValue,
    onValueChange,
    disabled,
    validationState,
    options,
    options2,
    required,
    firstLabel,
  } = props
  function useComponentSize() {
    const [size, setSize] = useState(null)

    const onLayout = useCallback((event) => {
      const { width, height, x, y } = event.nativeEvent.layout
      setSize({ width, height, x, y })
    }, [])

    return [size, onLayout]
  }

  const renderPickerItems = (item, index) => {
    if (options2) item += ' (' + options2[index] + ')'

    return <Picker.Item label={item} value={item} key={+(index + 1)} color={theme.text}/>
  }
  return (
    <View
      onLayout={onLayout}
      style={{
        width: '90%',
        borderColor: validationState ? 'red' : theme.line,
        borderWidth: 1,
        borderBottomWidth: 1,
        paddingLeft: 10,
        borderRadius: 4,
        marginTop: (fontScale * 17) / 2,
        ...style,
      }}>
      <ThemeText
        style={{
          marginTop: (-fontScale * 17) / 2,
          backgroundColor: theme.background,
          paddingHorizontal: 10,
          alignSelf: 'flex-start',
          color: validationState ? 'red' : theme.text,
        }}
        type={'input'}
        numberOfLines={1}
        text={`${label}${required ? ' *' : ''}`}
      />
      <Picker
        style={{
          color: theme.text,
          backgroundColor: theme.background,
          marginLeft: 3.25,
        }}
        placeholder={defaultText}
        textStyle={{ color: theme.text, fontSize: 17 * fontScale }}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        enabled={!disabled}>
        <Picker.Item label="" enabled={false}/>
        {sort ? options.sort().map((value, index) => renderPickerItems(value, index)) : options.map((value, index) => renderPickerItems(value, index))}
      </Picker>
    </View>
  )
}
