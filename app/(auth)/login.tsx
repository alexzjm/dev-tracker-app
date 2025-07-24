import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const handleLogin = async () => {
    console.log('Login button pressed!');
    
    // GitHub OAuth URL
    // const githubClientId = 'Ov23lizR0v5pcl4Do2I1';
    // const redirectUri = 'http://localhost:3000/api/auth/github'; 
    
    // const authUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=user:email`;
    
    // try {
    //   const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
    //   console.log('OAuth result:', result);
      
    //   if (result.type === 'success') {
    //     // Extract the authorization code from the URL
    //     const url = result.url;
    //     console.log('Redirect URL:', url);
    //     // You'll parse the code from the URL and send it to your backend
    //   }
    // } catch (error) {
    //   console.error('OAuth error:', error);
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Dev Tracker
      </Text>
      <Text style={styles.subtitle}>
        Track your development progress
      </Text>
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login with GitHub</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 40,
    textAlign: 'center',
  },
  loginButton: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: '#333',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
}); 