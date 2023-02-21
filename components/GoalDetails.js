import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function GoalDetails({ route, navigation }) {
  function iconPressed() {
    console.log("icon pressed from Goal Details");
  }
  //   console.log(route.params.goalItem);
  useEffect(() => {
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