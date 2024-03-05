import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// List of the different screens
import ActiveRecording from './components/recording';
import Signup from './components/register';
import HomePage from './components/Homepage';
import LandingPage from './components/LandingPage';
import Login from './components/Login';

import { apiUrl } from './apiConfig';

const Stack = createStackNavigator(); 

/**
 * The main component of the application.
 * 
 * @returns {JSX.Element} The rendered application component.
 */


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //false is only applied to isLoggedIn
  const [user, setUser] = useState({}); // User is an empty object

  /**
   * Checks if the user is logged in by making a request to the backend.
   * If the user is signed in, it sets the isLoggedIn state to true.
   * @returns {Promise<void>} A promise that resolves when the check is complete.
   */
  const checkLogin = async () => {
    try {
      // this is how we make requests to the backend and it passes back information related to the user
      //await pauses the execution of the function until the promise is resolved
      const response = await fetch(`${apiUrl}/isSignedIn`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if(!response.ok){
        throw new Error('Network response was not ok');
      }else{
          const data = await response.json();
          console.log(data);
          if (data.message === 'User is signed in') {
            setIsLoggedIn(true);
          }
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
    //Stack.Navigator is a container for the different screens\
    //Stack.Screen represents a screen in the app
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
