import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetScrollView,
    BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { KeyboardTypeOptions, Pressable, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../CustomButton/CustomButton';

export interface FormField {
    key: string;
    label: string;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
    required?: boolean;
    // 'options' renders a row of selectable chips instead of a text input
    type?: 'text' | 'options';
    options?: string[];
}

export type FormValues = Record<string, string>;

interface FormSheetProps {
    title: string;
    subtitle?: string;
    fields: FormField[];
    initialValues: FormValues;
    submitTitle: string;
    onSubmit: (values: FormValues) => void;
    onClose?: () => void;
}

export const FormSheet = forwardRef<BottomSheet, FormSheetProps>(
    ({ title, subtitle, fields, initialValues, submitTitle, onSubmit, onClose }, ref) => {
        const snapPoints = useMemo(() => ['75%', '92%'], []);
        const [values, setValues] = useState<FormValues>(initialValues);
        const [errors, setErrors] = useState<Record<string, boolean>>({});

        // Reset the form whenever new initial values are passed in
        useEffect(() => {
            setValues(initialValues);
            setErrors({});
        }, [initialValues]);

        const setValue = (key: string, value: string) => {
            setValues((prev) => ({ ...prev, [key]: value }));
            setErrors((prev) => ({ ...prev, [key]: false }));
        };

        const handleSubmit = () => {
            const nextErrors: Record<string, boolean> = {};
            fields.forEach((field) => {
                if (field.required && !values[field.key]?.trim()) nextErrors[field.key] = true;
            });
            setErrors(nextErrors);
            if (Object.keys(nextErrors).length > 0) return;

            const trimmed: FormValues = {};
            fields.forEach((field) => {
                trimmed[field.key] = (values[field.key] ?? '').trim();
            });
            onSubmit(trimmed);
        };

        const handleClose = () => {
            setValues(initialValues);
            setErrors({});
            onClose?.();
        };

        return (
            <BottomSheet
                ref={ref}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose
                onClose={handleClose}
                keyboardBehavior="interactive"
                keyboardBlurBehavior="restore"
                android_keyboardInputMode="adjustResize"
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
                <BottomSheetScrollView
                    contentContainerStyle={styles.sheetContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.title}>{title}</Text>
                    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

                    {fields.map((field) => (
                        <View key={field.key} style={styles.field}>
                            <Text style={styles.label}>
                                {field.label}
                                {field.required ? <Text style={styles.required}> *</Text> : null}
                            </Text>

                            {field.type === 'options' ? (
                                <View style={styles.optionRow}>
                                    {field.options?.map((option) => {
                                        const isSelected = values[field.key] === option;
                                        return (
                                            <Pressable
                                                key={option}
                                                onPress={() => setValue(field.key, option)}
                                                style={[styles.option, isSelected && styles.optionSelected]}
                                            >
                                                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                                                    {option}
                                                </Text>
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            ) : (
                                <BottomSheetTextInput
                                    value={values[field.key] ?? ''}
                                    onChangeText={(text) => setValue(field.key, text)}
                                    placeholder={field.placeholder}
                                    placeholderTextColor="#A8A29E"
                                    keyboardType={field.keyboardType}
                                    style={[styles.input, errors[field.key] && styles.inputError]}
                                />
                            )}

                            {errors[field.key] ? <Text style={styles.errorText}>{field.label} is required</Text> : null}
                        </View>
                    ))}

                    <CustomButton title={submitTitle} size="md" onPress={handleSubmit} style={styles.submit} />
                </BottomSheetScrollView>
            </BottomSheet>
        );
    }
);

FormSheet.displayName = 'FormSheet';

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
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1C1917',
    },
    subtitle: {
        fontSize: 12,
        color: '#78716C',
        marginTop: 4,
    },
    field: {
        marginTop: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#44403C',
        marginBottom: 6,
    },
    required: {
        color: '#DE3F1B',
    },
    input: {
        backgroundColor: '#FAFAF9',
        borderWidth: 1,
        borderColor: '#E7E5E4',
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: '#1C1917',
    },
    inputError: {
        borderColor: '#DE3F1B',
    },
    errorText: {
        fontSize: 11,
        color: '#DE3F1B',
        marginTop: 4,
    },
    optionRow: {
        flexDirection: 'row',
        gap: 8,
    },
    option: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#E7E5E4',
        backgroundColor: '#FFFFFF',
    },
    optionSelected: {
        borderColor: '#ce2626e2',
        backgroundColor: '#FDF1EE',
    },
    optionText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#78716C',
    },
    optionTextSelected: {
        color: '#DE3F1B',
    },
    submit: {
        marginTop: 24,
    },
});
