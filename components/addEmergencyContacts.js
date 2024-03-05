import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function AddEmergencyContacts({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Emergency Contacts</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EmergencyContacts')}>
                <Text style={styles.buttonText}>Open Phonebook</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#008080',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});