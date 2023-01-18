import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from "./components/Header";
import Input from "./components/Input";

export default function App() {
  const name = "My Awesome App";
  const [enteredText, setEnteredText] = useState("");
  function onTextEnter (changedText) {
    setEnteredText(changedText);
  }

  return (
    <View style={styles.container}>
      <Header name={name}/>      
      <StatusBar style="auto" />
      <Input textUpdateFunction={onTextEnter} />
      <Text>{enteredText}</Text>
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
