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
            <Text style={styles.subtitle}>Complete the setup process by providing the information
                requested below. Thank you for joining us on this journey.</Text>

            <View style={styles.countContainer}>
                <Text style={styles.count}> Set up 1 of 2</Text>
            </View>

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

            <View style={styles.nextButtonContainer}>

                <TouchableOpacity style={styles.nextButton} onPress={() => {navigation.navigate("AddEmergency")}} >
                    <Text style={{fontSize : 18}}>Next</Text>
                </TouchableOpacity>

            </View>


        </View>


      
    );//end of return


}//end of Registration






const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: "1", 
        backgroundColor: '#fff',
        alignItems: 'center',
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
        fontFamily: 'Nunito-regular',
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
        fontFamily: 'Nunito-regular',
    },
    nextButtonContainer: {
        position: 'absolute',
        bottom: 50,
        width: '33%',
        alignItems: 'center',
        paddingVertical: 10,
        borderColor: '#8e8e8e',
        borderRadius: 8,
        borderWidth: 1,
    },
    nextButton: {
        alignItems: 'center',
        width: '40%',
        fontFamily: 'Nunito-regular',
        fontWeight: 'bold',
    },

});//end of styles