import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import CustomButton from "../CustomButton/CustomButton";

export const DEFAULT_BANNER_COLOR = "#ce2626e2";

export interface BannerProps {
  title: string;
  subtitle?: string;
  badgeText?: string;
  backgroundColor?: string;
  // Button renders only when both buttonTitle and onButtonPress are passed
  buttonTitle?: string;
  onButtonPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Banner({
  title,
  subtitle,
  badgeText,
  backgroundColor = DEFAULT_BANNER_COLOR,
  buttonTitle,
  onButtonPress,
  style,
}: BannerProps) {
  const showButton = !!buttonTitle && !!onButtonPress;

  return (
    <View style={[styles.container, { backgroundColor, shadowColor: backgroundColor }, style]}>
      <View style={styles.content}>
        {badgeText ? (
          <View style={styles.badge}>
            <Text style={styles.helperText}>{badgeText}</Text>
          </View>
        ) : null}

        <Text style={styles.headerText}>{title}</Text>

        {subtitle ? <Text style={styles.subText}>{subtitle}</Text> : null}

        {showButton ? (
          <CustomButton
            title={buttonTitle}
            variant="ghost"
            size="sm"
            onPress={onButtonPress}
            style={styles.button}
            textStyle={[styles.buttonText, { color: backgroundColor }]}
          />
        ) : null}
      </View>
    </View>
  );
}

export default Banner;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 18,
    overflow: "hidden",
    // Elevation & Soft Shadow
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 22,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  helperText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.6,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 24,
    letterSpacing: -0.3,
    marginBottom: 6,
    maxWidth: "85%",
  },
  subText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 18,
    fontWeight: "500",
    maxWidth: "85%",
  },
  button: {
    alignSelf: "flex-start",
    marginTop: 16,
    paddingHorizontal: 18,
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    fontWeight: "700",
  },
});
