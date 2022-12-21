import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homepage from "./components/Home";
import { Platform } from "react-native";
import Header from "./components/Header";
import RestaurantDetail from "./components/RestaurantDetail";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 100,
      }}
    >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Homepage}
          headerMode="screen"
          options={{
            header: () => <Header headerDisplay="Restaurant" />,
          }}
        />
        <Stack.Screen
          name="RestaurantDetail"
          component={RestaurantDetail}
          headerMode="screen"
          options={{
            header: () => <Header headerDisplay="Detail" />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
