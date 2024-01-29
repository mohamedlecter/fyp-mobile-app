import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import axios from "axios";

const ExplorePlants = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(
          "https://trefle.io/api/v1/plants?token=1ifEfn6on210vOhfQYKoD93IFHsgtASVOb-eNSMVvZw&page=10"
        );
        setPlants(response.data.data);
      } catch (error) {
        console.error("Error fetching plant data:", error);
      }
    };

    fetchPlants();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.plantItem}>
            {console.log(item)}
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <Text style={styles.commonName}>{item.common_name}</Text>
            <Text style={styles.scientificName}>{item.scientific_name}</Text>
          </View>
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
    marginHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginBottom: 10,
    borderRadius: 10,
  },
  commonName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scientificName: {
    fontSize: 16,
    color: "#888",
  },
});

export default ExplorePlants;
