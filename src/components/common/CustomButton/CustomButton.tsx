import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    ActivityIndicator,
    Pressable,
    PressableProps,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Supported service types
export type ServiceType =
  | 'deepcleaning'
  | 'kitchencleaning'
  | 'Cooking'
  | 'Dusting'
  | 'WashroomCleaning';

export interface CustomButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  serviceType?: ServiceType; // Auto-resolves matching icon
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
}

// Helper to resolve icon by service type
export function getServiceIcon(
  serviceType: ServiceType | undefined,
  color: string,
  iconSize: number
) {
  if (!serviceType) return null;

  switch (serviceType) {
    case 'deepcleaning':
      // Sparkles / deep clean
      return <Ionicons name="sparkles" size={iconSize} color={color} />;

    case 'kitchencleaning':
      // Utensils / dishes
      return (
        <MaterialCommunityIcons
          name="silverware-fork-knife"
          size={iconSize}
          color={color}
        />
      );

    case 'Cooking':
      // Chef hat / cooking pot
      return (
        <MaterialCommunityIcons name="chef-hat" size={iconSize} color={color} />
      );

    case 'Dusting':
      // Feather duster / broom
      return <MaterialCommunityIcons name="broom" size={iconSize} color={color} />;

    case 'WashroomCleaning':
      // Shower / bathroom
      return <Ionicons name="water" size={iconSize} color={color} />;

    default:
      return null;
  }
}

export default function CustomButton({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  serviceType,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  fullWidth = false,
  ...pressableProps
}: CustomButtonProps) {
  const isDisabled = disabled || loading;

  // Determine dynamic icon color based on variant and disabled state
  const iconColor = isDisabled
    ? '#A8A29E'
    : variant === 'primary' || variant === 'secondary'
    ? '#FFFFFF'
    : '#DE3F1B';

  // Dynamic icon sizing based on button size
  const iconPixelSize = size === 'sm' ? 16 : size === 'lg' ? 22 : 18;

  // Use explicit leftIcon or resolve from serviceType
  const resolvedLeftIcon =
    leftIcon ?? getServiceIcon(serviceType, iconColor, iconPixelSize);

  return (
    <Pressable
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && styles[`${variant}Pressed`],
        isDisabled && styles.disabled,
        style,
      ]}
      android_ripple={{
        color:
          variant === 'outline' || variant === 'ghost'
            ? 'rgba(0,0,0,0.06)'
            : 'rgba(255,255,255,0.2)',
      }}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'primary' || variant === 'secondary'
              ? '#FFFFFF'
              : '#DE3F1B'
          }
        />
      ) : (
        <View style={styles.contentRow}>
          {resolvedLeftIcon && (
            <View style={styles.leftIconContainer}>{resolvedLeftIcon}</View>
          )}

          <Text
            style={[
              styles.baseText,
              styles[`${variant}Text`],
              styles[`${size}Text`],
              isDisabled && styles.disabledText,
              textStyle,
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
          >
            {title}
          </Text>

          {rightIcon && (
            <View style={styles.rightIconContainer}>{rightIcon}</View>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    flex: 1, // Changed from flex: 2 to flex: 1 for equal grid column distribution
    minWidth: 120,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIconContainer: {
    marginRight: 8,
  },
  rightIconContainer: {
    marginLeft: 8,
  },

  // ---------------- Sizes ----------------
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  md: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  lg: {
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderRadius: 16,
  },

  // ---------------- Variants ----------------
  primary: {
    backgroundColor: '#ce2626e2',
    shadowColor: '#ce2626e2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryPressed: {
    backgroundColor: '#ce2626e2',
    transform: [{ scale: 0.98 }],
  },

  secondary: {
    backgroundColor: '#1C1917',
  },
  secondaryPressed: {
    backgroundColor: '#292524',
    transform: [{ scale: 0.98 }],
  },

  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#ce2626e2',
  },
  outlinePressed: {
    backgroundColor: '#FDF1EE',
  },

  ghost: {
    backgroundColor: 'transparent',
  },
  ghostPressed: {
    backgroundColor: '#F5F5F4',
  },

  // ---------------- Text Styles ----------------
  baseText: {
    fontWeight: '700',
    textAlign: 'center',
  },
  smText: {
    fontSize: 12,
  },
  mdText: {
    fontSize: 14,
  },
  lgText: {
    fontSize: 16,
  },

  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#ce2626e2',
  },
  ghostText: {
    color: '#1C1917',
  },

  // ---------------- Disabled State ----------------
  disabled: {
    backgroundColor: '#E7E5E4',
    borderColor: '#E7E5E4',
    shadowOpacity: 0,
    elevation: 0,
  },
  disabledText: {
    color: '#A8A29E',
  },
});