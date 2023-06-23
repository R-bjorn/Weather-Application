import { View, Text, Pressable, ImageBackground } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors';
import Button from '../components/Button';

const Welcome = ({ navigation} ) => {
  return (
    <View>
        <View style={{flex:1}}>
            <ImageBackground 
                source={require("../images/Welcome_BG.jpg")}
                style={{
                    height:"100%",
                    width:"100%",
                    position: 'absolute',
                    top: 0  
                }}
            ></ImageBackground >

            <View style={{
                paddingHorizontal: 22,
                position: 'absolute',
                width:"100%",
                top: 200
            }}>
                <Text
                    style={{
                        fontSize:65, 
                        fontWeight: 800,
                        color: COLORS.white,
                    }}
                >
                    Let's get 
                </Text>
                <Text
                    style={{
                        fontSize:65, 
                        fontWeight: 800,
                        color: COLORS.white,
                        paddingHorizontal: 40
                    }}
                >
                    Started ...
                </Text>
            </View>

            <View style={{
                paddingHorizontal: 22,
                position: 'absolute',
                width:"100%",
                top: 700
            }}>
                <Button 
                    title="Join Now"
                    onPress={() => navigation.navigate("SignUp")}
                    style={{
                        marginTop: 20

                    }}
                />

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

                
        </View>


    </View>
  )
}

export default Welcome