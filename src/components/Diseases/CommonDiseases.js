import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDiseases } from "../../redux/actions/plants"; // Import the action to fetch diseases
import { PRIMARY_GREY } from "../../colors";

const CommonDiseases = () => {
  const dispatch = useDispatch();
  const plantDiseases = useSelector((state) => state.plantReducer.diseases);

  useEffect(() => {
    // Dispatch the action to fetch diseases when the component mounts
    dispatch(getDiseases());
  }, [dispatch]);

  const renderDisease = ({ item }) => {
    const firstImage =
      item.images && item.images.length > 0 ? item.images[0] : null;

    return (
      <View style={styles.diease}>
        {firstImage && (
          <View style={styles.diseaseImgContainer}>
            <Image
              source={{ uri: firstImage.original_url }}
              style={styles.diseaseImg}
            />
          </View>
        )}
        <View style={styles.diseaseTexts}>
          <Text style={styles.commonName}>{item.common_name}</Text>
          <Text style={styles.scientificName}>{item.scientific_name}</Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={plantDiseases?.data || []}
      renderItem={renderDisease}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default CommonDiseases;

const styles = StyleSheet.create({
  diease: {
    marginRight: 10,
  },
  diseaseImgContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  diseaseImg: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginBottom: 7,
    borderRadius: 10,
  },
  diseaseTexts: {
    alignItems: "center",
    justifyContent: "center",
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
