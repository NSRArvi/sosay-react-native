import { Platform, StyleSheet, View, BackHandler } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useRef, useState, useEffect } from "react";

export default function HomeScreen() {
  // Get dynamic hardware insets (top, bottom, left, right)
  const insets = useSafeAreaInsets();
  const webViewRef = useRef<WebView>(null);
  const canGoBackRef = useRef(false);

  useEffect(() => {
    if (Platform.OS === "android") {
      const onBackPress = () => {
        if (canGoBackRef.current && webViewRef.current) {
          webViewRef.current.goBack();
          return true; // Prevent default behavior (closing the app)
        }
        return false; // Allow default behavior
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }
  }, []);

  if (Platform.OS === "web") {
    return (
      <iframe
        src="https://sosay.org/"
        style={styles.webIframe as any}
        allowFullScreen
      />
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          // Applies precise padding for Pixel 7 camera punch-hole and status bar
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <WebView
        ref={webViewRef}
        source={{ uri: "https://sosay.org/" }}
        style={styles.webview}
        onNavigationStateChange={(navState) => {
          canGoBackRef.current = navState.canGoBack;
        }}
        allowsBackForwardNavigationGestures={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Adjust this if you have a specific color scheme!
  },
  webview: {
    flex: 1,
  },
  webIframe: {
    width: "100%",
    height: "100vh",
    borderWidth: 0,
  },
});
