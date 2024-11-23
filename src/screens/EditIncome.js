import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles/Form";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const EditIncome = ({ navigation, route }) => {
  const { item } = route.params;
  let [month, day, year] = item.date.split("/");
  let datee = new Date(year, month - 1, day);
  const [date, setDate] = useState(datee);
  const [name, setName] = useState(item.name);
  const [income, setIncome] = useState(item.income);
  const [type, setType] = useState(item.type_id);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Expected", value: 1 },
    { label: "Not Expected", value: 2 },
  ]);

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

  const handleEdit = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.put(
        `${"https://smart-spend.online"}/api/users/incomes/${item.id}`,
        {
          name: name,
          income: income,
          type_id: type,
          date: date.toLocaleDateString("en-US", {
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

      navigation.navigate("Incomes", {
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
          placeholder="Enter Income Name"
          value={name}
          onChangeText={(text) => {
            // Allow only letters
            const nameValue = text.replace(/[^A-Za-z\s]/g, "");
            setName(nameValue);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Income"
          value={income}
          onChangeText={(text) => {
            // Allow only numbers
            const incomeValue = text.replace(/[^0-9]/g, "");
            setIncome(incomeValue);
          }}
          keyboardType="numeric"
        />
        <DropDownPicker
          open={open}
          value={type}
          items={items}
          setOpen={setOpen}
          setValue={setType}
          setItems={setItems}
        />
        <TouchableOpacity
          style={[styles.inputButton, { marginTop: 10 }]}
          onPress={handleEdit}
        >
          <Text style={styles.inputButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EditIncome;
