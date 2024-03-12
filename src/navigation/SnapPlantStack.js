import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SnapPlant from "../pages/SnapPlant";
import DiseaseDetails from "../pages/DiseaseDetails";

const Stack = createStackNavigator();

const SnapPlantStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SnapPlant"
        component={SnapPlant}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DiseaseDetails"
        component={DiseaseDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SnapPlantStack;
