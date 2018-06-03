import React, { Component } from "react";
import { View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Platform,
  TouchableHighlight, 
  CameraRoll, 
  Alert,
  ToastAndroid,
  Image } from "react-native";
import RNFetchBlob from 'react-native-fetch-blob';
import Header from './header';
import ImageResult from './image_result';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      data: []
    }

    this.renderListHeader = this.renderListHeader.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.gifUrl = this.gifUrl.bind(this);
    this.saveToCameraRoll = this.saveToCameraRoll.bind(this);
  }

  renderListHeader() {
    return (
      <View style={styles.contentClearSection}>
        <Text>This is the</Text>
      </View>
    )
  }

  submitSearch() {
    if (this.state.searchQuery === '') {
      return;
    } else {
          fetch(`https://gifcities.archive.org/api/v1/gifsearch?q=${this.state.searchQuery}`)
      .then((res) => {
        res.json().then((resJson) => {
          let listData = resJson.slice(0,30);
          this.setState({data: listData});
        })
      })
      .then(() => console.log(this.state))
      .catch((error) => {
        console.error(error);
      });
    }
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
        appendExt : 'gif'
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
        <View style={styles.contentWrapper}>
          <ScrollView
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
          </ScrollView>
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
  contentWrapper: {
    top: 0,
    bottom: 0,
    flex: 1
  },
  contentContainerStyle: {
    paddingTop: 75,
    flexWrap: 'wrap',
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent: 'space-around'
  },
  // listContainer: {
  //   // borderWidth: 75,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   alignItems:'center',
  //   justifyContent: 'space-around'
  // }
})

