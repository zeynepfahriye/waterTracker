import { View, Modal, TouchableOpacity, Dimensions, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput, Text } from "react-native"
import React from 'react'
import { longModalStyle } from "../styles/longModalStyle";
import { longModalProps } from "../types/types";

const LongModalPress = (props:longModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible ?? false}
      onRequestClose={props.onClose}
    >
      <TouchableWithoutFeedback onPress={props.onClose}>
        <View style={longModalStyle.modalContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
            <View style={longModalStyle.modal}>
              <View style={{ marginTop: '3%' }}>
                <Text style={longModalStyle.title}>{props.title}</Text>
              </View>
              <TextInput
                keyboardType="numeric"
                value={props.inputValue}
                onChangeText={(text: string) => props.onChangeText(parseInt(text))}
                style={longModalStyle.textInput}
              />
              <View>
                <TouchableOpacity
                  onPress={props.onSubmit}
                  style={longModalStyle.button}
                >
                  <Text style={longModalStyle.buttonText}>{props.buttonSecondTitle}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LongModalPress

