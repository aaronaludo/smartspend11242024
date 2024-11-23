import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles/Form";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const AddCreateGoal = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: false,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleAdd = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.post(
        `${"https://smart-spend.online"}/api/users/goals/add`,
        {
          title: title,
          cost: cost,
          current_savings: 0,
          target_date: date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigation.navigate("1 Tap Goal Savings", {
        result: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.inputButton, { marginBottom: 10 }]}
          onPress={showDatepicker}
        >
          <Text style={styles.inputButtonText}>Tap to Select Date</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Title"
          value={title}
          onChangeText={(text) => {
            // Allow only letters
            const nameValue = text.replace(/[^A-Za-z\s]/g, "");
            setTitle(nameValue);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Cost"
          value={cost}
          onChangeText={(text) => {
            // Allow only numbers
            const incomeValue = text.replace(/[^0-9]/g, "");
            setCost(incomeValue);
          }}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[styles.inputButton, { marginTop: 10 }]}
          onPress={handleAdd}
        >
          <Text style={styles.inputButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddCreateGoal;
