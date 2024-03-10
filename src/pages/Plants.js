import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/AntDesign";
import { Searchbar } from "react-native-paper";
import { searchPlants, getPlants } from "../redux/actions/plants";

const Plants = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const plants = useSelector((state) => state.plantReducer.plants);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    // Fetch all plants if search query is empty
    dispatch(getPlants())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching all plants:", error);
        setLoading(false);
      });
  };

  const onCancel = () => {
    // Reset search query and fetch all plants
    setSearchQuery("");
    fetchData();
  };

  const handleNavigate = (id) => {
    console.log("Navigating to PlantDetails with ID:", id);
    navigation.navigate("PlantDetails", { id });
  };

  const handleSearch = () => {
    // Fetch data based on search query
    dispatch(searchPlants(searchQuery))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error searching plants:", error);
        setLoading(false);
      });
  };

  const refreshData = () => {
    setRefreshing(true);
    // Fetch data based on search query
    fetchData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.searchContainer}>
        <Searchbar
          onChangeText={setSearchQuery}
          placeholder="Search..."
          value={searchQuery}
          onSearch={handleSearch}
          onIconPress={handleSearch}
          onClearIconPress={onCancel}
        />
      </View>
      {loading ? (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color="#000000"
        />
      ) : null}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNavigate(item.id)}>
            <View style={styles.plantItem}>
              <View style={styles.imageContainer}>
                <Image
                  source={
                    item.image
                      ? { uri: item.image }
                      : require("../../assets/defaultImage.png")
                  }
                  style={styles.image}
                  loadingIndicatorSource={require("../../assets/loading.gif")}
                />
              </View>
              <View style={styles.plantInfo}>
                <Text style={styles.commonName}>{item.title}</Text>
                <Text style={styles.scientificName}>
                  {item.scientific_name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshData}
            colors={["#000000"]}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  searchContainer: {
    marginBottom: 20,
  },
  activityIndicator: {
    marginTop: 20,
  },
  plantItem: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  imageContainer: {
    overflow: "hidden",
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  plantInfo: {
    flex: 1,
    marginLeft: 15,
  },
  commonName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 10,
  },
  scientificName: {
    fontSize: 16,
    color: "#888",
    textAlign: "left",
    marginTop: 5,
  },
});

export default Plants;
