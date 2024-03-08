import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home";
import PlantDetails from "../pages/PlantDetails";
import Plants from "../pages/Plants";

const Stack = createStackNavigator();

const PlantsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Plants"
        component={Plants}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlantDetails"
        component={PlantDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PlantsStack;
