import { StyleSheet, Text, View } from "react-native";
import { PRIMARY_GREEN, PRIMARY_GREY } from "../colors";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../components/Header";
import ExplorePlants from "../components/Plants/ExplorePlants";

export default function Home() {
  return (
    <View>
      <Header />
      <View View style={styles.container}>
        <View style={styles.explorePlants}>
          <View style={styles.header}>
            <Text style={styles.heading1}>Explore Plants</Text>
            <View style={styles.viewAllContainer}>
              <Text style={styles.viewAllText}>View All</Text>
              <Icon name="chevron-right" size={15} color={PRIMARY_GREEN} />
            </View>
          </View>

          <View style={styles.plantsContainer}>
            <ExplorePlants />
          </View>
        </View>
      </View>
    </View>
  );
}

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
});
