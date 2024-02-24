import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import axios from "axios";

const PlantDisease = ({ route }) => {
  const { diseaseName } = route.params;
  const [plantDetails, setPlantDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:5000/plant/disease/${diseaseName}`)
      .then((response) => {
        // Assuming response.data is an array, so we access the first element
        setPlantDetails(response.data[0]);
        setLoading(false);
        console.log("Plant Details:", response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching plant details:", error);
        setLoading(false);
      });
  }, [diseaseName]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {plantDetails && (
          <>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: plantDetails.image }}
                style={styles.image}
              />
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.heading}>{plantDetails.title}</Text>
              <Text style={styles.description}>{plantDetails.description}</Text>
            </View>
            {plantDetails.matching_disease && (
              <View style={styles.descriptionContainer}>
                <Text style={styles.heading}>Matching Disease</Text>
                <Text style={styles.description}>
                  Name: {plantDetails.matching_disease.name}
                </Text>
                <Text style={styles.description}>
                  Category: {plantDetails.matching_disease.category}
                </Text>
                <Text style={styles.description}>
                  Cause: {plantDetails.matching_disease.cause}
                </Text>
                <Text style={styles.description}>
                  Symptoms: {plantDetails.matching_disease.symptoms}
                </Text>
                <Text style={styles.description}>
                  Treatment: {plantDetails.matching_disease.treatment}
                </Text>
              </View>
            )}
            {plantDetails.other_diseases && (
              <View style={styles.descriptionContainer}>
                <Text style={styles.heading}>Other Diseases</Text>
                {plantDetails.other_diseases.map((disease, index) => (
                  <View key={index}>
                    <Text style={styles.description}>Name: {disease.name}</Text>
                    <Text style={styles.description}>
                      Category: {disease.category}
                    </Text>
                    <Text style={styles.description}>
                      Cause: {disease.cause}
                    </Text>
                    <Text style={styles.description}>
                      Symptoms: {disease.symptoms}
                    </Text>
                    <Text style={styles.description}>
                      Treatment: {disease.treatment}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  imageContainer: {
    marginBottom: 10,
  },
  image: {
    width: 380,
    height: 180,
    borderRadius: 10,
    resizeMode: "stretch",
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    marginVertical: 2,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
});

export default PlantDisease;
