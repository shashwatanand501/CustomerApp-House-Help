import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Address, AddressLabel } from '../../../types/user';

interface AddressCardProps {
    address: Address;
    // Delete button renders only when onDelete is passed
    onDelete?: (address: Address) => void;
}

const LABEL_ICONS: Record<AddressLabel, keyof typeof Ionicons.glyphMap> = {
    Home: 'home-outline',
    Work: 'briefcase-outline',
    Other: 'location-outline',
};

export function AddressCard({ address, onDelete }: AddressCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.iconCircle}>
                <Ionicons name={LABEL_ICONS[address.label]} size={18} color="#ce2626e2" />
            </View>

            <View style={styles.info}>
                <Text style={styles.label}>{address.label}</Text>
                <Text style={styles.text}>
                    {[address.line1, address.line2].filter(Boolean).join(', ')}
                </Text>
                <Text style={styles.text}>
                    {address.city} - {address.pincode}
                </Text>
            </View>

            {onDelete ? (
                <Pressable onPress={() => onDelete(address)} hitSlop={8} style={styles.deleteBtn}>
                    <Ionicons name="trash-outline" size={18} color="#A8A29E" />
                </Pressable>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#E7E5E4',
        padding: 14,
    },
    iconCircle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#FDF1EE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    info: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1C1917',
        marginBottom: 2,
    },
    text: {
        fontSize: 12,
        color: '#78716C',
        lineHeight: 17,
    },
    deleteBtn: {
        padding: 4,
    },
});
