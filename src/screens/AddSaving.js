import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
} from "react-native";
import { styles } from "../styles/Form";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

const AddSaving = ({ navigation, route }) => {
  const { goals } = route.params;
  const [render, setRender] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [type, setType] = useState(0);
  const [type1, setType1] = useState(0);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [items, setItems] = useState([
    { label: "Expected", value: 1 },
    { label: "Not Expected", value: 2 },
  ]);
  const itemsWithSelect = goals.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  console.log(goals);

  itemsWithSelect.unshift({ label: "Select an item", value: 0 });
  const [items1, setItems1] = useState(itemsWithSelect);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        const response = await axios.get(
          `${"https://smart-spend.online"}/api/users/savings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.expenses.filter((item) => item.goal_id != 0));
        setExpenses(response.data.expenses.filter((item) => item.goal_id != 0));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [render]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    console.log(currentDate);
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
    setError("");
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.post(
        `${"https://smart-spend.online"}/api/users/savings/add`,
        {
          name: name,
          expense: expense,
          goal_id: goals[0].id,
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

      navigation.navigate("Savings", {
        result: response.data.message,
      });
    } catch (error) {
      setModalVisible(!modalVisible);
      setError(error.response.data.error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.delete(
        `${"https://smart-spend.online"}/api/users/savings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRender(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {/* <Button title="Open Modal" onPress={() => setModalVisible(true)} /> */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                elevation: 5,
              }}
            >
              <Text style={[styless.expenseTitle, { marginBottom: 15 }]}>
                Goal Expenses
              </Text>
              <View style={{ marginBottom: 10 }}>
                {expenses.map((item) => (
                  <View style={styless.containerExpense} key={item.id}>
                    <View>
                      <Text style={styless.expenseTitle}>{item.name}</Text>
                      <Text style={styless.expenseDescription}>
                        ₱ {item.expense}
                      </Text>
                      <Text style={styless.expenseDescription}>
                        {item.date}
                      </Text>
                      <Text style={styless.expenseDescription}>
                        {item.type_id === 1
                          ? "Expected expense"
                          : "Not Expected expense"}
                      </Text>
                      <Text style={styless.expenseDescription}>
                        {item.goal !== null
                          ? `Saving Goal Name: ${item.goal.title}`
                          : null}
                      </Text>
                      <Text style={styless.expenseDescription}>
                        {`Category: ${item.category}`}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Ionicons
                        name="trash"
                        size={24}
                        color="red"
                        style={{ marginLeft: 10 }}
                        onPress={() => handleDelete(item.id)}
                      />
                    </View>
                  </View>
                ))}
              </View>
              <Button
                title="Close"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.container}>
        {error !== "" && (
          <Text style={[styles.description, { color: "red" }]}>{error}</Text>
        )}
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
          style={{ ...styles.input, marginTop: 10 }}
          placeholder="Enter Saving Name"
          value={name}
          onChangeText={(text) => {
            const nameValue = text.replace(/[^A-Za-z\s]/g, "");
            setName(nameValue);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Saving"
          value={expense}
          onChangeText={(text) => {
            const incomeValue = text.replace(/[^0-9]/g, "");
            setExpense(incomeValue);
          }}
          keyboardType="numeric"
        />
        {/* <DropDownPicker
          open={open1}
          value={type1}
          items={items1}
          setOpen={setOpen1}
          setValue={setType1}
          setItems={setItems1}
        /> */}
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

export default AddSaving;

const styless = StyleSheet.create({
  container: {
    marginRight: 20,
    marginLeft: 20,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  containerSearch: { flexDirection: "row", alignItems: "center" },
  headerLeft: {
    fontSize: 25,
    fontWeight: "bold",
  },
  containerExpense: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 5,
    marginBottom: 5,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  expenseTitle: { fontWeight: "500", fontSize: 17 },
  expenseDescription: {
    color: "grey",
  },
  inputButton: {
    backgroundColor: "#41DC40",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  inputButtonText: {
    color: "white",
    fontSize: 18,
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#fff",
    borderRadius: 13,
  },
});
