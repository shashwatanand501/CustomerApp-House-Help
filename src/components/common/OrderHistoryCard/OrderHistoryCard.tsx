import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Banner from "../Banner/Banner";

const ORDER_BANNER_COLOR = "#1C1917";

export function OrderHistoryCard() {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.title}>Active Order Details</Text>
            <Banner
                badgeText="IN PROGRESS"
                title="Deep Cleaning · 2 hrs"
                subtitle="Your helper is on the way. Track the visit live."
                backgroundColor={ORDER_BANNER_COLOR}
                buttonTitle="Track Order"
                onButtonPress={() => router.push("/(tabs)/Screen/LiveTracker" as any)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        gap: 12,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1C1917',
    },
})
