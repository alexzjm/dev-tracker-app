import { StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Dev Tracker
      </Text>
      <Text style={styles.subtitle}>
        Track your development progress
      </Text>
      
      <View style={styles.loginButton}>
        <Text style={styles.buttonText}>Login with GitHub (Coming Soon)</Text>
      </View>
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