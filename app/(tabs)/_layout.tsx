import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: 'Dashboard' }} />
            <Tabs.Screen name="timeline" options={{ title: 'Timeline' }} />
            {/* <Tabs.Screen name="goals" options={{ title: 'Goals' }} /> */}
            {/* <Tabs.Screen name="insights" options={{ title: 'Insights' }} /> */}
            <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
        </Tabs>
    )
}