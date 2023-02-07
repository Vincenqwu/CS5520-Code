import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import { useState } from "react";

export default function Input({
  textUpdateFunction,
  modalIsVisible,
  onCancel,
}) {
  const [text, setText] = useState("");
  function updateText() {
    textUpdateFunction(text);
  }
  return (
    <Modal visible={modalIsVisible} animationType="slide">
      <View style={styles.container}>
        <Image source={require("../assets/goal.png")} style={styles.image} />
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png",
          }}
          style={styles.image}
        />
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={(changedText) => {
            setText(changedText);
          }}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              disabled={text.length === 0 ? true : false}
              title="Confirm"
              onPress={() => {
                textUpdateFunction(text);
                setText("");
              }}
            />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  input: {
    borderBottomColor: "rebeccapurple",
    borderBottomWidth: 2,
    width: "50%",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: { width: "30%", marginHorizontal: 5, color: "red" },
});