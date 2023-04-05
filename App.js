import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import Home from "./Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetails from "./components/GoalDetails";
import Help from "./components/Help";
import { FontAwesome } from "@expo/vector-icons";
import PressableButton from "./components/PressableButton";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Firebase/firebase-setup";
import Profile from "./components/Profile";
const Stack = createNativeStackNavigator();
// console.log(Stack);
import { Ionicons } from "@expo/vector-icons";
import Map from "./components/Map";

const AuthStack = (
  <>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </>
);
const AppStack = (
  <>
    <Stack.Screen
      options={({ navigation }) => {
        return {
          title: "All My Goals",
          headerRight: () => {
            return (
              <Ionicons
                name="person"
                size={24}
                color="#eee"
                onPress={() => navigation.navigate("Profile")}
              />
            );
          },
        };
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
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerRight: () => {
          return (
            <Ionicons
              name="exit"
              size={24}
              color="#eee"
              onPress={() => {
                signOut(auth);
              }}
            />
          );
        },
      }}
    />
    <Stack.Screen name="Map" component={Map} />
  </>
);
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);
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
        {isAuthenticated ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}