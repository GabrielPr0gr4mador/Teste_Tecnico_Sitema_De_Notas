import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { spacing, fontSize } from "../../../styles/spacing";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    marginTop: spacing.md,
    fontSize: fontSize.base,
    color: colors.textSecondary,
  },
});