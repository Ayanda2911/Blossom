import React, { useState } from 'react';
import { CheckBox } from 'react-native-btr';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Ionicons } from 'react-native-vector-icons';
import { apiUrl } from '../apiConfig';
import { color } from 'react-native-elements/dist/helpers';




/**
 * Renders a registration form and handles the registration process.
 *
 * @param {object} navigation - The navigation object used for navigating between screens.
 * @returns {JSX.Element} The rendered registration form.
 */
export default function Registration({ navigation }) {
    const [phoneNum, setPhoneNum] = useState('');
    //const [username, setusername] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async () => {
        console.log('phoneNum:', phoneNum);
        try {
                const registerResponse = await fetch(`${apiUrl}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                         phoneNum,
                    }),
                });
                if (registerResponse.ok) {
                    setError('');
                    setIsSignedIn(true);
                    if (rememberMe) {
                        localStorage.setItem('phoneNum', phoneNum);
                    }
                    navigation.navigate("AddEmergency");
                } else {
                    throw new Error('Failed to register user');
                }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred');
        }
};//end of handleRegister

    return (

        <View style={styles.container}>
        
            <Text style={styles.title}>Welcome to Blossom</Text>

            <View style={styles.countContainer}>
                <Text style={styles.count}> Set up 1 of 2</Text>
            </View>


            <Text style={styles.subtitle}>Please enter your phone number below,this will
            act as your Login Id. Thank you for joining us on this journey.</Text>

   

            <Text style={styles.phoneNumber}>
                Phone Number
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter phone number without dashes or spaces"
                    value={phoneNum}
                    onChangeText={setPhoneNum}
                />
            </View>

            

                <TouchableOpacity style={styles.nextButton} onPress={() => {navigation.navigate("AddEmergency")}} >
                    <Text style={{fontSize : 18, fontWeight: 'bold'}}>Next →</Text>
                </TouchableOpacity>

           


        </View>


      
    );//end of return


}//end of Registration






const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start', //aligns its content at the top of the container
        alignItems: 'center', //horizontally center the content within the container
        flex: "1", 
        fontFamily: 'Arial',
        paddingVertical: 20, 
        paddingHorizontal: 20,
    }, 
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        paddingVertical : 40,
        fontFamily: 'Arial',
        color: '#FB6813',
        fontWeight: 'bold'
    },
    subtitle: {
        paddingVertical : 20,
        alignSelf: 'center',
        center: 20,
        fontSize: 18,
    },
    countContainer: {
        position: 'right',
        right: -140,
    },
    count: {
        color: '#8e8e8e',
    },
    phoneNumber: {
        fontSize: 18,
        paddingVertical: 20,
        alignSelf: 'left',    
        left: 6,
    },
    input: {
        alignSelf: 'left',
        left: -20,
        height: 40,
        borderColor: '#FB6813',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        width: '90%',
        borderRadius: 15,
        fontFamily: 'Arial',
    },
    nextButton: {
        backgroundColor: 'transparent',
        borderColor: '#FB6813',
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical : 10, 
        paddingHorizontal: 20,
    },

});//end of styles