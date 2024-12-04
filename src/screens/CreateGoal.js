import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CreateGoal = ({ navigation, route }) => {
  const { result } = route.params;
  const [goals, setGoals] = useState([]);
  const [render, setRender] = useState(null);
  console.log(goals);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        const response = await axios.get(
          `${"https://smart-spend.online"}/api/users/goals`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGoals(response.data.goals);
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
        `${"https://smart-spend.online"}/api/users/goals/${id}`,
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
          <Text style={styles.headerLeft}>Add an goals</Text>
          {goals.length === 0 && (
            <Ionicons
              name="add-circle"
              size={40}
              color="#157347"
              onPress={() => navigation.navigate("Add 1 Tap Goal Savings")}
            />
          )}
        </View>
        <View style={styles.containerSearch}>
          <TextInput placeholder="Search" style={styles.input} />
        </View>

        {goals.map((item) => (
          <View style={styles.containerExpense} key={item.id}>
            <View>
              <Text style={styles.incomeTitle}>Title: {item.title}</Text>
              <Text style={styles.incomeDescription}>
                Cost: ₱
                {Number(
                  item.cost -
                    item.expenses.reduce(
                      (acc, expense) => acc + parseFloat(expense.expense),
                      0
                    )
                ).toLocaleString()}
              </Text>
              <Text style={styles.incomeDescription}>
                Progress:{" "}
                {`${item.expenses.reduce(
                  (acc, expense) => acc + parseFloat(expense.expense),
                  0
                )}/${
                  item.cost -
                  item.expenses.reduce(
                    (acc, expense) => acc + parseFloat(expense.expense),
                    0
                  )
                }`}
              </Text>
              <Text style={styles.expenseDescription}>
                Target Date: {item.target_date}
              </Text>
              <View style={{ marginTop: 10 }}>
                <View>
                  <Text style={styles.expenseDescription}>
                    Savings History:
                  </Text>
                </View>
                {item.expenses.map((expense) => (
                  <View key={expense.id}>
                    <Text style={styles.expenseDescription}>
                      {`${expense.name} - ₱${Number(
                        expense.expense
                      ).toLocaleString()} - ${expense.date}`}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="pencil-sharp"
                size={24}
                color="black"
                onPress={() =>
                  navigation.navigate("Edit 1 Tap Goal Savings", {
                    item: item,
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

export default CreateGoal;

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
  incomeTitle: { fontWeight: "500", fontSize: 17 },
  incomeDescription: {
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
