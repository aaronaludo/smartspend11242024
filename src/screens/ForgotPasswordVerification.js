import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles/Form";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgotPasswordVerification = ({ navigation, route }) => {
  const { email } = route.params;
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      const response = await axios.post(
        `${"https://smart-spend.online"}/api/users/forgotpasswordverification`,
        {
          email: email,
          code: code,
        }
      );

      const { user, token } = response.data.response;

      navigation.navigate("Forgot Password Reset", {
        email: email,
        code: code,
        token: token,
        user: user,
      });
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
        <Text style={styles.title}>Code Verification</Text>
        <Text
          style={
            ([styles.description],
            { textAlign: "center", color: "grey", marginBottom: 20 })
          }
        >
          Please enter the code sent to your email: {email}.
        </Text>
        {error !== "" && (
          <Text style={[styles.description, { color: "red" }]}>{error}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter Code"
          value={code}
          onChangeText={(text) => {
            const incomeValue = text.replace(/[^0-9]/g, "");
            setCode(incomeValue);
          }}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleSubmit}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ForgotPasswordVerification;
