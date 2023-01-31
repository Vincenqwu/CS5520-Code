import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import Header from "./components/Header";
import Input from "./components/Input";

export default App = () => {
  const name = "CS 5520"; //js variable
  const [enteredText, setEnteredText] = useState("Your goals appear here");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = new useState([])
  // this function is called on Confirm
  function onTextEnter(changedText) {
    let newGoal = { text : changedText, id: Math.random() };
    console.log(newGoal);
    // setGoals([...goals, newGoal.text + Math.random()]);

    // make sure always get the latest state (array)
    setGoals((prevGoal) => [...prevGoal, newGoal]);
    setEnteredText(changedText);
    setModalVisible(false);
  }
  function onCancel() {
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.topContainer}>
        <Header appName={name} />
        <Button title="Add task" onPress={() => setModalVisible(true)} />
      </View>

      <Input
        modalIsVisible={modalVisible}
        textUpdateFunction={onTextEnter}
        onCancel={onCancel}
        // containerStyle={styles.container}
      />
      <View style={styles.bottomContainer}>
        <ScrollView >
          {goals.map((goal) => {
            return <Text key={goal.id} style={styles.text}>{goal.text}</Text>
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: "#dcd",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#4510ff",
    fontSize: 40,
    margin: 30,
  },
});