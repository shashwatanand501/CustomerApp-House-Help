import { ComponentRef, useRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface OtpInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
    hasError?: boolean;
}

// One hidden TextInput drives the visible boxes, so paste and SMS autofill work
export function OtpInput({ length = 4, value, onChange, hasError }: OtpInputProps) {
    const inputRef = useRef<ComponentRef<typeof TextInput>>(null);
    const digits = value.split('');

    return (
        <Pressable onPress={() => inputRef.current?.focus()} style={styles.row}>
            {Array.from({ length }).map((_, index) => {
                const isFocused = index === Math.min(value.length, length - 1);
                return (
                    <View
                        key={index}
                        style={[
                            styles.box,
                            !!digits[index] && styles.boxFilled,
                            isFocused && styles.boxFocused,
                            hasError && styles.boxError,
                        ]}
                    >
                        <Text style={styles.digit}>{digits[index] ?? ''}</Text>
                    </View>
                );
            })}

            <TextInput
                ref={inputRef}
                value={value}
                onChangeText={(text) => onChange(text.replace(/\D/g, '').slice(0, length))}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete="sms-otp"
                maxLength={length}
                autoFocus
                caretHidden
                style={styles.hiddenInput}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
    },
    box: {
        width: 58,
        height: 62,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#E7E5E4',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxFilled: {
        borderColor: '#D6D3D1',
    },
    boxFocused: {
        borderColor: '#ce2626e2',
        backgroundColor: '#FDF1EE',
    },
    boxError: {
        borderColor: '#DE3F1B',
    },
    digit: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1C1917',
    },
    hiddenInput: {
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0,
    },
});
