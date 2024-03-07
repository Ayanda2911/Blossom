import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function AddEmergencyContacts({ navigation }) {

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Add Emergency Contacts</Text>

            <View style={styles.countContainer}>
                <Text style={styles.count}> Set up 2 of 2</Text>
            </View>

            <Text style={styles.subtitle}>Complete the setup process by adding important contacts. The
            selected contacts will receive text alerts when you are in danger.
            </Text>


            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EmergencyContacts')}>
                <Text style={styles.buttonText}>Open Phonebook</Text>
            </TouchableOpacity>
            


        </View>//end of container
    );
}//end of AddEmergencyContacts







const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', //aligns its content at the top of the container
        alignItems: 'center',
        paddingVertical: 20, 
        //paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        paddingVertical : 40, 
        fontFamily: 'Arial',
        color: '#FB6813',
        fontWeight: 'bold',
        paddingBottom: 30,
    },
    countContainer: {
        position: 'right',
        right: -140,
    },
    count: {
        color: '#8e8e8e',
    },
    subtitle: {
        paddingVertical : 20,
        alignSelf: 'center',
        center: 20,
        fontSize: 18,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 50,
    },
    button: {
        backgroundColor: 'transparent',
        borderColor: '#FB6813',
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical : 10, 
        paddingHorizontal: 20,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
});