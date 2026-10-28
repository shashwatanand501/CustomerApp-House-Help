import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

interface AuthHeaderProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
}

export function AuthHeader({ icon, title, subtitle }: AuthHeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.iconCircle}>
                <Ionicons name={icon} size={30} color="#FFFFFF" />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 28,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 20,
        backgroundColor: '#ce2626e2',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#ce2626e2',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 4,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: '#1C1917',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: '#78716C',
        marginTop: 6,
        lineHeight: 20,
    },
});
