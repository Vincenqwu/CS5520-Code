import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from "./components/Header";
import Input from "./components/Input";

export default function App() {
  const name = "My Awesome App";
  const [enteredText, setEnteredText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  function onTextEnter (changedText) {
    setEnteredText(changedText);
  }

  function cancelModal () {
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Header name={name}/> 
      <Button title="Add task" onPress = {() => setModalVisible(true)} />     
      <StatusBar style="auto" />
      <Input 
      textUpdateFunction={onTextEnter}
      setModalVisible={setModalVisible} 
      modalVisible={modalVisible} 
      cancelModal={cancelModal}
      />
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
