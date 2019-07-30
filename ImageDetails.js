import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, BackHandler } from 'react-native'

export default class ImageDetails extends Component {

  render() {
    const { image } = this.props
    if (!image) {
      return null;
    }

    return (
      <View>
        <Image source={{ uri: image.url }} style={styles.image}/>
        <Text style={styles.title}>{image.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width
  },
  title: {
    margin: 10
  }
})