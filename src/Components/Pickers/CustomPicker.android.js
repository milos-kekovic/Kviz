import React, { useContext, useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { ThemeContext } from '../../Context/ThemeContext';
import { DownIcon } from '../../Components/Icons';
import { useFontSize, useElementPadding, useElementMargin } from '../../Constants/Dimensions';

export default function CustomPicker(props) {
  const { theme } = useContext(ThemeContext);
  const { selectedValue, onValueChange, options, placeholder = 'Select a language' } = props;
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const scaledFontSize = useFontSize();
  const scaledElementPadding = useElementPadding();
  const scaledElementMargin = useElementMargin();

  useEffect(() => {
    // ✅ Set the initial selected item based on selectedValue
    if (selectedValue) {
      const foundItem = options.find(item => item.code === selectedValue.code);
      setSelectedItem(foundItem || null);
    }
  }, [selectedValue, options]);

  return (
    <View style={{ width: '100%', marginVertical: scaledElementMargin }}>
      {/* Custom Button to Open Picker */}
      <TouchableOpacity 
        style={[styles.button, { borderColor: theme.line, backgroundColor: theme.secondaryColor, padding: scaledElementPadding }]} 
        onPress={() => setModalVisible(true)}
      >
        {selectedItem?.icon && <Image source={selectedItem.icon} style={styles.logo} />}
        <Text style={[styles.buttonText, { fontSize: scaledFontSize, color: theme.primaryColor }]}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <DownIcon size={scaledFontSize * 1.5} color={theme.text} name="chevron-down" type="material-community" />
      </TouchableOpacity>

      {/* Modal for Language Selection */}
      <Modal 
        visible={modalVisible} 
        transparent 
        animationType="slide"
        onRequestClose={() => setModalVisible(false)} // ✅ Close modal on Android back button
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: theme.secondaryColor }]}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => (item.code ? item.code.toString() : `item-${index}`)} // ✅ Unique key
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[styles.item, { padding: scaledElementPadding }]}
                  onPress={() => {
                    console.log("Selected item:", item);
                    if (item && item.code) {
                      setSelectedItem(item); // ✅ Update selected item
                      onValueChange(item); // ✅ Pass the full item object
                      setModalVisible(false); // ✅ Close modal
                    } else {
                      console.warn("Invalid item selected:", item);
                    }
                  }}
                >
                  {item.icon && <Image source={item.icon} style={styles.logo} />}
                  <Text style={[styles.itemText, { color: theme.primaryColor }]}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'space-between',
  },
  buttonText: {
    flex: 1,
    marginLeft: 10,
  },
  logo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '50%',
    borderRadius: 8,
    paddingVertical: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
