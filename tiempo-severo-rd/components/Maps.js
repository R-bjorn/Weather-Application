import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, Dimensions } from 'react-native'
import React from 'react'


const Maps = ({ image, description }) => {
  return (
    <View style={[styles.container]}>
      {/* <Text>Map </Text> */}
      {/* Map Image */}
      <View style={[styles.mapContainer]}>
        <TouchableOpacity>
            <Image 
                style={[styles.mapImage]}
                source={{ uri: image }}
            />
        </TouchableOpacity>
      </View>
      <View style={[styles.mapDescription]}>
        <Text>{description}</Text>
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

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({    
    container: {
        height: 350,
        backgroundColor: 'white',
        // borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        // paddingVertical: 10,
        marginVertical: 5,
    },
    mapContainer: {
        flex: 1,
        padding: 5,
        
    },
    mapImage: {
        height: '100%',
        width: windowWidth - 32,
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