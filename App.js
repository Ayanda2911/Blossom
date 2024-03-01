import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import { Audio } from 'expo-av';
import ActiveRecording from './components/recording';

export default function App(){
  return (
    <View style={styles.container}>
      <ActiveRecording />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }
});
