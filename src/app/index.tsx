import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function HomeScreen() {
  // Get dynamic hardware insets (top, bottom, left, right)
  const insets = useSafeAreaInsets();

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
      <WebView source={{ uri: "https://sosay.org/" }} style={styles.webview} />
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
