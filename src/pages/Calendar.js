import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserReminderDates, fetchUserPlant } from "../redux/actions/users";

const CalendarPage = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const careReminders = useSelector((state) => state.userReducer.reminderDates);
  const user = useSelector((state) => state.userReducer.user);
  const userId = user?.user?._id;
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlantsAndReminders();
  }, []);

  const fetchPlantsAndReminders = useCallback(async () => {
    try {
      setLoading(true);
      await dispatch(fetchUserReminderDates(userId)); // Fetch user reminder dates
      setLoading(false);
    } catch (error) {
      console.error("Error fetching plants and reminders:", error);
      setLoading(false);
    }
  }, [dispatch, userId]);

  const onRefresh = () => {
    fetchPlantsAndReminders();
  };

  const renderDay = (day) => {
    setSelectedDate(day.dateString);
  };

  const renderActionsForSelectedDate = useCallback(() => {
    if (!selectedDate || !careReminders) return null;

    const actionsForSelectedDate = careReminders.reminder_dates.filter(
      (reminder) =>
        reminder.actions.some(
          (action) => action.time.split("T")[0] === selectedDate
        )
    );

    if (actionsForSelectedDate.length === 0) {
      return <Text>No actions for {selectedDate}</Text>;
    }

    return actionsForSelectedDate.map((reminder, index) => (
      <View key={index}>
        <FetchPlantDetails userId={userId} plantId={reminder.plant_id} />
      </View>
    ));
  }, [selectedDate, careReminders]);

  const uniqueDates = careReminders?.reminder_dates
    ? [
        ...new Set(
          careReminders.reminder_dates.flatMap((reminder) =>
            reminder.actions.map((action) => action.time.split("T")[0])
          )
        ),
      ]
    : [];

  const markedDates = uniqueDates.reduce((obj, date) => {
    obj[date] = { marked: true, dotColor: "red" };
    return obj;
  }, {});

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Care Reminders Calendar</Text>
        <Calendar onDayPress={renderDay} markedDates={markedDates} />
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.remindersContainer}>
            {renderActionsForSelectedDate()}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const FetchPlantDetails = ({ userId, plantId }) => {
  const dispatch = useDispatch();
  const [plantData, setPlantData] = useState(null);

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const data = await dispatch(fetchUserPlant(userId, plantId));
        setPlantData(data);
      } catch (error) {
        console.error("Error fetching plant details:", error);
      }
    };
    fetchPlantData();
  }, [dispatch, plantId]);

  if (!plantData) {
    return <Text>Loading plant details...</Text>;
  }

  return (
    <View>
      <Text>Name: {plantData.title}</Text>
      <Text>Care Reminders:</Text>
      <View>
        {plantData.care_reminders.map((reminder, index) => (
          <View key={index}>
            <Text>Action: {reminder.action}</Text>
            <Text>Time: {new Date(reminder.time).toLocaleString()}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  remindersContainer: {
    marginTop: 20,
  },
});

export default CalendarPage;
