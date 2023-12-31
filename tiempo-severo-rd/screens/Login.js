import { 
    View, Text, Image, 
    ImageBackground  , Pressable, 
    TextInput, TouchableOpacity 
} from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors'
import { Ionicons } from "@expo/vector-icons"
import Checkbox from "expo-checkbox"

import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'

const Login = ({ }) => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    loginUser = async( email, password ) => {
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password)
        }catch(error){
            alert(error.message)
        }
    }
    
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
          {/* Background Image */}
            <ImageBackground 
                source={require("../images/Welcome_BG.jpg")}
                style={{
                    height:"100%",
                    width:"100%",
                    position: 'absolute',
                    top: 0  
                }}
            ></ImageBackground >

            {/* Login Form */}
            <View style={{ flex: 1, marginHorizontal: 22, 
                backgroundColor: COLORS.transparentWhite, top: '25%', 
                padding: 20, maxHeight: (Platform.OS === 'ios') ? 450 : 520
            }}>
                {/* Welcome Text */}
                <View style={{ }}>
                    <Text style={{
                        fontSize: (Platform.OS === 'ios') ? 50 : 40,
                        fontWeight: 700,
                        marginTop: 10,
                        letterSpacing: 3,
                        marginBottom: 40,
                        color: COLORS.black,
                        textAlign: 'center'
                    }}>
                        WELCOME
                    </Text>
                </View>

                {/*  email */}
                <View style={{ marginBottom: 12 }}>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your email'
                            keyboardType='email-address'
                            placeholderTextColor={COLORS.black}
                            // value={username}
                            onChangeText={text => setUsername(text)}
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>
                {/* Password */}
                <View style={{ marginBottom: 12 }}>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            // value={password}
                            onChangeText={text => setPassword(text)}
                            style={{
                                width: "100%"
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>
                {/* Remember Me */}
                {/* <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>Remember Me</Text>
                </View> */}

                {/* Login Button */}
                <TouchableOpacity
                    onPress={() => loginUser(username, password)}
                  style={{
                    marginTop: 10,
                    paddingBottom: 16,
                    paddingVertical: 10,
                    borderColor: COLORS.primary,
                    borderWidth: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0, 0.9)'
                  }}
                >
                  <Text
                    style={{fontSize: (Platform.OS === 'ios') ? 23 : 20, color: COLORS.white, fontWeight: 'bold', letterSpacing: 3}}
                  >Login</Text>
                </TouchableOpacity>
                
                {/* Or login with */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.black,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Login with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.black,
                            marginHorizontal: 10
                        }}
                    />
                </View>
                
                {/* Fb, Google, Twitter APIs */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    {/* Facebook API */}
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            // borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 50
                        }}
                    >
                        <Image
                          source={{uri: 'https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo.png'}}
                          style={{
                              height: 66,
                              width: 66,
                              marginRight: 8
                          }}
                          resizeMode='contain'
                        />

                    </TouchableOpacity>
                    {/* Google API */}
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            // borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius:100
                        }}
                    >
                          <Image
                            source={{uri: 'https://pluspng.com/img-png/google-logo-png-open-2000.png'}}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                          />

                    </TouchableOpacity>
                    {/* Twitter API */}
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            // borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 50
                        }}
                    >
                        <Image
                          source={{uri: 'https://logos-download.com/wp-content/uploads/2016/02/Twitter_Logo_new.png'}}
                          style={{
                              height: 36,
                              width: 36,
                              marginRight: 8
                          }}
                          resizeMode='contain'
                        />

                    </TouchableOpacity> 
                </View>

                {/* Register Text */}
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 10
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
                    <Pressable
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Register</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Login