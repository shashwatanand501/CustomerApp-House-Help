import { TrackingView } from "@/components/common/Tracking/TrackingView";
import { ACTIVE_TRACKING } from "@/types/booking";
import { router } from "expo-router";
import { Linking, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LiveTracker() {
  const tracking = ACTIVE_TRACKING;

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <TrackingView
        tracking={tracking}
        onCallHelper={() => Linking.openURL(`tel:${tracking.helper.phone}`)}
        onMessageHelper={() => Linking.openURL(`sms:${tracking.helper.phone}`)}
        onCancelOrder={() => console.log("Cancel order:", tracking.orderId)}
        onBookService={() => router.push("/(tabs)/Screen/Home" as any)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F8' },
});
