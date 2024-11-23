import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProtectionAssessment = ({ navigation, route }) => {
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");
  const [q5, setQ5] = useState("");
  const [q6, setQ6] = useState("");
  const [q7, setQ7] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.post(
        `${"https://smart-spend.online"}/api/users/protections/add`,
        {
          q1: q1,
          q2: q2,
          q3: q3,
          q4: q4,
          q5: q5,
          q6: q6,
          q7: q7,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigation.navigate("Protection", {
        render: ".",
      });
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Protection Assessment</Text>
        <Text style={styles.description}></Text>
        <TextInput
          style={styles.input}
          placeholder="My monthly income is approximately"
          value={q1}
          onChangeText={(text) => setQ1(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="My monthy spend is approximately"
          value={q2}
          onChangeText={(text) => setQ2(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="The minimum I would like to pay monthly is"
          value={q3}
          onChangeText={(text) => setQ3(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="The maximum I would like to pay monthly is"
          value={q4}
          onChangeText={(text) => setQ4(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="The number of people who are financially dependent on me"
          value={q5}
          onChangeText={(text) => setQ5(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Years to protect income"
          value={q6}
          onChangeText={(text) => setQ6(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="So far, I have saved"
          value={q7}
          onChangeText={(text) => setQ7(text)}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleSubmit}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProtectionAssessment;
