import React, { useState } from 'react';
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

const Profile = ({navigation}) => {
    const { user } = useAuth();
    const username = (user?.displayName === '') ? 'user' : user?.displayName;
    const countries = [
        { label: 'Puerto Rico', value: '1' },
        { label: 'Dominican Republican', value: '2' },
    ];

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

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
                        <Icon name='bars' size={20} style={{right: (Platform.OS === 'ios') ? 170 : 180, top: (Platform.OS === 'ios') ? 70 : 50}}/>
                    </TouchableOpacity>
                    {/* Background Image '+' icon */}
                    <TouchableOpacity 
                        // TODO : Add function to change the background image for user profile
                        onPress={() => {}}
                    >
                        <Icon name='plus-circle' size={30} style={{left: (Platform.OS === 'ios') ? 170 : 180, top: 155}}/>
                    </TouchableOpacity>

                    {/* Profile Image */}
                    <View style={{top: 100}}>
                        {/* Profile Image '+' icon */}
                        <TouchableOpacity
                            // TODO : Add function to select photo from galery and add it on user storage firebase
                            onPress={() => {}}
                        >
                            <Image
                                source={require("../images/profile.jpg")}
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
                            onPress={() => {}}
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