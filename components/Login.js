import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default function Login({ navigation }) {
    const [phoneNum, setPhonenumber] = useState('');
    const [stayLoggedIn, setStayLoggedIn] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({phoneNum}),
            });

            if (!response.ok) {
                throw new Error('Login request failed');
            } else {
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
            <Text style={styles.title}>Welcome User</Text>
            <Text 
                style={{
                    paddingVertical: 20, 
                    alignSelf : 'left', 
                    left : 20, 
                    fontSize: 18}}>
                     Login Id 
            </Text>
            
            <TextInput
                style={styles.input}
                placeholder="1234567890"
                value={phoneNum}
                onChangeText={setPhonenumber}
            />
            <View style={styles.stayLoggedIn}>
                <View><Text style={{ fontSize: 18 }}>Stay Logged In ? </Text></View>
                <View style={styles.checkboxContainer}>
                    <View style={styles.boxAndText}>
                        <CheckBox
                            style={styles.checkbox}
                            checkedIcon='check'
                            uncheckedIcon='square-o'
                            uncheckedColor='#FB6813'
                            checked={stayLoggedIn}
                            checkedColor='#FB6813'
                            onPress={() => setStayLoggedIn(true)}
                        /> 
                        <View>
                            <Text style={styles.checkboxLabel}>Yes</Text>
                        </View>
                    </View>
                    
                    <View style={styles.boxAndText}>
                    <CheckBox
                            style={styles.checkbox}
                            checkedIcon='check'
                            uncheckedIcon='square-o'
                            uncheckedColor='#FB6813'
                            checked={!stayLoggedIn}
                            checkedColor='#FB6813'
                            onPress={() => setStayLoggedIn(false)}
                        /> 
                        <View>
                        <Text style={styles.checkboxLabel}>No</Text>
                        </View>
                        
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.loginButton} title="Login" onPress={() => {navigation.navigate("FakeHomePage")}} >
                <Text style={{fontSize : 18}}>Sign In </Text>
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20, 
        paddingHorizontal: 20,
        fontFamily: 'Arial',
    },
    title: {
        fontSize: 24,
        paddingVertical : 40, 
        fontFamily: 'Arial',
        color: '#FB6813',
        fontWeight: 'bold'
    },
    input: {
        width: '90%',
        height: 40,
        borderColor: '#FB6813',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 15,
        fontFamily: 'Arial',
    },
    loginButton: {
        backgroundColor: '#FB6813',
        borderRadius: 8,
        width: '90%',
        alignItems: 'center',
        borderRadius: 15,
        paddingVertical : 10, 
        fontFamily: 'Arial',
        fontWeight: 'bold',
    },
    stayLoggedIn: {
        flexDirection: 'row',
        width: '95%',
        marginBottom: 16,
        fontSize: 14,
        fontFamily: 'Arial',
    },
    checkboxContainer: {
        flexDirection: 'row', 
        justifyContent : 'center',
        alignItems : 'center',
    },
    boxAndText: {
        flexDirection: 'row',
        alignItems: 'center',
        fontFamily: 'Arial',
    },
    checkbox: {
        alignSelf: 'center',
        backgroundColor: 'white',
        border : 1, 
        borderColor : '#FB6813'
    },

});

