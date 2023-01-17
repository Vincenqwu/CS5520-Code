import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from "./components/Header";

export default function App() {
  const name = "My Awesome App";
  const [text, setText] = useState();

  function updateTextInput() {
    setText(text);
  }

  return (
    <View style={styles.container}>
      <Header name={name}/>      
      <StatusBar style="auto" />
      <TextInput 
        value={text} 
        onChangeText={ (changedText) => {
          setText(changedText);
        } }
      />
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
