import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";

const PlantDetails = ({ route }) => {
  const [plantDetails, setPlantDetails] = useState(null);
  const { id } = route.params;
  console.log("id", id);

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:5000/plant/${id}`)
      .then((response) => {
        console.log(response.data);
        setPlantDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching plant details:", error);
      });
  }, [route.params.id]);

  if (!plantDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: plantDetails.image }} style={styles.image} />
      <Text style={styles.commonName}>{plantDetails.title}</Text>
      <Text style={styles.scientificName}>{plantDetails.scientific_name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 10,
  },
  commonName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scientificName: {
    fontSize: 18,
    color: "#888",
    marginBottom: 20,
  },
});

export default PlantDetails;
