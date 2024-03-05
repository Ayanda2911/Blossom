import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet,  } from 'react-native';
import { createStackNavigator , rootStack} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// List of the different screens
import ActiveRecording from './components/recording';
import Signup from './components/register';
import HomePage from './components/Homepage';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import AddEmergencyContacts from './components/addEmergencyContacts';
import EmergencyContacts from './components/EmergencyContacts';

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
          if (data.message === 'User is signed in') {
            setIsLoggedIn(true);
          }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
      fetch(`${apiUrl}/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        setIsLoggedIn(false); // Always set isLoggedIn to false on logout
    })
    .catch((error) => {
        console.error('Logout Error:', error); // Log any errors to the console
    });
  };

  useEffect(() => {
    checkLogin();
  }, []); 

  
  return (
    //Stack.Navigator is a container for the different screens\
    //Stack.Screen represents a screen in the app

    <NavigationContainer>
      <Stack.Navigator> 
        {/* Hide the title at the top */}
        <Stack.Screen name="LandingPage" component={LandingPage} 
          options={{headerShown : false}}/>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Active Recording" component={ActiveRecording} />
        <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} />
        <Stack.Screen name="AddEmergency" component={AddEmergencyContacts} />
        {/* Add more screens as needed */}
         <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup}  />
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
