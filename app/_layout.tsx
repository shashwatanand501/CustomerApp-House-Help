import { store, useAppSelector } from "@/store";
import { Stack } from "expo-router/stack";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from "react-redux";

function RootNavigator() {
    const isLoggedIn = useAppSelector((s) => s.auth.isLoggedIn);

    return (
        <GestureHandlerRootView>

            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Protected guard={!isLoggedIn} redirectTo="/(tabs)/Screen/Home">
                    <Stack.Screen name="(auth)" />
                </Stack.Protected>
                <Stack.Protected guard={isLoggedIn} redirectTo="/(auth)/login">
                    <Stack.Screen name="(tabs)" />
                </Stack.Protected>
            </Stack></GestureHandlerRootView>
    );
}

export default function RootLayout() {
    return (
        <Provider store={store}>
            <RootNavigator />
        </Provider>
    );
}