import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import { fetchUserPlants } from "../redux/actions/users";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import Error from "../components/Error";

const MyPlants = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const userId = user.user._id;
  const plants = useSelector((state) => state.userReducer.userPlants);
  const error = useSelector((state) => state.userReducer.error);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    dispatch(fetchUserPlants(userId)); // Fetch user's plants when component mounts
  }, [dispatch, plants]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchUserPlants(userId)); // Fetch user's plants when refreshing
    setRefreshing(false);
  };

  const handlePlantPress = (plantId) => {
    navigation.navigate("MyPlant", { plantId }); // Navigate to MyPlant screen with plantId as parameter
  };

  const navigateToPlantsPage = () => {
    navigation.navigate("PlantsTab"); // Navigate to Plants Tab
  };

  return (
    <View style={styles.container}>
      <Header title="My Plants" />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {error && (
          <Error
            errorMsg={error}
            buttonTitle="Try Again"
            handleClick={onRefresh}
          />
        )}
        {plants && plants.length === 0 && (
          <Error
            errorMsg="No plants added yet"
            buttonTitle="Add Plant"
            handleClick={navigateToPlantsPage}
          />
        )}

        {plants &&
          plants.map((plant, index) => (
            <TouchableOpacity
              key={index}
              style={styles.plantItem}
              onPress={() => handlePlantPress(plant.id)}
            >
              <Image
                source={
                  plant.image
                    ? { uri: plant.image }
                    : require("../../assets/defaultImage.png")
                }
                style={styles.image}
                loadingIndicatorSource={require("../../assets/loading.gif")}
              />
              <View style={styles.detailsContainer}>
                <Text style={styles.plantName}>{plant.title}</Text>
                <Text style={styles.plantDescription} numberOfLines={3}>
                  {plant.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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
  plantItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 10,
  },
  plantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  plantDescription: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default MyPlants;
