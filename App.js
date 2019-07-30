import React, { Component } from 'react'
import { View, StyleSheet, StatusBar, Platform, BackHandler } from 'react-native'


import Gallery from './Gallery'
import ImageDetails from './ImageDetails'

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      images: [],
    };
  }

  async componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    const images = await response.json();
    this.setState({ 
      images: images,
      currentPage: 'grid',
      imageSelection: -1 
    });
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    if (!this.onMainScreen()) {
      this.goBack();
      return true;
    }
    return false;
  }

  onMainScreen = () => {
    const { currentPage } = this.state;
    if (currentPage === 'grid') return true;
    else return false;
  }

  goBack = () => {
    this.setState({
      imageSelection: -1,
      currentPage: 'grid'
    });
  }

  onPressGridItem = (index) => {
    this.setState({
      imageSelection: index,
      currentPage: 'imageDetails'
    });
  }

  render() {
    const {images, currentPage, imageSelection} = this.state;

    return (
      <View style={styles.main}>
        <StatusBar
        translucent
        backgroundColor="rgba(0, 0, 0, 0.24)"
        animated
        />
        { Platform.OS === 'android' && Platform.Version >= 20 ?
          <View style={{ height: 24, backgroundColor: "#BBB" }}/>
          : null 
        }
        {
          currentPage === 'grid' ?
          <Gallery images={images} onPressItem={this.onPressGridItem}/>
          : <ImageDetails image={images.find((element)=> element.id === imageSelection)}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  }
});