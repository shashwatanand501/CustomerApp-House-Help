
import { Ionicons } from "@expo/vector-icons";
import { Tabs, usePathname, useRouter } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../src/components/common/Header/Header";

const ACTIVE_COLOR = "#ce2626e2";
const INACTIVE_COLOR = "#94A3B8";

const TABS = [
  { name: "Screen/Home", label: "Home", icon: "home-outline" as const, iconFocused: "home" as const, route: "/Screen/Home" },
  { name: "Screen/LiveTracker", label: "Track", icon: "navigate-circle-outline" as const, iconFocused: "navigate-circle" as const, route: "/Screen/LiveTracker" },
  { name: "Screen/OrderHistory", label: "Orders", icon: "receipt-outline" as const, iconFocused: "receipt" as const, route: "/Screen/OrderHistory" },
  { name: "Screen/WalletProfile", label: "Profile", icon: "person-outline" as const, iconFocused: "person" as const, route: "/Screen/WalletProfile" },
] satisfies { name: string; label: string; icon: keyof typeof Ionicons.glyphMap; iconFocused: keyof typeof Ionicons.glyphMap; route: string }[];

function CustomFloatingTabBar() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();
  const bottom = Platform.OS === "ios" ? Math.max(insets.bottom, 16) : 16;

  return (
    <View style={[styles.tabBar, { bottom }]}>
      {TABS.map((tab) => {
        // Check if the current pathname matches the tab route
        const focused = pathname.includes(tab.name.split("/")[1]);

        const onPress = () => {
          if (!focused) {
            router.push(`/(tabs)/${tab.name}` as any);
          }
        };

        return (
          <Pressable
            key={tab.name}
            onPress={onPress}
            style={styles.tabItem}
            android_ripple={{ color: "transparent" }}
          >
            <View style={[styles.pill, focused && styles.pillActive]}>
              <Ionicons
                name={focused ? tab.iconFocused : tab.icon}
                size={22}
                color={focused ? "#FFFFFF" : INACTIVE_COLOR}
              />
              {focused && (
                <Text style={styles.pillLabel} numberOfLines={1}>
                  {tab.label}
                </Text>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ header: () => <Header />, }}
      tabBar={() => <CustomFloatingTabBar />}
    >
      {TABS.map(({ name, label }) => (
        <Tabs.Screen key={name} name={name} options={{ title: label }} />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 20,
    right: 20,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderRadius: 36,
    paddingHorizontal: 12,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 24,
  },
  pillActive: {
    backgroundColor: ACTIVE_COLOR,
  },
  pillLabel: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});