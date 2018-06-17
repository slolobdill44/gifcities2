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
        <View style={styles.splashAlign}>
          <View style={styles.splashContainer}>
            <View style={styles.upperSplashContainer}>
              <Text style={styles.mainTitleText}>GifCities</Text>
              <Text style={styles.mainTitleDescription}>The GeoCities Animated GIF Search Engine</Text>
              <Text style={styles.mainTitleSubText}>From the Internet Archive</Text>
              <Image 
                source={require('./images/spinning-internetarchive.gif')}/>
            </View>
            <View style={styles.lowerSplashContainer}>
              <Text style={styles.lowerSplashText}>GifCities is a special project of the Internet Archive to celebrate 20 years of preserving the web. Internet Archive is a non-profit digital library of millions of free books, movies, software, music, websites, and more. Please donate to help us in our efforts to provide “Universal Access to All Knowledge” including GIFs.</Text>
            </View>
          </View>
        </View>
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'serif'
  },
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
  splashAlign: {
    flex: 1,
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center'
  },
  splashContainer: {
    height: '90%',
    alignSelf: 'flex-end',
    justifyContent: 'space-between'
  },
  upperSplashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  mainTitleText: {
    fontSize: 72,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: 'teal',
    fontFamily: 'serif'
  },
  mainTitleDescription: {
    fontSize: 24,
    color: '#999',
    textAlign: 'center'
  },
  mainTitleSubText: {
    fontSize: 16,
    color: 'black'
  },
  lowerSplashContainer: {
    height: '35%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  lowerSplashText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center'
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

