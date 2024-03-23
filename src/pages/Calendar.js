import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserPlants } from "../redux/actions/users";

const CalendarPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userReducer.user._id);
  const plants = useSelector((state) => state.userReducer.userPlants);

  const [careReminders, setCareReminders] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  console.log("user palnts", plants);

  useEffect(() => {
    fetchPlantsAndReminders();
  }, []);

  const fetchPlantsAndReminders = async () => {
    // try {
    //   // Process care reminders
    //   const reminders = {};
    //   plants.forEach((plant) => {
    //     plant.care_reminders.forEach((reminder) => {
    //       const date = new Date(reminder.time);
    //       const formattedDate = `${date.getFullYear()}-${
    //         date.getMonth() + 1
    //       }-${date.getDate()}`;
    //       if (!reminders[formattedDate]) {
    //         reminders[formattedDate] = [];
    //       }
    //       reminders[formattedDate].push({
    //         plantTitle: plant.title,
    //         action: reminder.action,
    //       });
    //     });
    //   });
    //   setCareReminders(reminders);
    // } catch (error) {
    //   console.error("Error fetching user plants:", error);
    // } finally {
    //   setRefreshing(false);
    // }
  };

  const onRefresh = () => {
    fetchPlantsAndReminders();
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Care Reminders Calendar</Text>
        <Calendar
          onDayPress={(day) => console.log("Selected day:", day)}
          markedDates={careReminders}
        />
        <View style={styles.remindersContainer}>
          {Object.entries(careReminders).map(([date, reminders]) => (
            <View key={date}>
              <Text style={styles.date}>{date}</Text>
              {reminders.map((reminder, index) => (
                <Text key={index}>
                  - {reminder.plantTitle}: {reminder.action}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
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
  date: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default CalendarPage;
