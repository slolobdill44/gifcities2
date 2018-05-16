import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Platform } from "react-native";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.header}>
        <TextInput
          placeholder='Search all gifs...'
          returnKeyType='search'
          onChangeText={this.props.onChange}
          onSubmitEditing={this.props.submitSearch}
          style={styles.input}
          underlineColorAndroid={'transparent'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: 'absolute',
    backgroundColor: "white",
    zIndex: 3
  },
  input: {
    paddingLeft: 18,
    paddingRight: 18,
    fontSize: 18,
    borderWidth: 3,
    borderColor: 'black',
    flex: 1,
    height: 50,
    fontFamily: (Platform.OS === 'ios' ) ? 'Times New Roman' : 'serif',
    backgroundColor: "transparent",
  }
})

export default Header;
