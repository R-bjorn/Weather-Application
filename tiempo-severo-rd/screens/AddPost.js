import { 
    View, Text, StyleSheet, 
    SafeAreaView, TextInput,
    Image, TouchableOpacity, ScrollView, Dimensions, Platform
} from 'react-native'
import React, {useState, useEffect} from 'react'
import Icon from "@expo/vector-icons/FontAwesome"
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from '../config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { Dropdown } from 'react-native-element-dropdown';

const AddPost = ({ navigation}) => {
    navigation = useNavigation();

    const [mapDesc, setDesc] = useState(null)
    const [mapImage, setMapImage] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [countryValue, setCountryValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const countries = [
        { label: 'Puerto Rico', value: '1' },
        { label: 'Dominican Republican', value: '2' },
    ];
    
    // Upload image on firebase storage
    const uploadImage = async () => {
        // Convert image into blob image
        // const blobImage = null;
        const blobImage = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open("GET", selectedImage, true);
            xhr.send(null);
        });

        // Set metadata of image
        // Create the file metadata
        /** @type {any} */
        const metadata = {
            contentType: 'image/jpeg'
        };

        // Upload Image on storage
        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, 'Maps/' + Date.now());
        const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

        // // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                // console.log('Upload is paused');
                break;
            case 'running':
                // console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
            case 'storage/canceled':
                // User canceled the upload
                break;

            // ...

            case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // console.log('File available at', downloadURL);
                setMapImage(downloadURL);
            });
            alert('Successfully uploaded image');   
        }
        );
    }

    // Select image from library
    const selectImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            // uploadImage();
        }
    }

    // Uploading map post on firestore
    const uploadPost = async () => {
        // console.log("Desc : " + mapDesc);
        // console.log("Image : " + mapImage);
        if(mapImage && mapDesc && countryValue){
            try {
                const docRef = await addDoc(collection(db, 'maps'), {
                    Description: mapDesc,
                    MapImage: mapImage,
                    MapCountry: countries[countryValue - 1].label
                });
                alert("Successfully uploaded post")
                navigation.goBack();
            } catch (error) {
                // console.log('Error uploading post:', error);
                alert('Error : ' , error);
            }
        }
    }

    return (
    <>
        <SafeAreaView style={{flex: 0, backgroundColor: '#4967a4'}}></SafeAreaView>
        {/* Container */}
        <View style={styles.container}>
            {/* Title */}
            <View style={styles.title}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Icon name="chevron-left" size={30} style={{ top:  (Platform.OS === 'android') ? 12 : 0}}/>
                </TouchableOpacity>
                <Text style={styles.header}>Add a post</Text>            
            </View>

            <ScrollView>
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
                    <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={countries}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Select country' : '...'}
                                searchPlaceholder="Search..."
                                value={countryValue}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setCountryValue(item.value);
                                    setIsFocus(false);
                                }}
                    />
                </View>

                {/* Upload Btn */}
                <View style={styles.postBtnContainer}>
                    <TouchableOpacity style={styles.postImageBtn} onPress={() => {uploadImage()}}>
                        <Text style={styles.postImageBtnText}>Upload image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postBtn} onPress={() => {uploadPost()}}>
                        <Text style={styles.postBtnText}>Post</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    </>
    )
}

export default AddPost

const windowWidth = Dimensions.get('window').width;
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
        paddingHorizontal: (Platform.OS === 'ios') ? 15 : 12,
        marginTop: (Platform.OS === 'ios') ? 40 : 10
      },
      inputDescription: {
        backgroundColor: '#fff',
        paddingTop: (Platform.OS === 'ios') ? 15 : 0,
        paddingBottom: 40,
        paddingHorizontal: 10,
        marginVertical: 15,
        maxHeight: (Platform.OS === 'ios') ? 150 : 120
      },
      imagePicker: {
        backgroundColor: '#fff'
      },
      postBtnContainer : {
        alignSelf: 'center',
      },
      postImageBtn: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e62',
        marginTop: 5,
        width: (Platform.OS === 'ios') ? 100 : 200,  
        height: 30,      
        borderRadius: 50,
        shadowColor: 'black', 
        shadowOffset: { height: 10, width: 5}, 
        shadowOpacity: 0.5, 
        shadowRadius: 3,
      },
      postBtn: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: (Platform.OS === 'ios') ? 30 : 10,
        width: 300,  
        height: 60,      
        borderRadius: 50,
        shadowColor: 'black', 
        shadowOffset: { height: 10, width: 5}, 
        shadowOpacity: 0.5, 
        shadowRadius: 3,
      },
      postImageBtnText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: 700
      },
      postBtnText: {
        color: "#4967a4",
        fontSize: 35,
        fontWeight: 700
      },
      dropdown: {
        backgroundColor: "#fff",
        width: "100%",
        height: 50,
        borderColor: 'gray',
        borderBottomWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginVertical: 10
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})