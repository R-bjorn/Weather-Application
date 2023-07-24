import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions, Modal } from 'react-native'
import React, {useState} from 'react'
import Icon from '@expo/vector-icons/FontAwesome';
import ImageViewer from 'react-native-image-zoom-viewer';

const Maps = ({ image, description }) => {
  const [isMapClicked, setMapClicked] = useState(false);

  return (
    <View style={[styles.container]}>
      {/* <Text>Map </Text> */}
      {/* Map Image */}
      <View style={[styles.mapContainer]}>
        <TouchableOpacity
          onPress={() => {setMapClicked(true)}}
        >
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

      {/* Map Image Modal Overview */}
      <Modal 
        visible={isMapClicked}
        transparent={true}
        onRequestClose={() => {setMapClicked(false)}}
        animationType='fade'
        // presentationStyle='pageSheet'
      >
        <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.8)'}}>
          {/* Back Button */}
          <TouchableOpacity 
            style={{marginHorizontal: 15}}
            onPress={() => {setMapClicked(false)}}  
          >
            <Icon name='times' size={40} style={{color:'white'}}/>
          </TouchableOpacity>
          {/* Pinchable Image */}
          <ImageViewer 
            imageUrls={[{url: image, props: {}}]}
            backgroundColor='rgba(0,0,0,0)'
            renderIndicator={() => null}        
          />
        </SafeAreaView>
      </Modal>
    </View>
  )
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({    
    container: {
        height: 450,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        marginVertical: 5,
    },
    mapContainer: {
        flex: 1,
        padding: 5,
        
    },
    mapImage: {
        height: "100%",
        width: windowWidth - 32,
        resizeMode: 'cover'
    },
    mapDescription: {
        marginBottom: 10,
        padding: 5,
        width: windowWidth - 32
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingHorizontal: 5,
        paddingBottom: 10
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