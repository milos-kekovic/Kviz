import React, { useContext, useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../../Context/ThemeContext';
import { ThemeText } from '../../Components';
import RNPickerSelect from 'react-native-picker-select';
import { DownIcon } from '../../Components/Icons';
import { fontSize, useFontSize, useElementSize } from '../../Constants/Dimensions';
import { color } from '@rneui/base';

export default function CustomPicker(props) {
  const { theme } = useContext(ThemeContext);
  const { validationState, style, selectedValue, onValueChange, options, label, placeholder = null } = props;
  const [value, setValue] = useState(selectedValue || null); // ✅ Fix: Initialize value state
  const scaledFontSize = useFontSize(); // ✅ Get dynamic font size
  console.log('scaledFontSize', scaledFontSize)

  // ✅ Update local state when props.selectedValue changes
  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const renderImage = (iconUrl) => (
    <Image
      source={iconUrl}
      style={{
        height: fontSize * 4,
        width: fontSize * 4,
        marginRight: 10,
        borderRadius: fontSize * 2,
        resizeMode: 'stretch',
      }}
    />
  );

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: validationState ? 'red' : theme.line,
          backgroundColor: theme.secondaryColor,
        },
        style,
      ]}
    >
      

      <RNPickerSelect
        onValueChange={(newValue) => {
          setValue(newValue); // ✅ Fix: Update state correctly
          onValueChange(newValue);
        }}
        items={options.map((item) => ({
          label: item.label,
          value: item.value || item, // Ensure value exists
          key: item.code,
        }))}
        value={value} // ✅ Fix: Ensure value is defined
        placeholder={{ label: placeholder || 'Select an option', value: null }}
        style={{
          inputIOS: { 
            width: '100%',
            fontSize: fontSize * 1.5,
            //paddingVertical: 6, 
            color: theme.primaryColor 
          },
          inputAndroid: {
            width: '100%',
            fontSize: scaledFontSize, // ✅ Use dynamic font size for Android
            //paddingVertical: 6, 
            color: theme.primaryColor
          },
          placeholder: { color: theme.primaryColor },
        }}
        Icon={() => (
          <DownIcon
            size={scaledFontSize * 2}
            style={styles.icon}
            color={theme.text}
            name="chevron-down"
            type="material-community"
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: fontSize,
    padding: 10,
  },
  label: {
    marginTop: -fontSize * 3,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: '50%',
  },
});
