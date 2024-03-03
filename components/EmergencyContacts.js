import React from "react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from 'react-native-vector-icons';

export default function EmergencyContacts({ navigation}) {
    const [EmergencyContacts, setEmergencyContacts] = useState([]);
    const [error, setError] = useState('');
    return (
        <View style={styles.container}>
            <Text>Emergency Contacts</Text>
        </View>
    );
    
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    }
});