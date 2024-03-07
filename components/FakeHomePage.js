import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from "react-native";
import { Card} from 'react-native-elements';

//importing the fake homepage content
const data = require('../public/fakeHomepageContent.json');
const image0 = require('../assets/flower1.jpg');
const image1 = require('../assets/flower2.jpg');
const image2 = require('../assets/flower3.jpg');
const image3 = require('../assets/flower4.jpg');
const image4 = require('../assets/flower5.jpg');


export default function FakeHomePage() {
    const [images, setImages] = useState([]); // [image1, image2, image3, ...

    const DynamicImage = ({ imageName }) => {
        let imageSource;
        switch (imageName) {
            case 'image0':
                imageSource = image0;
                break;
            case 'image1':
                imageSource = image1;
                break;
            case 'image2':
                imageSource = image2;
                break;
            case 'image3':
                imageSource = image3;
                break;
            case 'image4':
                imageSource = image4;
                break;
            // Add more cases for each possible image
            default:
                imageSource = require('../assets/splash.png');
        }
        return <Card.Image source={imageSource} style={{width : 100, height : 100}} />;};
    

    const loadImages = async () => { 
        try {
            setImages(data.flowers);
            console.log('Images loaded:', images[0].imgSource);
        } catch (error) {
            console.error('Error loading images:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await loadImages();   
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}> Blossom </Text>
            <ScrollView style={styles.textContainer}>
                {images.map((image, index) => (
                    <TouchableOpacity key={index}>
                        <Card containerStyle={styles.cards}>
                        <Card.Title style={{alignSelf: 'left'}}>{image.title}</Card.Title>
                          {DynamicImage({imageName : `image${index}`})}
                            <Text>{image.info}</Text>
                        </Card>
                    </TouchableOpacity>   
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
        color: '#FB6813',
        alignSelf : 'left',
        marginLeft: 10,
        marginTop: 10, 
        fontWeight: 'bold',
    },
    cards: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#BFBFBF',
        alignItems: 'center',
    },
    textContainer: {
        margin: 10,
    },

});
