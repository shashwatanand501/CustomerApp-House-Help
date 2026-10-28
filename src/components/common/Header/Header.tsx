import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "../../../../assets/icons/logo.svg";

export default function Header() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Left — logo + tagline */}
            <View style={styles.brand}>
                <Logo width={80} height={28} fill="#FFFFFF" />
                <Text style={styles.tagline}>Home help in Patna</Text>
            </View>

            {/* Right — location */}
            <Pressable style={styles.location}>
                <Ionicons name="location-outline" size={14} color="#FFFFFF" />
                <View>
                    <Text style={styles.locationLabel}>Your location</Text>
                    <Text style={styles.locationCity}>Patna</Text>
                </View>
                <Ionicons name="chevron-down" size={14} color="#FFFFFF" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ce2626e2",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    brand: {
        gap: 2,
    },
    tagline: {
        fontSize: 11,
        color: "rgba(255,255,255,0.75)",
    },
    location: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    locationLabel: {
        fontSize: 10,
        color: "rgba(255,255,255,0.75)",
    },
    locationCity: {
        fontSize: 13,
        fontWeight: "600",
        color: "#FFFFFF",
    },
});
