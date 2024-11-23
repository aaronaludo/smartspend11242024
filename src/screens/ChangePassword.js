import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassowrd] = useState("");
  const [newPassword, setNewPassowrd] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.post(
        `${"https://smart-spend.online"}/api/users/change-password`,
        {
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigation.navigate("Tab Navigator", { screen: "Overview" });
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.description}></Text>
        {error !== "" && (
          <Text style={[styles.description, { color: "red" }]}>{error}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter old password"
          value={oldPassword}
          secureTextEntry
          onChangeText={(text) => setOldPassowrd(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter new paassword"
          value={newPassword}
          secureTextEntry
          onChangeText={(text) => setNewPassowrd(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter confirm new password"
          value={confirmNewPassword}
          secureTextEntry
          onChangeText={(text) => setConfirmNewPassword(text)}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleSubmit}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ChangePassword;
