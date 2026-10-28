import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TrackingInfo } from '../../../types/booking';
import { Banner } from '../Banner/Banner';
import CustomButton from '../CustomButton/CustomButton';
import { HelperCard } from './HelperCard';
import { TrackingDetailsCard } from './TrackingDetailsCard';
import { TrackingTimeline } from './TrackingTimeline';

interface TrackingViewProps {
    tracking: TrackingInfo | null;
    bannerColor?: string;
    emptyTitle?: string;
    emptySubtitle?: string;
    // Each action renders only when its handler is passed
    onCallHelper?: () => void;
    onMessageHelper?: () => void;
    onCancelOrder?: () => void;
    onBookService?: () => void;
}

export function TrackingView({
    tracking,
    bannerColor,
    emptyTitle = 'No active orders',
    emptySubtitle = 'Book a service and you can track your helper here.',
    onCallHelper,
    onMessageHelper,
    onCancelOrder,
    onBookService,
}: TrackingViewProps) {
    if (!tracking) {
        return (
            <View style={styles.emptyState}>
                <View style={styles.emptyIcon}>
                    <Ionicons name="navigate-circle-outline" size={36} color="#ce2626e2" />
                </View>
                <Text style={styles.emptyTitle}>{emptyTitle}</Text>
                <Text style={styles.emptySubtitle}>{emptySubtitle}</Text>
                {onBookService ? (
                    <CustomButton title="Book a Service" size="md" onPress={onBookService} style={styles.emptyButton} />
                ) : null}
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.content}>
            {/* ETA status */}
            <Banner
                badgeText={tracking.statusLabel}
                title={tracking.etaText}
                subtitle={tracking.etaSubtext}
                backgroundColor={bannerColor}
            />

            {/* Start OTP */}
            {tracking.otp ? (
                <View style={styles.otpCard}>
                    <View style={styles.otpText}>
                        <Text style={styles.otpLabel}>Start OTP</Text>
                        <Text style={styles.otpHint}>Share with your helper when they arrive</Text>
                    </View>
                    <Text style={styles.otpValue}>{tracking.otp}</Text>
                </View>
            ) : null}

            <Text style={styles.sectionHeading}>Your Helper</Text>
            <HelperCard helper={tracking.helper} onCall={onCallHelper} onMessage={onMessageHelper} />

            <Text style={styles.sectionHeading}>Order Status</Text>
            <TrackingTimeline steps={tracking.steps} />

            <Text style={styles.sectionHeading}>Booking Details</Text>
            <TrackingDetailsCard
                serviceName={tracking.serviceName}
                serviceType={tracking.serviceType}
                orderId={tracking.orderId}
                scheduledTime={tracking.scheduledTime}
                hours={tracking.hours}
                address={tracking.address}
                total={tracking.total}
            />

            {onCancelOrder ? (
                <CustomButton
                    title="Cancel Order"
                    variant="outline"
                    size="md"
                    onPress={onCancelOrder}
                    style={styles.cancelButton}
                />
            ) : null}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: 16,
        paddingBottom: 110,
    },
    sectionHeading: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1C1917',
        marginTop: 22,
        marginBottom: 12,
    },
    otpCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 14,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#F8C8BD',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    otpText: {
        flex: 1,
    },
    otpLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1C1917',
    },
    otpHint: {
        fontSize: 12,
        color: '#78716C',
        marginTop: 2,
    },
    otpValue: {
        fontSize: 24,
        fontWeight: '800',
        color: '#DE3F1B',
        letterSpacing: 4,
    },
    cancelButton: {
        marginTop: 22,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        paddingBottom: 110,
    },
    emptyIcon: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#FDF1EE',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1C1917',
    },
    emptySubtitle: {
        fontSize: 13,
        color: '#78716C',
        textAlign: 'center',
        marginTop: 6,
        lineHeight: 18,
    },
    emptyButton: {
        marginTop: 20,
        paddingHorizontal: 28,
    },
});
