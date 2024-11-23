import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles/Form";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OTP = ({ navigation, route }) => {
  const { user } = route.params;
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleOTP = async () => {
    setError("");
    try {
      const response = await axios.post(
        `${"https://smart-spend.online"}/api/users/otp/${user.id}`,
        {
          code: code,
        }
      );

      const { token } = response.data.response;

      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userData", JSON.stringify(user));

      navigation.navigate("Tab Navigator", { screen: "Overview" });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
        setError(error.response.data.error);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  const handleResend = async () => {
    setTimeLeft(600);

    try {
      const response = await axios.get(
        `${"https://smart-spend.online"}/api/users/otp/resend/${user.id}`
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={[styles.container, { flex: 1 }]}>
        <Text style={styles.title}>Verify your Email!</Text>
        <Text style={styles.description}>
          Enter the code below to confirm{" "}
          <Text style={{ textDecorationLine: "underline", color: "blue" }}>
            {user.email}
          </Text>
        </Text>
        {error !== "" && (
          <Text style={[styles.description, { color: "red" }]}>{error}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter Code"
          value={code}
          // onChangeText={(text) => setCode(text)}
          onChangeText={(text) => {
            // Allow only numbers
            const incomeValue = text.replace(/[^0-9]/g, "");
            setCode(incomeValue);
          }}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleOTP}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
        <Text style={styles.inputText}>Time left: {formatTime(timeLeft)}</Text>
        <TouchableOpacity onPress={handleResend}>
          <Text style={[styles.inputText, styles.subInputText]}>
            Did not receive a code Re-send
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default OTP;
