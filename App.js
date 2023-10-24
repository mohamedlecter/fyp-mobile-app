import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { Image } from 'react-native';
import store from './src/redux/store';

import Home from './src/pages/Home';
import Profile from './src/pages/Profile';
import Tasks from './src/pages/Tasks';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('./assets/home-icon.png')}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('./assets/profile-icon.png')}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Tasks"
            component={Tasks}
            options={{
              tabBarLabel: 'Tasks',
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('./assets/saved-icon.png')}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
