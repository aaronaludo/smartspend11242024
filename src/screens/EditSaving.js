import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles/Form";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const EditSaving = ({ navigation, route }) => {
  const { item, goals } = route.params;
  let [month, day, year] = item.date.split("/");
  let datee = new Date(year, month - 1, day);
  const [date, setDate] = useState(datee);
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [expense, setExpense] = useState(item.expense);
  const [type, setType] = useState(item.type_id);
  const [type1, setType1] = useState(item.goal_id);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [items, setItems] = useState([
    { label: "Fixed Expenses", value: 1 },
    { label: "Variable Expenses", value: 2 },
  ]);
  const itemsWithSelect = goals.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  itemsWithSelect.unshift({ label: "Select an item", value: 0 });

  const [items1, setItems1] = useState(itemsWithSelect);

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
        `${"https://smart-spend.online"}/api/users/savings/${item.id}`,
        {
          name: name,
          expense: expense,
          type_id: type,
          goal_id: type1,
          category: category,
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

      navigation.navigate("Saving", {
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
        <DropDownPicker
          open={open}
          value={type}
          items={items}
          setOpen={setOpen}
          setValue={setType}
          setItems={setItems}
        />
        <TextInput
          style={{ ...styles.input, marginTop: 10 }}
          placeholder="Enter Expense Name"
          value={name}
          onChangeText={(text) => {
            // Allow only letters
            const nameValue = text.replace(/[^A-Za-z\s]/g, "");
            setName(nameValue);
          }}
        />
        <TextInput
          style={{ ...styles.input }}
          placeholder="Enter Category Name"
          value={category}
          onChangeText={(text) => {
            const nameValue = text.replace(/[^A-Za-z\s]/g, "");
            setCategory(nameValue);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Expense"
          value={expense}
          onChangeText={(text) => {
            // Allow only numbers
            const incomeValue = text.replace(/[^0-9]/g, "");
            setExpense(incomeValue);
          }}
          keyboardType="numeric"
        />
        <DropDownPicker
          open={open1}
          value={type1}
          items={items1}
          setOpen={setOpen1}
          setValue={setType1}
          setItems={setItems1}
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

export default EditSaving;
