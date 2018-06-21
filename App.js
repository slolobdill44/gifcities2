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
import SplashContent from './splash_content'

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
                { this.state.searchLoading ? 
          (<View style={styles.searchLoadingWrapper}>
             <Image
               style={styles.searchSpinner}
               source={require('./images/loading_images/loading2.gif')}/>
           </View>) : 
          (<ScrollView
             contentContainerStyle={styles.contentContainerStyle}
             keyboardDismissMode='on-drag'>
               {this.state.data.map((item, idx) => {
                 return (
                     <TouchableHighlight
                       key={idx}
                       onPress={() => this.saveToCameraRoll(item)}
                       underlayColor='transparent'>
                         <Image
                           source={{uri: this.gifUrl(item.gif)}}
                           style={{
                             width: item.width > 350 ? undefined : item.width,
                             height: item.height > 200 ? undefined : item.height,
                             margin: 7,
                             borderWidth: 10
                           }}
                         />
                     </TouchableHighlight>
                   )
               })}
           </ScrollView>) }
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

