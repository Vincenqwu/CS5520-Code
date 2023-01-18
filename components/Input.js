import { View, TextInput } from 'react-native'
import React, { useState } from 'react'

export default function Input({ textUpdateFunction }) {
  const [text, setText] = useState();
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
    </View>
  )
}