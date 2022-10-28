import { View, Text } from 'react-native';
import React from 'react';
import style from '../styles/styles';
import { useFonts } from 'expo-font';

export default function Footer() {

  const [fontsLoaded] = useFonts({
    'Inconsolata-Variable': require('../assets/fonts/Inconsolata-VariableFont.ttf')
  });


  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={style.footer}>
      <Text style={[style.author, {fontFamily: 'Inconsolata-Variable'}]}>|| Katariina Järvenpää || 2022 ||</Text>
    </View>
  )
}