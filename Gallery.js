import React, { Component } from 'react'
import { Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native'

export default class Gallery extends Component {
  
  keyExtractor = (item) => item.id;
  
  renderItem = (item) => {
    const { onPressItem } = this.props
    const image = item.item;

    return (
      <TouchableOpacity onPress={() => onPressItem(image.id)}>
          <Image source={{ uri: image.thumbnailUrl }} style={styles.image}/>
      </TouchableOpacity>
    );
  }

  render() {
    const { images } = this.props
    if(!images) {
      return null;
    }

    return (
      <FlatList style={styles.flatListStyle} data={images} numColumns={2} renderItem={this.renderItem} keyExtractor={this.keyExtractor}/>
    );
  }
}

const styles = StyleSheet.create({ 
  image: {
    width: 150,
    height: 150,
    margin: (Dimensions.get('window').width - 300) / 4,
  },
  flatListStyle: { 
    flex: 1,
  }
});