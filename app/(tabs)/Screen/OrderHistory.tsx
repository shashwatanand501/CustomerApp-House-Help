import { OrderHistoryCard } from "@/components/common/OrderHistoryCard/OrderHistoryCard";
import { PastOrderChip } from "@/components/common/PastOrderChip/PastOrderChip";
import { PastOrderSheet } from "@/components/common/PastOrderSheet/PastOrderSheet";
import { PAST_ORDERS, PastOrder } from "@/types/booking";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function OrderHistory() {
  const sheetRef = useRef<BottomSheet>(null);
  const [selectedOrder, setSelectedOrder] = useState<PastOrder | null>(null);

  const handleOrderPress = (order: PastOrder) => {
    setSelectedOrder(order);
    sheetRef.current?.expand();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <OrderHistoryCard />

        <View style={styles.pastSection}>
          <Text style={styles.sectionHeading}>Past Orders</Text>
          <View style={styles.chipList}>
            {PAST_ORDERS.map((order) => (
              <PastOrderChip key={order.id} order={order} onPress={handleOrderPress} />
            ))}
          </View>
        </View>
      </ScrollView>

      <PastOrderSheet
        ref={sheetRef}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F8' },
  content: { padding: 16, paddingBottom: 110 },
  pastSection: { marginTop: 24 },
  sectionHeading: { fontSize: 17, fontWeight: '700', color: '#1C1917', marginBottom: 12 },
  chipList: { gap: 10 },
});
