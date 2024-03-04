import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import ActiveRecording from './components/recording';
import Signup from './components/register';
import HomePage from './components/Homepage';
import LandingPage from './components/LandingPage';
import Login from './components/Login';

const Stack = createStackNavigator(); 

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLogin = async () => {
    try {
      // my api address is 192.168.112.1
      // change it to yours 
      // you can find it by running ipconfig in your terminal and loking for ipv4
      const req = await fetch('http://192.168.112.1:3000/api/isSignedIn', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      const data = await req.json();
      console.log(data);
      if (data.message === 'User is signed in') {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    //setIsLoggedIn(false);
  };

  useEffect(() => {
    checkLogin();
  }, []); 

  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="ActiveRecording" component={ActiveRecording} />
            {/* Add more screens as needed */}
          </>
        ) : (
          <>
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
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
