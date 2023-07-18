import 'react-native-gesture-handler';

// Navigator
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native';

// React Components
import React, { useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { firebase } from './config';
import Icon from '@expo/vector-icons/FontAwesome';

// Screens and Pages
import { Dashboard } from './screens';
import { AddPost, AddNews, Profile} from './screens'
import { Login, SignUp, Welcome} from "./screens";
import { PuertoRico, DominicanRepublican, Notifications, UpgradePlan} from './screens';
import Sidebar from './components/Sidebar';
import SubscriptionPlan from "./components/SubscriptionPlan";

// Navigation Containers
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// App Layout 
// export default function App() {
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   function onAuthStateChanged(user){
//     setUser(user);
//     if(initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber;
//   }, []);

//   if(initializing) return null;

//   if(!user){
//     return (
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName='Welcome'
//         >
//           <Stack.Screen
//             name="Welcome"
//             component={Welcome}
//             options={{
//               headerShown: false
//             }}
//           />
//           <Stack.Screen
//             name="Login"
//             component={Login}
//             options={{
//               headerShown: false
//             }}
//           />
//           <Stack.Screen
//             name="SignUp"
//             component={SignUp}
//             options={{
//               headerShown: false
//             }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
      
//     );
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Drawer">
//         <Stack.Screen
//           name="Drawer"
//           component={DrawerNavigation}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="AddPost"
//           component={AddPost}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="AddNews"
//           component={AddNews}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

export default function App(){
  return(
    <View style={{alignItems: "center", marginTop: 400}}>
      {/* <Text>Stripe Trial</Text> */}
      <SubscriptionPlan 
        user="Puerto Rico" 
        price={4.99}  
        benifit1="Rain and Thunder Maps"
        benifit2="Hazardous Storm Risk"
        benifit3="Wind Gust Risk"
        enable={false}
        image={require("./images/Puerto_rico.jpg")}
        userRole = {2}
      />
    </View>
  )
}

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      useLegacyImplementation={true} 
      initialRouteName="Dashboard"
      drawerContent={(props) => <Sidebar {...props}/>}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={Dashboard} 
        options={{
          title: 'Home',
          drawerIcon: ({focused, color, size})=> (
            <Icon name="home" size={18} color={color} />
          ),
        }}
      />

      <Drawer.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          title: 'Profile',
          drawerIcon: ({focused, color, size})=> (
            <Icon name="user" size={18} color={color} />
          ),
        }}  
      />

      <Drawer.Screen 
        name="Puerto Rico" 
        component={PuertoRico} 
        options={{
          title: 'Puerto Rico',
          drawerIcon: ({focused, color, size})=> (
            <Icon name="globe" size={18} color={color} />
          ),
        }}  
      />

      <Drawer.Screen 
        name="Dominican Republic" 
        component={DominicanRepublican} 
        options={{
          title: 'Dominican Republic',
          drawerIcon: ({focused, color, size})=> (
            <Icon name="globe" size={18} color={color} />
          ),
        }}  
      />

      {/* <Drawer.Screen 
        name="Notification" 
        component={Notifications} 
        options={{
          title: 'Notifications',
          drawerIcon: ({focused, color, size})=> (
            <Icon name="bell-o" size={18} color={color} />
          ),
        }}  
      /> */}

      <Drawer.Screen 
        name="Upgrade your plan" 
        component={UpgradePlan} 
        options={{
          title: 'Upgrade your plan',
          drawerIcon: ({focused, color, size})=> (
            <Icon name="suitcase" size={18} color={color} />
          ),
        }}  
      />

      
    </Drawer.Navigator>
  )
}
