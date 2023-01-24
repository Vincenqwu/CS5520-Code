import { StyleSheet, View, TextInput, Button, Modal } from 'react-native'
import React, { useState } from 'react'

export default function Input({ textUpdateFunction, setModalVisible, modalVisible, cancelModal}) {
  const [text, setText] = useState("initial Val");
  function updateText() {
    textUpdateFunciton(text);
  }
  return (
    <Modal visible={modalVisible}>
      <View style={styles.container}>
        <TextInput 
          value={text} 
          onChangeText={ (changedText) => {
            textUpdateFunction(changedText);
            setText(changedText);
          } }
          style={{ backgroundColor: "red"}}
        /> 
        <Button title="Confirm" onPress={() => { 
          textUpdateFunction(text);
          setText("");
          setModalVisible(false);
          
        }} />
        <Button 
        title="Cancel"
        onPress={() => {
          cancelModal()
        }}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});