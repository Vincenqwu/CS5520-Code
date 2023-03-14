import { View, Text, FlatList, Button } from "react-native";
import React, { useEffect, useState } from "react";

export default function GoalUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // get data here and update some state variables
    async function getUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          //there was an HTTP error
          throw new Error("HTTP error happened");
        }
        //what to do with successful data?
        const data = await response.json(); // this is an array of data
        // update users array (state variable) using names of data array
        const nameArray = data.map((userData) => {
          return userData.name;
        });
        setUsers(nameArray);
      } catch (err) {
        console.log("get Users error: ", err);
      }
    }
    getUsers();
  }, []);

  async function addUser() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "Neda", id: Math.random() }),
        }
      );
      if (!response.ok) {
        //there was an HTTP error
        throw new Error("HTTP error happened");
      }
      const data = await response.json();
      //   data is my new user
      // update users array to have this new data
      setUsers((prevUsers) => {
        return [...prevUsers, data.name];
      });

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          //   console.log(userData.item);
          return <Text>{item}</Text>;
        }}
      />
      <Button title="Add me as a user" onPress={addUser} />
    </View>
  );
}