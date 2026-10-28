import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { TrackingStep } from '../../../types/booking';

interface TrackingTimelineProps {
    steps: TrackingStep[];
}

export function TrackingTimeline({ steps }: TrackingTimelineProps) {
    return (
        <View style={styles.card}>
            {steps.map((step, index) => {
                const isLast = index === steps.length - 1;
                const isDone = step.status === 'done';
                const isActive = step.status === 'active';

                return (
                    <View key={step.id} style={styles.row}>
                        {/* Dot + connector line */}
                        <View style={styles.markerColumn}>
                            <View
                                style={[
                                    styles.dot,
                                    isDone && styles.dotDone,
                                    isActive && styles.dotActive,
                                ]}
                            >
                                {isDone ? <Ionicons name="checkmark" size={12} color="#FFFFFF" /> : null}
                                {isActive ? <View style={styles.dotActiveInner} /> : null}
                            </View>
                            {!isLast ? <View style={[styles.line, isDone && styles.lineDone]} /> : null}
                        </View>

                        <View style={[styles.textBlock, !isLast && styles.textBlockSpacing]}>
                            <View style={styles.titleRow}>
                                <Text
                                    style={[
                                        styles.title,
                                        step.status === 'pending' && styles.titlePending,
                                        isActive && styles.titleActive,
                                    ]}
                                >
                                    {step.title}
                                </Text>
                                {step.time ? <Text style={styles.time}>{step.time}</Text> : null}
                            </View>
                            {step.subtitle ? <Text style={styles.subtitle}>{step.subtitle}</Text> : null}
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

const DOT_SIZE = 22;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#E7E5E4',
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    markerColumn: {
        alignItems: 'center',
        width: DOT_SIZE,
    },
    dot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        borderWidth: 2,
        borderColor: '#D6D3D1',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotDone: {
        backgroundColor: '#ce2626e2',
        borderColor: '#ce2626e2',
    },
    dotActive: {
        borderColor: '#ce2626e2',
    },
    dotActiveInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ce2626e2',
    },
    line: {
        flex: 1,
        width: 2,
        minHeight: 18,
        backgroundColor: '#E7E5E4',
        marginVertical: 2,
    },
    lineDone: {
        backgroundColor: '#ce2626e2',
    },
    textBlock: {
        flex: 1,
        paddingTop: 1,
    },
    textBlockSpacing: {
        paddingBottom: 18,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    title: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1917',
    },
    titleActive: {
        fontWeight: '800',
        color: '#DE3F1B',
    },
    titlePending: {
        color: '#A8A29E',
    },
    time: {
        fontSize: 12,
        color: '#78716C',
    },
    subtitle: {
        fontSize: 12,
        color: '#78716C',
        marginTop: 2,
        lineHeight: 16,
    },
});
