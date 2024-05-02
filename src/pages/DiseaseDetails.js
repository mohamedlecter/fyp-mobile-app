import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getDisease } from "../redux/actions/plants";
import HeaderBack from "../components/HeaderBack"; // Import the HeaderBack component
import Icon from "react-native-vector-icons/Ionicons";

const DiseaseDetails = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { diseaseName, confidence, imageUri } = route.params;
  const dispatch = useDispatch();
  const diseaseDetails = useSelector((state) => state.plantReducer.disease);
  const [formattedHealthy, setFormattedHealthy] = useState("");

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const formattedDisease = diseaseName.replace(/_/g, " ");
  const formattedConfidence = (confidence * 100).toString().slice(0, 5);

  const isHealthyDisease = (diseaseName) => {
    return diseaseName.toLowerCase().includes("healthy");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <TouchableOpacity
          style={styles.backIconContainer}
          onPress={handleNavigateBack}
        >
          <Icon name="arrow-back-outline" size={20} style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.dieasesLabel}>
          Predicted Disease: {formattedDisease} with confidence of {formattedConfidence}%
        </Text>
        {isHealthyDisease(diseaseName) ? (
          <View></View>
        ) : (
          <View style={styles.diseaseContainer}>
            <View style={styles.row}>
              <View style={styles.row}>
                <Text style={[styles.label, { marginRight: 5 }]}>
                  Category:
                </Text>
                <Text style={styles.value}>
                  {diseaseDetails[0].found_diseases[0].category}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.label, { marginRight: 5 }]}>Cause:</Text>
                <Text style={styles.value}>
                  {diseaseDetails[0].found_diseases[0].cause}
                </Text>
              </View>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Symptoms:</Text>
              <Text style={styles.value}>
                {diseaseDetails[0].found_diseases[0].symptoms}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Treatment:</Text>
              <Text style={styles.value}>
                {diseaseDetails[0].found_diseases[0].treatment}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Comments:</Text>
              <Text style={styles.value}>
                {diseaseDetails[0].found_diseases[0].comments}
              </Text>
            </View>
          </View>
        )}
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
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  backIconContainer: {
    position: "absolute",
    top: 40,
    left: 10,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: 40,
    height: 40,
    borderRadius: 35,
  },
  backIcon: {
    margin: 10,
    color: "white",
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dieasesLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
  },
  diseaseContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  itemRow: {
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  item: {
    marginVertical: 5,
  },
});

export default DiseaseDetails;
