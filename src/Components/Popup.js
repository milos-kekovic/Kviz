import React, { useContext } from 'react'
import { Dimensions, Keyboard, Modal, View } from 'react-native'
import { CustomButton, Spinner, ThemeText } from '../Components'
import { ThemeContext } from '../Context/ThemeContext'
import Logo from './Logo'

const { width, height, fontScale } = Dimensions.get('window')

export default function Popup({
  isVisible, //Required
  onClose, //Required
  titleText = 'Supply the popup with a title! (titleText)',
  messageText = 'Supply the popup with a message! (messageText)',
  leftButtonText = 'Cancel',
  onLeftButtonPress,
  rightButtonText = 'Submit',
  onRightButtonPress,
  cancelOption,
  oneButtonText = 'Submit',
  wrapContent,
  loading,
  customHeight,
}) {
  const { theme } = useContext(ThemeContext)

  const renderHeader = () => {
    return (
      <View
          style={[
            {
              backgroundColor: theme.popupHeaderBackgroundColor,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: height * 0.01,
              paddingHorizontal: width * 0.01,
              width: '100%',
              borderTopLeftRadius: fontScale * 10,
              borderTopRightRadius: fontScale * 10,
              marginBottom: -1,
              elevation: 2,
              multiline: false
            },
          ]}>
          <Logo isPopup={true} />
            <ThemeText type="popupHeaderText" style={{textAlign: 'center'}}>
            {titleText}
          </ThemeText>
        </View>
    )
  }
  const renderBody = () => {
    return (
      <View style={{ minHeight: height / 10, justifyContent: 'space-around' }}>
        <ThemeText type="popupBodyText" style={{ textAlign: 'center' }} text={messageText} />
        {!cancelOption ? (
          <CustomButton text={oneButtonText ? oneButtonText : 'Okay'} onButtonPress={onOneButtonPress} type={'primary'} />
        ) : (
          <View
            style={{
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginTop: '5%'
            }}>
            <CustomButton text={leftButtonText} onButtonPress={onClose} type={'secondary'} />
            <CustomButton text={rightButtonText} onButtonPress={onRightButtonPress} type={'secondary'} />
          </View>
        )}
      </View>
    )
  }

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={{ backgroundColor: 'black', opacity: 0.7, position: 'absolute', width: width, height: height }} />
      <View
        style={{
          //height: customHeight && customHeight,
          width: width * 0.3,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          flex: 1
        }}
      >
        {renderHeader()}
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.popupBodyBackgroundColor,
            borderBottomLeftRadius: fontScale * 10,
            borderBottomRightRadius: fontScale * 10,
            //padding: loading ? '5%' : '2%',
            paddingVertical: height * 0.02,
            paddingHorizontal: width * 0.01,
            elevation: 2
          }}>
          {loading ? <Spinner /> : wrapContent ? wrapContent : renderBody()}
        </View>
      </View>
    </Modal>
  )
}
