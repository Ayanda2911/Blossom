import React from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import * as Font from 'expo-font';

const backgroundImage = require("../assets/landingBackground.png");

//Loads the custom font
const fetchFonts = () => {
    return Font.loadAsync({
        'Nunito-regular': require('../assets/Nunito/Nunito-Regular.ttf'),
    });
};

const fetchFonts2 = () => {
    return Font.loadAsync({
        'Nunito-regular': require('../assets/Nunito/Nunito-LightItalic.ttf'),
    });
};

//Landing page component
export default function LandingPage({navigation}) {
    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
                
                <Text style={styles.title}>Welcome to Blossom</Text>
                <Text style={styles.subtitle}>Your companion guide to flowers.</Text>

                <View style={styles.loginButtonContainer}>
                    <Button
                        title="Login"
                        onPress={() => navigation.navigate("Login")}
                        color="#000000"
                    />
                </View>

                <View style={styles.signupButtonContainer}>
                    <Button
                        title="Sign Up"
                        onPress={() => navigation.navigate("Signup")}
                        color="#000000"
                    />
                </View>



            </ImageBackground>
        </View>
    );
}



//Styles the components. Pretty much the same as CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: "center", 
        color: "white",
        fontFamily: "Nunito-Regular",
        marginTop: 103,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    subtitle: {
        fontSize: 20,
        textAlign: "center",
        color: "white",
        fontFamily: "Nunito-LightItalic",
        marginBottom: 50,
    },
    loginButtonContainer: {
        backgroundColor: "#ffdfb0",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black",
        width: "50%",
        alignSelf: "center",
    },
    signupButtonContainer: {
        backgroundColor: "#ffdfb0",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black",
        width: "50%",
        alignSelf: "center",
        marginTop: 20,
    },
});

export {LandingPage}; //export the component so it can be used in other files
