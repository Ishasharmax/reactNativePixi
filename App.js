import React, { Component, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Button, Platform, AppState, StyleSheet, } from 'react-native';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import base64 from 'base64-js';
import ExpoPixi from 'expo-pixi';
import Expo from 'expo';
import { takeSnapshotAsync } from 'expo-pixi/lib/utils.js';
import { ColorPicker } from 'react-native-color-picker'
import { colorPicker } from './src/colorPicker'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { captureRef } from 'react-native-view-shot';
import * as Permissions from 'expo-permissions';

const Stack = createStackNavigator();

class DrawingScreen extends Component {

  constructor(...args) {
    super(...args)
    this.state = { example: null }
  }

  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA_ROLL);
  }

  render() {
    const { example } = this.state
    if (example) {
      const { Component } = example
      return <Component />
    }

    const color = colorChosenFunc;
    const width = 20;
    const alpha = 1;

    const Picker = () => (
      <ColorPicker
        onColorSelected={color => alert(`Color selected: ${color}`)}
        style={{ flex: 1 }}
      />
    )

    const clearCanvas = () => {
      this.sketch.clear()
    }


    // const [isSketchClearing, setIsSketchClearing] = React.useState(false)

// Gets called when a button is pressed
// const onClear = () => {
//    setIsSketchClearing(true)
//    setTimeout(() => setIsSketchClearing(false), 50)
//   }

// const Sketcher = (
//     <ExpoPixi.Sketch
//       style={{ width: '100%', height: '100%' }}
//     />
//   )

    // const onChange = async ({ width, height }) => {
    //   let uri = await Expo.takeSnapshotAsync(this.sketch, {
    //     format: 'png', /// PNG because the view has a clear background
    //     quality: 0.1, /// Low quality works because it's just a line
    //     result: 'file',
    //     height,
    //     width
    //   });
    // };

    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        

        <ExpoPixi.Sketch
          ref={ref => this.sketch = ref}
          // onChange={onChange}
          strokeColor={Picker}
          strokeWidth={width}
          strokeAlpha={alpha}
          style={{ flex: 1 }}
          onChange={async ({ width, height }) => {
            let uri = await takeSnapshotAsync(this.sketch, {
              format: 'png', 
              quality: 0.5, 
              result: 'file',
              height,
              width
            });
            console.log(uri);
            try {
              const file = await FileSystem.writeAsStringAsync(uri, {
                encoding: 'base32',
              });
              // console.log(file);
            } catch (e) {
              console.error(e.message);
            }

          }}
        />
{/* 
<View collapsable={false}>
  {!isSketchClearing && Sketcher}
</View> */}
        <View
          style={{
            height: 80,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: 20,
          }}>
          <Button
            color={'blue'}
            title="undo"
            style={styles.button}
            onPress={() => { this.sketch.undo() }}
          />

          <Button
            color={'blue'}
            title="clear"
            style={styles.button}
            onPress={clearCanvas}
          />

          <View style={styles.container}>
            {colorPick.map(example => (
              <TouchableOpacity
                key={example.image}
                onPress={() => this.setState({ example })}
              >
                <Image source={example.image} style={{ width: 50, height: 50, marginBottom: 50 }} />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#0d52bd',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: '45%',
              borderRadius: 6,
            }}>
            <Text style={{ fontSize: 19, color: 'white' }}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


function ColorPickingScreen({ navigation }) {
  return (
    <View>
      <Button title="Go to Home" onPress={() => navigation.navigate('screen2')} />
    </View>
  );
}


const colorPick = [
  { Component: colorPicker, image: require('./assets/color.png') }
]

function colorChosenFunc() {
  const [color, setColor] = useState('#000000');
  return color;
}

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="drawingScreen">
          <Stack.Screen name="Drawing Screen" component={DrawingScreen}></Stack.Screen>
          <Stack.Screen name="Color Screen" component={ColorPickingScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    backgroundColor: '#ffffff',
  },
  text: {
    color: 'pink',
  },
  sketch: {
    flex: 1,
  },
  sketchContainer: {
    height: '100%',
  },
  image: {
    flex: 1,
  },
  label: {
    width: '100%',
    // padding: 5,
    alignItems: 'center',
  },
  button: {
    // position: 'absolute',
    // bottom: 8,
    // left: 8,
    zIndex: 1,
    padding: 12,
    minWidth: 56,
    minHeight: 48,
  },
});



