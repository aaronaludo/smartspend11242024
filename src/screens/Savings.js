import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Savings = ({ navigation, route }) => {
  const { result } = route.params;
  const [expenses, setExpenses] = useState([]);
  const [goals, setGoals] = useState([]);
  const [render, setRender] = useState(null);

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
        setGoals(response.data.goals);
        setExpenses(response.data.expenses);
        console.log(response.data.expenses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [result, render]);

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
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Text style={styles.headerLeft}>Add an savings</Text>
          {goals.length != 0 && (
            <Ionicons
              name="add-circle"
              size={40}
              color="#157347"
              onPress={() =>
                navigation.navigate("Add Saving", {
                  goals: goals,
                })
              }
            />
          )}
        </View>
        {/* <View style={{
          flexDirection: "row",
          justifyContent: "end",
          alignItems: "center",
          marginBottom: 20,
        }}>
          <Ionicons name="open" size={40} color="#157347" onPress={() =>
              navigation.navigate("Saving Category")
            }/>
        </View> */}
        <View style={styles.containerSearch}>
          <TextInput placeholder="Search" style={styles.input} />
        </View>

        {expenses.map((item) => (
          <View style={styles.containerExpense} key={item.id}>
            <View>
              <Text style={styles.expenseTitle}>{item.name}</Text>
              <Text style={styles.expenseDescription}>
                ₱ {Number(item.expense).toLocaleString()}
              </Text>
              <Text style={styles.expenseDescription}>{item.date}</Text>
              <Text style={styles.expenseDescription}>
                {item.goal !== null
                  ? `Saving Goal Name: ${item.goal.title}`
                  : null}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="pencil-sharp"
                size={24}
                color="black"
                onPress={() =>
                  navigation.navigate("Edit Saving", {
                    item: item,
                    goals: goals,
                  })
                }
              />
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
    </ScrollView>
  );
};

export default Savings;

const styles = StyleSheet.create({
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
    backgroundColor: "#157347",
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
