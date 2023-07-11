// Import react components
import { 
    View, Text, Image, 
    StyleSheet, SafeAreaView, 
    ScrollView, TouchableOpacity, 
    ImageBackground, StatusBar, 
    Dimensions, RefreshControl 
} from 'react-native'
import React, {useState, useEffect}from 'react'

// Firebase
import { useAuth } from "../hooks/useAuth";
import { firebase } from "../config";
import { collection, query, where, limit, getDocs } from 'firebase/firestore';

// Import other components
import Maps from '../components/Maps';
import LatestNews from '../components/LatestNews';
import Icon from "@expo/vector-icons/FontAwesome"

// Global Variables
var {Platform} = React;
const windowHeight = Dimensions.get('window').height;

// function Dashboard ({ navigation} ){
const Dashboard = ({ navigation} ) => {

     // Refreshing new Data
     const [refreshing, setRefreshing] = useState(false);
     const onRefresh = () => {
         setRefreshing(true);
         fetchMaps();
         fetchNews()
           .finally(() => {
             setRefreshing(false);
           });
     };
 
     // User authentication and getting user data
     const { user } = useAuth();
     const [role, setRole] = useState('');
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
         
         let mapsQuery = query(mapsCollectionRef, where("MapCountry", "==", "Dominican Republican"));
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
        
        let newsQuery = query(newsCollectionRef, where("NewsCountry", "==", "Dominican Republican"),  limit(1));
      
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
            {/* Back button '<' */}
            <TouchableOpacity 
                onPress={() => {navigation.toggleDrawer()}}
            >
                <Icon name='bars' size={20} style={{marginHorizontal: 15, alignSelf: 'center', marginTop : 10,}}/>
            </TouchableOpacity>
            <View style={{flex:1, alignItems: 'center'}}>
                <Text style={styles.userName}>Dominican Republican</Text>
            </View>
        </View>

        { (role === 3 || role === 1 || role === 0) 
        ?
        // Content for puerto Rico users
        <View style={{flex:1, }}>
                        
            {/* Latest News Content */}
            {latestNewsData.length > 0 ? (
            latestNewsData.map((map) => (
                <LatestNews key={map.id} image={map.image} description={map.description} />
            ))
            ) : (
                null
            )}

            {/* All Maps Scrolable Content */}
            <ScrollView 
                style={[styles.mapsViewContainer]}
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                }
            >
                <View >
                    {mapsData.length > 0 ? (
                    mapsData.map((map) => (
                        <Maps key={map.id} image={map.image} description={map.description} />
                    ))
                    ) : (
                    <Text>No maps available</Text>
                    )}
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
        justifyContent: 'space-between',
    },
    userName: {
        justifyContent: 'center',
        fontSize: (Platform.OS === 'ios') ? 25 : 20, 
        fontWeight: 700,
        paddingHorizontal: 10, 
        paddingTop: 10,
        // marginRight: 60,
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
        padding: 10,
        backgroundColor: '#fff'
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