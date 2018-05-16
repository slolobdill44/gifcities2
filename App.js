import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Platform, Image } from "react-native";
import Header from './header';
import ImageResult from './image_result';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      data: null
    }

    this.submitSearch = this.submitSearch.bind(this);
    this.renderListHeader = this.renderListHeader.bind(this);
    this.gifUrl = this.gifUrl.bind(this);
  }

  submitSearch() {
    fetch(`https://gifcities.archive.org/api/v1/gifsearch?q=${this.state.searchQuery}`)
      .then((res) => {
        res.json().then((resJson) => {
          //console.log(resJson.slice(0,30));
          let listData = resJson.slice(0,30);
          this.setState({data: listData});
        })
      })
      .then(() => console.log(this.state))
      .catch((error) => {
        console.error(error);
      });
  }

  renderListHeader() {
    return (
      <View style= {styles.contentClearSection}>
        <Text></Text>
      </View>
    )
  }

  gifUrl(string) {
    return "https://web.archive.org/web/" + string.slice(0,14) + "if_" + string.slice(14);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          onChange={(value) => this.setState({searchQuery: value})}
          submitSearch={this.submitSearch}/>
        <View style={styles.content}>
          <FlatList
            style={styles.list}
            data={this.state.data}
            ListHeaderComponent={this.renderListHeader}
            renderItem={({item}) => {
              //console.log(item);
              return (
                <Image
                  source={{uri: this.gifUrl(item.gif)}}
                  resizeMode="cover"
                  style={{
                    width: (item.width > 300) ? undefined : item.width,
                    height: item.height,
                    margin: 8,
                  }}/>
              )
            }} />
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
  contentClearSection: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    height: 75,
    width: 500,
    backgroundColor: 'green'
  },
  content: {
    top: 0,
    bottom: 0,
    position: 'absolute',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
    zIndex: 1
  },
  list: {
    flex: 1,
    flexWrap: 'wrap',
  },
  // listContainer: {
  //   // borderWidth: 75,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   alignItems:'center',
  //   justifyContent: 'space-around'
  // }
})

