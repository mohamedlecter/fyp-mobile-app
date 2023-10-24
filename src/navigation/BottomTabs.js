import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tasks from "../pages/Tasks";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconSource;
          // Determine the icon source based on the route name
          switch (route.name) {
            case "ProfileTab":
              iconSource = require("../../assets/profile-icon.png");
              break;
            case "TasksTab":
              iconSource = require("../../assets/saved-icon.png");
              break;
            case "HomeTab":
              iconSource = require("../../assets/home-icon.png");
              break;
            default:
              iconSource = null;
          }
          const tintColor = focused ? "#3D0087" : "#A39EA9";
          return <Image source={iconSource} style={{ tintColor }} />;
        },
      })}
    >
      <Tab.Screen name="ProfileTab" component={Profile} />
      <Tab.Screen name="TasksTab" component={Tasks} /> 
      <Tab.Screen name="HomeTab" component={Home} />  {/* change to homestak */}
    </Tab.Navigator>
  );
};

export default BottomTabs;
