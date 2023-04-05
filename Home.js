import { StatusBar } from "expo-status-bar";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./Firebase/firebase-setup";

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
import { deleteFromDB, writeToDB } from "./Firebase/firestoreHelper";
import { auth, firestore } from "./Firebase/firebase-setup";

export default Home = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "goals"),
        where("user", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          // no data
          setGoals([]);
        } else {
          let docs = [];
          // we want to update goals array with the data THAT we get in this array
          querySnapshot.docs.forEach((snap) => {
            console.log(snap.id);
            docs.push({ ...snap.data(), id: snap.id });
          });
          console.log(docs);
          setGoals(docs);
        }
      },
      (error) => {
        console.log("onsnapshot error: ", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  const name = "CS 5520"; //js variable
  // writeToDB({ text: "test" });
  // const [enteredText, setEnteredText] = useState("Your goals appear here");
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  // this function is called on Confirm
  // call writeToDB in this function
  async function fetchImageData(uri) {
    console.log(uri); //local uri on the device
    const response = await fetch(uri);
    const imageBlob = await response.blob(); //image data
    const imageName = uri.substring(uri.lastIndexOf("/") + 1);
    const imageRef = await ref(storage, `images/${imageName}`);
    const uploadResult = await uploadBytesResumable(imageRef, imageBlob);
    return uploadResult.metadata.fullPath; //path to the image on the storage
  }
  async function onTextEnter(dataFromInput) {
    // dataFromInput is in this form {text:.., imageUri:..}
    let newGoal = { text: dataFromInput.text };
    let imageUri;
    if (dataFromInput.imageUri) {
      imageUri = await fetchImageData(dataFromInput.imageUri);
      newGoal = { ...newGoal, imageUri: imageUri }; //, id: Math.random() };
    }
    console.log(newGoal);
    // update this function to save the text in our goals array
    // as an object {text: changeText, id:...}
    writeToDB(newGoal);
    // setGoals((prevGoals) => {
    //   return [...prevGoals, newGoal];
    // });

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
    // setGoals((prevGoals) => {
    //   return prevGoals.filter((goal) => {
    //     return goal.id !== deletedId;
    //   });
    // });
    deleteFromDB(deletedId);
  }
  function goalItemPressed(goal) {
    console.log("goal item pressed ", goal);
    // navigate to GoalDetails here and pass goal object
    navigation.navigate("GoalDetails", { goalItem: goal });
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
            return (
              <GoalItem
                goal={item}
                onGo
                onDelete={onDeletePressed}
                onGoalPress={goalItemPressed}
              />
            );
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