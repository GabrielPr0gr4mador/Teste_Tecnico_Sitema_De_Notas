import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { spacing, fontSize, borderRadius } from "../../../styles/spacing";


export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  leftContent: {
    flex: 1,
  },
  name: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  id: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  stat: {
    alignItems: 'flex-end',
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  average: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  attendanceBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  attendanceText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.white,
  },
});