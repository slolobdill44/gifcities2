import React, { Component } from "react";
import { 
  View,
  TouchableHighlight, 
  Image, 
  Text, 
  StyleSheet, 
  TextInput, 
  Platform } from "react-native";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.header}>
        <TextInput
          returnKeyType='search'
          onChangeText={this.props.onChange}
          onSubmitEditing={this.props.submitSearch}
          style={styles.input}
          underlineColorAndroid={'transparent'}/>
        <TouchableHighlight
          onPress={this.props.submitSearch}
          style={styles.searchButton}>
            <Image 
              onPress={this.props.submitSearch}
              source={require('./images/searchbutton.jpg')} />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    position: 'absolute',
    backgroundColor: "white",
    zIndex: 2
  },
  input: {
    paddingLeft: 18,
    paddingRight: 18,
    fontSize: 18,
    borderWidth: 3,
    borderColor: 'black',
    flex: 1,
    height: 50,
    width: "100%",
    fontFamily: (Platform.OS === 'ios' ) ? 'Times New Roman' : 'serif',
    backgroundColor: "transparent",
    zIndex: 2
  },
  searchButton: {
    height: 22,
    width: 100,
    position: 'absolute',
    right: 18,
    zIndex: 3
  }
})

export default Header;
