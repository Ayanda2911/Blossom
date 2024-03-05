import React, { useState } from 'react';
import { CheckBox } from 'react-native-btr';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Ionicons } from 'react-native-vector-icons';
import { apiUrl } from '../apiConfig';




/**
 * Renders a registration form and handles the registration process.
 *
 * @param {object} navigation - The navigation object used for navigating between screens.
 * @returns {JSX.Element} The rendered registration form.
 */
export default function Registration({ navigation }) {
    const [phoneNum, setPhoneNum] = useState('');
    const [username, setusername] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async () => {
        console.log('phoneNum:', phoneNum, 'username:', username);
        try {
                const registerResponse = await fetch(`${apiUrl}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                         phoneNum,
                         username,
                    }),
                });
                if (registerResponse.ok) {
                    setError('');
                    setIsSignedIn(true);
                    if (rememberMe) {
                        localStorage.setItem('phoneNum', phoneNum);
                        localStorage.setItem('username', username);
                    }
                    navigation.navigate("AddEmergency");
                } else {
                    throw new Error('Failed to register user');
                }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred');
        }
};

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style={styles.arrowContainer}>
                <Text> Set up 1 of 3</Text>
            </View>
            <View style={styles.textContainer}>
                <View>
                    <Text>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your phone number without any dashes or spaces"
                        value={phoneNum}
                        onChangeText={setPhoneNum}
                    />
                </View>
                <View>
                    <Text>User Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter a username "
                        value={username}
                        onChangeText={setusername}
                    />
                </View>
            </View>
            <CheckBox
                title="Remember me"
                style={styles.checkbox}
                value={rememberMe}
                onValueChange={setRememberMe}
            />
            <Button
                title="Register"
                // whenevr you use a function in a button, you need to use an arrow function
                // otherwise the function will be called immediately
                // and the button will not work as expected
                //ie use () => handleRegister() instead of handleRegister()
                onPress={() =>{navigation.navigate("AddEmergency")}}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: "1", 
        backgroundColor: '#fff',
        alignItems: 'center',
        fontFamily: 'Arial',

    }, 
    textContainer: {
        width: '80%',
        fontSize: 30,

    },
    input: {
        alignSelf: 'flex-start',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 40,
        marginTop: 10,
        paddingHorizontal: 10,
        width: '100%',
    },
    checkbox: {
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
    arrowContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});