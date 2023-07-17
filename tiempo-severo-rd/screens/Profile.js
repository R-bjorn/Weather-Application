import React, { useEffect, useState } from 'react';
import { 
    ImageBackground, 
    Image, StyleSheet, 
    Text, View, 
    SafeAreaView, 
    TouchableOpacity, 
    TextInput,
    StatusBar,
    Platform,
    Dimensions
} from 'react-native';
import { firebase } from "../config";
import { useAuth } from "../hooks/useAuth";
import { ScrollView } from 'react-native-gesture-handler';
import Icon from "@expo/vector-icons/FontAwesome";
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from '../config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, updateDoc, doc, getDoc   } from 'firebase/firestore';

const Profile = ({navigation}) => {
    const { user } = useAuth();
    const username = (user?.displayName === '') ? 'user' : user?.displayName;
    const uid = user?.uid;
    const [userImage, setUserImage] = useState('');
    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const userDoc = collection(db, 'users');
                if(uid){
                    // console.log("UID of current user", uid);
                    const currentUserRef = doc(userDoc, uid);

                    const userSnapshot = await getDoc(currentUserRef);
                    const userData = userSnapshot.data();
            
                    setUserImage(userData.profileImage);
                }
            } catch (error) {
                // Handle the error appropriately
                console.log("Error - User Image :" , error)
            }
        };

        fetchProfileImage();
    }, [uid]);
    

    const countries = [
        { label: 'Puerto Rico', value: '1' },
        { label: 'Dominican Republican', value: '2' },
    ];

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [profileImage, setProfileImage] = useState('')
    const [selectedImage, setSelectedImage] = useState('');
    
    // Upload image on firebase storage
    const uploadImage = async () => {
        // Convert image into blob image
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
        const storageRef = ref(storage, 'Profile Pictures/' + user?.uid);
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
                // console.log("Upload image successfull")
                setProfileImage(downloadURL)
                updateProfileImage();
            });
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
        }
    }

    const updateProfileImage = async () => {
        // console.log("Update Profile Image");
        if(profileImage){
            try {
                const usersCollectionRef = collection(db, 'users');
                const uid = user?.uid;
                // console.log("UID of current user", uid);
                const currentUserRef = doc(usersCollectionRef, uid);

                await updateDoc(currentUserRef, {
                    profileImage: profileImage,
                });
                alert('Successfully updated profile!');
            } catch (error) {
                alert('Error : ' , error);
            }   
        }
    }

    return(
        <View style={[styles.container]}> 
            <StatusBar 
            backgroundColor={(Platform.OS === 'ios') ? "#fff" : "#f1f1f1"}
            barStyle={'dark-content'}
            hidden={false} />
            {/* Profile Image and Background */}
            <View style={{height: (Platform.OS === 'ios') ? 300 : 310}}>
                {/* Profile Background Image */}
                <ImageBackground
                    source={require("../images/profileBackground.jpg")}
                    style={styles.profileBackground}
                >
                    {/* Back button '<' */}
                    <TouchableOpacity 
                        onPress={() => {navigation.toggleDrawer()}}
                    >
                        <Icon name='bars' size={20} style={{right: (Platform.OS === 'ios') ? 170 : 180, top: (Platform.OS === 'ios') ? 70 : 30}}/>
                    </TouchableOpacity>
                    {/* Background Image '+' icon */}
                    {/* <TouchableOpacity 
                        // TODO : Add function to change the background image for user profile
                        onPress={() => {}}
                    >
                        <Icon name='plus-circle' size={30} style={{left: (Platform.OS === 'ios') ? 170 : 180, top: 155}}/>
                    </TouchableOpacity> */}

                    {/* Profile Image */}
                    <View style={{top: 110}}>
                        {/* Profile Image '+' icon */}
                        <TouchableOpacity
                            onPress={() => {selectImage()}}
                        >
                            <Image
                                source={
                                     userImage ? {uri: userImage} : (selectedImage) ? {uri: selectedImage} : require("../images/profile.jpg")
                                }
                                style={styles.profile}
                            />
                            <Icon name='plus-circle' size={30} style={{left: 90, bottom: 33}}/>
                        </TouchableOpacity>
                        <Text style={styles.username}>{username}</Text>
                    </View>
                </ImageBackground>
            </View>

            {/* User data and Input Fields */}
            <View>
                <ScrollView>
                    {/* Username */}
                    <View style={styles.inputContainer}>
                        <Icon name='user-o' style={styles.label}/>
                        <TextInput
                            style={styles.input}
                            onChangeText={() => {}}
                            value={username}
                            placeholder="username"
                            keyboardType="default"
                        />
                    </View>
                    {/* Email */}
                    <View style={styles.inputContainer}>
                        <Icon name='envelope-o' style={styles.label}/>
                        <TextInput
                            style={styles.input}
                            onChangeText={() => {}}
                            value={user?.email}
                            placeholder="email"
                            keyboardType="email-address"
                        />
                    </View>
                    {/* Phone Number */}
                    <View style={styles.inputContainer}>
                        <Icon name='phone' style={styles.label}/>
                        <TextInput
                            style={styles.input}
                            onChangeText={() => {}}
                            value={user?.phoneNumber}
                            placeholder="phone number"
                            keyboardType="number-pad"
                        />
                    </View>
                    {/* Country Selected */}
                    <View style={styles.inputContainer}>
                        <Icon name='globe' style={styles.label}/>
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
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                            }}
                            />
                    </View>
                    {/* Update Button */}
                    <View style={{flex: 1, alignSelf:'center'}}>
                        <TouchableOpacity
                            // TODO: Add all the information to firebase firestore collection of user data
                            onPress={() => {uploadImage()}}
                            style={styles.updateBtn}
                        >
                            <Text style={{fontSize: (Platform.OS === 'ios') ? 30 : 22, color: '#fff', fontWeight: 600}}>Update</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#ccc'
    },
    profileBackground: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profile: {
        height: 120,
        width: 120,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#000'
    },
    username: {
        marginTop: -20,
        fontSize: (Platform.OS === 'ios') ? 40 : 30,
        textAlign: 'center',
        fontWeight: 600,
        textTransform: 'uppercase'
    },
    inputContainer: {
        flex: 1,
        paddingHorizontal: 20, 
        paddingVertical: (Platform.OS === 'ios') ? 5 : 1,
        flexDirection: "row", 
        justifyContent: 'space-between'
    },  
    label : {
        fontSize: 25,
        alignSelf: 'center',
    },
    input: {
        height: "100%",
        width: windowWidth - 75,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
        fontSize: 20
    },
    dropdown: {
        width: windowWidth - 75,
        height: 50,
        borderColor: 'gray',
        borderBottomWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
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
    updateBtn: {
        marginVertical: 30,
        backgroundColor: '#695df6',
        paddingVertical: 10,
        width: windowWidth - 75,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000'
    }
});


export default Profile