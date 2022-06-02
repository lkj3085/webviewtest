import React, { Component, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  Linking,
  Platform,
  Alert,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";

export default class App extends Component {
  getLocation = async () => {
    try {
      const response = await Location.requestForegroundPermissionsAsync();
      console.log(response);
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      // console.log(latitude, longitude);
      alert(latitude);
      alert(longitude);
    } catch (error) {
      Alert.alert("얘러");
    }
  };
  componentDidMount() {
    try {
      this.webView.postMessage(this.getLocation());
    } catch (e) {
      console.log(e);
    }
  }
  // componentDidMount() {
  // setInterval(() => {
  //   try {
  //     this.webView.postMessage(this.getLocation());
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, 10000);
  // }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <WebView
          ref={(view) => (this.webView = view)}
          source={{ uri: "http://localhost:3000/" }}
          originWhitelist={[""]}
          onShouldStartLoadWithRequest={(e) => {
            if (e.url.startsWith("supertoss://")) {
              Linking.openURL(e.url);
              return false;
            }
            return true;
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    ...Platform.select({
      ios: {
        marginTop: 35,
        paddingBottom: 50,
      },
    }),
    webView: {
      flex: 1,
    },
  },
});
