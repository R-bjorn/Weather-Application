import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, SafeAreaView, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useAuth } from "../hooks/useAuth";
import { firebase } from "../config";
import paypalapi from '../routers/paypalApi';
import WebView from 'react-native-webview';
import queryString from 'query-string';
import Icon from "@expo/vector-icons/FontAwesome";
import PAYPAL from '../constants/paypalPlan';

const SubscriptionPlan = (props) => {

  const { user } = useAuth();
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(null);

  const changeUserRole = (newRole) => {
    // Get a reference to the 'users' collection
    const usersCollectionRef = firebase.firestore().collection('users');

    // console.log(user?.uid);
    // Query the collection and retrieve the roles of each user
    usersCollectionRef
    .doc(user?.uid)
    .update({ role: newRole })
    .then(() => {
      console.log('Role updated successfully!');
    })
    .catch((error) => {
      console.log('Error updating role:', error);
    });

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    })
  }

  // Generating a token and creating a order
  const paypalPurchase = async () => {
    setIsLoading(true);
    resetPaypalStates();
    let plan_id = (props.userRole == 2) ? PAYPAL.PUERTO_RICO : (props.userRole == 3) ? PAYPAL.DOMINICAN_REPUBLICAN : PAYPAL.PREMIUM_PRODUCT;
    try {
      const token = await paypalapi.generateToken();

      const subscription = await paypalapi.createSubscription(token, plan_id);
      console.log('Sub : ', subscription);
      if(!!subscription){
        setSubscriptionId(subscription?.id);
        if(subscription?.links){
          const findUrl = subscription.links.find(data => data?.rel == "approve");
          setPaypalUrl(findUrl?.href);
          setIsLoading(false);  
        }                  
      }
    } 
    catch (error) {
      console.log('error purchasing : ', error);
    }
  }

  // For getting the payer's token for accepting the payment
  const onUrlChange = (webviewState) => {
    if(webviewState.url.includes('https://www.youtube.com/')){
      resetPaypalStates();
      return;
    }
    if(webviewState.url.includes('https://www.google.com/')){
      // console.log("inside successfull payment")
      // console.log("WebView State url : ", webviewState.url);
      const urlValues = queryString.parseUrl(webviewState.url); 
      console.log("my url values : ", urlValues);
      const {token} = urlValues.query;
      if(!!token){
        paymentSuccess(token);
      }
    }
    
  }

  // Recieving payment from payer to sender
  const paymentSuccess = async (id) => {
    try {
      const res = await paypalapi.capturePayment(id, accessToken);
      console.log("Payment details : ", res);
      alert("Payment successfull!");
      resetPaypalStates();
      changeUserRole(props.userRole);
    } catch (error) {
      console.log("Error payment successfull : ", error)
    }
  }

  // Resetting the paypal url and access token for another use
  const resetPaypalStates = () => {
    setPaypalUrl(null);
    setAccessToken(null);
    setSubscriptionId(null);
  }

  return (
    // Button that takes them to individual payment methods
    <View style={styles.container}>
      {/* View of the Plan */}
      <View style={{flexDirection: 'row'}}>
        {/* Introduction of the plan */}
        <View style={styles.planContainer}>

          {/* User Information */}
          <Text style={styles.planUser}>{props.user}</Text>

          {/* Price of the plan */}
          {(props.price == 0) ? <Text>free limited maps</Text> : <Text>$ {props.price} / month</Text>}

          {/* Plan Benifits */}
          <View style={{paddingVertical: (Platform.OS === 'ios') ? 10 : 5}}>
            {(props.benifit1) ? <Text style={{ fontSize: (Platform.OS === 'ios') ? 17 : 13, color: "#757575", marginBottom: 5 }}>{`\u2023 ${props.benifit1}`}</Text> : null} 
            {(props.benifit2) ? <Text style={{ fontSize: (Platform.OS === 'ios') ? 17 : 13, color: "#757575", marginBottom: 5 }}>{`\u2023 ${props.benifit2}`}</Text> : null} 
            {(props.benifit3) ? <Text style={{ fontSize: (Platform.OS === 'ios') ? 17 : 13, color: "#757575", marginBottom: 5 }}>{`\u2023 ${props.benifit3}`}</Text> : null} 
          </View>

          {/* Purchase Button */}
          <View>
            <TouchableOpacity
              style={[styles.purchaseBtn, {backgroundColor: (props.enable) ? "#aab5ff" : '#fff'}]}
              onPress={() => { (props.user == 'Free User') ? changeUserRole(props.userRole) : (!props.enable) ? paypalPurchase() : null}}
            >
              <Text style={{ 
                color: (props.enable) ? "#fff": "#000",  
                fontWeight: (props.enable) ? 800 : 400
              }}>
                {isLoading ? <ActivityIndicator size={'small'}/> : (props.enable) ? "Current plan" : "Subscribe"}
              </Text>
            </TouchableOpacity>

            <Modal
              visible={!!paypalUrl}
            >
              <SafeAreaView style={{flex: 1, }}>
                <TouchableOpacity
                  onPress={resetPaypalStates}
                  style={{marginHorizontal: 20, marginTop: 10, flexDirection: 'row'}}
                >
                  <Icon name="times" size={30}/>
                  <Text style={{fontSize: 30, marginHorizontal: 10}}>Quit</Text>
                </TouchableOpacity>
                <WebView 
                  source={{uri: paypalUrl}}
                  onNavigationStateChange={onUrlChange}
                />
              </SafeAreaView>
            </Modal>
          </View>
        </View>

        {/* Side Image of the plan */}
        <Image 
          source={props.image}
          style={{width: "35%", height: "100%", marginHorizontal: 5}}
        />

      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  container: {
    height: (Platform.OS === 'ios') ? 200 : 200, 
    backgroundColor: 'white', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginHorizontal: 20, 
    borderRadius: 10,
    shadowColor: 'black', 
    shadowOffset: { height: 10, width: 5}, 
    shadowOpacity: 0.5, 
    shadowRadius: 3, 
    marginBottom: 25
  },
  planContainer: {
    height: 150, 
    width: "45%", 
    flex: 1, 
    paddingHorizontal: 15, 
  },
  planUser: {
    fontSize: (Platform.OS === 'ios') ? 18 : 17, 
    fontWeight: 800, 
    marginBottom: (Platform.OS === 'ios') ? 2 : 0
  },
  purchaseBtn: {
    width: 100, 
    height: 30, 
    justifyContent: "center", 
    alignItems: 'center', 
    borderRadius: 10, 
    borderWidth: 2, 
    borderColor: '#0014a7', 
  }
})

export default SubscriptionPlan