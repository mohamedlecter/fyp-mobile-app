import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ExplorePlants = () => {
  const [plants, setPlants] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // Set initial loading state to true

  useEffect(() => {
    axios
      .get("http://10.0.2.2:5000/plant/")
      .then((response) => {
        setPlants(response.data);
        setLoading(false); // Set loading state to false after data is fetchedd
      })
      .catch((error) => {
        console.error("Error fetching plant dataasss:", error);
        setLoading(false);
      });
  }, []);

  const handleNavigate = (id) => {
    navigation.navigate("PlantDetails", { id });
  };

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="small" color="#000000" /> : null}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNavigate(item.id)}>
            <View style={styles.plantItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                loadingIndicatorSource={require("../../../assets/loading.gif")}
              />
              <Text style={styles.commonName}>{item.title}</Text>
              <Text style={styles.scientificName}>{item.scientific_name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  plantItem: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginBottom: 7,
    borderRadius: 10,
  },
  commonName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  scientificName: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});

export default ExplorePlants;
