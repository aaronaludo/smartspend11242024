import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Overview from "../screens/Overview";
import Monthly from "../screens/Monthly";
import Notification from "../screens/Notification";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Account")}
            style={{ marginRight: 15 }}
          >
            <Feather name="user" size={24} color="black" />
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: "#41DC40",
      })}
    >
      <Tab.Screen
        name="Overview"
        component={Overview}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="home"
              size={24}
              color={focused ? "#41DC40" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Monthly"
        component={Monthly}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="calendar"
              size={24}
              color={focused ? "#41DC40" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="bell"
              size={24}
              color={focused ? "#41DC40" : "grey"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
