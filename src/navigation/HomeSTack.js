import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home";
import PlantDetails from "../pages/PlantDetails";
import PlantDisease from "../pages/PlantDisease";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlantDetails"
        component={PlantDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlantDisease"
        component={PlantDisease}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
