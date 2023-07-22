import 'react-native-gesture-handler';
import { View, Text, Image, 
    ImageBackground, Pressable, 
    TextInput, TouchableOpacity, 
    ScrollView, StyleSheet } 
    from 'react-native';
import React, { useRef, useState } from 'react';
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import {firebase} from '../config';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const SignUp = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    // ROLE = {0 - Admin, 1 - Premium User, 2 - Puerto Rico User, 3 - Dominican Republican User, 4 - Free User}
    const role = 4; 

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    // const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const registerUser = async(email, password, username) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
            if(userCredentials.user){
                userCredentials.user.updateProfile({
                  displayName: username
                })
            }
        })
        .catch((error) => {alert(error.message)})
        .then(() => {
            firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
                username, 
                email, 
                role
            })
        })
        .catch((error) => {alert(error.message)})
    }

    const bottomSheetModalRef = useRef(null);
    const snapPoint = ["25%","48%", "85%"];
    const openTermsAndCondition = () => {
        bottomSheetModalRef.current?.present();
    }

    return (
        <BottomSheetModalProvider>
            {/* UI for sign up */}
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
                backgroundColor: COLORS.transparentWhite, top: '10%', padding: 20, maxHeight: (Platform.OS === 'ios') ? 640 : "100%"
                }}>
                    {/* Register Title */}
                    <View>
                        <Text style={{
                            fontSize: (Platform.OS === 'ios') ? 45 : 35,
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
                    
                    {/* Input Fields */}
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

                            <Text>I agree to the </Text>
                            {/* TODO: Add terms and condition pdf */}
                            <TouchableOpacity onPress={() => {openTermsAndCondition()}}>
                                <Text style={{
                                    textDecorationLine: 'underline', fontWeight: "bold",
                                }}>terms and conditions</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Sign Up Button */}
                        <TouchableOpacity
                            disabled={!isChecked}
                            onPress={() => registerUser(email, password, username)}
                            style={{
                                marginTop: 10,
                                paddingBottom: 16,
                                paddingVertical: 10,
                                borderColor: COLORS.primary,
                                borderWidth: 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: (isChecked) ? 'rgba(0,0,0, 0.9)' : "grey",
                            }}
                            >
                            <Text
                                style={{fontSize: (Platform.OS === 'ios') ? 23 : 20, color: (isChecked) ? COLORS.white : COLORS.black, fontWeight: 'bold', letterSpacing: 3}}
                            >Sign Up</Text>
                        </TouchableOpacity>

                        {/* Or Sign up with */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                            <View
                                style={{
                                    flex: 1,
                                    height: 1,
                                    backgroundColor: COLORS.black,
                                    marginHorizontal: 10
                                }}
                            />
                            <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
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
            {/* Bottom Sheet for terms and conditions */}
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoint}
                backgroundStyle={{borderRadius: 25}}
            >
                <ScrollView style={{flex: 1}}>
                    <Text style={{height: 20}}></Text>
                    <Text style={styles.title}>Terms and conditions</Text>
                    <Text style={styles.paragraph}>These terms and conditions (“Agreement”) set forth the general terms and conditions of your use of the “Tiempo Severo RD” mobile application (“Mobile Application” or “Service”) and any of its related products and services (collectively, “Services”). This Agreement is legally binding between you (“User”, “you” or “your”) and this Mobile Application developer (“Operator”, “we”, “us” or “our”). If you are entering into this agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this agreement, in which case the terms “User”, “you” or “your” shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this agreement, you must not accept this agreement and may not access and use the Mobile Application and Services. By accessing and using the Mobile Application and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement. You acknowledge that this Agreement is a contract between you and the Operator, even though it is electronic and is not physically signed by you, and it governs your use of the Mobile Application and Services.</Text>
                    <Text style={styles.heading}>Accounts and membership</Text>
                    <Text style={styles.paragraph}>If you create an account in the Mobile Application, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. We may, but have no obligation to, monitor and review new accounts before you may sign in and start using the Services. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent further registration.</Text>
                    <Text style={styles.heading}>User content</Text>
                    <Text style={styles.paragraph}>We do not own any data, information or material (collectively, “Content”) that you submit in the Mobile Application in the course of using the Service. You shall have sole responsibility for the accuracy, quality, integrity, legality, reliability, appropriateness, and intellectual property ownership or right to use of all submitted Content. We may, but have no obligation to, monitor and review the Content in the Mobile Application submitted or created using our Services by you. You grant us permission to access, copy, distribute, store, transmit, reformat, display and perform the Content of your user account solely as required for the purpose of providing the Services to you. Without limiting any of those representations or warranties, we have the right, though not the obligation, to, in our own sole discretion, refuse or remove any Content that, in our reasonable opinion, violates any of our policies or is in any way harmful or objectionable. Unless specifically permitted by you, your use of the Mobile Application and Services does not grant us the license to use, reproduce, adapt, modify, publish or distribute the Content created by you or stored in your user account for commercial, marketing or any similar purpose.</Text>
                    <Text style={styles.heading}>Backups</Text>
                    <Text style={styles.paragraph}>We are not responsible for the Content residing in the Mobile Application. In no event shall we be held liable for any loss of any Content. It is your sole responsibility to maintain appropriate backup of your Content. Notwithstanding the foregoing, on some occasions and in certain circumstances, with absolutely no obligation, we may be able to restore some or all of your data that has been deleted as of a certain date and time when we may have backed up data for our own purposes. We make no guarantee that the data you need will be available.</Text>
                    <Text style={styles.heading}>Links to other resources</Text>
                    <Text style={styles.paragraph}>Although the Mobile Application and Services may link to other resources (such as websites, mobile applications, etc.), we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked resource, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their resources. We do not assume any responsibility or liability for the actions, products, services, and content of any other third parties. You should carefully review the legal statements and other conditions of use of any resource which you access through a link in the Mobile Application. Your linking to any other off-site resources is at your own risk.</Text>
                    <Text style={styles.heading}>Changes and amendments</Text>
                    <Text style={styles.paragraph}>We reserve the right to modify this Agreement or its terms related to the Mobile Application and Services at any time at our discretion. When we do, we will post a notification in the Mobile Application. We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided.</Text>
                    <Text style={styles.paragraph}>An updated version of this Agreement will be effective immediately upon the posting of the revised Agreement unless otherwise specified. Your continued use of the Mobile Application and Services after the effective date of the revised Agreement (or such other act specified at that time) will constitute your consent to those changes.</Text>
                    <Text style={styles.heading}>Acceptance of these terms</Text>
                    <Text style={styles.paragraph}>You acknowledge that you have read this Agreement and agree to all its terms and conditions. By accessing and using the Mobile Application and Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to access or use the Mobile Application and Services.</Text>
                    <Text style={styles.heading}>Contacting us</Text>
                    <Text style={styles.paragraph}>If you have any questions, concerns, or complaints regarding this Agreement, we encourage you to contact us using the details below:</Text>
                    <Text style={styles.paragraph}>huracanescaribe@gmail.com</Text>
                    <Text style={styles.paragraph}>This document was last updated on July 22, 2023</Text>
                    <Text style={{height: 50}}></Text>
                </ScrollView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: "800",
        alignSelf: 'center',
        textTransform: 'uppercase'
    },
    heading : {
        fontSize: 20,
        fontWeight: "800",
        alignSelf: 'center',
        textTransform: 'uppercase'
    },
    paragraph : {
        paddingHorizontal: 10,
        marginVertical: 10,
        fontSize: 15,
        textAlign: 'justify'
    }
});

export default SignUp