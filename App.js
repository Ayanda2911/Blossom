import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import { Audio } from 'expo-av';
import ActiveRecording from './components/recording';
import Registration from './components/register';
import EmergencyContacts from './components/EmergencyContacts';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator(); 

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="ActiveRecording" component={ActiveRecording} />
        <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }
});
