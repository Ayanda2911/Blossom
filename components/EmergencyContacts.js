import React, { useState, useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SearchBar } from 'react-native-elements';
import { Ionicons } from 'react-native-vector-icons';
import * as Contacts from 'expo-contacts';
import debounce from 'lodash.debounce';

export default function EmergencyContacts({ navigation }) {
    const [emergencyContacts, setEmergencyContacts] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [selectLimit, setSelectLimit] = useState(5);
    
    const selectContacts = emergencyContacts.length;

    const handleDone = () => {
        navigation.navigate('TutorialPage');
        // Save emergency contacts to local backend 

    };

    const isSelect = (contact) => {
        return emergencyContacts.some(c => c.id === contact.id);
    };

    const handleSelect = (contact) => {
        if (selectContacts >= selectLimit && !isSelect(contact)) {
            return;
        }
        if (isSelect(contact)) {
            setEmergencyContacts(prevContacts => prevContacts.filter(c => c.id !== contact.id));
        } else {
            setEmergencyContacts(prevContacts => [...prevContacts, contact]);
        }
    };

    let listToDisplay = contacts;
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                    <Text style={styles.doneButtonText}>{selectContacts > 0 ? 'Done' : 'Cancel'}</Text>
                </TouchableOpacity>
            )
        });
        const fetchContacts = async () => {
            try {
                const { status } = await Contacts.requestPermissionsAsync();
                if (status === 'granted') {
                    const { data } = await Contacts.getContactsAsync({
                        fields: [Contacts.Fields.PhoneNumbers],
                    });
                    setContacts(data.sort((a, b) => a.name.localeCompare(b.name)));
                } else {
                    setError('Permission to access contacts denied');
                }
            } catch (error) {
                setError('Error fetching contacts');
            }
        };
        fetchContacts();
    }, [selectContacts]);
    
    const renderContacts = () => {
        return listToDisplay.map((contact, index) => (
            <TouchableOpacity 
                key={index} 
                style={styles.contactContainer} 
                onPress={() => handleSelect(contact)}
            >
                <Text style={styles.contactName}>
                    {contact.name} {isSelect(contact) && <Ionicons name="checkmark-outline" style={styles.icon} />}
                </Text>
            </TouchableOpacity>
        ));
    }
    
    if (search !== '') {
        listToDisplay = listToDisplay.filter((contact) => {
            return contact.name.toLowerCase().includes(search.toLowerCase());
        });
    }
    const debouncedSearch = useMemo(() => {
        return debounce(setSearch, 30);
    }, []);

    return (
        <View style={styles.container}>
            <SearchBar 
                placeholder="Search"
                onChangeText={debouncedSearch}
                value={search}
                lightTheme={true}
                round={true}
                containerStyle={styles.searchBar}
                inputContainerStyle={{backgroundColor: 'white'}}
                onClear ={() => setSearch('')}
            />
            <ScrollView style={styles.scrollView}>
                {renderContacts()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start', // Align contacts left
        width: '100%',
    },
    scrollView: {
        width: '100%',
    },
    contactContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%', // Stretch the bottom border to full width
    },
    contactName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        alignContent: 'space-between'
    },
    searchBar: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: "white"
    },
    icon: {
        fontSize: 20,
        color: 'green',
        position: 'absolute',
        right: 10,
    }, 
    doneButton: {
        marginRight: 10,
        fontSize: 20, 
    },
});
