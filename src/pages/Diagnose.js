import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React from "react";
import Header from "../components/Header";
import { PRIMARY_GREEN, PRIMARY_GREY } from "../colors";
import Icon from "react-native-vector-icons/FontAwesome";
import CommonDiseases from "../components/Diseases/CommonDiseases";
import CheckPlant from "../components/Diseases/CheckPlant";
import AskExpert from "../components/Diseases/AskExpert";

const Diagnose = () => {
  return (
    <View>
      <Header />
      <View style={styles.container}>
        <CheckPlant />
        <View style={styles.commonDiseases}>
          <View style={styles.header}>
            <Text style={styles.heading1}>Common Diseases </Text>
            <View style={styles.viewAllContainer}>
              <Text style={styles.viewAllText}>View All</Text>
              <Icon name="chevron-right" size={15} color={PRIMARY_GREEN} />
            </View>
          </View>

          <View style={styles.diseaseContainer}>
            <CommonDiseases />
          </View>
        </View>

        <AskExpert />
      </View>
    </View>
  );
};

export default Diagnose;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading1: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  heading2: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  viewAllContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Roboto",
    marginRight: 10,
    color: PRIMARY_GREEN,
  },
  diseaseContainer: {
    marginBottom: 16,
  },
});
