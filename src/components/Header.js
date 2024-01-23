import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome";

export default function Header() {
  return (
    <View style={styles.container}>
      <Icon name="notifications-outline" size={25} />
      <Text style={styles.headerText}>Plantify</Text>
      <Icon2 name="bookmark-o" size={25} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: 35,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Roboto",
  },
});
