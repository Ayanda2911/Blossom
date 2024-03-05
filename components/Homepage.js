import React from "react";
import { View, Text, Button } from "react-native";

export default function Homepage({ navigation }) {
    return (
        <View>
            <Text>Homepage</Text>
            <Button
                title="Active Recording"
                onPress={() => navigation.navigate("Active Recording")}
            />
            <Button
                title="Emergency Contacts"
                onPress={() => navigation.navigate("EmergencyContacts")}
            />
        </View>
    );
}