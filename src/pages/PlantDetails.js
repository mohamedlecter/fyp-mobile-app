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
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-back-outline" size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Snap Leaf</Text>
        <Icon2 name="bookmark-o" size={25} />
      </View>

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
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{plantDetails.title}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Common Name:</Text>
          <Text style={styles.value}>{plantDetails.common_name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Scientific Name:</Text>
          <Text style={styles.value}>{plantDetails.scientific_name}</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        {["Overview", "Uses & Benefits", "Propagation", "Diseases"].map(
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
      </View>

      {selectedItem === "Overview" && (
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
          <Text style={styles.subHeading}>Basic Requirements</Text>
          <Text style={styles.description}>
            {plantDetails.basic_requirements}
          </Text>
          <Text style={styles.subHeading}>Growing from Seed</Text>
          <Text style={styles.description}>{plantDetails.growing}</Text>
          <Text style={styles.subHeading}>General Care and Maintenance</Text>
          <Text style={styles.description}>{plantDetails.care}</Text>
          <Text style={styles.subHeading}>Harvesting</Text>
          <Text style={styles.description}>{plantDetails.harvesting}</Text>
        </View>
      )}

      {selectedItem === "Diseases" && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.heading}>Diseases</Text>
          {plantDetails.diseases.map((disease, index) => (
            <View key={index}>
              <Text style={styles.subHeading}>{disease.name}</Text>
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

      <View style={styles.buttonContainer}>
        <Button
          title="Add Plant"
          buttonStyle={styles.addButtonStyle}
          titleStyle={styles.addButtonTitle}
          onPress={addPlantToUser}
        />
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
    marginBottom: 20,
  },
  image: {
    width: 380,
    height: 200,
    borderRadius: 10,
    resizeMode: "stretch",
  },
  detailsContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
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
    alignItems: "center",
    marginVertical: 20,
  },
  addButtonStyle: {
    backgroundColor: PRIMARY_GREEN,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  addButtonTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PlantDetails;
