import { StyleSheet, Text, View } from 'react-native';
import { getServiceIcon, ServiceType } from '../CustomButton/CustomButton';

interface TrackingDetailsCardProps {
    serviceName: string;
    serviceType: ServiceType;
    orderId: string;
    scheduledTime: string;
    hours: number;
    address: string;
    total: number;
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
        </View>
    );
}

export function TrackingDetailsCard({
    serviceName,
    serviceType,
    orderId,
    scheduledTime,
    hours,
    address,
    total,
}: TrackingDetailsCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.iconCircle}>{getServiceIcon(serviceType, '#ce2626e2', 18)}</View>
                <View style={styles.headerText}>
                    <Text style={styles.serviceName}>{serviceName}</Text>
                    <Text style={styles.orderId}>Order #{orderId}</Text>
                </View>
            </View>

            <View style={styles.rows}>
                <DetailRow label="Scheduled" value={scheduledTime} />
                <DetailRow label="Duration" value={`${hours} hr`} />
                <DetailRow label="Address" value={address} />
            </View>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Payable</Text>
                <Text style={styles.totalValue}>₹{total}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#E7E5E4',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 14,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FDF1EE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        flex: 1,
    },
    serviceName: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1C1917',
    },
    orderId: {
        fontSize: 12,
        color: '#78716C',
        marginTop: 2,
    },
    rows: {
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
    divider: {
        height: 1,
        backgroundColor: '#E7E5E4',
        marginVertical: 14,
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
        fontSize: 20,
        fontWeight: '800',
        color: '#DE3F1B',
    },
});
