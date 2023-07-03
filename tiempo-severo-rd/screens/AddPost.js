import { 
    View, Text, StyleSheet, 
    SafeAreaView, TextInput,
    Image, TouchableOpacity, ScrollView
} from 'react-native'
import React, {useState} from 'react'
import Icon from "@expo/vector-icons/FontAwesome"
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const AddPost = () => {
    const [desc, setDesc] = useState('')
    const [selectedImage, setSelectedImage] = useState('')
    

    const selectImage = () => {
        let options = {
            storageOptions: {
                path: 'image',
            },
        };

        launchImageLibrary(options, response => {
            setSelectedImage(response.assets[0].uri)
            console.log(response); 
        });
    }

    return (
    <>
        <SafeAreaView style={{flex: 0, backgroundColor: '#4967a4'}}></SafeAreaView>
        {/* Container */}
        <View style={styles.container}>
            {/* Title */}
            <View style={styles.title}>
                <Icon name="chevron-left" size={30}/>
                <Text style={styles.header}>Add a post</Text>            
            </View>

            {/* Collection of data */}
            <View 
                style={styles.inputContainer}
            >
                <TextInput
                    multiline={true}
                    numberOfLines={5}
                    returnKeyType="done"
                    style={styles.inputDescription}
                    onChangeText={(value) => {setDesc(value)}}
                    // value={''}
                    placeholder="What's on your mind..."
                    blurOnSubmit={true}
                    keyboardType="default"
                />
                <TouchableOpacity 
                    style={styles.imagePicker}
                    onPress={() => {selectImage()}}
                >
                    <Image 
                        source={(selectedImage) ? {uri: selectedImage} : require("../images/unknownImage.png")}
                        style={{width: '100%', height: 350}}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.postBtnContainer}>
                <TouchableOpacity style={styles.postBtn}>
                    <Text style={styles.postBtnText}>Upload</Text>
                </TouchableOpacity>
            </View>
        </View>
    </>
    )
}

export default AddPost

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4967a4', 
        height: "100%", 
        borderBottomRightRadius: 15, 
        borderBottomLeftRadius: 15, 
        // padding 
        // justifyContent: 'center', 
        // alignItems: 'center'
      },
      header: {
        fontSize: 35, 
        fontWeight: 600, 
        color: '#fff', 
        marginRight: 100    

      },
      title : {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20
      },
      inputContainer : {
        paddingHorizontal: 15,
        marginTop: 40
      },
      inputDescription: {
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingBottom: 40,
        paddingHorizontal: 10,
        marginVertical: 15,
        maxHeight: 150
      },
      imagePicker: {
        backgroundColor: '#fff'
      },
      postBtnContainer : {
        alignSelf: 'center',
      },
      postBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 30,
        width: 300,  
        height: 80,      
        borderRadius: 50,
        shadowColor: 'black', 
        shadowOffset: { height: 10, width: 5}, 
        shadowOpacity: 0.5, 
        shadowRadius: 3,
      },
      postBtnText: {
        color: "#4967a4",
        fontSize: 35,
        fontWeight: 700
      }
})