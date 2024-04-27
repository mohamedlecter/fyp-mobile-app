import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PRIMARY_GREEN } from "../colors";
import { useDispatch, useSelector } from "react-redux";
import { getDisease } from "../redux/actions/plants";
import HeaderBack from "../components/HeaderBack";

const DiseaseDetails = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Overview");
  const navigation = useNavigation();
  const { diseaseName, confidence, imageUri } = route.params;
  const dispatch = useDispatch();
  const diseaseDetails = useSelector((state) => state.plantReducer.disease);

  useEffect(() => {
    dispatch(getDisease(diseaseName))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching disease details:", error);
        setLoading(false);
      });
  }, [diseaseName]);

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const disease = diseaseDetails[0].found_diseases[0];
  const formattedDisease = disease.name.replace(/_/g, " ");
  const formattedConfidence = confidence.toString().slice(0, 5);

  const otherDiseases = diseaseDetails[0].other_diseases;

  console.log("Disease", otherDiseases);

  console.log("image", imageUri);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HeaderBack title="Predicted Disease" onPress={handleNavigateBack} />

      <View style={styles.detailsContainer}>
        <Image
          source={{ uri: imageUri }}
          style={{ width: "100%", height: 200 }}
        />
        <Text style={styles.label}>
          Predicted Disease: {formattedDisease} with confidence of{" "}
          {formattedConfidence}
        </Text>
        <Text style={styles.value}>{formattedDisease}</Text>

        <Text style={styles.label}>Category:</Text>
        <Text style={styles.value}>{disease.category}</Text>

        <Text style={styles.label}>Cause:</Text>
        <Text style={styles.value}>{disease.cause}</Text>

        <Text style={styles.label}>Symptoms:</Text>
        <Text style={styles.value}>{disease.symptoms}</Text>

        <Text style={styles.label}>Treatment:</Text>
        <Text style={styles.value}>{disease.treatment}</Text>

        <Text style={styles.label}>Comments:</Text>
        <Text style={styles.value}>{disease.comments}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default DiseaseDetails;
