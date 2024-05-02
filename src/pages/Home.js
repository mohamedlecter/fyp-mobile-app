import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

export default function Home() {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.tabContainer}
          onPress={() => navigateToScreen("SnapPlantTab")}
        >
          <Image
            source={require("../../assets/camera(2).png")}
            style={styles.image}
          />
          <Text style={styles.heading2}>Tap to Diagnose your plant</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.tabContainer}
          onPress={() => navigateToScreen("ChatBotTab")}
        >
          <Image
            source={require("../../assets/bot.png")}
            style={styles.image}
          />
          <Text style={styles.heading2}>Tap to Ask Plant Bot</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.tabContainer}
          onPress={() => navigateToScreen("PlantsTab")}
        >
          <Image
            source={require("../../assets/botanic.png")}
            style={styles.image}
          />
          <Text style={styles.heading2}>Tap to Learn more about plants</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.tabContainer}
          onPress={() => navigateToScreen("CalendarTab")}
        >
          <Image
            source={require("../../assets/calendar.png")}
            style={styles.image}
          />
          <Text style={styles.heading2}>Tap to check your care calendar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  tabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: "white",
    marginHorizontal: 8,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  heading2: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Roboto",
    marginTop: 5,
    textAlign: "center",
  },
});
