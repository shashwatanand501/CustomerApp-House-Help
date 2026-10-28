import CustomButton from "@/components/common/CustomButton/CustomButton";
import { FormInput } from "@/components/common/FormInput/FormInput";
import { useAppDispatch, useAppSelector } from "@/store";
import { signIn } from "@/store/slices/authSlice";
import { setProfile } from "@/store/slices/profileSlice";
import { getCurrentAddress } from "@/utils/location";
import { isValidEmail, isValidPincode } from "@/utils/validation";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createProfile } from "../authService";
import { AuthHeader } from "../components/AuthHeader";

type FieldKey = "name" | "email" | "line1" | "line2" | "city" | "pincode";
type Values = Record<FieldKey, string>;

const EMPTY_VALUES: Values = { name: "", email: "", line1: "", line2: "", city: "", pincode: "" };

function validate(values: Values) {
    const errors: Partial<Record<FieldKey, string>> = {};
    if (!values.name.trim()) errors.name = "Full name is required";
    if (values.email.trim() && !isValidEmail(values.email.trim())) errors.email = "Enter a valid email";
    if (!values.line1.trim()) errors.line1 = "Flat / house details are required";
    if (!values.city.trim()) errors.city = "City is required";
    if (!isValidPincode(values.pincode.trim())) errors.pincode = "Enter a valid 6-digit pincode";
    return errors;
}

export default function CompleteProfile() {
    const { phone = "" } = useLocalSearchParams<{ phone: string }>();
    const dispatch = useAppDispatch();
    const pendingToken = useAppSelector((s) => s.auth.pendingToken);

    const [values, setValues] = useState<Values>(EMPTY_VALUES);
    const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
    const [locating, setLocating] = useState(false);
    const [locationError, setLocationError] = useState("");
    const [saving, setSaving] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const setValue = (key: FieldKey, value: string) => {
        setValues((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

    const handleUseLocation = async () => {
        setLocating(true);
        setLocationError("");
        try {
            const address = await getCurrentAddress();
            setValues((prev) => ({
                ...prev,
                line1: address.line1 || prev.line1,
                line2: address.line2 || prev.line2,
                city: address.city || prev.city,
                pincode: address.pincode || prev.pincode,
            }));
            setErrors((prev) => ({ ...prev, line1: undefined, city: undefined, pincode: undefined }));
        } catch (e) {
            setLocationError(e instanceof Error ? e.message : "Could not get your location.");
        } finally {
            setLocating(false);
        }
    };

    const handleSubmit = async () => {
        const nextErrors = validate(values);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        if (!pendingToken) {
            // Session lost (e.g. app reloaded) — start the login again
            router.replace("/(auth)/login" as any);
            return;
        }

        setSaving(true);
        setSubmitError("");
        try {
            const profile = await createProfile(pendingToken, {
                name: values.name.trim(),
                email: values.email.trim(),
                phone: `+91 ${phone}`,
                address: {
                    label: "Home",
                    line1: values.line1.trim(),
                    line2: values.line2.trim(),
                    city: values.city.trim(),
                    pincode: values.pincode.trim(),
                },
            });
            dispatch(setProfile(profile));
            dispatch(signIn(pendingToken));
        } catch (e) {
            setSubmitError(e instanceof Error ? e.message : "Could not create your profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                    <AuthHeader
                        icon="person"
                        title="Tell us about you"
                        subtitle="Just a few details so your helper knows who to meet and where."
                    />

                    <Text style={styles.sectionHeading}>Your Details</Text>
                    <FormInput
                        label="Full Name"
                        required
                        placeholder="Your name"
                        textContentType="name"
                        autoComplete="name"
                        value={values.name}
                        onChangeText={(text) => setValue("name", text)}
                        error={errors.name}
                    />
                    <FormInput
                        label="Email"
                        placeholder="you@example.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        textContentType="emailAddress"
                        autoComplete="email"
                        value={values.email}
                        onChangeText={(text) => setValue("email", text)}
                        error={errors.email}
                        containerStyle={styles.fieldGap}
                    />

                    <Text style={styles.sectionHeading}>Service Address</Text>
                    <Pressable
                        onPress={handleUseLocation}
                        disabled={locating}
                        style={({ pressed }) => [styles.locationBtn, pressed && styles.locationBtnPressed]}
                    >
                        {locating ? (
                            <ActivityIndicator size="small" color="#DE3F1B" />
                        ) : (
                            <Ionicons name="locate" size={20} color="#DE3F1B" />
                        )}
                        <Text style={styles.locationText}>
                            {locating ? "Finding your location..." : "Use my current location"}
                        </Text>
                    </Pressable>
                    {locationError ? <Text style={styles.errorText}>{locationError}</Text> : null}

                    <FormInput
                        label="Flat / House No., Building"
                        required
                        placeholder="Flat 302, Green Residency"
                        value={values.line1}
                        onChangeText={(text) => setValue("line1", text)}
                        error={errors.line1}
                        containerStyle={styles.fieldGap}
                    />
                    <FormInput
                        label="Area / Street"
                        placeholder="Sector 21"
                        value={values.line2}
                        onChangeText={(text) => setValue("line2", text)}
                        containerStyle={styles.fieldGap}
                    />
                    <FormInput
                        label="City"
                        required
                        placeholder="Gurugram"
                        value={values.city}
                        onChangeText={(text) => setValue("city", text)}
                        error={errors.city}
                        containerStyle={styles.fieldGap}
                    />
                    <FormInput
                        label="Pincode"
                        required
                        placeholder="122016"
                        keyboardType="number-pad"
                        maxLength={6}
                        value={values.pincode}
                        onChangeText={(text) => setValue("pincode", text.replace(/\D/g, ""))}
                        error={errors.pincode}
                        containerStyle={styles.fieldGap}
                    />

                    {submitError ? <Text style={styles.errorText}>{submitError}</Text> : null}

                    <CustomButton
                        title="Create Account"
                        size="lg"
                        loading={saving}
                        onPress={handleSubmit}
                        style={styles.button}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F9F9F8" },
    flex: { flex: 1 },
    content: { padding: 24, paddingBottom: 40 },
    sectionHeading: { fontSize: 17, fontWeight: "700", color: "#1C1917", marginTop: 8, marginBottom: 12 },
    fieldGap: { marginTop: 14 },
    locationBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#FDF1EE",
        borderWidth: 1,
        borderColor: "#F8C8BD",
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 14,
    },
    locationBtnPressed: { opacity: 0.8 },
    locationText: { fontSize: 14, fontWeight: "700", color: "#DE3F1B" },
    errorText: { fontSize: 12, color: "#DE3F1B", marginTop: 8 },
    button: { marginTop: 28 },
});
