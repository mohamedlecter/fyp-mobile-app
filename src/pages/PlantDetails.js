import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const PlantDetails = ({ route }) => {
  const [plantDetails, setPlantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState("OverView");
  const navigation = useNavigation();
  const { id } = route.params;

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:5000/plant/${id}`)
      .then((response) => {
        setPlantDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching plant details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-back-outline" size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Plantify</Text>
        <Icon2 name="bookmark-o" size={25} />
      </View>

      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: plantDetails.image }}
            style={styles.image}
            loadingIndicatorSource={require("../../assets/loading.gif")}
          />
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.heading}>{plantDetails.title}</Text>
          <View style={styles.commonNameContainer}>
            <Text style={styles.commonName}>Common Name : </Text>
            <Text style={styles.commonName}>{plantDetails.common_name}</Text>
          </View>

          <View style={styles.commonNameContainer}>
            <Text style={styles.commonName}>Scientific Name : </Text>
            <Text style={styles.commonName}>
              {plantDetails.scientific_name}
            </Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["OverView", "Uses & Benefits", "Propagation", "Diseases"].map(
            (item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.buttonContainer,
                  selectedItem === item && styles.selectedButtonContainer,
                ]}
                onPress={() => handleItemPress(item)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedItem === item && styles.selectedButtonText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>

        {selectedItem === "OverView" && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.heading}>Description</Text>
            <Text style={styles.description} numberOfLines={10}>
              {plantDetails.description}
            </Text>
          </View>
        )}

        {selectedItem === "Uses & Benefits" && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.heading}>Uses & Benefits</Text>
            <Text style={styles.description}>{plantDetails.uses}</Text>
          </View>
        )}

        {selectedItem === "Propagation" && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.heading}>Propagation</Text>

            <View>
              <Text style={styles.heading}>Basic Requirements</Text>
              <Text style={styles.description} numberOfLines={5}>
                {plantDetails.basic_requirements}
              </Text>
            </View>

            <View>
              <Text style={styles.heading}>Growing from Seed</Text>
              <Text style={styles.description} numberOfLines={5}>
                {plantDetails.growing}
              </Text>
            </View>

            <View>
              <Text style={styles.heading}>General care and maintenance</Text>
              <Text style={styles.description} numberOfLines={5}>
                {plantDetails.care}
              </Text>
            </View>

            <View>
              <Text style={styles.heading}>Harvesting</Text>
              <Text style={styles.description} numberOfLines={5}>
                {plantDetails.harvesting}
              </Text>
            </View>
          </View>
        )}

        {selectedItem === "Diseases" && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.heading}>Diseases</Text>
            {plantDetails.diseases.map((disease, index) => (
              <View key={index}>
                <Text style={styles.heading}>{disease.name}</Text>
                <Text style={styles.description}>
                  Category: {disease.category}
                </Text>
                <Text style={styles.description}>Cause: {disease.cause}</Text>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginTop: 35,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Roboto",
  },
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
  nameContainer: {
    marginBottom: 10,
  },
  commonNameContainer: {
    flexDirection: "row",
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
  buttonText: {
    fontSize: 16,
    color: "#00a86b",
  },
  buttonContainer: {
    padding: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00a86b",
    marginRight: 5,
  },
  selectedButtonContainer: {
    backgroundColor: "#00a86b",
  },
  selectedButtonText: {
    color: "white",
  },
});

export default PlantDetails;
