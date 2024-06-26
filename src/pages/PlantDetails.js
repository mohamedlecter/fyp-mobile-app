import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import { PRIMARY_GREEN } from "../colors";
import { useDispatch, useSelector } from "react-redux";
import { addPlant, getPlant } from "../redux/actions/plants";

const PlantDetails = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Overview");
  const navigation = useNavigation();
  const { id } = route.params;
  const user = useSelector((state) => state.userReducer.user);
  const userId = user.user._id;
  const dispatch = useDispatch();
  const plantDetails = useSelector((state) => state.plantReducer.plant);

  useEffect(() => {
    dispatch(getPlant(id))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching plant details:", error);
        setLoading(false);
      });
  }, [id]);

  const addPlantToUser = () => {
    dispatch(addPlant(userId, id));
    setTimeout(() => {
      navigation.navigate("MyPlantsTab");
    }, 2000);
  };

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Image
          source={
            plantDetails.image
              ? { uri: plantDetails.image }
              : require("../../assets/defaultImage.png")
          }
          style={styles.image}
          loadingIndicatorSource={require("../../assets/loading.gif")}
        />
        <TouchableOpacity
          style={styles.backIconContainer}
          onPress={handleNavigateBack}
        >
          <Icon name="arrow-back-outline" size={20} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>{plantDetails.title}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={addPlantToUser}
              style={styles.buttonContainer}
            >
              <Text style={styles.addText}>Add to My Plants</Text>
              <Image
                source={require("../../assets/leaf.png")}
                style={styles.leafIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Common Name:</Text>
          <Text style={styles.value}>{plantDetails.common_name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Scientific Name:</Text>
          <Text style={styles.value}>{plantDetails.scientific_name}</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
      >
        {["Overview", "Diseases", "Propagation", "Uses & Benefits"].map(
          (item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.tabItem,
                selectedItem === item && styles.selectedTabItem,
              ]}
              onPress={() => handleItemPress(item)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedItem === item && styles.selectedTabText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      {selectedItem === "Overview" && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.heading}>Description</Text>
          <Text style={styles.description} numberOfLines={10}>
            {plantDetails.description}
          </Text>
        </View>
      )}
      {selectedItem === "Propagation" && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.heading}>Propagation</Text>
          <Text style={styles.subHeading}>Basic Requirements</Text>
          <Text style={styles.description}>
            {plantDetails.basic_requirements}
          </Text>
          <Text style={styles.subHeading}>General Care and Maintenance</Text>
          <Text style={styles.description}>{plantDetails.care}</Text>
          <Text style={styles.subHeading}>Harvesting</Text>
          <Text style={styles.description}>{plantDetails.harvesting}</Text>
          <Text style={styles.subHeading}>Growing from Seed</Text>
          <Text style={styles.description}>{plantDetails.growing}</Text>
        </View>
      )}

      {selectedItem === "Uses & Benefits" && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.heading}>Uses & Benefits</Text>
          <Text style={styles.description}>{plantDetails.uses}</Text>
        </View>
      )}

      {selectedItem === "Diseases" && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.heading}>Diseases</Text>
          {plantDetails.diseases.map((disease, index) => (
            <View key={index}>
              <Text style={styles.subHeading}>
                {disease.name && disease.name.replace(/_/g, " ")}
              </Text>
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginTop: 35,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Roboto",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "stretch",
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
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  value: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  tabItem: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 5,
  },
  selectedTabItem: {
    backgroundColor: PRIMARY_GREEN,
    borderColor: PRIMARY_GREEN,
  },
  tabText: {
    color: "#333",
    fontSize: 16,
  },
  selectedTabText: {
    color: "#fff",
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 10,
  },
  buttonContainer: {
    borderRadius: 10,
    backgroundColor: "#00a86b",
    alignItems: "center",
    padding: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leafIcon: {
    height: 20,
    width: 20,
    tintColor: "#fff",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
    marginRight: 5,
  },
});

export default PlantDetails;
