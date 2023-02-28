import { View, Text } from "react-native";
import React from "react";
import Home from "./Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetails from "./components/GoalDetails";
import Help from "./components/Help";
import { FontAwesome } from "@expo/vector-icons";
import PressableButton from "./components/PressableButton";

const Stack = createNativeStackNavigator();
// console.log(Stack);
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "purple",
          },
          headerTintColor: "#eee",
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen
          options={{
            title: "All Goals",
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          // the function in options will recieve route and navigation automatically
          // options={({ route }) => {
          //   // console.log(data);
          //   return {
          //     // make the title dynamically set using route.params

          //     title: route.params.goalItem.text,
          //     headerRight: () => {
          //       // return <Text>testing </Text>;
          //       // return a pressable button with an icon
          //       return (
          //         // <PressableButton
          //         //   style={{ backgroundColor: "purple" }}
          //         //   pressHandler={iconPressed}
          //         // >
          //         <FontAwesome
          //           name="warning"
          //           size={24}
          //           color="#eee"
          //           onPress={iconPressed}
          //         />
          //         // </PressableButton>
          //       );
          //     },
          //   };
          // }}
          name="GoalDetails"
          component={GoalDetails}
        />
        <Stack.Screen name="Help" component={Help} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}