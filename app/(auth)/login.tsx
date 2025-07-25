import * as WebBrowser from "expo-web-browser";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const handleLogin = async () => {
    // GitHub OAuth URL
    const githubClientId = "Ov23lizR0v5pcl4Do2I1";
    const redirectUri = "devtrackerapp://auth";

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=user:email`;

    try {
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri
      );
      console.log("OAuth result:", result);

      if (result.type === "success") {
        // Extract the authorization code from the URL
        const url = result.url;
        console.log("Redirect URL:", url);

        // Parse the code from the URL
        const urlParams = new URL(url);
        const code = urlParams.searchParams.get("code");

        if (code) {
          console.log("Authorization code:", code);
          // TODO: Send code to backend or exchange directly
          // For now, just log it
        }
      }
    } catch (error) {
      console.error("OAuth error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Dev Tracker</Text>
          <Text style={styles.subtitle}>Track your development progress</Text>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Continue with GitHub</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 16,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    fontWeight: "400",
  },
  loginButton: {
    borderWidth: 1,
    borderColor: "#333333",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 6,
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});
