import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserReminderDates,
  fetchUserPlant,
  fetchUserReminderDatesByDate,
} from "../redux/actions/users";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";

const CalendarPage = () => {
  // Redux dispatch
  const dispatch = useDispatch();

  // State variables
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
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

  // Render actions for the selected date
  const renderActionsForSelectedDate = useCallback(() => {
    if (!selectedDate || !careReminders) return null;

    return (
      <View>
        <FetchPlantDetails userId={userId} date={selectedDate} />
      </View>
    );
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
  const markedDates = uniqueDates.reduce((obj, date) => {
    obj[date] = { marked: true, dotColor: "red" };
    return obj;
  }, {});

  return (
    <View style={styles.container}>
      <Header title="My Plants" />
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

const FetchPlantDetails = ({ userId, date }) => {
  // Redux dispatch
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Redux selector
  const plantData = useSelector(
    (state) => state.userReducer.reminderDatesByDate
  );

  // Function to handle plant press
  const handlePlantPress = (plantId) => {
    console.log("Pressed plant ID:", plantId); // Log the ID of the pressed plant
    navigation.navigate("MyPlant", { plantId });
  };

  // Fetch plant details on component mount
  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        await dispatch(fetchUserReminderDatesByDate(userId, date));
      } catch (error) {
        console.error("Error fetching plant details:", error);
      }
    };
    fetchPlantData();
  }, [dispatch, date, userId]);

  // Format date to desired format
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Render plant details
  if (!plantData) {
    return <Text>Loading plant details...</Text>;
  }

  return (
    <View style={styles.plantItemsContainer}>
      <Text style={styles.date}>{formattedDate}</Text>
      {plantData.reminder_dates.map((plantInfo, index) => (
        <TouchableOpacity
          style={styles.plantItemContainer}
          key={index}
          onPress={() => handlePlantPress(plantInfo.plant_id)} // Pass plantId to the function directly
        >
          {console.log("PlantInfo:", plantInfo.plant_id)}
          <View style={styles.plantItem}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ marginRight: 5 }}>
                <Image
                  source={
                    plantInfo.image
                      ? { uri: plantInfo.image }
                      : require("../../assets/defaultImage.png")
                  }
                  style={styles.img}
                />
              </View>
              <Text>{plantInfo.title}</Text>
            </View>
            <Text>Done tasks: </Text>
          </View>
          <View style={styles.plantActions}>
            {plantInfo.actions.map((reminder, index) => (
              <View key={index} style={styles.plantAction}>
                <View style={styles.NameAndIcon}>
                  <Image
                    source={
                      reminder.action === "Water"
                        ? require("../../assets/water.png")
                        : reminder.action === "Light"
                        ? require("../../assets/contrast.png")
                        : require("../../assets/fertility.png")
                    }
                    style={styles.actionIcon}
                  />
                  <Text style={styles.actionText}>{reminder.action}</Text>
                </View>
                <Text style={styles.remindeText}>
                  Reminder at: {new Date(reminder.time).toLocaleTimeString()}
                </Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  remindersContainer: {
    marginTop: 20,
  },
  plantItemsContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  plantItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#E2F4C5",
    marginBottom: 10,
  },
  plantItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: "cover",
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#E2F4C5",
    paddingBottom: 5,
    marginBottom: 10,
  },
  plantActions: {
    marginBottom: 10,
  },
  plantAction: {
    marginVertical: 5,
  },
  NameAndIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  actionIcon: {
    width: 30,
    height: 30,
  },
  actionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  remindeText: {
    fontSize: 14,
    marginLeft: 40,
  },
});

export default CalendarPage;
