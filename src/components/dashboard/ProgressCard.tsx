import { useMemo } from "react";
import { Text, View } from "react-native";

import { useTheme } from "../../context/ThemeContext";
import { createProgressCardStyles } from "./progress-card.styles";

type ProgressCardProps = {
  completed: number;
  total: number;
};

export function ProgressCard({ completed, total }: ProgressCardProps) {
  const { colors } = useTheme();
  const progressCardStyles = useMemo(
    () => createProgressCardStyles(colors),
    [colors],
  );
  const progress = total > 0 ? completed / total : 0;
  const percentage = Math.round(progress * 100);

  return (
    <View style={progressCardStyles.card}>
      <View style={progressCardStyles.header}>
        <View>
          <Text style={progressCardStyles.label}>Today’s progress</Text>
          <Text style={progressCardStyles.value}>
            {completed} of {total} tasks completed
          </Text>
        </View>

        <Text style={progressCardStyles.percentage}>{percentage}%</Text>
      </View>

      <View style={progressCardStyles.track}>
        <View
          style={[
            progressCardStyles.progress,
            {
              width: `${percentage}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}
