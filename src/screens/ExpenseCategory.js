import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ExpenseCategory = () => {
  const [showFixed, setShowFixed] = useState(false);
  const [showVariable, setShowVariable] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [fixedExpenses, setFixedExpenses] = useState([]);
  const [variableExpenses, setVariableExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        const response = await axios.get(
          `${"https://smart-spend.online"}/api/users/categoryexpense`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
        setFixedExpenses(response.data.fixedExpenses);

        // Transform variableExpenses' `item` object into an array
        const transformedVariableExpenses = response.data.variableExpenses.map(
          (expense) => ({
            ...expense,
            item: Object.values(expense.item), // Convert object to array
          })
        );
        setVariableExpenses(transformedVariableExpenses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName],
    }));
  };

  const renderCategory = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.subDropdownButton}
        onPress={() => toggleCategory(item.name)}
      >
        <Text style={styles.buttonText}>{item.name}</Text>
      </TouchableOpacity>
      {expandedCategories[item.name] && item.item.length > 0 && (
        <FlatList
          data={item.item}
          keyExtractor={(subItem) => subItem.id.toString()}
          renderItem={({ item: subItem }) => (
            <Text style={styles.listItem}>
              - {subItem.name} (₱{subItem.expense})
            </Text>
          )}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Fixed Expenses Dropdown */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowFixed(!showFixed)}
      >
        <Text style={styles.buttonText}>Fixed Expenses</Text>
      </TouchableOpacity>
      {showFixed && (
        <FlatList
          data={fixedExpenses}
          keyExtractor={(item, index) => `fixed-${index}`}
          renderItem={renderCategory}
        />
      )}

      {/* Variable Expenses Dropdown */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowVariable(!showVariable)}
      >
        <Text style={styles.buttonText}>Variable Expenses</Text>
      </TouchableOpacity>
      {showVariable && (
        <FlatList
          data={variableExpenses}
          keyExtractor={(item, index) => `variable-${index}`}
          renderItem={renderCategory}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  dropdownButton: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
  },
  subDropdownButton: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: "#e8e8e8",
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  listItem: {
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginLeft: 10,
    color: "#333",
  },
});

export default ExpenseCategory;
