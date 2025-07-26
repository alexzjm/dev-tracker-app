import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SuccessScreen() {
  const { code } = useLocalSearchParams();
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState('loading'); // 'loading' | 'success' | 'auth-error' | 'backend-error'
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (code) {
      console.log("Success screen received code:", code);
      exchangeCodeForToken(code as string);
    }
  }, [code]);

  const exchangeCodeForToken = async (authCode: string) => {
    try {
      setAuthStatus('loading');
      console.log("Sending code to backend...");
      
      const codeExchangeUrl = 'https://dev-tracker-backend.vercel.app/api/auth/exchange-code';
      
      const response = await fetch(codeExchangeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: authCode
        })
      });

      if (response.ok) {
        const tokenData = await response.json();
        console.log("Backend response:", tokenData);
        setAuthStatus('success')
        
        const getUserDataUrl = 'https://dev-tracker-backend.vercel.app/api/github/user';
        const userResponse = await fetch(getUserDataUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`
          }
        });

        if (userResponse.ok) {
            const rawUserData = await userResponse.json();
            console.log("Backend response:", rawUserData);
            
            setUserData(rawUserData.user);
            setAuthStatus('success');
            
            // Auto-navigate to main app after 3 seconds
            setTimeout(() => {
              router.replace('/(tabs)');
            }, 3000);
            
          } else {
            console.log("Backend error:", userResponse.status);
            setAuthStatus('backend-error');
          }
      } else {
        console.log("Backend error:", response.status);
        setAuthStatus('auth-error');
      }
    } catch (error) {
      console.error("Network error:", error);
      setAuthStatus('error');
    }
  };

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  const handleRetry = () => {
    router.replace('/(auth)/login');
  };

  if (authStatus === 'loading') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Connecting to GitHub...</Text>
      </View>
    );
  }

  if (authStatus === 'auth-error') {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Login Failed</Text>
        <Text style={styles.errorText}>Something went wrong. Please try again.</Text>
        <TouchableOpacity style={styles.button} onPress={handleRetry}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (authStatus === 'backend-error') {
    return (
        <View style={styles.container}>
            <Text style={styles.errorTitle}>Server Error</Text>
            <Text style={styles.errorText}>Failed to fetch user data. Please try again.</Text>
            <TouchableOpacity style={styles.button} onPress={handleRetry}>
                <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.successContent}>
        <Text style={styles.successTitle}>Welcome!</Text>
        {userData && (
          <>
            <Text style={styles.userName}>{userData.name || userData.login}</Text>
            <Text style={styles.userHandle}>@{userData.login}</Text>
          </>
        )}
        <Text style={styles.redirectText}>Taking you to your dashboard...</Text>
        
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 16,
    marginTop: 20,
  },
  successContent: {
    alignItems: "center",
  },
  successTitle: {
    fontSize: 32,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "500",
    color: "#ffffff",
    marginBottom: 8,
  },
  userHandle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 40,
  },
  redirectText: {
    color: "#666666",
    fontSize: 14,
    marginBottom: 30,
    textAlign: "center",
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ff4444",
    marginBottom: 16,
  },
  errorText: {
    color: "#666666",
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
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
  },
}); 