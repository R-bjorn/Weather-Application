import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, StatusBar} from 'react-native'
import React from 'react'
import { useAuth } from "../hooks/useAuth";
import Icon from "@expo/vector-icons/FontAwesome";
import SubscriptionPlan from "../components/SubscriptionPlan";

var {Platform} = React;

// TODO : make user types - Admin and normal user
// TODO : only admin can change the data

// function Dashboard ({ navigation} ){
const Dashboard = ({ navigation} ) => {
  const { user } = useAuth();
  const username = (user?.displayName === ' ') ? 'user' : user?.displayName;
  return (
    <>
      <SafeAreaView style={{flex:0, backgroundColor: '#4967a4'}}/>
      <View style={{flex: 1, backgroundColor: '#eeeeee'}}>
        <StatusBar 
            backgroundColor="#4967a4"
            barStyle={'dark-content'}
            hidden={false} />
        {/* User Information */}
        <View style={styles.userInfo}>
            <TouchableOpacity 
                onPress={() => {navigation.toggleDrawer()}}
            >
                <Icon name='bars' size={20} style={{paddingVertical: 15, paddingHorizontal: 20}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileImage} onPress={() => {navigation.openDrawer()}}>
                <ImageBackground 
                    source={require('../images/profile.jpg')}
                    style={{width: 35, height: 35}}
                    imageStyle={{borderRadius: 25}}
                />
            </TouchableOpacity>
        </View>

        <View style={{backgroundColor: '#4967a4', height: 150, borderBottomRightRadius: 15, borderBottomLeftRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 35, fontWeight: 600, color: '#fff', top: -30}}>Subscription Plan</Text>
        </View>

        <ScrollView style={{top: -50}}>
          <SubscriptionPlan 
            user="Free User" 
            price={0}
            benifit1="Limited Maps"
            benifit2="Limited Content"
            benifit3="Free access"
            enable={true}
          />

          <SubscriptionPlan 
            user="Puerto Rico" 
            price={4.99}
            benifit1=" "
            benifit2=" "
            benifit3=" "
            enable={false}
          />

          <SubscriptionPlan 
            user="Dominican Republican" 
            price={4.99}
            benifit1=" "
            benifit2=" "
            benifit3=" "
            enable={false}
          />

          <SubscriptionPlan 
            user="Premium User" 
            price={7.99}
            benifit1=" "
            benifit2=" "
            benifit3=" "
            enable={false}
          />
        </ScrollView>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
    userInfo: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        backgroundColor: '#4967a4'
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