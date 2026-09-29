import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";

import { BottomNav } from "../components/navigation/BottomNav";
import { useTasks } from "../context/TaskContext";
import {
  getAnalyticsSummary,
  getProductivityInsight,
  getProductivityTrend,
  type AnalyticsPeriod,
} from "../services/analytics";

import { useTheme } from "../context/ThemeContext";
import { createAnalyticsStyles } from "../features/analytics/analytics.styles";

function formatDelta(value: number, suffix = "") {
  if (value === 0) {
    return "No change";
  }

  return `${value > 0 ? "+" : ""}${value}${suffix}`;
}

function ProductivityChart({
  values,
}: {
  values: { label: string; completed: number }[];
}) {
  const { colors } = useTheme();
  const styles = useMemo(() => createAnalyticsStyles(colors), [colors]);
  const width = 300;
  const height = 130;
  const horizontalPadding = 8;
  const verticalPadding = 12;

  const maxValue = Math.max(1, ...values.map((item) => item.completed));

  const chartWidth = width - horizontalPadding * 2;
  const chartHeight = height - verticalPadding * 2;

  const points = values.map((item, index) => {
    const x =
      horizontalPadding + (index / Math.max(values.length - 1, 1)) * chartWidth;

    const y =
      verticalPadding + chartHeight - (item.completed / maxValue) * chartHeight;

    return {
      x,
      y,
    };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <View>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <Line
          x1={horizontalPadding}
          y1={verticalPadding}
          x2={width - horizontalPadding}
          y2={verticalPadding}
          stroke={colors.border}
          strokeWidth={1}
        />

        <Line
          x1={horizontalPadding}
          y1={height / 2}
          x2={width - horizontalPadding}
          y2={height / 2}
          stroke={colors.border}
          strokeWidth={1}
        />

        <Line
          x1={horizontalPadding}
          y1={height - verticalPadding}
          x2={width - horizontalPadding}
          y2={height - verticalPadding}
          stroke={colors.border}
          strokeWidth={1}
        />

        <Path
          d={linePath}
          fill="none"
          stroke={colors.accent}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((point, index) => (
          <Circle
            key={`${point.x}-${point.y}-${index}`}
            cx={point.x}
            cy={point.y}
            r={4}
            fill={colors.surface}
            stroke={colors.accent}
            strokeWidth={2}
          />
        ))}
      </Svg>

      <View style={styles.chartLabels}>
        {values.map((item) => (
          <Text key={item.label} style={styles.chartLabel}>
            {item.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default function AnalyticsScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createAnalyticsStyles(colors), [colors]);
  const { tasks, isLoading } = useTasks();
  const [period, setPeriod] = useState<AnalyticsPeriod>("month");

  const summary = useMemo(
    () => getAnalyticsSummary(tasks, period),
    [tasks, period],
  );

  const trend = useMemo(() => getProductivityTrend(tasks), [tasks]);

  const insight = useMemo(() => getProductivityInsight(tasks), [tasks]);

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Loading analytics...</Text>
        </View>

        <BottomNav />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>Your productivity at a glance</Text>
        </View>

        <View style={styles.periodSelector}>
          <Pressable
            style={({ pressed }) => [
              styles.periodButton,
              period === "month" && styles.periodButtonActive,
              pressed && styles.periodButtonPressed,
            ]}
            onPress={() => setPeriod("month")}
            accessibilityRole="tab"
            accessibilityState={{
              selected: period === "month",
            }}
          >
            <Text
              style={[
                styles.periodButtonText,
                period === "month" && styles.periodButtonTextActive,
              ]}
            >
              This Month
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.periodButton,
              period === "all" && styles.periodButtonActive,
              pressed && styles.periodButtonPressed,
            ]}
            onPress={() => setPeriod("all")}
            accessibilityRole="tab"
            accessibilityState={{
              selected: period === "all",
            }}
          >
            <Text
              style={[
                styles.periodButtonText,
                period === "all" && styles.periodButtonTextActive,
              ]}
            >
              All Time
            </Text>
          </Pressable>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Tasks completed</Text>

            <Text style={styles.statValue}>{summary.completedCount}</Text>

            <Text
              style={[
                styles.statChange,
                summary.completedDelta === 0 && styles.statChangeMuted,
              ]}
            >
              {period === "month"
                ? `${formatDelta(summary.completedDelta)} vs last month`
                : "All completed tasks"}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Completion rate</Text>

            <Text style={styles.statValue}>{summary.completionRate}%</Text>

            <Text
              style={[
                styles.statChange,
                summary.completionRateDelta === 0 && styles.statChangeMuted,
              ]}
            >
              {period === "month"
                ? `${formatDelta(
                    summary.completionRateDelta,
                    "%",
                  )} vs last month`
                : `${summary.totalTasks} total tasks`}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Productivity trend</Text>

          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Completed tasks</Text>

              <Text style={styles.chartCaption}>Last 7 days</Text>
            </View>

            <ProductivityChart values={trend} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Insight</Text>

          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <View style={styles.insightIcon}>
                <Text style={styles.insightIconText}>✦</Text>
              </View>

              <Text style={styles.insightTitle}>Productivity insight</Text>
            </View>

            <Text style={styles.insightText}>{insight}</Text>
          </View>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}
