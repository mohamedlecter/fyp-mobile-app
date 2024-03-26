import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserReminderDates } from "../redux/actions/users";
import PlantDetails from "../components/CalendarPlantDetails";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome";

const CalendarPage = () => {
  // Redux dispatch
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // State variables
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // Initialize with current date
  );
  const [loading, setLoading] = useState(false);

  // Redux selectors
  const careReminders = useSelector((state) => state.userReducer.reminderDates);
  const user = useSelector((state) => state.userReducer.user);
  const userId = user?.user?._id;

  // Fetch user data on component mount
  useEffect(() => {
    fetchPlantsAndReminders();
  }, []);

  // Fetch user reminder dates and plants
  const fetchPlantsAndReminders = useCallback(async () => {
    try {
      setLoading(true);
      await dispatch(fetchUserReminderDates(userId));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching plants and reminders:", error);
      setLoading(false);
    }
  }, [dispatch, userId]);

  // Refresh control handler
  const onRefresh = () => {
    fetchPlantsAndReminders();
  };
  const handleNavigateBack = () => {
    navigation.goBack();
  };

  // Render actions for the selected date
  const renderActionsForSelectedDate = useCallback(() => {
    if (!selectedDate || !careReminders) return null;

    return <PlantDetails userId={userId} date={selectedDate} />;
  }, [selectedDate, careReminders]);

  // Get unique dates for marking on the calendar
  const uniqueDates = careReminders?.reminder_dates
    ? [
        ...new Set(
          careReminders.reminder_dates.flatMap((reminder) =>
            reminder.actions.map((action) => action.time.split("T")[0])
          )
        ),
      ]
    : [];

  // Prepare marked dates for the calendar
  const markedDates = {
    ...uniqueDates.reduce((obj, date) => {
      obj[date] = { marked: true, dotColor: "red" }; // Red dot for marked dates
      return obj;
    }, {}),
    [selectedDate]: { selected: true, selectedColor: "green" }, // Green circle for selected date
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-back-outline" size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Plantify</Text>
        <Icon2 name="bookmark-o" size={25} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={markedDates}
          />
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <View style={styles.remindersContainer}>
              {renderActionsForSelectedDate()}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginTop: 35,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Roboto",
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  remindersContainer: {
    marginTop: 20,
  },
});

export default CalendarPage;
