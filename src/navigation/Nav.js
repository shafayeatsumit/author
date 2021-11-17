import React, {Component} from 'react';
import {StatusBar, Image, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import DedicateScreen from '../screens/intro/Dedicate';
import TitleScreen from '../screens/intro/Title';
import LoadingScreen from '../screens/loading/Loading';
import NoteScreen from '../screens/note/Note';
import IntroScreen from '../screens/intro/Start';
import IntroNoteScreen from '../screens/home/IntroNote';
import StartScreen from '../screens/intro/Start';
import SwipeStartScreen from '../screens/intro/Swipe';
import PromptScreen from '../screens/prompts';
import PageScreen from '../screens/pages';

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
            <Stack.Screen name="Home" component={PageScreen} />
            <Stack.Screen name="Dedicate" component={DedicateScreen} />
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="Title" component={TitleScreen} />
            <Stack.Screen name="IntroNote" component={IntroNoteScreen} />
            <Stack.Screen name="Note" component={NoteScreen} />
            <Stack.Screen name="SwipeStart" component={SwipeStartScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

export default Nav;

const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
  },
  tabbar: {
    backgroundColor: '#191919',
    borderColor: '#191919',
    borderTopWidth: 0,
    elevation: 0,
  },
});
