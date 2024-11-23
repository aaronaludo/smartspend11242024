import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles/Form";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgotPasswordReset = ({ navigation, route }) => {
  const { email, code, user, token } = route.params;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      const response = await axios.post(
        `${"https://smart-spend.online"}/api/users/forgotpasswordreset`,
        {
          email: email,
          code: code,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }
      );

      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userData", JSON.stringify(user));

      navigation.navigate("Tab Navigator", { screen: "Overview" });
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
        <Text style={styles.title}>Enter New Password</Text>
        <Text
          style={
            ([styles.description],
            { textAlign: "center", color: "grey", marginBottom: 20 })
          }
        >
          Please enter the new password.
        </Text>
        {error !== "" && (
          <Text style={[styles.description, { color: "red" }]}>{error}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter New Password"
          value={newPassword}
          secureTextEntry
          onChangeText={(text) => setNewPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Confirm New Password"
          value={confirmPassword}
          secureTextEntry
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleSubmit}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ForgotPasswordReset;
