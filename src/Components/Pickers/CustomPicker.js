import React from 'react'
import { Platform } from 'react-native'
import CustomPickerIOS from './CustomPicker.ios'
import CustomPickerAndroid from './CustomPicker.android'

export default function CustomPicker(props) {
  // * * * * * * * * * * *
  // * Props
  // * * * * * * * * * * *
  //
  // REQUIRED
  // selectedValue = {state to be chosen}
  // onValueChange = {setState func}

  // OPTIONAL
  // validationState        for validation (red border)
  // label
  // required
  // firstLabel

  // disabled
  // showIcon

  return Platform.select({
    android: <CustomPickerAndroid {...props} />,
    ios: <CustomPickerIOS {...props} />,
  })
}
