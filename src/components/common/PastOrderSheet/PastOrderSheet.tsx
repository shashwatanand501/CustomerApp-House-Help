import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PastOrder } from '../../../types/booking';

interface PastOrderSheetProps {
    order: PastOrder | null;
    onClose?: () => void;
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
        </View>
    );
}

export const PastOrderSheet = forwardRef<BottomSheet, PastOrderSheetProps>(
    ({ order, onClose }, ref) => {
        const snapPoints = useMemo(() => ['60%', '85%'], []);

        if (!order) {
            return null;
        }

        const isCancelled = order.status === 'cancelled';
        const baseAmount = order.ratePerHour * order.hours;

        return (
            <BottomSheet
                ref={ref}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose
                onClose={onClose}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        disappearsOnIndex={-1}
                        appearsOnIndex={0}
                        opacity={0.45}
                    />
                )}
                handleIndicatorStyle={styles.dragHandle}
                backgroundStyle={styles.sheetBackground}
            >
                <BottomSheetScrollView contentContainerStyle={styles.sheetContent}>
                    {/* Service Title & Status Badge */}
                    <View style={styles.header}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.serviceName}>{order.serviceName}</Text>
                            <Text style={styles.orderId}>Order #{order.id}</Text>
                        </View>
                        <View style={[styles.statusBadge, isCancelled && styles.statusBadgeCancelled]}>
                            <Text style={[styles.statusText, isCancelled && styles.statusTextCancelled]}>
                                {isCancelled ? 'Cancelled' : 'Completed'}
                            </Text>
                        </View>
                    </View>

                    {/* Visit Details */}
                    <View style={styles.detailsBox}>
                        <DetailRow label="Date" value={`${order.date}, ${order.time}`} />
                        <DetailRow label="Duration" value={`${order.hours} hr`} />
                        <DetailRow label="Helper" value={order.helperName} />
                        <DetailRow label="Address" value={order.address} />
                        <DetailRow label="Payment" value={order.paymentMethod} />
                    </View>

                    {/* Cost Summary */}
                    <View style={styles.pricingDetails}>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Base Rate ({order.hours} hr × ₹{order.ratePerHour})</Text>
                            <Text style={styles.priceValue}>₹{baseAmount}</Text>
                        </View>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Platform Fee</Text>
                            <Text style={styles.priceValue}>₹{order.platformFee}</Text>
                        </View>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>GST (18%)</Text>
                            <Text style={styles.priceValue}>₹{order.gst}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>{isCancelled ? 'Refunded' : 'Total Paid'}</Text>
                        <Text style={styles.totalValue}>₹{order.total}</Text>
                    </View>
                </BottomSheetScrollView>
            </BottomSheet>
        );
    }
);

PastOrderSheet.displayName = 'PastOrderSheet';

const styles = StyleSheet.create({
    sheetBackground: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
    },
    dragHandle: {
        backgroundColor: '#CBD5E1',
        width: 40,
        height: 4,
        borderRadius: 2,
    },
    sheetContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
        gap: 12,
    },
    titleContainer: {
        flex: 1,
    },
    serviceName: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1C1917',
    },
    orderId: {
        fontSize: 12,
        color: '#78716C',
        marginTop: 4,
    },
    statusBadge: {
        backgroundColor: '#ECFDF5',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#A7F3D0',
    },
    statusBadgeCancelled: {
        backgroundColor: '#FDF1EE',
        borderColor: '#F8C8BD',
    },
    statusText: {
        color: '#047857',
        fontWeight: '700',
        fontSize: 12,
    },
    statusTextCancelled: {
        color: '#DE3F1B',
    },
    detailsBox: {
        backgroundColor: '#FAFAF9',
        padding: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E7E5E4',
        marginBottom: 16,
        gap: 10,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    detailLabel: {
        fontSize: 13,
        color: '#78716C',
    },
    detailValue: {
        flex: 1,
        fontSize: 13,
        fontWeight: '600',
        color: '#1C1917',
        textAlign: 'right',
    },
    pricingDetails: {
        gap: 8,
        marginBottom: 14,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priceLabel: {
        fontSize: 13,
        color: '#78716C',
    },
    priceValue: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1C1917',
    },
    divider: {
        height: 1,
        backgroundColor: '#E7E5E4',
        marginBottom: 14,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 13,
        color: '#78716C',
    },
    totalValue: {
        fontSize: 22,
        fontWeight: '800',
        color: '#DE3F1B',
    },
});
