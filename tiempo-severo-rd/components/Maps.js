import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Maps = () => {
  return (
    <View style={[styles.container]}>
      {/* <Text>Map </Text> */}
      {/* Map Image */}
      <View style={[styles.mapContainer]}>
        <TouchableOpacity>
            <Image 
                style={[styles.mapImage]}
                source={require('../images/Welcome_BG.jpg')}
            />
        </TouchableOpacity>
      </View>
      <View style={[styles.mapDescription]}>
        <Text>Description</Text>
      </View>
      {/* Map Like/Share/Comment Buttons */}
      <View style={[styles.buttonContainer]}>
        <TouchableOpacity style={[styles.button]}>
            <Text>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]}>
            <Text>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]}>
            <Text>Share</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 350,
        backgroundColor: '#e8f9ee',
        borderWidth: 1,
        padding: 5,
        paddingVertical: 10,
        marginVertical: 5,
    },
    mapContainer: {
        flex: 1,
        padding: 5,
        
    },
    mapImage: {
        height: '100%',
        width: 358,
        resizeMode: 'cover'
    },
    mapDescription: {
        marginBottom: 10,
        padding: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingHorizontal: 5,
    },
    button: {
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 10,
        marginRight: 10,
    }
});

export default Maps