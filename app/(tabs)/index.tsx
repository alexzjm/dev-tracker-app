import * as WebBrowser from "expo-web-browser";
import { StyleSheet, Text, View } from "react-native";

export default function Dashboard() {

    return (
        <View>
            <Text>Dashboard</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});