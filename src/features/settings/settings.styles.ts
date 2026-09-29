import { StyleSheet } from "react-native";

import type { AppColors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const createSettingsStyles = (colors: AppColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },

    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },

    content: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: 120,
    },

    header: {
      marginBottom: spacing.xl,
    },

    headerTitle: {
      color: colors.text,
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.semibold,
    },

    profileSection: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: spacing.xl,
    },

    profileInfo: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      marginRight: spacing.md,
    },

    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.surfaceElevated,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      marginRight: spacing.md,
    },

    avatarText: {
      color: colors.text,
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.semibold,
    },

    profileText: {
      flex: 1,
    },

    profileName: {
      color: colors.text,
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.semibold,
      marginBottom: 3,
    },

    profileEmail: {
      color: colors.textSecondary,
      fontSize: typography.sizes.xs,
    },

    appearanceToggle: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.full,
      padding: 3,
    },

    appearanceOption: {
      minWidth: 43,
      height: 28,
      paddingHorizontal: spacing.sm,
      borderRadius: radius.full,
      alignItems: "center",
      justifyContent: "center",
    },

    appearanceOptionActive: {
      backgroundColor: colors.accent,
    },

    appearanceText: {
      color: colors.textSecondary,
      fontSize: 10,
      fontWeight: typography.weights.medium,
    },

    appearanceTextActive: {
      color: colors.white,
    },

    menu: {
      borderRadius: radius.md,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },

    menuItem: {
      minHeight: 58,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: spacing.lg,
    },

    menuItemBorder: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },

    iconContainer: {
      width: 32,
      alignItems: "flex-start",
      justifyContent: "center",
      marginRight: spacing.sm,
    },

    menuText: {
      flex: 1,
      color: colors.text,
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.regular,
    },

    chevron: {
      color: colors.textMuted,
      fontSize: 18,
      lineHeight: 18,
    },

    pressed: {
      opacity: 0.7,
    },
  });
