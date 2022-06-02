import React from "react";
import { StyleSheet, Dimensions, Linking, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: "https://www.queenssmile.co.kr" }}
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

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    ...Platform.select({
      ios: {
        marginTop: 30,
        paddingBottom: 20,
      },
    }),
  },
});
