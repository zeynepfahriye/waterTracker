import { View, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput, Text, Alert } from "react-native"
import React, { useState } from 'react'
import { customModalStyle } from "../styles/customModalStyle"
import { customModalProps } from "../types/types"
import { addIntakeData } from "../utils/api"

const CustomModal = (props: customModalProps) => {
   //STATE
   const [inputValue, setInputValue] = useState<string>("");

   //textInput kontrol
   const handleInputChange = (text: string) => {
      setInputValue(text)
   }

   const handleButtonPress = () => {
      addIntakeData({ amount: inputValue }).then(data => {
         props.onSave(data);
         props.onClose();
      });
   };

   return (
      <Modal
         animationType="fade"
         transparent={true}
         visible={props.visibility ?? false}
         onRequestClose={props.onClose}
      >
         <TouchableWithoutFeedback
            onPress={props.onClose}
         >
            <View style={customModalStyle.modalContainer}>
               <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                  <View style={customModalStyle.modal}>
                     <View style={{ marginTop: '3%' }}>
                        <Text style={customModalStyle.title}>{props.title}</Text>
                     </View>
                     <TextInput
                        keyboardType="numeric"
                        value={inputValue}
                        onChangeText={handleInputChange}
                        style={customModalStyle.textInput}
                     />

                     <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity
                           onPress={props.cancel}
                           style={[customModalStyle.button, { backgroundColor: 'grey', borderColor: 'grey' }]}
                        >
                           <Text style={customModalStyle.buttonText}>{props.buttonFirstTitle}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                           onPress={handleButtonPress}
                           style={customModalStyle.button}
                        >
                           <Text style={customModalStyle.buttonText}>{props.buttonSecondTitle}</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
               </TouchableWithoutFeedback>
            </View>
         </TouchableWithoutFeedback>
      </Modal>

   )
}

export default CustomModal