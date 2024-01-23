import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { PRIMARY_GREEN, PRIMARY_GREY } from "../../colors";

const CommonDiseases = () => {
  const diseases = [
    { name: "Bacterial Blight" },
    { name: "Bacterial Blight", name: "Bacterial Blight" },
    { name: "Bacterial Blight" },
  ];

  const renderDisease = ({ item }) => {
    return (
      <View style={styles.diease}>
        <Image
          source={require("../../../assets/checkPlant.png")}
          style={styles.diseaseImg}
        />
        <View style={styles.diseaseTexts}>
          <Text style={styles.heading2}>{item.name}</Text>
          <Text
            style={[styles.heading2, { color: PRIMARY_GREY, marginTop: 2 }]}
          >
            {item.name}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={diseases}
      renderItem={renderDisease}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default CommonDiseases;

const styles = StyleSheet.create({
  diease: {
    alignItems: "center",
    justifyContent: "center",
  },
  diseaseImg: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  diseaseTexts: {
    marginHorizontal: 10,
  },
  heading2: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
