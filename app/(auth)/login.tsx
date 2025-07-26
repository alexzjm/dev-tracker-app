import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = async () => {
    console.log("Starting OAuth login...");

    // GitHub OAuth URL
    const githubClientId = "Ov23lizR0v5pcl4Do2I1";
         const redirectUri = "devtrackerapp://success";

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=user:email`;

    console.log("Opening OAuth URL:", authUrl);
    console.log("Redirect URI:", redirectUri);

    try {
      // Use Expo's AuthSession for redirect handling
      WebBrowser.maybeCompleteAuthSession();

      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri
      );
      console.log("OAuth result:", result);

      console.log("Full OAuth result:", JSON.stringify(result, null, 2));
      
      if (result.type === "success") {
        console.log("OAuth SUCCESS!");
        const url = result.url;
        console.log("Full redirect URL:", url);

        // Parse the code from the URL
        try {
          const urlParams = new URL(url);
          const code = urlParams.searchParams.get("code");
          console.log("Extracted code:", code);

          if (code) {
            console.log("Authorization code received! Navigating to success screen...");
            // Manually navigate to success screen with the code
            router.push(`/(auth)/success?code=${code}`);
          } else {
            console.log("No code found in URL parameters");
            console.log("Available URL params:", [...urlParams.searchParams.entries()]);
          }
        } catch (error) {
          console.log("Error parsing URL:", error);
          console.log("Raw URL:", url);
        }
      } else if (result.type === "cancel") {
        console.log("User cancelled OAuth");
      } else if (result.type === "dismiss") {
        console.log("Browser was dismissed");
      } else {
        console.log("Unknown OAuth result type:", result.type);
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
