import { View, Text, Image, ImageBackground, Pressable, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import {firebase} from '../config'

const SignUp = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    // const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const registerUser = async(email, password, username) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: 'tiempo-severo-rd-99be7.firebaseapp.com',
            })
            .then(() => {
                alert('Verification email sent!')
            }).catch((error) => { 
                alert(error.message)
            })
            .then(() => {
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    username, 
                    email, 
                })
            })
            .catch((error) => {alert(error.message)})
        })
        .catch((error) => {alert(error.message)})
    }
    // const handleSignup = () => {
    //     auth
    //         .createUserWithEmailAndPassword(email, password)
    //         .then(userCredentials => {
    //             const user = userCredentials.user;
    //             console.log(user.email);
    //         })
    //         .catch(error => {
    //             alert(error.message)
    //         })
    // }

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
            {/* Register form */}
            <View style={{ flex: 1, marginHorizontal: 22 ,
               backgroundColor: COLORS.transparentWhite, top: '20%', padding: 20, maxHeight: 1020 }}>
              {/* Register Title */}
                <View style={{  }}>
                    <Text style={{
                        fontSize: 45,
                        fontWeight: 700,
                        marginTop: 10,
                        letterSpacing: 2,
                        marginBottom: 20,
                        color: COLORS.black,
                        textAlign: 'center'
                    }}>
                        Create Account
                    </Text>
                </View>

                <ScrollView>
                    {/* Username */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Username</Text>

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
                                placeholder='Enter your username'
                                placeholderTextColor={COLORS.black}
                                // value={username}
                                onChangeText={text => setUsername(text)}
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                    </View>
                    {/* Email */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Email address</Text>

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
                                placeholder='Enter your email address'
                                placeholderTextColor={COLORS.black}
                                keyboardType='email-address'
                                // value={email}
                                autoCapitalize='none'
                                autoCorrect={false}
                                onChangeText={text => setEmail(text)}
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                        </View>
                    {/* Phone Number */}
                    {/* <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Mobile Number</Text>

                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='+1'
                                placeholderTextColor={COLORS.black}
                                keyboardType='numeric'
                                value={phone}
                                onChangeText={text => setPhone(text)}
                                style={{
                                    width: "12%",
                                    borderRightWidth: 1,
                                    borderLeftColor: COLORS.grey,
                                    height: "100%"
                                }}
                            />

                            <TextInput
                                placeholder='Enter your phone number'
                                placeholderTextColor={COLORS.black}
                                keyboardType='numeric'
                                style={{
                                    width: "80%"
                                }}
                            />
                        </View>
                    </View> */}
                    {/* Password */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Password</Text>

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
                                onChangeText={text => setPassword(text)}
                                autoCapitalize='none'
                                autoCorrect={false}
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
                        {/* Agreement of term and conditions */}
                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 6
                    }}>
                        <Checkbox
                            style={{ marginRight: 8 }}
                            value={isChecked}
                            onValueChange={setIsChecked}
                            color={isChecked ? COLORS.primary : undefined}
                        />

                        <Text>I aggree to the terms and conditions</Text>
                    </View>
                    {/* SignUp Button */}
                    {/* <Button
                        title="Sign Up"
                        onPress={}
                        filled
                        style={{
                            marginTop: 18,
                            marginBottom: 4,
                        }}
                    /> */}

                <TouchableOpacity
                        onPress={() => registerUser(email, password, username)}
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
                        style={{fontSize: 23, color: COLORS.white, fontWeight: 'bold', letterSpacing: 3}}
                    >Sign Up</Text>
                </TouchableOpacity>
                    {/* Or Sign up with */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: COLORS.grey,
                                marginHorizontal: 10
                            }}
                        />
                        <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: COLORS.grey,
                                marginHorizontal: 10
                            }}
                        />
                    </View>

                    {/* Fb, Google, Twitter APIs */}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
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
                    {/* Login Link */}
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginVertical: 22
                    }}>
                        <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.primary,
                                fontWeight: "bold",
                                marginLeft: 6
                            }}>Login</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default SignUp