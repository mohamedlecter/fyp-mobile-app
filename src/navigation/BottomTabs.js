import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../pages/Profile";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/AntDesign";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import MyPlants from "../pages/MyPlants";
import { PRIMARY_GREEN, PRIMARY_GREY } from "../colors";
import SnapPlant from "../pages/SnapPlant";
import HomeStack from "./HomeStack";
import PlantsStack from "./PlantsStack";
import SnapPlantStack from "./SnapPlantStack";
import MyPlantsStack from "./MyPlantsStack";
import ChatBot from "../pages/ChatBot";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          const tintColor = focused ? PRIMARY_GREEN : PRIMARY_GREY;
          let iconSource;
          switch (route.name) {
            case "ChatBotTab":
              iconSource = (
                <Icon3 name="chat-question" size={28} color={tintColor} />
              );
              break;
            case "PlantsTab":
              iconSource = <Icon2 name="Safety" size={28} color={tintColor} />;
              break;
            case "MyPlantsTab":
              iconSource = <Icon name="leaf" size={28} color={tintColor} />;
              break;
            case "SnapPlantTab":
              iconSource = (
                <View style={styles.SnapPlant}>
                  <Icon2 name="camerao" size={28} color={"#fff"} />
                </View>
              );
              break;
            case "HomeTab":
              iconSource = <Icon name="home" size={28} color={tintColor} />;
              break;
            default:
              iconSource = null;
          }
          return iconSource;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="PlantsTab" component={PlantsStack} />
      <Tab.Screen name="SnapPlantTab" component={SnapPlantStack} />
      <Tab.Screen name="MyPlantsTab" component={MyPlantsStack} />
      <Tab.Screen name="ChatBotTab" component={ChatBot} />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  SnapPlant: {
    position: "absolute",
    bottom: 20,
    zIndex: 1,
    alignSelf: "center",
    backgroundColor: PRIMARY_GREEN,
    borderRadius: 20,
    padding: 8,
  },
});
