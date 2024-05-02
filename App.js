import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./src/redux/store";

import Login from "./src/pages/LoginPage";
import SignUp from "./src/pages/SignUpPage";
import BottomTabs from "./src/navigation/BottomTabs";
import CalendarPage from "./src/pages/Calendar";
import PlantsStack from "./src/navigation/PlantsStack";
import MyPlantsStack from "./src/navigation/MyPlantsStack";
import ChatBot from "./src/pages/ChatBot";
import Myplant from "./src/pages/Myplant";
import SnapPlant from "./src/pages/SnapPlant";
import NoDisease from "./src/pages/NoDisease";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={SignUp} />
          <Stack.Screen name="Bottom Tabs" component={BottomTabs} />
          <Stack.Screen name="CalendarTab" component={CalendarPage} />
          <Stack.Screen name="PlantsTab" component={PlantsStack} />
          <Stack.Screen name="SnapPlant" component={SnapPlant} />
          <Stack.Screen name="MyPlantsTab" component={MyPlantsStack} />
          <Stack.Screen name="MyPlant" component={Myplant} />
          <Stack.Screen name="ChatBotTab" component={ChatBot} />
          <Stack.Screen name="NoDisease" component={NoDisease} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
