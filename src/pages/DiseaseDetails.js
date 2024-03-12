import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import { PRIMARY_GREEN } from "../colors";
import { useDispatch, useSelector } from "react-redux";
import { getDisease } from "../redux/actions/plants";

const DiseaseDetails = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Overview");
  const navigation = useNavigation();
  const { diseaseName } = route.params;
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

  console.log("Disease details:", diseaseDetails[0].matching_disease.category);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Button
          title="Back"
          onPress={handleNavigateBack}
          style={styles.backButton}
        />
        <Text style={styles.headerText}>Disease Details</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>
          {diseaseDetails[0].matching_disease.name}
        </Text>

        <Image
          source={{ uri: diseaseDetails[0].image }}
          style={{
            width: 200,
            height: 200,
            resizeMode: "cover",
            borderRadius: 10,
            marginBottom: 10,
          }}
        />

        <Text style={styles.label}>Category</Text>
        <Text style={styles.value}>
          {diseaseDetails[0].matching_disease.category}
        </Text>

        <Text style={styles.label}>Symptoms</Text>
        <Text style={styles.value}>
          {diseaseDetails[0].matching_disease.symptoms}
        </Text>

        <Text style={styles.label}>Treatment</Text>
        <Text style={styles.value}>
          {diseaseDetails[0].matching_disease.treatment}
        </Text>

        <Text style={styles.label}>Treatment</Text>
        <Text style={styles.value}>
          {diseaseDetails[0].matching_disease.treatment}
        </Text>
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  backButton: {
    marginRight: "auto",
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
