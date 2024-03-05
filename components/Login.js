import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Login( {navigation} ){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
            try {
                console.log('username:', username, 'password:', password)
                const response = await fetch('https://tough-rooms-enter.loca.lt/api/login', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    
                    // the content type is{
                    body: JSON.stringify({ phoneNum: username, password : password }),
                });

                if (!response.ok) {
                    throw new Error('Login request failed');
                }else{
                    const data = await response.json();
                    if (data.success) {
                        // Login successful
                        navigation.navigate("Home");
                    } else {
                        // Login failed
                        alert('Invalid username or password');
                    }
                }
                
            } catch (error) {
            console.error('Login Error:', error);
            alert('An error occurred during login');
            }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

