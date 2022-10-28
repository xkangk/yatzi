import React from "react";
import { Text, View } from "react-native";
import styles from "../styles/styles";
import { useFonts } from 'expo-font';



export default function Header() {
  const [fontsLoaded] = useFonts({
    'ChakraPetch': require('../assets/fonts/ChakraPetch-Regular.ttf'),
  });


  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.header}>
      <Text style={[styles.title, {fontFamily: 'ChakraPetch'}]}>Mini Yahtzee</Text>
    </View>
  )
}