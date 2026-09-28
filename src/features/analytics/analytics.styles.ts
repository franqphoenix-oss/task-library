import { StyleSheet } from "react-native";

import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const analyticsStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: 120,
  },

  header: {
    marginBottom: spacing.xl,
  },

  title: {
    color: colors.text,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.semibold,
  },

  subtitle: {
    marginTop: spacing.xs,
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },

  periodSelector: {
    flexDirection: "row",
    padding: 4,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },

  periodButton: {
    flex: 1,
    minHeight: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
  },

  periodButtonActive: {
    backgroundColor: colors.accent,
  },

  periodButtonPressed: {
    opacity: 0.75,
  },

  periodButtonText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },

  periodButtonTextActive: {
    color: colors.white,
  },

  statsRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },

  statCard: {
    flex: 1,
    minHeight: 124,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },

  statLabel: {
    color: colors.textSecondary,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },

  statValue: {
    marginTop: spacing.sm,
    color: colors.text,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.semibold,
  },

  statChange: {
    marginTop: spacing.sm,
    color: colors.success,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },

  statChangeMuted: {
    color: colors.textMuted,
  },

  section: {
    marginBottom: spacing.lg,
  },

  sectionTitle: {
    marginBottom: spacing.md,
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },

  chartCard: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },

  chartHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },

  chartTitle: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },

  chartCaption: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
  },

  chart: {
    width: "100%",
    height: 150,
  },

  chartLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },

  chartLabel: {
    color: colors.textMuted,
    fontSize: 10,
  },

  insightCard: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },

  insightHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  insightIcon: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.sm,
  },

  insightIconText: {
    color: colors.accent,
    fontSize: typography.sizes.md,
  },

  insightTitle: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },

  insightText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },

  emptyState: {
    paddingVertical: spacing.xxxl,
    alignItems: "center",
  },

  emptyStateText: {
    color: colors.textMuted,
    fontSize: typography.sizes.sm,
    textAlign: "center",
  },
});
