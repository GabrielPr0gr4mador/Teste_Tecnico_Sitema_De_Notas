import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { spacing, fontSize, borderRadius } from "../../../styles/spacing";

export const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  text: {
    fontSize: fontSize.base,
    fontWeight: '600',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  primaryText: {
    color: colors.white,
  },
  secondary: {
    backgroundColor: colors.gray200,
  },
  secondaryText: {
    color: colors.gray800,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  dangerText: {
    color: colors.white,
  },
  success: {
    backgroundColor: colors.success,
  },
  successText: {
    color: colors.white,
  },
  disabled: {
    opacity: 0.5,
  },
});