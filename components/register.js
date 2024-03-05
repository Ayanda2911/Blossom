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
    const [password, setPassword] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');


    const handleRegister = async () => {
        const response = await fetch(`${apiUrl}}/user/${phoneNum}`);
        const user = await response.json();
        if (user) {
            setError('User already exists');
        } else {
            const response = await fetch(`${apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNum,
                    password,
                }),
            });
            if (response.status === 201) {
                setError('');
                setIsSignedIn(true);
                if (rememberMe) {
                    localStorage.setItem('phoneNum', phoneNum);
                    localStorage.setItem('password', password);
                }
            } else {
                setError('Failed to register');
            }
        }
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style={styles.arrowContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Contacts')}>
                    <Ionicons name='arrow-forward-outline' style={styles.arrowImage} 
                        size={30}/>
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
                <View>
                    <Text>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={phoneNum}
                        onChangeText={setPhoneNum}
                    />
                </View>
                <View>
                    <Text>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Preferred Username"
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <View >
                    <Text>Password</Text>
                    <TextInput
                        title="Password"
                        style={styles.input}
                        placeholder="Re-enter phone number"
                        value={password}
                        onChangeText={setPassword}
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
                onPress={handleRegister}
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