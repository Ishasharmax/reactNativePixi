import React from 'react'
import { Text, View, TouchableOpacity, Image, Button, Platform, AppState, StyleSheet,} from 'react-native';
import { TriangleColorPicker } from 'react-native-color-picker'
import { Navigation } from 'react-native-navigation';
import { useNavigation } from '@react-navigation/native';


function colorPick() {
  const navigation = useNavigation();
}

export const colorPicker = ({ navigation }) => (
  <View style={{flex: 1, padding: 45, backgroundColor: '#212021'}}>
    <Button title="Back" color="#ffffff" style={{padding: 45}} />
    <TriangleColorPicker
      oldColor='purple'
      onColorSelected={color => alert(`Color selected: ${color}`)}
      style={{flex: 1}}
    />
  </View>
)
