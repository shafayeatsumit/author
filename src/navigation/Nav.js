import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';

import HomeScreen from '../screens/home/Home';
import LoadingScreen from '../screens/loading/Loading';
import NoteScreen from '../screens/note/Note';
import IntroScreen from '../screens/intro/Start';
import IntroNoteScreen from '../screens/home/IntroNote';
import StartScreen from '../screens/intro/Start';

const Stack = createStackNavigator();
class Nav extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#343D4C'}}>
        <NavigationContainer>
          <StatusBar translucent hidden />
          <Stack.Navigator
            headerMode="none"
            screenOptions={{
              gestureEnabled: false,
              cardStyle: {backgroundColor: 'transparent'},
              cardOverlayEnabled: true,
              cardStyleInterpolator: ({current: {progress}}) => ({
                cardStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 0.5, 0.9, 1],
                    outputRange: [0, 0.25, 0.7, 1],
                  }),
                },
                overlayStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                    extrapolate: 'clamp',
                  }),
                },
              }),
            }}>
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="IntroNote" component={IntroNoteScreen} />
            <Stack.Screen name="Note" component={NoteScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

export default Nav;
