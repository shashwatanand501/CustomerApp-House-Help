import CustomButton from "@/components/common/CustomButton/CustomButton";
import { FormInput } from "@/components/common/FormInput/FormInput";
import { isValidIndianPhone } from "@/utils/validation";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendOtp } from "../authService";
import { AuthHeader } from "../components/AuthHeader";

export default function Login() {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleContinue = async () => {
        if (!isValidIndianPhone(phone)) {
            setError("Enter a valid 10-digit mobile number");
            return;
        }

        setLoading(true);
        try {
            await sendOtp(phone);
            router.push({ pathname: "/(auth)/otp", params: { phone } } as any);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Could not send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                    <AuthHeader
                        icon="home"
                        title="Welcome to HouseHelp"
                        subtitle="Enter your mobile number and we'll send you a one-time password."
                    />

                    <FormInput
                        label="Mobile Number"
                        prefix="+91"
                        placeholder="98765 43210"
                        keyboardType="phone-pad"
                        textContentType="telephoneNumber"
                        autoComplete="tel"
                        maxLength={10}
                        value={phone}
                        onChangeText={(text) => {
                            setPhone(text.replace(/\D/g, ""));
                            setError("");
                        }}
                        error={error}
                        onSubmitEditing={handleContinue}
                    />

                    <CustomButton
                        title="Get OTP"
                        size="lg"
                        loading={loading}
                        disabled={phone.length !== 10}
                        onPress={handleContinue}
                        style={styles.button}
                    />

                    <Text style={styles.terms}>
                        By continuing, you agree to our Terms of Service and Privacy Policy.
                    </Text>

                    {__DEV__ ? (
                        <Text style={styles.devHint}>
                            Demo: OTP is 1234. 9876543210 logs in as an existing user, any other number is a new user.
                        </Text>
                    ) : null}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F9F9F8" },
    flex: { flex: 1 },
    content: { flexGrow: 1, padding: 24, paddingTop: 48 },
    button: { marginTop: 24 },
    terms: { fontSize: 12, color: "#A8A29E", textAlign: "center", marginTop: 16, lineHeight: 17 },
    devHint: {
        fontSize: 12,
        color: "#78716C",
        backgroundColor: "#F5F5F4",
        borderRadius: 12,
        padding: 12,
        marginTop: "auto",
        lineHeight: 17,
    },
});
