import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Box from "../components/Box";
import { styles } from "../styles/Box";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Protection = ({ navigation, route }) => {
  const { render } = route.params;
  const [protection, setProtection] = useState({
    q1: "n/a",
    q2: "n/a",
    q3: "n/a",
    q4: "n/a",
    q5: "n/a",
    q6: "n/a",
    q7: "n/a",
  });

  const [userData, setUserData] = useState({
    id: null,
    role_id: null,
    image: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    date_of_birth: "",
    age: 0,
    salary: "",
    work: "",
    created_at: null,
    updated_at: null,
  });

  useEffect(() => {
    fetchData();
    getUserData();
  }, [render]);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(
        `${"https://smart-spend.online"}/api/users/protections`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.protection) {
        setProtection(response.data.protection);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  return (
    <ScrollView>
      <Box
        container={styles.container}
        title={styles.title}
        description={styles.description}
        titleLabel={`My monthly income is approximately`}
        descriptionLabel={`${protection.q1}`}
      />
      <Box
        container={styles.container}
        title={styles.title}
        description={styles.description}
        titleLabel={`My monthy spend is approximately`}
        descriptionLabel={`${protection.q2}`}
      />
      <Box
        container={styles.container}
        title={styles.title}
        description={styles.description}
        titleLabel={`The minimum I would like to pay monthly is`}
        descriptionLabel={`${protection.q3}`}
      />
      <Box
        container={styles.container}
        title={styles.title}
        description={styles.description}
        titleLabel={`The maximum I would like to pay monthly is`}
        descriptionLabel={`${protection.q4}`}
      />
      <Box
        container={styles.container}
        title={styles.title}
        description={styles.description}
        titleLabel={`The number of people who are financially dependent on me`}
        descriptionLabel={`${protection.q5}`}
      />
      <Box
        container={styles.container}
        title={styles.title}
        description={styles.description}
        titleLabel={`Years to protect income`}
        descriptionLabel={`${protection.q6}`}
      />
      <Box
        container={styles.container}
        title={styles.title}
        description={styles.description}
        titleLabel={`So far, I have saved`}
        descriptionLabel={`${protection.q7}`}
      />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate("Tab Navigator", { screen: "Overview" })
          }
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Protection Assessment")}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Protection;
