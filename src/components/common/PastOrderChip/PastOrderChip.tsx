import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PastOrder } from '../../../types/booking';
import { getServiceIcon } from '../CustomButton/CustomButton';

interface PastOrderChipProps {
    order: PastOrder;
    onPress: (order: PastOrder) => void;
}

export function PastOrderChip({ order, onPress }: PastOrderChipProps) {
    const isCancelled = order.status === 'cancelled';

    return (
        <Pressable
            onPress={() => onPress(order)}
            style={({ pressed }) => [styles.chip, pressed && styles.chipPressed]}
            android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
        >
            <View style={styles.iconCircle}>
                {getServiceIcon(order.serviceType, '#ce2626e2', 16)}
            </View>

            <View style={styles.textBlock}>
                <Text style={styles.name} numberOfLines={1}>{order.serviceName}</Text>
                <Text style={styles.meta} numberOfLines={1}>
                    {order.date} · {isCancelled ? 'Cancelled' : `₹${order.total}`}
                </Text>
            </View>

            <Ionicons name="chevron-forward" size={16} color="#A8A29E" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E7E5E4',
        borderRadius: 999,
        paddingVertical: 8,
        paddingLeft: 8,
        paddingRight: 14,
    },
    chipPressed: {
        backgroundColor: '#FDF1EE',
        borderColor: '#F8C8BD',
    },
    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FDF1EE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBlock: {
        flex: 1,
    },
    name: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1C1917',
    },
    meta: {
        fontSize: 12,
        color: '#78716C',
        marginTop: 1,
    },
});
