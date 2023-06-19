import { View, Text, Pressable, Image, StyleSheet, SafeAreaView, ScrollView} from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
import Button from '../components/Button';
import Maps from '../components/Maps'

const Dashboard = ({ navigation} ) => {
  return (
    // <LinearGradient
    //     style={{
    //         flex: 1
    //     }}
    //     colors = {[COLORS.secondary, COLORS.primary]}
    // >
    //     <View style={{flex:1}}>
    //         <Image
    //             source={require("../src/images/Welcome_BG.jpg")}
    //             style={{
    //                 height:"100%",
    //                 width:"100%",
    //                 position: 'absolute',
    //                 top: 0  
    //             }}
    //         ></Image>

    //         <View style={{
    //             paddingHorizontal: 22,
    //             position: 'absolute',
    //             width:"100%",
    //             top: 200
    //         }}>
    //             <Text
    //                 style={{
    //                     fontSize:65, 
    //                     fontWeight: 800,
    //                     color: COLORS.white,
    //                 }}
    //             >
    //                 Successfully 
    //             </Text>
    //             <Text
    //                 style={{
    //                     fontSize:65, 
    //                     fontWeight: 800,
    //                     color: COLORS.white,
    //                     paddingHorizontal: 40
    //                 }}
    //             >
    //                 Logged In ...
    //             </Text>
    //         </View>

    //         {/* <View style={{
    //             paddingHorizontal: 22,
    //             position: 'absolute',
    //             width:"100%",
    //             top: 700
    //         }}>
    //             <Button 
    //                 title="Join Now"
    //                 onPress={() => navigation.navigate("SignUp")}
    //                 style={{
    //                     marginTop: 20

    //                 }}
    //             />

    //             <View
    //                 style={{
    //                     flexDirection: "row",
    //                     marginTop: 12, 
    //                     justifyContent: 'center',
    //                 }}
    //             >
    //                 <Text
    //                     style={{
    //                         textDecorationLine: 'underline',
    //                         fontSize: 18, 
    //                         color: COLORS.white
    //                     }}> Already have an account ? </Text>
    //                 <Pressable
    //                     onPress={ () => navigation.navigate("Login")}
    //                 >
    //                     <Text   style={{
    //                         fontSize: 18, 
    //                         color: COLORS.white,
    //                         fontWeight: "bold",
    //                         marginLeft: 4
    //                     }}
    //                     >Login</Text>
    //                 </Pressable>
    //             </View>
    //         </View>   */}

                
    //     </View>


    // </LinearGradient>
    <SafeAreaView style={{flex: 1}}>
        {/* Latest News Content */}
        <View style={[styles.latestNews]}>
            <View style={[styles.latestNewsText]}>
                <Text style={{textAlign: 'center',
                            fontWeight: 'bold',
                            fontVariant: 'small-caps',
                            fontSize: 25}}>
                    Breaking News
                </Text>
                <Text style={{textAlign: 'justify', marginTop: 5}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </Text>
            </View>
            <Image 
                source={require('../src/images/Welcome_BG.jpg')}
                style={[styles.latestNewsImage]}
            />
        </View>

        {/* All Maps Scrolable Content */}
        <ScrollView style={[styles.mapsViewContainer]}>
            <View >
                < Maps />

                < Maps />

                < Maps />

                < Maps />

                < Maps />

                < Maps />
            </View>
        </ScrollView>

        {/* Plan Upgrade Window */}
        <View style={[styles.planUpgradeContainer]}>
            <Text style={{fontSize: 30, fontWeight: 500, paddingBottom: 10}}>Upgarde your plan</Text>
            <Text>You can view unlimited maps and keep up-to-date with our daily maps and weather updates.</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    latestNews: {
        flexDirection: 'row',
        height: 200,
        alignItems: 'center',
        // borderTopWidth: 2,
        borderBottomWidth: 2,
        paddingTop: 20,
        paddingBottom: 20,
    },
    latestNewsText: {
        flex: 1,
        padding: 20,
    },
    latestNewsImage: {
        flex: 1,
        height: '100%',
        resizeMode: 'cover'
    },
    mapsViewContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: '100%',
        padding: 5,
    },
    planUpgradeContainer: {
        height: 100,
        alignItems: 'center',
        padding: 10
    }
});

export default Dashboard