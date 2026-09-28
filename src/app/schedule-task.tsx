import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTasks } from "../context/TaskContext";
import { scheduleTaskStyles } from "../features/tasks/schedule-task.styles";
import {
  createScheduledDate,
  formatMonth,
  formatScheduleDate,
  formatScheduledTime,
  getMonthDays,
  getTaskDeadlineDate,
  isBeforeToday,
  isSameDay,
  SCHEDULE_TIME_OPTIONS,
  type ScheduleTime,
} from "../services/scheduling";

export default function ScheduleTaskScreen() {
  const { taskId } = useLocalSearchParams<{ taskId: string }>();
  const { tasks, scheduleTask } = useTasks();

  const today = useMemo(() => new Date(), []);

  const [visibleMonth, setVisibleMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedTime, setSelectedTime] = useState<ScheduleTime | null>(null);

  if (!taskId) {
    router.replace("/home");
    return null;
  }

  const task = tasks.find((item) => item.id === taskId);

  if (!task?.plan) {
    router.replace("/home");
    return null;
  }

  const deadline = getTaskDeadlineDate(task);
  const monthDays = getMonthDays(visibleMonth);

  const scheduledDate =
    selectedTime !== null
      ? createScheduledDate(selectedDate, selectedTime)
      : null;

  const isValidSelection =
    scheduledDate !== null &&
    scheduledDate.getTime() > Date.now() &&
    (deadline === null || scheduledDate.getTime() <= deadline.getTime());

  const moveMonth = (amount: number) => {
    setVisibleMonth(
      (currentMonth) =>
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + amount,
          1,
        ),
    );
  };

  const handleSchedule = () => {
    if (!scheduledDate || !isValidSelection) {
      return;
    }

    scheduleTask(task.id, scheduledDate.toISOString());

    router.replace({
      pathname: "/home",
      params: {
        scheduled: "true",
      },
    });
  };

  return (
    <SafeAreaView style={scheduleTaskStyles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={scheduleTaskStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={scheduleTaskStyles.header}>
          <Pressable
            style={scheduleTaskStyles.backButton}
            onPress={() => router.back()}
          >
            <Text style={scheduleTaskStyles.backText}>‹</Text>
          </Pressable>

          <View style={scheduleTaskStyles.headerCopy}>
            <Text style={scheduleTaskStyles.eyebrow}>SCHEDULE</Text>
            <Text style={scheduleTaskStyles.title}>
              When will you work on it?
            </Text>
            <Text style={scheduleTaskStyles.subtitle}>{task.goal}</Text>
          </View>
        </View>

        <View style={scheduleTaskStyles.section}>
          <Text style={scheduleTaskStyles.sectionTitle}>Choose a date</Text>

          <View style={scheduleTaskStyles.calendarCard}>
            <View style={scheduleTaskStyles.monthHeader}>
              <Pressable
                style={scheduleTaskStyles.monthButton}
                onPress={() => moveMonth(-1)}
              >
                <Text style={scheduleTaskStyles.monthButtonText}>‹</Text>
              </Pressable>

              <Text style={scheduleTaskStyles.monthTitle}>
                {formatMonth(visibleMonth)}
              </Text>

              <Pressable
                style={scheduleTaskStyles.monthButton}
                onPress={() => moveMonth(1)}
              >
                <Text style={scheduleTaskStyles.monthButtonText}>›</Text>
              </Pressable>
            </View>

            <View style={scheduleTaskStyles.weekdayRow}>
              {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                <Text
                  key={`${day}-${index}`}
                  style={scheduleTaskStyles.weekday}
                >
                  {day}
                </Text>
              ))}
            </View>

            <View style={scheduleTaskStyles.calendarGrid}>
              {monthDays.map((date, index) => {
                if (!date) {
                  return (
                    <View
                      key={`empty-${index}`}
                      style={scheduleTaskStyles.calendarDay}
                    />
                  );
                }

                const past = isBeforeToday(date);
                const selected = isSameDay(date, selectedDate);

                const afterDeadline =
                  deadline !== null &&
                  date.getTime() >
                    new Date(
                      deadline.getFullYear(),
                      deadline.getMonth(),
                      deadline.getDate(),
                    ).getTime();

                const disabled = past || afterDeadline;

                return (
                  <Pressable
                    key={date.toISOString()}
                    disabled={disabled}
                    style={[
                      scheduleTaskStyles.calendarDay,
                      selected && !disabled && scheduleTaskStyles.selectedDay,
                      disabled && scheduleTaskStyles.disabledDay,
                      isSameDay(date, today) &&
                        !selected &&
                        !disabled &&
                        scheduleTaskStyles.todayDay,
                    ]}
                    onPress={() => {
                      setSelectedDate(date);
                      setSelectedTime(null);
                    }}
                  >
                    <Text
                      style={[
                        scheduleTaskStyles.calendarDayText,
                        selected &&
                          !disabled &&
                          scheduleTaskStyles.selectedDayText,
                        disabled && scheduleTaskStyles.disabledDayText,
                      ]}
                    >
                      {date.getDate()}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {deadline && (
              <Text style={scheduleTaskStyles.calendarHint}>
                Schedule by {formatScheduleDate(deadline)}.
              </Text>
            )}
          </View>
        </View>

        <View style={scheduleTaskStyles.section}>
          <Text style={scheduleTaskStyles.sectionTitle}>Choose a time</Text>

          <View style={scheduleTaskStyles.timeGrid}>
            {SCHEDULE_TIME_OPTIONS.map((time) => {
              const optionDate = createScheduledDate(selectedDate, time);
              const disabled =
                optionDate.getTime() <= Date.now() ||
                (deadline !== null &&
                  optionDate.getTime() > deadline.getTime());

              const selected = selectedTime === time;

              return (
                <Pressable
                  key={time}
                  disabled={disabled}
                  style={[
                    scheduleTaskStyles.timeButton,
                    selected && scheduleTaskStyles.selectedTimeButton,
                    disabled && scheduleTaskStyles.disabledTimeButton,
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text
                    style={[
                      scheduleTaskStyles.timeText,
                      selected && scheduleTaskStyles.selectedTimeText,
                      disabled && scheduleTaskStyles.disabledTimeText,
                    ]}
                  >
                    {time}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={scheduleTaskStyles.previewCard}>
          <Text style={scheduleTaskStyles.previewLabel}>SCHEDULED FOR</Text>

          {scheduledDate && isValidSelection ? (
            <Text style={scheduleTaskStyles.previewValue}>
              {formatScheduleDate(scheduledDate)} at{" "}
              {formatScheduledTime(scheduledDate)}
            </Text>
          ) : (
            <Text style={scheduleTaskStyles.previewPlaceholder}>
              Select a date and time
            </Text>
          )}
        </View>

        <Pressable
          disabled={!isValidSelection}
          style={[
            scheduleTaskStyles.scheduleButton,
            !isValidSelection && scheduleTaskStyles.scheduleButtonDisabled,
          ]}
          onPress={handleSchedule}
        >
          <Text style={scheduleTaskStyles.scheduleButtonText}>
            Schedule Task
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
