import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  // Listen for deep links when component mounts
  useEffect(() => {
    const handleDeepLink = (url: string) => {
      console.log("Deep link received:", url);

      if (url.includes("devtrackerapp://auth")) {
        const urlObj = new URL(url);
        const code = urlObj.searchParams.get("code");

        if (code) {
          console.log("Authorization code from deep link:", code);
          // TODO: Handle the code (exchange for token, etc.)
        }
      }
    };

    // Listen for deep links
    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleDeepLink(url);
    });

    // Check if app was opened with a deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });

    return () => subscription?.remove();
  }, []);

  const handleLogin = async () => {
    console.log("Starting OAuth login...");

    // GitHub OAuth URL
    const githubClientId = "Ov23lizR0v5pcl4Do2I1";
         const redirectUri = "devtrackerapp://login";

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=user:email`;

    console.log("Opening OAuth URL:", authUrl);
    console.log("Redirect URI:", redirectUri);

    try {
      // Use Expo's AuthSession for better redirect handling
      WebBrowser.maybeCompleteAuthSession();

      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri
      );
      console.log("OAuth result:", result);

      if (result.type === "success") {
        console.log("OAuth SUCCESS!");
        const url = result.url;
        console.log("Redirect URL:", url);

        // Parse the code from the URL
        const urlParams = new URL(url);
        const code = urlParams.searchParams.get("code");

        if (code) {
          console.log("Authorization code received:", code);
          // TODO: Send code to backend or exchange directly
          // For now, just log it
        } else {
          console.log("No code found in URL");
        }
      } else if (result.type === "cancel") {
        console.log("User cancelled OAuth");
      } else {
        console.log("Unknown OAuth result:", result.type);
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
