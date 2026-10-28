import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { HelperInfo } from '../../../types/booking';

interface HelperCardProps {
    helper: HelperInfo;
    // Action buttons render only when their handler is passed
    onCall?: () => void;
    onMessage?: () => void;
}

export function HelperCard({ helper, onCall, onMessage }: HelperCardProps) {
    const initials = helper.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <View style={styles.card}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{helper.name}</Text>
                <View style={styles.metaRow}>
                    <Ionicons name="star" size={12} color="#F59E0B" />
                    <Text style={styles.meta}>
                        {helper.rating.toFixed(1)} · {helper.jobsCompleted} jobs
                    </Text>
                </View>
            </View>

            {onMessage ? (
                <Pressable style={styles.actionBtn} onPress={onMessage} hitSlop={6}>
                    <Ionicons name="chatbubble-ellipses-outline" size={18} color="#ce2626e2" />
                </Pressable>
            ) : null}
            {onCall ? (
                <Pressable style={[styles.actionBtn, styles.callBtn]} onPress={onCall} hitSlop={6}>
                    <Ionicons name="call" size={18} color="#FFFFFF" />
                </Pressable>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#E7E5E4',
        padding: 14,
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: '#FDF1EE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#DE3F1B',
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1C1917',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 3,
    },
    meta: {
        fontSize: 12,
        color: '#78716C',
    },
    actionBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F8C8BD',
        backgroundColor: '#FDF1EE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    callBtn: {
        backgroundColor: '#ce2626e2',
        borderColor: '#ce2626e2',
    },
});
