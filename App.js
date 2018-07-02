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
import SplashContent from './splash_content';
import SearchResults from './search_results';

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

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.navigationWrapper}>
          <View style={styles.navigationTextWrapper}>
            <Text style={styles.navHomeText}>Home</Text>
            <Text style={styles.navText}>About</Text>
            <Text style={styles.navText}>$$</Text>
          </View>
          <Image 
            source={require('./images/dollarspindownd.gif')}
            style={styles.spinningDollar}/>
        </View>
        <Header
          onChange={(value) => this.setState({searchQuery: value})}
          submitSearch={this.submitSearch}/>
        { this.state.searchQuery === '' ? 
          <SplashContent /> :
          <SearchResults 
            searchLoading={this.state.searchLoading}
            data={this.state.data}/>
        }
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
    backgroundColor: '#F5F5F5',
    ... Platform.select({
      ios: {
        paddingTop: 10
      }
    })
  },
  navigationWrapper: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  navigationTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
  },
  navHomeText: {
    color: 'teal',
    fontWeight: 'bold',
    fontSize: 20
  },
  navText: {
    color: 'teal',
    fontSize: 20
  },
  spinningDollar: {
    height: 30,
    width: 35
  },
  contentWrapper: {
    top: 0,
    bottom: 0,
    flex: 1
  },
})

