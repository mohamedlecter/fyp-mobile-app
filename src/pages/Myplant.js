import React, { useEffect, useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  RefreshControl,
  TouchableOpacity,
  Switch as ReactSwitch,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import { fetchUserPlant, saveCareReminder } from "../redux/actions/users";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/AntDesign";

const options = [
  { text: "Water", icon: require("../../assets/water.png") },
  { text: "Light", icon: require("../../assets/contrast.png") },
  { text: "Fertilizer", icon: require("../../assets/fertility.png") },
];

const Myplant = ({ route }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const userId = useMemo(() => user.user._id, [user]);
  const plant = useSelector((state) => state.userReducer.userPlant);
  const error = useSelector((state) => state.userReducer.error);
  const [refreshing, setRefreshing] = useState(false);
  const { plantId } = route.params;

  const [switchStates, setSwitchStates] = useState(options.map(() => false));
  const [selectedDates, setSelectedDates] = useState(
    options.map(() => new Date())
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const plantData = await dispatch(fetchUserPlant(userId, plantId));
        console.log("Fetched user plant:", plantData);

        // Set the initial switch states based on care reminders
        if (plantData.care_reminders && plantData.care_reminders.length > 0) {
          const initialSwitchStates = options.map((option) => {
            return plantData.care_reminders.some(
              (reminder) => reminder.action === option.text
            );
          });
          setSwitchStates(initialSwitchStates);

          // Set the initial selected dates for DateTimePickerModal
          const initialSelectedDates = options.map((option) => {
            const reminder = plantData.care_reminders.find(
              (r) => r.action === option.text
            );
            return reminder ? new Date(reminder.time) : new Date();
          });
          setSelectedDates(initialSelectedDates);
        }
      } catch (error) {
        console.error("Error fetching user plant:", error);
      }
    };

    fetchPlantData();
  }, [dispatch, plantId, userId]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchUserPlant(userId, plantId));
    setRefreshing(false);
  };

  const renderExtendedView = (text, index) => {
    if (switchStates[index]) {
      return (
        <View style={styles.extendedView}>
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="datetime"
            date={selectedDates[index]}
            onConfirm={(date) => handleDateConfirm(date, index)}
            onCancel={toggleDatePicker}
          />
          <TouchableOpacity
            onPress={() => toggleDatePicker(index)}
            style={styles.datePickerContainer}
          >
            <Icon name="calendar" size={30} color={"#00a86b"} />
            <Text style={styles.datePickerText}>
              {selectedDates[index].toLocaleString()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSave(text, index)}
            style={styles.saveBtn}
          >
            <Text style={{ color: "white" }}>Save</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const toggleDatePicker = (index) => {
    setShowDatePicker((prevState) => !prevState);
  };

  const handleDateConfirm = (date, index) => {
    setShowDatePicker(false);
    if (date) {
      const newSelectedDates = [...selectedDates];
      newSelectedDates[index] = date;
      setSelectedDates(newSelectedDates);
    }
  };

  const handleSave = (option, index) => {
    const action = option;
    const time = selectedDates[index];
    dispatch(saveCareReminder(userId, plantId, action, time));
    setShowDatePicker(false);
  };

  const toggleSwitch = (index) => {
    if (!showDatePicker) {
      const updatedSwitchStates = [...switchStates];
      updatedSwitchStates[index] = !updatedSwitchStates[index];
      setSwitchStates(updatedSwitchStates);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="My Plants" />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {error && <Text style={styles.errorText}>Error: {error}</Text>}
        {plant && (
          <View style={styles.plantContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={
                  plant.image
                    ? { uri: plant.image }
                    : require("../../assets/defaultImage.png")
                }
                style={styles.image}
              />
            </View>

            <Text style={styles.plantName}>{plant.title}</Text>
            <Text style={styles.plantDescription} numberOfLines={7}>
              {plant.description}
            </Text>
            <View style={styles.careOptionsContainer}>
              <Text style={styles.careOptionsTitle}>Care Options</Text>
              {options.map((option, index) => (
                <View style={styles.optionItem} key={index}>
                  <View style={styles.optionRow}>
                    <View style={styles.optionNameAndIcon}>
                      <Image source={option.icon} style={styles.optionIcon} />
                      <Text style={styles.optionText}>{option.text}</Text>
                    </View>

                    <ReactSwitch
                      value={switchStates[index]}
                      onValueChange={() => toggleSwitch(index)}
                    />
                  </View>
                  {switchStates[index] &&
                    renderExtendedView(option.text, index)}
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
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
    paddingTop: 20,
  },
  plantContainer: {
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  plantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  plantDescription: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "auto",
  },
  careOptionsContainer: {
    marginTop: 10,
  },
  careOptionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionItem: {
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 3,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionIcon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  optionText: {
    fontSize: 16,
    marginRight: 10,
  },
  extendedView: {
    marginTop: 10,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  datePickerText: {
    marginLeft: 10,
  },
  saveBtn: {
    backgroundColor: "#00a86b",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  optionNameAndIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Myplant;
