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
  TextInput,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/AntDesign";
import { SearchBar } from "@rneui/themed";

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://10.0.2.2:5000/plant/")
      .then((response) => {
        setPlants(response.data);
        console.log("Plants:", response.data);
        setLoading(false);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error("Error fetching plant dataa:", error);
        setLoading(false);
        setRefreshing(false);
      });
  };

  const handleNavigate = (id) => {
    console.log("Navigating to PlantDetails with ID:", id);
    navigation.navigate("PlantDetails", { id });
  };

  const handleSearch = () => {
    // This could be a filter operation on the plants array
    console.log("Searching for:", searchQuery);
  };

  const refreshData = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.searchContainer}>
        <SearchBar
          platform="android"
          containerStyle={{
            color: "black",
          }}
          inputContainerStyle={{
            color: "black",
          }}
          inputStyle={{
            color: "black",
          }}
          leftIconContainerStyle={{}}
          rightIconContainerStyle={{}}
          loadingProps={{}}
          onChangeText={setSearchQuery}
          onClearText={() => console.log(onClearText())}
          placeholder="Search..."
          placeholderTextColor="black"
          cancelButtonTitle="Cancel"
          cancelButtonProps={{}}
          onCancel={() => console.log(onCancel())}
          value={searchQuery}
          onSearch={handleSearch}
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
    flexDirection: "row",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  searchButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
