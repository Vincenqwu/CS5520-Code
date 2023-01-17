import { View, Text } from 'react-native'
import React from 'react'

export default function Header(props) {
  return (
    <View>
      <Text>Header</Text>
      <Text>APP Name: {props.name}</Text>
    </View>
  )
}