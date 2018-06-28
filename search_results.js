import React, { Component } from "react";
import { View, 
		Text, 
		Image, 
		StyleSheet,
		TouchableHighlight,
		ScrollView,
		Platform } from "react-native";

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.gifUrl = this.gifUrl.bind(this);
    this.saveToCameraRoll = this.saveToCameraRoll.bind(this);
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

  render () {

  	return (
  		<View styles={styles.searchResultsWrapper}>
            { this.props.searchLoading ? 
	          (<View style={styles.searchLoadingWrapper}>
	             <Image
	               style={styles.searchSpinner}
	               source={require('./images/loading_images/loading2.gif')}/>
	           </View>) : 
	          (<ScrollView
	             contentContainerStyle={styles.contentContainerStyle}
	             keyboardDismissMode='on-drag'>
	               {this.props.data.map((item, idx) => {
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
  	)
  }
}

const styles = StyleSheet.create({
	searchResultsWrapper: {
		flex: 1,
	    alignSelf: 'stretch',
	    backgroundColor: "#F5F5F5",
	    ... Platform.select({
	      ios: {
	        paddingTop: 10
	      }
	    })
	},
	searchSpinner: {
	    width: 250,
  	},	
	searchLoadingWrapper: {
	    flex: 1,
	    flexDirection: 'row',
	    alignItems: 'center',
	    justifyContent: 'center',
	    top: "50%"
   	},
   	contentContainerStyle: {
	    paddingTop: 75,
	    flexWrap: 'wrap',
	    flexDirection: 'row',
	    justifyContent: 'space-around'
	}
})

export default SearchResults;