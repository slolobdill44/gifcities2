import React, { Component } from "react";
import { Alert,
  CameraRoll, 
  Image, 
  Keyboard,
  Modal, 
  Platform,
  ScrollView, 
  StyleSheet,
  Text, 
  ToastAndroid,
  TouchableHighlight,
  View } from "react-native";
import RNFetchBlob from 'react-native-fetch-blob';
import Header from './header';
import ImageResult from './image_result';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      searchLoading: false,
      data: []
    }

    this.submitSearch = this.submitSearch.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
    this.gifUrl = this.gifUrl.bind(this);
    this.saveToCameraRoll = this.saveToCameraRoll.bind(this);
  }

  async submitSearch() {
    if (this.state.searchQuery === '') {
      return;
    } else {
      Keyboard.dismiss();

      try {
        this.setState({searchLoading: true});
        let gifQuery = await fetch(`https://gifcities.archive.org/api/v1/gifsearch?q=${this.state.searchQuery}`);
        let resultJson = await gifQuery.json();
        let listData = await resultJson.slice(0,30);
        this.setState({data: listData});
        this.setState({searchLoading: false});
      } catch (error) {
        console.error(error);
      }
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  gifUrl(string) {
    return "https://web.archive.org/web/" + string.slice(0,14) + "if_" + string.slice(14);
  }

  saveToCameraRoll(image) {
    const gifUrl = this.gifUrl(image.gif);

    if (Platform.OS === 'android') {
      RNFetchBlob
      .config({
        fileCache : true,
        appendExt : 'png'
      })
      .fetch('GET', gifUrl)
      .then((res) => {
        CameraRoll.saveToCameraRoll(res.path())
          .then(ToastAndroid.show('Photo added to camera roll!', ToastAndroid.LONG))
          .catch(err => console.log('err:', err))
      })
    } else {
      CameraRoll.saveToCameraRoll(gifUrl)
        .then(Alert.alert('Success', 'Photo added to camera roll!'))
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Header
          onChange={(value) => this.setState({searchQuery: value})}
          submitSearch={this.submitSearch}/>
        <View style={styles.splashAlignBottom}>
          <View style={styles.splashContainer}>
            <View style={styles.upperModalText}>
              <Text style={styles.mainTitleText}>GifCities</Text>
              <Text>The GeoCities Animated GIF Search Engine</Text>
              <Text>From the Internet Archive</Text>
            </View>
            <View style={styles.lowerModalText}>
              <Text>GifCities is a special project of the Internet Archive to celebrate 20 years of preserving the web. Internet Archive is a non-profit digital library of millions of free books, movies, software, music, websites, and more. Please donate to help us in our efforts to provide “Universal Access to All Knowledge” including GIFs.</Text>
            </View>
          </View>
        </View>
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: "#F5F5F5",
    ... Platform.select({
      ios: {
        paddingTop: 10
      }
    })
  },
  splashAlignBottom: {
    flex: 1,
    flexDirection: 'row',
  },
  splashContainer: {
    height: '80%',
    borderWidth: 5,
    borderColor: 'red',
    alignSelf: 'flex-end'
  },
  upperModalText: {
    flex: 1
  },
  lowerModalText: {
    flex: 1
  },
  contentWrapper: {
    top: 0,
    bottom: 0,
    flex: 1
  },
  searchLoadingWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchSpinner: {
    width: 300,
    height: 350,
  },
  contentContainerStyle: {
    paddingTop: 75,
    flexWrap: 'wrap',
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent: 'space-around'
  }
})

