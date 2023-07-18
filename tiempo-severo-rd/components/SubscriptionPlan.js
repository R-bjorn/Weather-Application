import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useAuth } from "../hooks/useAuth";
import { firebase } from "../config";
import STRIPE from "../constants/stripe_constants";

// Stripe Payment
import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native';  
import { PlatformPayButton, isPlatformPaySupported } from '@stripe/stripe-react-native';

const fetch = require('node-fetch');

const SubscriptionPlan = (props) => {

  const { user } = useAuth();
  const [ready, setReady] = useState(false);
  const {initPaymentSheet, presentPaymentSheet, loading} = usePaymentSheet();
  const planPrice = (props.user == 'Premium User') ? '799' : '499';

  // useEffect(() => {
  //   initializePaymentSheet();
  // }, []);

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

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} = 
      await fetchPaymentSheetParams();

    
    const {error} = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: "Tiempo Severo RD",
      allowsDelayedPaymentMethods: true,
      // returnURL: "stripe-example://stripe-redirect"
    });
    if(error){
      // alert(`Error (initializePaymentSheet) code : ${error.code}`, error.message);
      console.log("Error Initializing Payment Sheet : ", error.message);
    }else{
      setReady(true);
      // console.log('successfully initializing payment sheet');
    }    
  };

  const fetchPaymentSheetParams = async () => {

      console.log("User : ", props.user , " - ", planPrice);
      const requestBody = {
        amount: planPrice
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(requestBody),
      };

      try {
        const response = await fetch(STRIPE.API_URL, options);
        const {paymentIntent, ephemeralKey, customer} = await response.json();
        
        return {
          paymentIntent,
          ephemeralKey,
          customer
        };
      } catch (error) {
        console.log("Error fetching payment intent",error);
      }
    
      
  };

  async function purchasePlan() {
    // console.log('in purchase plan');
    initializePaymentSheet();
    const {error} = await presentPaymentSheet();

    // After successfull payment
    if(error){
      alert(`Error code: ${error.code}`, error.message)
    }
    else{
      alert('Success', 'The payment was confiremed successfully');
      changeUserRole(props.userRole)
    }
  };

  return (
    // Button that takes them to individual payment methods
    <StripeProvider
        publishableKey={STRIPE.PUBLISHABLE_KEY}
        merchantIdentifier={STRIPE.MERCHANT_ID}
      >
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
                onPress={() => { (props.user == 'Free User') ? changeUserRole(props.userRole) : (!props.enable) ? purchasePlan() : null}}
              >
                <Text style={{ 
                  color: (props.enable) ? "#fff": "#000",  
                  fontWeight: (props.enable) ? 800 : 400
                }}>
                  {(props.enable) ? "Current plan" : "Get this plan"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Side Image of the plan */}
          <Image 
            source={props.image}
            style={{width: "35%", height: "100%", marginHorizontal: 5}}
          />

        </View>
      </View>
    </StripeProvider>
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
    height: 25, 
    justifyContent: "center", 
    alignItems: 'center', 
    borderRadius: 10, 
    borderWidth: 2, 
    borderColor: '#0014a7', 
  }
})

export default SubscriptionPlan