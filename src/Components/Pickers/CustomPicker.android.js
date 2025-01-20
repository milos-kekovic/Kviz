import React, { useContext } from 'react'
import { Dimensions, View, TouchableOpacity, Image, Text } from 'react-native'
import { ThemeContext } from '../../Context/ThemeContext'
import { ThemeText } from '../../Components'
import { CustomPicker as CusPic } from 'react-native-custom-picker'
import { DownIcon } from '../../Components/Icons'

const { width, height, fontScale } = Dimensions.get('window')


export default CustomPicker = (props) => {
  const { theme } = useContext(ThemeContext)
  let { validationState, style, selectedValue, onValueChange, options, options2, disabled, label, sort = true, required, firstLabel, placeholder = null } = props

  const renderImage = (iconUrl) => {
    return(
      <Image /* size={elementSize * 4} */
        source={iconUrl}
        style={{
          height: height * 0.05,
          width: height * 0.05,
          marginRight: 10,
          borderRadius: height * 0.5,
          resizeMode: 'stretch',
        }} 
      />
    )
  }

  let firstItemLabel = `Select ${label.replace(/Select/gi, '')}`
  if (firstLabel) firstItemLabel = firstLabel
  
  function renderField(settings) {
    const { selectedItem, defaultText, getLabel, clear } = settings
    //console.log('getLabel(selectedItem)', getLabel(selectedItem))
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          {!selectedItem ? (
            <View>
              <Text style={{ color: 'gray', fontSize: fontScale * 17 }}>{defaultText}</Text>
              {/* <Text style={[styles.text, { color: selectedItem.color }]}>
                {getLabel(selectedItem)}
              </Text> */}
            </View>
          ) : (
            <View>
              <Text style={{ color: 'black', fontSize: fontScale * 17 }}>{selectedItem.label}</Text>
              {/* <Text style={[styles.text, { color: selectedItem.color }]}>
                {getLabel(selectedItem)}
              </Text> */}
            </View>
          )
          }
        </View>
        <DownIcon
            size={25 * fontScale}
            style={{ marginRight: 10, marginBottom: (fontScale * 17) / 2 }}
            color={theme.text}
            name="chevron-down" // Specify the correct icon name
            type="material-community" // Explicitly specify the icon type
            />
        {/* <View style={{width: 20, height: 20, marginRight: 10, backgroundColor: 'white' }} /> */}
      </View>
    )
  }

  function renderOption(settings) {
    const { item, getLabel, selectedItem } = settings
    const index = options.indexOf(item)
    return (
      <View style={{width: width * 0.2, flexDirection: 'row', paddingLeft: 10, marginTop: 20, marginBottom: index === options.length-1 ? 20 : 0, alignItems: 'center', fontSize: fontScale * 17}}>
          {item.icon && renderImage(item.icon)}
          <Text style={{ color: theme.secondaryColor/* , alignSelf: 'flex-start' */ }}>{item.label}</Text>
        </View>
    )
  }

  return (
    <View
      style={{
        width: '50%',
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
          backgroundColor: theme.secondaryColor,
          paddingHorizontal: 10,
          alignSelf: 'flex-start',
          color: validationState ? 'red' : theme.primaryColor,
        }}
        type={'highlight'}
        numberOfLines={1}
      >
        {label}
      </ThemeText>
        <CusPic
          style={{width: width * 0.2, marginVertical: 6, marginLeft: 10, fontColor: 'yellow'}}
          placeholder={placeholder}
          options={options}
          getLabel={item => item.label}
          fieldTemplate={renderField}
          optionTemplate={renderOption}
          onValueChange={onValueChange}
          value={selectedValue}
          backdropStyle={{width: width * 0.2, alignSelf: 'center', backgroundColor: 'transparent'}}
          modalStyle={{backgroundColor: theme.primaryColor}}
          /* fieldTemplate={this.renderField}
          optionTemplate={this.renderOption}
          headerTemplate={this.renderHeader}
          footerTemplate={this.renderFooter} */
          /* onValueChange={value => {
            Alert.alert('Selected Item', value ? JSON.stringify(value) : 'No item were selected!')
          }} */
        />
      </View>
  )
}
