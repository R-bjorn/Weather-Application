import { View, Text, 
    Pressable, ImageBackground, 
    SafeAreaView, Dimensions, 
    Platform } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors';
import Button from '../components/Button';

const windowHeight = Dimensions.get('window').height;

const Welcome = ({ navigation} ) => {
  return (
    <SafeAreaView style={{flex:1}}>
        {/* Background Image */}
        <ImageBackground
            source={require("../images/Welcome_BG.jpg")}
            style={{
                height:windowHeight,
                width:"100%",
                position: 'absolute',
                top: 0  
            }}
        />
        {/* "Let's Get Started" text */}
        <View style={{
            paddingHorizontal: 22,
            // position: 'absolute',
            width:"100%",
            top: 100
        }}>
            <Text
                style={{
                    fontSize: (Platform.OS === 'ios') ? 65 : 45, 
                    fontWeight: 800,
                    color: COLORS.white,
                }}
            >
                Let's get 
            </Text>
            <Text
                style={{
                    fontSize:(Platform.OS === 'ios') ? 65 : 45, 
                    fontWeight: 800,
                    color: COLORS.white,
                    paddingHorizontal: 40
                }}
            >
                Started ...
            </Text>
        </View>

        {/* Signup / Login Buttons */}
        <View style={{
            paddingHorizontal: 22,
            position: 'absolute',
            width:"100%",
            top: windowHeight - 150
        }}>
            {/* Register Button */}
            <Button 
                title="Join Now"
                onPress={() => navigation.navigate("SignUp")}
                style={{marginTop: 20}}
            />

            {/* Login link */}
            <View
                style={{
                    flexDirection: "row",
                    marginTop: 12, 
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        textDecorationLine: 'underline',
                        fontSize: 18, 
                        color: COLORS.white
                    }}> Already have an account ? </Text>
                <Pressable
                    onPress={ () => navigation.navigate("Login")}
                >
                    <Text   style={{
                        fontSize: 18, 
                        color: COLORS.white,
                        fontWeight: "bold",
                        marginLeft: 4
                    }}
                    >Login</Text>
                </Pressable>
            </View>
        </View>             
    </SafeAreaView>
  )
}

export default Welcome