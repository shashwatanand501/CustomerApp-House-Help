import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

interface FormInputProps extends TextInputProps {
    label: string;
    required?: boolean;
    error?: string;
    // Fixed text shown before the input, e.g. a country code
    prefix?: string;
    containerStyle?: StyleProp<ViewStyle>;
}

export function FormInput({ label, required, error, prefix, containerStyle, style, ...inputProps }: FormInputProps) {
    return (
        <View style={containerStyle}>
            <Text style={styles.label}>
                {label}
                {required ? <Text style={styles.required}> *</Text> : null}
            </Text>

            <View style={[styles.inputRow, !!error && styles.inputRowError]}>
                {prefix ? <Text style={styles.prefix}>{prefix}</Text> : null}
                <TextInput placeholderTextColor="#A8A29E" style={[styles.input, style]} {...inputProps} />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#44403C',
        marginBottom: 6,
    },
    required: {
        color: '#DE3F1B',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E7E5E4',
        borderRadius: 14,
        paddingHorizontal: 14,
    },
    inputRowError: {
        borderColor: '#DE3F1B',
    },
    prefix: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1C1917',
        marginRight: 10,
        paddingRight: 10,
        borderRightWidth: 1,
        borderRightColor: '#E7E5E4',
    },
    input: {
        flex: 1,
        paddingVertical: 13,
        fontSize: 15,
        color: '#1C1917',
    },
    errorText: {
        fontSize: 11,
        color: '#DE3F1B',
        marginTop: 4,
    },
});
