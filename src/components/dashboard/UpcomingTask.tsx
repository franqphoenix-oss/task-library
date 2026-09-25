import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

type UpcomingTaskProps = {
  title: string;
  time: string;
  duration: string;
  status: "upcoming" | "in-progress";
};

export function UpcomingTask({
  title,
  time,
  duration,
  status,
}: UpcomingTaskProps) {
  const active = status === "in-progress";

  return (
    <View style={styles.container}>
      <View style={[styles.indicator, active && styles.activeIndicator]} />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.meta}>
          <Text style={styles.metaText}>{time}</Text>
          <View style={styles.dot} />
          <Text style={styles.metaText}>{duration}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },

  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textMuted,
    marginRight: spacing.md,
  },

  activeIndicator: {
    backgroundColor: colors.accent,
  },

  content: {
    flex: 1,
  },

  title: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
  },

  meta: {
    flexDirection: "row",
    alignItems: "center",
  },

  metaText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.xs,
  },

  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.textMuted,
    marginHorizontal: spacing.sm,
  },
});
