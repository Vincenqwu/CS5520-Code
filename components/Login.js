import { View, Text, TextInput, Button } from 'react-native'
import { useState, nav } from 'react'
import React from 'react'
import { auth } from '../Firebase/firebase-setup';
import { signInWithEmailAndPassword } from 'firebase/auth';
export default function Login( { navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function loginHandler() {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCred)
    }
    catch (error) {
      console.log(error.message);
    }
    console.log('login')
  }
  function signupHandler() {
    console.log('signup');
    navigation.navigate('Signup');

  }
  return (
    <View>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={(newEmail) => {
        setEmail(newEmail);
      }}
        placeholder="Email" />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={(newPassword) => {
        setPassword(newPassword)
      }}
        placeholder="Password"
      />
      <Button title="Login" onPress={loginHandler}/>
      <Button title="Signup" onPress={signupHandler}/>
    </View>
  )
}