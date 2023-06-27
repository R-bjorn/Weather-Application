import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import Icon from "@expo/vector-icons/FontAwesome";
import { ScrollView } from 'react-native-gesture-handler';

const Sidebar = (props) => {

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
                    <Text style={styles.profileName}>tejedawx</Text>
                </ImageBackground>

                <View style={styles.container}>
                    <DrawerItemList {...props}/>               
                </View>
            </DrawerContentScrollView>
            <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
                <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
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
        fontSize: 30,
        color: "#fff",
        fontWeight: "800",
        marginVertical: 8
    }
});

export default Sidebar;