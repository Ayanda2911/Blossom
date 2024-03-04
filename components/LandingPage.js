import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function LandingPage({navigation}) {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>SafeSound</Text>
        <Button
            title="Login"
            onPress={() => navigation.navigate("Login")}
        />
        <Button
            title="Sign Up"
            onPress={() => navigation.navigate("Signup")}
        />
        </View>
    );
    
}
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
});
