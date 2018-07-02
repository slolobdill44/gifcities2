import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

class SplashContent extends Component {
  constructor(props) {
    super(props);
  }

  render () {

  	return (
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
  	)
  }
}

const styles = StyleSheet.create({
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
    justifyContent: 'space-around'
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
})

export default SplashContent;