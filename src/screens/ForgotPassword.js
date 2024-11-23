import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles/Form";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      const response = await axios.post(
        `${"https://smart-spend.online"}/api/users/forgotpasswordprocess`,
        {
          email: email,
        }
      );

      navigation.navigate("Forgot Password Verification", { email: email });
    } catch (error) {
      if (error.response.data.error) {
        console.log(error.response.data.error);
        setError(error.response.data.error);
      } else if (error.response.data.message) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <View style={[styles.container, { flex: 1 }]}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text
          style={
            ([styles.description],
            { textAlign: "center", color: "grey", marginBottom: 20 })
          }
        >
          Please enter your email address. You will receive a code via email,
          provided the email is already registered in the system.
        </Text>
        {error !== "" && (
          <Text style={[styles.description, { color: "red" }]}>{error}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => {
            const cleanEmail = text.trim();
            setEmail(cleanEmail);
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleSubmit}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ForgotPassword;
