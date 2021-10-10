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

import PromptScreen from '../screens/prompts';
import PageScreen from '../screens/pages';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Prompt"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: 'rgba(255, 255, 255, 0.92)',
        activeBackgroundColor: '#191919',
        inactiveBackgroundColor: '#191919',
        style: {
          backgroundColor: '#191919',
        },
      }}>
      <Tab.Screen
        name="Page"
        component={PageScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              style={[styles.icon, {tintColor: color}]}
              resizeMode="contain"
              source={require('../../assets/page_icon.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Prompt"
        component={PromptScreen}
        resizeMode="contain"
        options={{
          tabBarIcon: ({color}) => (
            <Image
              style={[styles.icon, {tintColor: color}]}
              source={require('../../assets/prompt_icon.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

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
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Dedicate" component={DedicateScreen} />
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="Title" component={TitleScreen} />
            <Stack.Screen name="IntroNote" component={IntroNoteScreen} />
            <Stack.Screen name="Note" component={NoteScreen} />
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
});
