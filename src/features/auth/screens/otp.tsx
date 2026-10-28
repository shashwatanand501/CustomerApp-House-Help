import CustomButton from "@/components/common/CustomButton/CustomButton";
import { useAppDispatch } from "@/store";
import { setPendingToken, signIn } from "@/store/slices/authSlice";
import { setProfile } from "@/store/slices/profileSlice";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendOtp, verifyOtp } from "../authService";
import { AuthHeader } from "../components/AuthHeader";
import { OtpInput } from "../components/OtpInput";

const OTP_LENGTH = 4;
const RESEND_SECONDS = 30;

export default function OTP() {
    const { phone = "" } = useLocalSearchParams<{ phone: string }>();
    const dispatch = useAppDispatch();

    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

    useEffect(() => {
        if (secondsLeft <= 0) return;
        const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
        return () => clearTimeout(timer);
    }, [secondsLeft]);

    const handleVerify = async () => {
        if (otp.length !== OTP_LENGTH) return;

        setLoading(true);
        setError("");
        try {
            const result = await verifyOtp(phone, otp);

            if (result.isNewUser) {
                // New user: collect profile details before logging in
                dispatch(setPendingToken(result.token));
                router.replace({ pathname: "/(auth)/complete-profile", params: { phone } } as any);
                return;
            }

            // Existing user: load their profile and go straight to the tabs
            if (result.user) {
                dispatch(setProfile({ user: result.user, addresses: result.addresses ?? [] }));
            }
            dispatch(signIn(result.token));
        } catch (e) {
            setError(e instanceof Error ? e.message : "Verification failed. Please try again.");
            setOtp("");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setOtp("");
        setError("");
        setSecondsLeft(RESEND_SECONDS);
        await sendOtp(phone);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                    <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
                        <Ionicons name="arrow-back" size={22} color="#1C1917" />
                    </Pressable>

                    <AuthHeader
                        icon="chatbubble-ellipses"
                        title="Verify your number"
                        subtitle={`Enter the ${OTP_LENGTH}-digit code sent to +91 ${phone}`}
                    />

                    <OtpInput length={OTP_LENGTH} value={otp} onChange={setOtp} hasError={!!error} />
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <View style={styles.resendRow}>
                        {secondsLeft > 0 ? (
                            <Text style={styles.resendText}>Resend code in {secondsLeft}s</Text>
                        ) : (
                            <Pressable onPress={handleResend} hitSlop={8}>
                                <Text style={styles.resendLink}>Resend code</Text>
                            </Pressable>
                        )}
                    </View>

                    <CustomButton
                        title="Verify & Continue"
                        size="lg"
                        loading={loading}
                        disabled={otp.length !== OTP_LENGTH}
                        onPress={handleVerify}
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
    content: { flexGrow: 1, padding: 24 },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E7E5E4",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    errorText: { fontSize: 12, color: "#DE3F1B", textAlign: "center", marginTop: 12 },
    resendRow: { alignItems: "center", marginTop: 20 },
    resendText: { fontSize: 13, color: "#78716C" },
    resendLink: { fontSize: 13, fontWeight: "700", color: "#DE3F1B" },
    button: { marginTop: 28 },
});
