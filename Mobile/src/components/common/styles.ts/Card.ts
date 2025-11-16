import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { spacing, fontSize, borderRadius } from "../../../styles/spacing";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});