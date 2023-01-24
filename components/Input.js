import { View, TextInput, Button} from 'react-native'
import React, { useState } from 'react'

export default function Input({ textUpdateFunction }) {
  const [text, setText] = useState("initial Val");
  function updateText() {
    textUpdateFunciton(text);
  }
  return (
    <View>
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
      }} />
    </View>
  )
}