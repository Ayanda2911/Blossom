import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export default function ActiveRecording() {

  // on load you want to set the recording to true and start recording 
  useEffect(() => {
    startRecording();
  }, []);
  
    const [recording, setRecording] = useState();
    const [permissionResponse, requestPermission] = Audio.usePermissions();
  
    async function startRecording() {
      try {
        if (permissionResponse.status !== 'granted') {
          console.log('Requesting permission..');
          await requestPermission();
        }
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
  
        console.log('Starting recording..');
        const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        console.log('Recording started');
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    }
  
    async function stopRecording() {
      console.log('Stopping recording..');
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync(
        {
          allowsRecordingIOS: false,
        }
      );
      const uri = recording.getURI();
      
      console.log('Recording stopped and stored at', uri);
        
    }
  
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.loadText}>Loading flower options</Text>
        </View>
        <View style={styles.recordingInProgress}>
          <ImageBackground
            source={require('../assets/orange_flower_animation.gif')}
            style={{ width: 200, height: 200 }}
          >
          </ImageBackground>
        </View>
        <View style={styles.stopButton}>
          <TouchableOpacity 
              onPress={() =>stopRecording()}
              style={{backgroundColor: '#FF5733', padding: 10, borderRadius: 10,}}
              >
            <Text style={{ padding : 30, fontSize: 18, fontWeight: 'bold'}}>Cancel Loading</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadText: {
      fontSize: 24,
      color: '#FF5733',
      textAlign: 'center',
      padding: 30
    },
  });