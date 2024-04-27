import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  updateReminderCompletion,
  fetchUserReminderDatesByDate,
} from "../redux/actions/users";
import { useNavigation } from "@react-navigation/native";

const CalendarPlantDetails = ({ userId, date }) => {
  // Redux dispatch
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Redux selector
  const plantData = useSelector(
    (state) => state.userReducer.reminderDatesByDate
  );

  // Local state to store new completion status
  const [newCompletionStatus, setNewCompletionStatus] = useState(null);

  // Function to handle plant press
  const handlePlantPress = (plantId) => {
    console.log("Pressed plant ID:", plantId); // Log the ID of the pressed plant
    navigation.navigate("MyPlant", { plantId });
  };

  // Function to handle toggle completion status
  const handleTickPress = async (plantId, action, completed) => {
    try {
      // Toggle completion status
      const newStatus = !completed;
      setNewCompletionStatus(newStatus);
      // Dispatch the action to update the completion status in the backend
      await dispatch(
        updateReminderCompletion(userId, plantId, action, newStatus)
      );
      // Refetch plant details after updating completion status
      await dispatch(fetchUserReminderDatesByDate(userId, date));
    } catch (error) {
      console.error("Error updating reminder completion:", error);
    }
  };

  // Fetch plant details on component mount and whenever newCompletionStatus changes
  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        await dispatch(fetchUserReminderDatesByDate(userId, date));
      } catch (error) {
        console.error("Error fetching plant details:", error);
      }
    };
    fetchPlantData();
  }, [dispatch, userId, date, newCompletionStatus]);

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

  // Count the total number of plants with actions and the number of completed actions
  let totalPlantsWithActions = 0;
  let totalCompletedActions = 0;
  plantData.reminder_dates.forEach((plantInfo) => {
    totalPlantsWithActions++;
    totalCompletedActions += plantInfo.actions.filter(
      (action) => action.completed
    ).length;
  });

  return (
    <View style={styles.plantItemsContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text>
          Done tasks: {`${totalCompletedActions}/${totalPlantsWithActions}`}
        </Text>
      </View>
      {plantData.reminder_dates.map((plantInfo, index) => (
        <TouchableOpacity
          style={styles.plantItemContainer}
          key={index}
          onPress={() => handlePlantPress(plantInfo.plant_id)} // Pass plantId to the function directly
        >
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
                <View style={styles.plantItem}>
                  <Text style={styles.remindeText}>
                    Reminder at: {new Date(reminder.time).toLocaleTimeString()}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      handleTickPress(
                        plantInfo.plant_id,
                        reminder.action,
                        reminder.completed
                      )
                    }
                  >
                    <Image
                      source={
                        reminder.completed
                          ? require("../../assets/checked.png")
                          : require("../../assets/square.png")
                      }
                      style={styles.tickIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
  dateContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#E2F4C5",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
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
  tickIcon: {
    width: 30,
    height: 30,
  },
});

export default CalendarPlantDetails;
