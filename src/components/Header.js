import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("CalendarTab")}
      >
        <Icon name="calendar" size={25} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Snap Leaf</Text>
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
