import { Ionicons } from '@expo/vector-icons';
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ServiceDetail } from '../../../../src/types/booking';
import CustomButton from '../CustomButton/CustomButton';

interface ServiceBookingSheetProps {
    service: ServiceDetail | null;
    onConfirmBooking: (bookingPayload: {
        service: ServiceDetail;
        hours: number;
        subtotal: number;
        platformFee: number;
        gst: number;
        total: number;
    }) => void;
    onClose?: () => void;
}

export const ServiceBookingSheet = forwardRef<BottomSheet, ServiceBookingSheetProps>(
    ({ service, onConfirmBooking, onClose }, ref) => {
        const [hours, setHours] = useState(1);
        const snapPoints = useMemo(() => ['55%', '85%'], []);

        // Sync default hours when service changes
        useEffect(() => {
            if (service) {
                setHours(service.minHours);
            }
        }, [service]);

        if (!service) {
            return null;
        }

        // Calculations based on the active service details passed
        const platformFee = 29;
        const baseAmount = service.baseRatePerHour * hours;
        const subtotal = baseAmount + platformFee;
        const gst = Math.round(subtotal * 0.18);
        const grandTotal = subtotal + gst;

        const handleDecrement = () => {
            if (hours > service.minHours) setHours((h) => h - 1);
        };

        const handleIncrement = () => {
            if (hours < service.maxHours) setHours((h) => h + 1);
        };

        const handleConfirm = () => {
            onConfirmBooking({
                service,
                hours,
                subtotal: baseAmount,
                platformFee,
                gst,
                total: grandTotal,
            });
        };

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
                <BottomSheetView style={styles.sheetContent}>
                    {/* Service Title & Base Rate Badge */}
                    <View style={styles.header}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.serviceName}>{service.name}</Text>
                            <Text style={styles.serviceDescription}>{service.description}</Text>
                        </View>
                        <View style={styles.rateBadge}>
                            <Text style={styles.rateBadgeText}>₹{service.baseRatePerHour}/hr</Text>
                        </View>
                    </View>

                    {/* Hour Selector Card */}
                    <View style={styles.counterBox}>
                        <View>
                            <Text style={styles.counterTitle}>Selected Hours</Text>
                            <Text style={styles.counterSubtitle}>
                                Min {service.minHours} hr · Max {service.maxHours} hrs
                            </Text>
                        </View>

                        <View style={styles.counterControls}>
                            <TouchableOpacity
                                style={[styles.counterBtn, hours <= service.minHours && styles.counterBtnDisabled]}
                                onPress={handleDecrement}
                                disabled={hours <= service.minHours}
                            >
                                <Text style={styles.counterBtnText}>−</Text>
                            </TouchableOpacity>

                            <Text style={styles.hourDisplay}>{hours} hr</Text>

                            <TouchableOpacity
                                style={[styles.counterBtn, hours >= service.maxHours && styles.counterBtnDisabled]}
                                onPress={handleIncrement}
                                disabled={hours >= service.maxHours}
                            >
                                <Text style={styles.counterBtnText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Dynamic Cost Summary */}
                    <View style={styles.pricingDetails}>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Base Rate ({hours} hr × ₹{service.baseRatePerHour})</Text>
                            <Text style={styles.priceValue}>₹{baseAmount}</Text>
                        </View>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Platform Fee</Text>
                            <Text style={styles.priceValue}>₹{platformFee}</Text>
                        </View>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>GST (18%)</Text>
                            <Text style={styles.priceValue}>₹{gst}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Bottom Total & Booking Button */}
                    <View style={styles.actionFooter}>
                        <View>
                            <Text style={styles.totalLabel}>Total Payable</Text>
                            <Text style={styles.totalValue}>₹{grandTotal}</Text>
                        </View>

                        <CustomButton
                            title="Confirm & Request"
                            variant="primary"
                            size="md"
                            rightIcon={<Ionicons name="arrow-forward" size={18} color="#FFFFFF" />}
                            onPress={handleConfirm}
                        />
                    </View>
                </BottomSheetView>
            </BottomSheet>
        );
    }
);

ServiceBookingSheet.displayName = 'ServiceBookingSheet';

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
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
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
    serviceDescription: {
        fontSize: 12,
        color: '#78716C',
        marginTop: 4,
        lineHeight: 16,
    },
    rateBadge: {
        backgroundColor: '#FDF1EE',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F8C8BD',
    },
    rateBadgeText: {
        color: '#DE3F1B',
        fontWeight: '700',
        fontSize: 13,
    },
    counterBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FAFAF9',
        padding: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E7E5E4',
        marginBottom: 16,
    },
    counterTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1C1917',
    },
    counterSubtitle: {
        fontSize: 11,
        color: '#A8A29E',
        marginTop: 2,
    },
    counterControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    counterBtn: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E7E5E4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    counterBtnDisabled: {
        opacity: 0.35,
    },
    counterBtnText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1C1917',
        lineHeight: 20,
    },
    hourDisplay: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1C1917',
        minWidth: 36,
        textAlign: 'center',
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
    actionFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 20,
    },
    totalLabel: {
        fontSize: 11,
        color: '#78716C',
    },
    totalValue: {
        fontSize: 22,
        fontWeight: '800',
        color: '#DE3F1B',
    },
});