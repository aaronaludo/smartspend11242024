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

const Incomes = ({ navigation, route }) => {
  const { result } = route.params;
  const [incomes, setIncomes] = useState([]);
  const [render, setRender] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        const response = await axios.get(
          `${"https://smart-spend.online"}/api/users/incomes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIncomes(response.data.incomes);
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
        `${"https://smart-spend.online"}/api/users/incomes/${id}`,
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
          <Text style={styles.headerLeft}>Add an incomes</Text>
          <Ionicons
            name="add-circle"
            size={40}
            color="#41DC40"
            onPress={() => navigation.navigate("Add Income")}
          />
        </View>
        <View style={styles.containerSearch}>
          <TextInput placeholder="Search" style={styles.input} />
        </View>

        {incomes.map((item) => (
          <View style={styles.containerExpense} key={item.id}>
            <View>
              <Text style={styles.incomeTitle}>{item.name}</Text>
              <Text style={styles.incomeDescription}>₱ {item.income}</Text>
              <Text style={styles.expenseDescription}>{item.date}</Text>
              <Text style={styles.expenseDescription}>
                {item.type_id === 1
                  ? "Expected expense"
                  : "Not Expected expense"}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="pencil-sharp"
                size={24}
                color="black"
                onPress={() =>
                  navigation.navigate("Edit Income", {
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

export default Incomes;

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
