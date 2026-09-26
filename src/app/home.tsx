import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTasks } from "../context/TaskContext";

import { homeStyles } from "@/features/home/home.styles";
import { colors } from "../constants/colors";

const dates = [
  { day: "Mon", date: "21" },
  { day: "Tue", date: "22" },
  { day: "Wed", date: "23" },
  { day: "Thu", date: "24", active: true },
  { day: "Fri", date: "25" },
  { day: "Sat", date: "26" },
  { day: "Sun", date: "27" },
];

const schedule = [
  {
    time: "10:00 - 11:30 AM",
    title: "Design remaining sections",
    icon: "✓",
    type: "task",
  },
  {
    time: "12:30 - 1:30 PM",
    title: "Lunch break",
    icon: "•",
    type: "break",
  },
  {
    time: "2:00 - 4:00 PM",
    title: "Implement responsive layout",
    icon: "✓",
    type: "task",
  },
];

function HomeIcon({ active = false }: { active?: boolean }) {
  const color = active ? colors.accent : colors.textMuted;

  return (
    <View style={homeStyles.iconBox}>
      <View
        style={[
          homeStyles.houseRoof,
          {
            borderBottomColor: color,
          },
        ]}
      />
      <View
        style={[
          homeStyles.houseBody,
          {
            borderColor: color,
          },
        ]}
      >
        <View
          style={[
            homeStyles.houseDoor,
            {
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

function TasksIcon({ active = false }: { active?: boolean }) {
  const color = active ? colors.accent : colors.textMuted;

  return (
    <View
      style={[
        homeStyles.taskIcon,
        {
          borderColor: color,
        },
      ]}
    >
      <View style={homeStyles.taskIconLine}>
        <View
          style={[
            homeStyles.taskCheck,
            {
              borderColor: color,
            },
          ]}
        />
        <View
          style={[
            homeStyles.taskLine,
            {
              backgroundColor: color,
            },
          ]}
        />
      </View>

      <View style={homeStyles.taskIconLine}>
        <View
          style={[
            homeStyles.taskCheck,
            {
              borderColor: color,
            },
          ]}
        />
        <View
          style={[
            homeStyles.taskLine,
            {
              backgroundColor: color,
            },
          ]}
        />
      </View>

      <View style={homeStyles.taskIconLine}>
        <View
          style={[
            homeStyles.taskCheck,
            {
              borderColor: color,
            },
          ]}
        />
        <View
          style={[
            homeStyles.taskLine,
            {
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

function AnalyticsIcon({ active = false }: { active?: boolean }) {
  const color = active ? colors.accent : colors.textMuted;

  return (
    <View style={homeStyles.analyticsIcon}>
      <View
        style={[
          homeStyles.chartBar,
          homeStyles.chartBarOne,
          { backgroundColor: color },
        ]}
      />
      <View
        style={[
          homeStyles.chartBar,
          homeStyles.chartBarTwo,
          { backgroundColor: color },
        ]}
      />
      <View
        style={[
          homeStyles.chartBar,
          homeStyles.chartBarThree,
          { backgroundColor: color },
        ]}
      />
    </View>
  );
}

function SettingsIcon({ active = false }: { active?: boolean }) {
  const color = active ? colors.accent : colors.textMuted;

  return (
    <View
      style={[
        homeStyles.settingsIcon,
        {
          borderColor: color,
        },
      ]}
    >
      <View
        style={[
          homeStyles.settingsCenter,
          {
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

export default function HomeScreen() {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const totalTasks = tasks.length;

  const progressPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const nextTask =
    tasks.find((task) => task.status === "in-progress") ??
    tasks.find((task) => task.status === "upcoming");

  return (
    <SafeAreaView style={homeStyles.safeArea} edges={["top"]}>
      <View style={homeStyles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={homeStyles.content}
        >
          {/* Header */}
          <View style={homeStyles.header}>
            <View>
              <Text style={homeStyles.greeting}>Good morning, Alex 👋</Text>
              <Text style={homeStyles.dateText}>Thu, 24 Apr 2025</Text>
            </View>

            <Pressable
              style={homeStyles.profileButton}
              onPress={() => router.push("/settings")}
            >
              <Text style={homeStyles.profileIcon}>♙</Text>
            </Pressable>
          </View>

          {/* Date selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={homeStyles.dateRow}
          >
            {dates.map((item) => (
              <View
                key={item.date}
                style={[
                  homeStyles.dateItem,
                  item.active && homeStyles.dateItemActive,
                ]}
              >
                <Text
                  style={[
                    homeStyles.dayText,
                    item.active && homeStyles.activeDateText,
                  ]}
                >
                  {item.day}
                </Text>

                <Text
                  style={[
                    homeStyles.numberText,
                    item.active && homeStyles.activeDateText,
                  ]}
                >
                  {item.date}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Next up */}
          <View style={homeStyles.nextUpCard}>
            <View style={homeStyles.nextUpHeader}>
              <View style={homeStyles.nextUpTitleRow}>
                <View style={homeStyles.nextUpDot} />
                <Text style={homeStyles.nextUpLabel}>Next up</Text>
              </View>

              <Text style={homeStyles.moreIcon}>⋮</Text>
            </View>

            <Text style={homeStyles.taskTitle}>
              {nextTask?.title || "No tasks scheduled"}
            </Text>

            <Text style={homeStyles.taskTime}>{nextTask?.time || "N/A"}</Text>

            <View style={homeStyles.taskBottomRow}>
              <View style={homeStyles.taskStatus}>
                <Text style={homeStyles.checkText}>✓</Text>
              </View>

              <View style={homeStyles.taskProgressTrack}>
                <View
                  style={[
                    homeStyles.taskProgressFill,
                    {
                      width: `${progressPercentage}%`,
                    },
                  ]}
                />
              </View>

              <Text style={homeStyles.taskPercentage}>
                {progressPercentage}%
              </Text>
            </View>
          </View>

          {/* Today's progress */}
          <View style={homeStyles.progressHeader}>
            <Text style={homeStyles.sectionTitle}>Today's progress</Text>

            <Text style={homeStyles.progressSummary}>{totalTasks} tasks</Text>
          </View>

          <View style={homeStyles.progressRow}>
            <View style={homeStyles.progressTrack}>
              <View
                style={[
                  homeStyles.progressFill,
                  {
                    width: `${progressPercentage}%`,
                  },
                ]}
              />
            </View>

            <Text style={homeStyles.progressPercentage}>
              {progressPercentage}%
            </Text>
          </View>

          {/* Today's schedule */}
          <View style={homeStyles.scheduleSection}>
            <Text style={homeStyles.sectionTitle}>Today's schedule</Text>

            <View style={homeStyles.scheduleCard}>
              {schedule.map((item, index) => (
                <View
                  key={item.title}
                  style={[
                    homeStyles.scheduleItem,
                    index !== schedule.length - 1 &&
                      homeStyles.scheduleItemSpacing,
                  ]}
                >
                  <Text style={homeStyles.scheduleTime}>{item.time}</Text>

                  <View
                    style={[
                      homeStyles.scheduleIcon,
                      item.type === "break" && homeStyles.breakIcon,
                    ]}
                  >
                    <Text style={homeStyles.scheduleIconText}>{item.icon}</Text>
                  </View>

                  <Text
                    style={[
                      homeStyles.scheduleTitle,
                      item.type === "break" && homeStyles.breakTitle,
                    ]}
                  >
                    {item.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Floating create button */}
        <Pressable
          style={({ pressed }) => [
            homeStyles.createButton,
            pressed && homeStyles.buttonPressed,
          ]}
          onPress={() => router.push("/create-task")}
        >
          <Text style={homeStyles.createPlus}>+</Text>
          <Text style={homeStyles.createText}>Create Task</Text>
        </Pressable>

        {/* Bottom navigation */}
        <View style={homeStyles.bottomNav}>
          <Pressable style={homeStyles.navItem}>
            <HomeIcon active />

            <Text style={[homeStyles.navLabel, homeStyles.navActive]}>
              Home
            </Text>
          </Pressable>

          <Pressable style={homeStyles.navItem}>
            <TasksIcon />

            <Text style={homeStyles.navLabel}>Tasks</Text>
          </Pressable>

          <Pressable style={homeStyles.navItem}>
            <AnalyticsIcon />

            <Text style={homeStyles.navLabel}>Analytics</Text>
          </Pressable>

          <Pressable
            style={homeStyles.navItem}
            onPress={() => router.push("/settings")}
          >
            <SettingsIcon />

            <Text style={homeStyles.navLabel}>Settings</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
