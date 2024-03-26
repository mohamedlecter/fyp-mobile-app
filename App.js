import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./src/redux/store";

import Login from "./src/pages/LoginPage";
import SignUp from "./src/pages/SignUpPage";
import BottomTabs from "./src/navigation/BottomTabs";
import CalendarPage from "./src/pages/Calendar";

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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
