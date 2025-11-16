import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { spacing, fontSize, borderRadius } from "../../../styles/spacing";


export const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    marginBottom: spacing.md,
  },
  name: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  id: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.gray50,
    borderRadius: borderRadius.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
  },
  gradesContainer: {
    marginTop: spacing.sm,
  },
  gradesLabel: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  gradesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gradeItem: {
    alignItems: 'center',
    flex: 1,
  },
  gradeSubject: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  gradeValue: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});