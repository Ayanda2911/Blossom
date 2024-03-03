import React, { useState } from 'react';
import { CheckBox } from 'react-native-btr';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Ionicons } from 'react-native-vector-icons';
import EmergencyContacts from './EmergencyContacts';


export default function Registration({ navigation }) {
    const [phoneNum, setPhoneNum] = useState('');
    const [password, setPassword] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async () => {
        const response = await fetch(`http://localhost:3000/user/${phoneNum}`);
        const user = await response.json();
        if (user) {
            setError('User already exists');
        } else {
            const response = await fetch('http://localhost:3000/user', {
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
                <TouchableOpacity onPress={() => navigation.navigate('EmergencyContacts')}>
                    <Ionicons name='arrow-forward-outline' style={styles.arrowImage} 
                        size={30}/>
                </TouchableOpacity>
            </View>
            
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNum}
                onChangeText={setPhoneNum}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
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

    }, 
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
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