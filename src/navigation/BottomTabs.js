import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";
import Diagnose from "../pages/Diagnose";
import Profile from "../pages/Profile";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/AntDesign";
import MyPlants from "../pages/MyPlants";
import { PRIMARY_GREEN, PRIMARY_GREY } from "../colors";

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
            case "ProfileTab":
              iconSource = <Icon2 name="user" size={30} color={tintColor} />;
              break;
            case "DiagnoseTab":
              iconSource = <Icon2 name="Safety" size={30} color={tintColor} />;
              break;
            case "MyPlantsTab":
              iconSource = <Icon name="leaf" size={30} color={tintColor} />;
              break;
            case "HomeTab":
              iconSource = <Icon name="home" size={30} color={tintColor} />;
              break;
            default:
              iconSource = null;
          }
          return iconSource;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={Home} />
      <Tab.Screen name="DiagnoseTab" component={Diagnose} />
      <Tab.Screen name="MyPlantsTab" component={MyPlants} />
      <Tab.Screen name="ProfileTab" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
