// Import react components
import { View, Text, Image, 
    StyleSheet, SafeAreaView, 
    ScrollView, TouchableOpacity, 
    ImageBackground, StatusBar,
    Dimensions
} from 'react-native'
import React, { useState} from 'react'

// Import other components
import Maps from '../components/Maps';
import { useAuth } from "../hooks/useAuth";
import { firebase } from "../config";
import Icon from "@expo/vector-icons/FontAwesome"

// Global Variables
var {Platform} = React;
const windowHeight = Dimensions.get('window').height;


// TODO : only admin can change the data

const Dashboard = ({ navigation} ) => {
    const { user } = useAuth();
    const [role, setRole] = useState('');

    // Get a reference to the 'users' collection
    const usersCollectionRef = firebase.firestore().collection('users');

    // Query the collection and retrieve the roles of each user
    usersCollectionRef
    .doc(user?.uid)
    .get()
    .then((doc) => {
        if (doc.exists) {
            // Access the fields of the document
            setRole(doc.data().role);
        } else {
            console.log('No such document!');
        }
    })
    .catch((error) => {
        console.log('Error getting users:', error);
    });

    
  return (
    <SafeAreaView style={{flex: 1}}>
        <StatusBar 
            backgroundColor={(Platform.OS === 'ios') ? "#fff" : "#f1f1f1"}
            barStyle={'dark-content'}
            hidden={false} />
        {/* User Information */}
        <View style={styles.userInfo}>
            {/* {firebase.auth().currentUser?.email} */}
            {/* Back button '<' */}
            <TouchableOpacity 
                onPress={() => {navigation.toggleDrawer()}}
            >
                <Icon name='bars' size={20} style={{marginHorizontal: 15, alignSelf: 'center', marginTop : 10,}}/>
            </TouchableOpacity>
            <View style={{flex:1, alignItems: 'center'}}>
                <Text style={styles.userName}>Puerto Rico</Text>
            </View>
            
        </View>

        {/* Admin content to upload posts and breaking news */}
        {(role === 0)
        ? <View style={styles.addPostContainer}>
            <TouchableOpacity style={styles.postButton}>
                <Icon name="plus" size={20}/>
                <Text style={{fontSize: 20, fontWeight: 600}}>Add post</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.postButton}>
                <Icon name="plus" size={20}/>
                <Text style={{fontSize: 20, fontWeight: 600}}>Add News</Text>
            </TouchableOpacity>
        </View>

        : null
        }

        { (role === 2 || role === 1 || role === 0) 
        ?
        // Content for Dominican Republican users
        <View style={{flex:1, }}>
                        
            {/* Latest News Content */}
            <View style={[styles.latestNews]}>
                <View style={[styles.latestNewsText]}>
                    <Text style={{textAlign: 'center',
                                fontWeight: 'bold',
                                fontVariant: 'small-caps',
                                fontSize: (Platform.OS === 'ios') ? 25 : 20
                                }}>
                        Breaking News
                    </Text>
                    <Text style={{textAlign: 'justify', marginTop: 5, fontSize: (Platform.OS === 'ios') ? 15 : 10}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    </Text>
                </View>
                <Image 
                    source={require('../images/Welcome_BG.jpg')}
                    style={[styles.latestNewsImage]}
                />
            </View>

            {/* All Maps Scrolable Content */}
            <ScrollView style={[styles.mapsViewContainer]}>
                <View >
                    < Maps />

                    < Maps />

                    < Maps />

                    < Maps />

                    < Maps />

                    < Maps />
                </View>
            </ScrollView>
        </View>
        : 
        <View style={{flex: 1}}>
            <ImageBackground
                source={require("../images/lockedImage.png")}
                style={{width: '100%', height: 2.6 * windowHeight/3, marginTop: 10}}
                blurRadius={10}
            >
                <View style={{flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name='lock' size={80}/>
                </View>
            </ImageBackground>            
        </View>
        }

        {(role === 4) 
        ?<View style={[styles.planUpgradeContainer]}>
            <TouchableOpacity onPress={() => {navigation.navigate("UpgradePlan")}}>
                <Text style={{fontSize: 30, fontWeight: 500, paddingBottom: 10}}>Upgarde your plan</Text>
            </TouchableOpacity>
            <Text>You can view unlimited maps and keep up-to-date with our daily maps and weather updates.</Text>
        </View>        
        : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    userInfo: {
        flexDirection: 'row', 
        // justifyContent: 'space-between',
    },
    userName: {
        justifyContent: 'center',
        fontSize: (Platform.OS === 'ios') ? 25 : 20, 
        fontWeight: 700,
        paddingHorizontal: 10, 
        paddingTop: 10,
        alignSelf: 'center'
    },
    profileImage: {
        borderWidth: 2,
        borderRadius: 100,
        marginHorizontal: 10,
        alignSelf: 'center',
        marginTop : (Platform.OS === 'ios') ? 0 : 5,
    },
    latestNews: {
        marginTop: 10,
        flexDirection: 'row',
        height: 200,
        alignItems: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        paddingTop: 20,
        paddingBottom: 20,
    },
    latestNewsText: {
        flex: 1,
        padding: 20,
    },
    latestNewsImage: {
        flex: 1,
        height: '100%',
        resizeMode: 'cover'
    },
    mapsViewContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: '100%',
        padding: 5,
    },
    planUpgradeContainer: {
        height: 100,
        alignItems: 'center',
        padding: 10
    },
    addPostContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        backgroundColor: '#1340a5',
        paddingHorizontal: 20,
        paddingVertical: 25
    },
    postButton: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '40%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 15,
        shadowColor: 'black', 
        shadowOffset: { height: 10, width: 5}, 
        shadowOpacity: 0.5, 
        shadowRadius: 3, 
    }
});

export default Dashboard;