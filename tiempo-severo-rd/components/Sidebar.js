import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    ImageBackground,
    TouchableOpacity,
    Platform
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import Icon from "@expo/vector-icons/FontAwesome";
import { firebase } from "../config";
import { useAuth } from "../hooks/useAuth";

const Sidebar = (props) => {
    const { user } = useAuth();
    const username = (user?.displayName === '') ? 'user' : user?.displayName;
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <ImageBackground
                    source={require("../images/profileBackground.jpg")}
                    style={styles.imageBackground}
                >
                    <Image
                        source={require("../images/profile.jpg")}
                        style={styles.profile}
                    />
                    <Text style={styles.profileName}>{username}</Text>
                </ImageBackground>

                <View style={styles.container}>
                    <DrawerItemList {...props}/>               
                </View>
            </DrawerContentScrollView>
            <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
                <TouchableOpacity onPress={() => {
                    firebase.auth().signOut().then(function() {
                        // Sign-out successful.
                      }).catch(function(error) {
                        // An error happened.
                      })
                }} style={{paddingVertical: (Platform.OS === 'ios') ? 15 : 0}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name='sign-out' size={18}/>
                        <Text style={{fontSize: 18, paddingHorizontal: 10}}>Signout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    imageBackground: {
        width: undefined,
        padding: 15,
        paddingTop: 70,
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFF",
        // marginBottom: 5
    },
    profileName:{
        fontSize: (Platform.OS === 'ios') ? 30 : 25,
        color: "#fff",
        fontWeight: "800",
        marginVertical: 8
    }
});

export default Sidebar;