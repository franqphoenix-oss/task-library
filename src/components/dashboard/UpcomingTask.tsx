import { Text, View } from "react-native";

import { upcomingTaskStyles } from "./upcoming-task.styles";

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
    <View style={upcomingTaskStyles.container}>
      <View
        style={[
          upcomingTaskStyles.indicator,
          active && upcomingTaskStyles.activeIndicator,
        ]}
      />

      <View style={upcomingTaskStyles.content}>
        <Text style={upcomingTaskStyles.title} numberOfLines={1}>
          {title}
        </Text>

        <View style={upcomingTaskStyles.meta}>
          <Text style={upcomingTaskStyles.metaText}>{time}</Text>
          <View style={upcomingTaskStyles.dot} />
          <Text style={upcomingTaskStyles.metaText}>{duration}</Text>
        </View>
      </View>
    </View>
  );
}
