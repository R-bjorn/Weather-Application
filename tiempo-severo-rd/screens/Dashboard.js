// Import react components
import { 
    View, Text, Image, 
    StyleSheet, SafeAreaView, 
    ScrollView, TouchableOpacity, 
    ImageBackground, StatusBar
} from 'react-native'
import React, {useState}from 'react'

// Import other components
import Maps from '../components/Maps';
import { useAuth } from "../hooks/useAuth";
import { firebase } from "../config";

var {Platform} = React;

// TODO : only admin can change the data

// function Dashboard ({ navigation} ){
const Dashboard = ({ navigation} ) => {
    const { user } = useAuth();
    const username = (user?.displayName === ' ') ? 'user' : user?.displayName;
    const [role, setRole] = useState('');

    // Get a reference to the 'users' collection
    const usersCollectionRef = firebase.firestore().collection('users');

    // Query the collection and retrieve the roles of each user
    usersCollectionRef
    .doc(user?.uid)
    .get()
    .then((doc) => {
        setRole(doc.data().role);
    })
    .catch((error) => {
        console.log('Error getting users:', error);
    });

  return (
    // </LinearGradient>
    <SafeAreaView style={{flex: 1}}>
        <StatusBar 
            backgroundColor={(Platform.OS === 'ios') ? "#fff" : "#f1f1f1"}
            barStyle={'dark-content'}
            hidden={false} />
        {/* User Information */}
        <View style={styles.userInfo}>
            {/* {firebase.auth().currentUser?.email} */}
            <Text style={styles.userName}>Hello, {username}!</Text>
            <TouchableOpacity style={styles.profileImage} onPress={() => {navigation.openDrawer()}}>
                <ImageBackground 
                    source={require('../images/profile.jpg')}
                    style={{width: 35, height: 35}}
                    imageStyle={{borderRadius: 25}}
                />
            </TouchableOpacity>
        </View>
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

        {/* Plan Upgrade Window */}
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
        justifyContent: 'space-between',
    },
    userName: {
        justifyContent: 'center',
        fontSize: (Platform.OS === 'ios') ? 25 : 20, 
        paddingHorizontal: 10, 
        paddingTop: 10,
        textAlign: 'center'
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
    }
});

export default Dashboard;