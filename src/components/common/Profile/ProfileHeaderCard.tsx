import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ProfileHeaderCardProps {
    name: string;
    phone: string;
    email?: string;
    // Edit button renders only when onEdit is passed
    onEdit?: () => void;
}

export function ProfileHeaderCard({ name, phone, email, onEdit }: ProfileHeaderCardProps) {
    const initials = name
        .split(' ')
        .filter(Boolean)
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
                <Text style={styles.name} numberOfLines={1}>{name}</Text>
                <View style={styles.metaRow}>
                    <Ionicons name="call-outline" size={13} color="#78716C" />
                    <Text style={styles.meta} numberOfLines={1}>{phone}</Text>
                </View>
                {email ? (
                    <View style={styles.metaRow}>
                        <Ionicons name="mail-outline" size={13} color="#78716C" />
                        <Text style={styles.meta} numberOfLines={1}>{email}</Text>
                    </View>
                ) : null}
            </View>

            {onEdit ? (
                <Pressable style={styles.editBtn} onPress={onEdit} hitSlop={6}>
                    <Ionicons name="create-outline" size={18} color="#ce2626e2" />
                </Pressable>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#E7E5E4',
        padding: 16,
    },
    avatar: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#ce2626e2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#FFFFFF',
    },
    info: {
        flex: 1,
        gap: 3,
    },
    name: {
        fontSize: 17,
        fontWeight: '800',
        color: '#1C1917',
        marginBottom: 2,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    meta: {
        flex: 1,
        fontSize: 12,
        color: '#78716C',
    },
    editBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F8C8BD',
        backgroundColor: '#FDF1EE',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
