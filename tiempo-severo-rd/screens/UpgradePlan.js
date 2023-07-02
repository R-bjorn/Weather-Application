import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, StatusBar} from 'react-native'
import React from 'react'
import Icon from "@expo/vector-icons/FontAwesome";
import SubscriptionPlan from "../components/SubscriptionPlan";

import {useEffect, useState} from "react";
import { useAuth } from "../hooks/useAuth";
import { firebase } from "../config";

var {Platform} = React;

// function Dashboard ({ navigation} ){
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
    setRole(doc.data().role);
  })
  .catch((error) => {
      console.log('Error getting users:', error);
  });
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

        {/* Subscription Plan Heading */}
        <View style={styles.container}>
          <Text style={styles.header}>Subscription Plan</Text>
        </View>

        {/* All plans */}
        <ScrollView style={{top: -50}}>
          <SubscriptionPlan 
            user="Free User" 
            price={0}
            benifit1="Limited Maps"
            benifit2="Limited Content"
            benifit3="Free access"
            enable={(role === 4) ? true : false}
            image={require("../images/free_user.jpeg")}
            userRole = {4}
            navigation = {navigation}
          />

          <SubscriptionPlan 
            user="Puerto Rico" 
            price={4.99}
            benifit1="Rain and Thunder Maps"
            benifit2="Hazardous Storm Risk"
            benifit3="Wind Gust Risk"
            enable={(role === 2) ? true : false}
            image={require("../images/Puerto_rico.jpg")}
            userRole = {2}
            navigation = {navigation}
          />

          <SubscriptionPlan 
            user="Dominican Republican" 
            price={4.99}
            benifit1="Rain and Thunder Maps"
            benifit2="Hazardous Storm Risk"
            benifit3="Wind Gust Risk"
            enable={(role === 3) ? true : false}
            image={require("../images/Dominican_republican.png")}
            userRole = {3}
            navigation = {navigation}
          />

          <SubscriptionPlan 
            user="Premium User" 
            price={7.99}
            benifit1=" "
            benifit2=" "
            benifit3=" "
            enable={(role === 1) ? true : false}
            image={require("../images/premium_user.jpg")}
            userRole = {1}
            navigation = {navigation}
          />
        </ScrollView>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#4967a4', 
      height: 150, 
      borderBottomRightRadius: 15, 
      borderBottomLeftRadius: 15, 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    header: {
      fontSize: 35, 
      fontWeight: 600, 
      color: '#fff', 
      top: -30
    },
    userInfo: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        backgroundColor: '#4967a4'
    },
    profileImage: {
        borderWidth: 2,
        borderRadius: 100,
        marginHorizontal: 10,
        alignSelf: 'center',
        marginTop : (Platform.OS === 'ios') ? 0 : 5,
    },
});

export default Dashboard;