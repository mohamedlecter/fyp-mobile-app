import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const MyPlants = () => {
  const user = useSelector((state) => state.userReducer.user);
  const userPlants = user.user.plants;
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    setPlants(userPlants); // Set the user's plants in the local state
  }, [userPlants]);

  return (
    <View style={styles.container}>
      <Header title="My Plants" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {plants.map((plant, index) => (
          <View key={index} style={styles.plantItem}>
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
          </View>
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
