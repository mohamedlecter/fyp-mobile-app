import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyPlants from "../pages/MyPlants";
import MyPlant from "../pages/Myplant";

const Stack = createStackNavigator();

const MyPlantsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyPlants"
        component={MyPlants}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MyPlantsStack;
