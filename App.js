import React, { Component } from "react";
import { View, Text, StyleSheet, ListView, Platform, Image } from "react-native";
import Header from './header';
import ImageResult from './image_result';

export default class App extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      searchQuery: '',
      dataSource: ds
    }

    this.submitSearch = this.submitSearch.bind(this);
    this.renderListHeader = this.renderListHeader.bind(this);
    this.gifUrl = this.gifUrl.bind(this);
  }

  submitSearch() {
    fetch(`https://gifcities.archive.org/api/v1/gifsearch?q=${this.state.searchQuery}`)
      .then((res) => {
        res.json().then((resJson) => {
          console.log(resJson.slice(0,5));
          this.setState({dataSource: this.state.dataSource.cloneWithRows(resJson.slice(0,5))});
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
          <ListView
            enableEmptySections
            contentContainerStyle={styles.listContainer}
            style={styles.list}
            dataSource={this.state.dataSource}
            renderHeader={this.renderListHeader}
            renderRow={(data) => {
              return (
                <Image
                  source={{uri: this.gifUrl(data.gif)}}
                  resizeMode="cover"
                  style={{
                    width: (data.width > 300 ? 300 : undefined),
                    height: data.height,
                    margin: 15,
                    backgroundColor: "green"
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
    width: 500
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
  listContainer: {
    // borderWidth: 75,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'center',
    justifyContent: 'space-around'
  }
})

