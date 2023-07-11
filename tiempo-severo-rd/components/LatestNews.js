import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const LatestNews = ({image, description}) => {
  return (
    <View style={[styles.latestNews]}>
        <View style={[styles.latestNewsText]}>
            <Text style={{
                        fontWeight: 'bold',
                        fontVariant: 'small-caps',
                        fontSize: (Platform.OS === 'ios') ? 25 : 20
                        }}>
                Breaking News
            </Text>
            <Text style={{textAlign: 'justify', marginTop: 5, fontSize: (Platform.OS === 'ios') ? 15 : 10}}>
                {description ? description : "Description"}
            </Text>
        </View>
        <Image 
            source={(image != null) ? { uri: image } : require('../images/Welcome_BG.jpg')}
            style={[styles.latestNewsImage]}
        />
    </View>
  )
}

export default LatestNews

const styles = StyleSheet.create({
    latestNews: {
        marginTop: 10,
        flexDirection: 'row',
        height: 200,
        alignItems: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        paddingTop: 20,
        paddingBottom: 20,
    },
    latestNewsText: {
        flex: 1,
        padding: 20,
        height: '100%'
    },
    latestNewsImage: {
        flex: 1,
        height: '100%',
        resizeMode: 'cover'
    },
})