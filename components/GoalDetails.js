import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import GoalUsers from "./GoalUsers";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/firebase-setup";
export default function GoalDetails({ route, navigation }) {
  const [imageURL, setImageURL] = useState("");
  function iconPressed() {
    console.log("icon pressed from Goal Details");
  }
  //   console.log(route.params.goalItem);

  useEffect(() => {
    async function getImageURL() {
      try {
        const reference = ref(storage, route.params.goalItem.imageUri);
        const url = await getDownloadURL(reference);
        setImageURL(url);
      } catch (err) {
        console.log("download image ", error);
      }
    }
    getImageURL();
  }, []);

  useEffect(() => {
    console.log(route.params.goalItem);
    navigation.setOptions({
      title: route.params.goalItem.text,
      headerRight: () => {
        return (
          <FontAwesome
            name="warning"
            size={24}
            color="#eee"
            onPress={iconPressed}
          />
        );
      },
    });
  });

  return (
    <View>
      <Text>
        You are viewing details of {route.params.goalItem.text} with id:{" "}
        {route.params.goalItem.id}
      </Text>
      <GoalUsers />
      {imageURL && (
        <Image source={{ uri: imageURL }} style={{ width: 100, height: 100 }} />
      )}
      {/* <Button
        title="more details"
        onPress={() => {
          navigation.push("GoalDetails", {
            goalItem: {
              text: "this is another page",
              id: "",
            },
          });
        }}
      /> */}
    </View>
  );
}