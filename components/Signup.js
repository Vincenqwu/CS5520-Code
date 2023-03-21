import { View, Text, TextInput, Button, Alert } from 'react-native'
import { useState } from 'react'
import React from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { async } from '@firebase/util';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const auth = getAuth();

  async function signupHandler() {
    console.log(password + " " + confirmPassword)
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
    }
    try {
      const user = await createUserWithEmailAndPassword (auth, email, password);

    }
    catch (error) {
      Alert.alert(error.message);
    }
    console.log('signup')
  }

  function loginHandler() {
    navigation.replace('Login');
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
        secureTextEntry={true}
      />
      <Text>Confirm Password</Text>
      <TextInput value={confirmPassword} onChangeText={(newPassword) => {
        console.log(newPassword)
        setConfirmPassword(newPassword)
      }}
        placeholder="Confirm Password"
        secureTextEntry={true}
      />
      <Button title="Register" onPress={signupHandler} />
      <Button title="Already have an account? Login" onPress={loginHandler} />
      
    </View>
  )
}