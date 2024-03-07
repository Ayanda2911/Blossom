import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SetEmergencyContacts({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set Emergency Contacts</Text>
            <Text style={styles.subtitle}>
                You have successfully added your emergency contacts. You can now use the app to alert them when you are in danger.
            </Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        paddingVertical: 40,
        fontFamily: "Nunito-regular",
        color: "#FB6813",
        fontWeight: "bold",
        paddingBottom: 30,
    },
    subtitle: {
        fontSize: 18,
        paddingVertical: 20,
        fontFamily: "Nunito-regular",
        color: "#8e8e8e",
        textAlign: "center",
    },
    button: {
        backgroundColor: "#FB6813",
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
});