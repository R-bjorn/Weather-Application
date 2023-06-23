import 'react-native-gesture-handler';

// Navigator
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native';

// React Components
import React, { useState, useEffect} from 'react';
import { firebase } from './config';

// Screens and Pages
import { Dashboard } from './screens';
import { Settings, Profile} from './screens'
import { Login, SignUp, Welcome} from "./screens";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(initializing) return null;

  if(!user){
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Welcome'
        >
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation={true} initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
