import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import GoalItem from "./components/GoalItem";
import Header from "./components/Header";
import Input from "./components/Input";

export default App = () => {
  const name = "CS 5520"; //js variable
  // const [enteredText, setEnteredText] = useState("Your goals appear here");
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  // this function is called on Confirm
  function onTextEnter(changedText) {
    let newGoal = { text: changedText, id: Math.random() };
    console.log(newGoal);
    // update this function to save the text in our goals array
    // as an object {text: changeText, id:...}

    setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });

    // setEnteredText(changedText);
    setModalVisible(false);
  }
  function onCancel() {
    setModalVisible(false);
  }
  function onDeletePressed(deletedId) {
    // console.log("delete pressed ", deletedId);
    // let newGoals = goals.filter((goal) => {
    //   goal.id !== deletedId;
    // });
    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => {
        return goal.id !== deletedId;
      });
    });
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
        <FlatList
          contentContainerStyle={styles.scrollViewContentContainer}
          data={goals}
          renderItem={({ item }) => {
            // console.log(item);
            return <GoalItem goal={item} onDelete={onDeletePressed} />;
          }}
        />
        {/* <ScrollView contentContainerStyle={styles.scrollViewContentContainer}> */}
        {/* {goals.map((goal) => {
          return (
            <View key={goal.id} style={styles.textContainer}>
              <Text style={styles.text}>{goal.text}</Text>
            </View>
          );
        })} */}
        {/* </ScrollView> */}
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
  },
  scrollViewContentContainer: {
    alignItems: "center",
  },
  textContainer: {
    borderRadius: 5,
    backgroundColor: "#888",
    marginVertical: 15,
    padding: 15,
  },
  text: {
    color: "#4510ff",
    fontSize: 30,
  },
});