// Import react components
import { 
    View, Text, Image, 
    StyleSheet, SafeAreaView, 
    ScrollView, TouchableOpacity, 
    ImageBackground, StatusBar,
    RefreshControl 
} from 'react-native'
import React, {useState, useEffect}from 'react'
import { useNavigation } from '@react-navigation/native';

// Firebase
import { useAuth } from "../hooks/useAuth";
import { firebase, db } from "../config";
import { collection, query, doc, limit, getDocs, getDoc } from 'firebase/firestore';
// Import other components
import Maps from '../components/Maps';
import LatestNews from '../components/LatestNews';
import Icon from "@expo/vector-icons/FontAwesome"

var {Platform} = React;

const Dashboard = ({ navigation}) => {
    // Navigation 
    navigation = useNavigation();

    // Refreshing new Data
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        console.log("User profile Image : ", user?.profileImage)
        fetchMaps();
        fetchNews()
          .finally(() => {
            setRefreshing(false);
          });
    };

    // User authentication and getting user data
    const { user } = useAuth();
    const username = (user?.displayName === ' ') ? 'user' : user?.displayName;
    const [role, setRole] = useState('');
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

    // Getting user role 
    // Get a reference to the 'users' collection
    const usersCollectionRef = firebase.firestore().collection('users');
    // Query the collection and retrieve the roles of each user
    usersCollectionRef.doc(user?.uid).get()
    .then((doc) => { setRole(doc.data().role); })
    .catch((error) => { console.log('Error getting users:', error); });

    // Maps data variables and fetching map data
    const [mapsData, setMapsData] = useState([]);
    const fetchMapsData = async (userRole) => {
        const mapsCollectionRef = collection(firebase.firestore(), 'maps');
        
        let mapsQuery = query(mapsCollectionRef);
        if (userRole === 4) {
          // Limit to 5 latest maps for free users
          mapsQuery = query(mapsCollectionRef, limit(5));
        }
      
        const querySnapshot = await getDocs(mapsQuery);
        
        const mapsData = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            image: doc.data().MapImage,
            description: doc.data().Description,
          };
        });
        
        return mapsData;
    };
    const fetchMaps = async () => {
        const data = await fetchMapsData(role);
        setMapsData(data);
    };
    useEffect(() => {    
        fetchMaps();
      }, [role]);

    
    // Latest News data variables and fetching latest news 
    const [latestNewsData, setLatestNewsData] = useState([]);
    const fetchLatestNewsData = async () => {
        const newsCollectionRef = collection(firebase.firestore(), 'news');
        
        let newsQuery = query(newsCollectionRef,  limit(1));
      
        const querySnapshot = await getDocs(newsQuery);
        
        const newsData = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            image: doc.data().NewsImage,
            description: doc.data().Description,
          };
        });
        
        return newsData;
    };
    const fetchNews = async () => {
        const data = await fetchLatestNewsData();
        setLatestNewsData(data);
    };
    useEffect(() => {    
        fetchNews();
      }, [role]);

    // UI of Dashboard
    return (
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
                    source={(userImage) ? {uri: userImage} : require('../images/profile.jpg')}
                    style={{width: 35, height: 35}}
                    imageStyle={{borderRadius: 25}}
                />
            </TouchableOpacity>
        </View>

        {/* Admin content to upload posts and breaking news */}
        {(role === 0)
        ? <View style={styles.addPostContainer}>
            <TouchableOpacity 
                style={styles.postButton}
                onPress={() => {navigation.navigate("AddPost")}}
            >
                <Icon name="plus" size={20}/>
                <Text style={{fontSize: 20, fontWeight: 600}}>Add post</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.postButton}
                onPress={() => {navigation.navigate("AddNews")}}
            >
                <Icon name="plus" size={20}/>
                <Text style={{fontSize: 20, fontWeight: 600}}>Add News</Text>
            </TouchableOpacity>
        </View>
        : null
        }

        {/* Latest News Content */}
        {latestNewsData.length > 0 ? (
        latestNewsData.map((map) => (
            <LatestNews key={map.id} image={map.image} description={map.description} />
        ))
        ) : (
            null
        )}

        {/* All Maps Scrolable Content */}
        <ScrollView style={styles.mapsViewContainer}
            refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
        >
            <View>
                {mapsData.length > 0 ? (
                mapsData.map((map) => (
                    <Maps key={map.id} image={map.image} description={map.description} />
                ))
                ) : (
                <Text>No maps available</Text>
                )}
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

// Styles of dashbaord UI
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