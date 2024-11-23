import React, { useState, useEffect } from "react";
import Box from "../components/Box";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import { styles } from "../styles/Box";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;

export default function Monthly({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [savings, setSavings] = useState([]);
  const [expensesDatasetsData, setExpensesDatasetsData] = useState([0]);
  const [incomesDatasetsData, setIncomesDatasetsData] = useState([0]);
  const [savingsDatasetsData, setSavingsDatasetsData] = useState([0]);
  const [refreshing, setRefreshing] = useState(false);

  const savingsData = {
    labels: savings.length
      ? savings.map((group) => group.month)
      : ["No Data"],
    datasets: [
      {
        data: savingsDatasetsData.length ? savingsDatasetsData : [0],
        color: (opacity = 1) => `green`,
        strokeWidth: 2,
      },
    ],
  };

  const expensesData = {
    labels: expenses.length
      ? expenses.map((group) => group.month)
      : ["No Data"],
    datasets: [
      {
        data: expensesDatasetsData.length ? expensesDatasetsData : [0],
        color: (opacity = 1) => `green`,
        strokeWidth: 2,
      },
    ],
  };

  const incomesData = {
    labels: incomes.length ? incomes.map((group) => group.month) : ["No Data"],
    datasets: [
      {
        data: incomesDatasetsData.length ? incomesDatasetsData : [0],
        color: (opacity = 1) => `green`,
        strokeWidth: 2,
      },
    ],
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.get(
        `${"https://smart-spend.online"}/api/users/graph/create_budget`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setExpenses(response.data.groupedExpenses);
      setIncomes(response.data.groupedIncomes);
      setIncomes(response.data.groupedSavings);

      setExpensesDatasetsData(
        response.data.groupedExpenses.map((item) => item.total_expense)
      );
      setIncomesDatasetsData(
        response.data.groupedIncomes.map((item) => item.total_income)
      );
      setSavingsDatasetsData(
        response.data.groupedSavings.map((item) => item.total_saving)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Add your monthly Expenses</Text>
        <Text style={styles.description}>
          Pro Tip: Start with fixed expenses, and then add flexible expenses
        </Text>
        <View style={styless.container}>
          <LineChart
            data={expensesData}
            width={screenWidth - 80}
            height={220}
            yAxisLabel={"₱"}
            chartConfig={{
              backgroundColor: "#e2e2e2",
              backgroundGradientFrom: "#e2e2e2",
              backgroundGradientTo: "#e2e2e2",
              decimalPlaces: 2,
              color: (opacity = 1) => `grey`,
              labelColor: (opacity = 1) => `black`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffffff",
              },
            }}
            bezier
            style={{
              marginVertical: 0,
              borderRadius: 16,
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate("Expenses", {
              result: "",
            })
          }
        >
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
        <View style={_styles.container}>
          <Text style={_styles.containerText}>Example of Expenses</Text>
          <View style={_styles.containerDetails}>
            <Text style={_styles.containerDetailsText}>House Rent</Text>
            <Text style={_styles._containerDetailsText}>₱ 000,000,000.00</Text>
          </View>
          <View style={_styles.containerDetails}>
            <Text style={_styles.containerDetailsText}>House Rent</Text>
            <Text style={_styles._containerDetailsText}>₱ 000,000,000.00</Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Add your monthly Income</Text>
        <Text style={styles.description}>Add your new source of income.</Text>
        <View style={styless.container}>
          <LineChart
            data={incomesData}
            width={screenWidth - 80}
            height={220}
            yAxisLabel={"₱"}
            chartConfig={{
              backgroundColor: "#e2e2e2",
              backgroundGradientFrom: "#e2e2e2",
              backgroundGradientTo: "#e2e2e2",
              decimalPlaces: 2,
              color: (opacity = 1) => `grey`,
              labelColor: (opacity = 1) => `#fff`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffffff",
              },
            }}
            bezier
            style={{
              marginVertical: 0,
              borderRadius: 16,
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate("Incomes", {
              result: "",
            })
          }
        >
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
        <View style={_styles.container}>
          <Text style={_styles.containerText}>Example of Income</Text>
          <View style={_styles.containerDetails}>
            <Text style={_styles.containerDetailsText}>Investment</Text>
            <Text style={_styles._containerDetailsText}>₱ 000,000,000.00</Text>
          </View>
          <View style={_styles.containerDetails}>
            <Text style={_styles.containerDetailsText}>Investment</Text>
            <Text style={_styles._containerDetailsText}>₱ 000,000,000.00</Text>
          </View>
          <View style={_styles.containerDetails}>
            <Text style={_styles.containerDetailsText}>Investment</Text>
            <Text style={_styles._containerDetailsText}>₱ 000,000,000.00</Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Add your monthly Savings</Text>
        <Text style={styles.description}>
          Pro Tip: Start with fixed expenses, and then add flexible expenses
        </Text>
        <View style={styless.container}>
          <LineChart
            data={savingsData}
            width={screenWidth - 80}
            height={220}
            yAxisLabel={"₱"}
            chartConfig={{
              backgroundColor: "#e2e2e2",
              backgroundGradientFrom: "#e2e2e2",
              backgroundGradientTo: "#e2e2e2",
              decimalPlaces: 2,
              color: (opacity = 1) => `grey`,
              labelColor: (opacity = 1) => `black`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffffff",
              },
            }}
            bezier
            style={{
              marginVertical: 0,
              borderRadius: 16,
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate("Savings", {
              result: "",
            })
          }
        >
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
        <View style={_styles.container}>
          <Text style={_styles.containerText}>Example of Savings</Text>
          <View style={_styles.containerDetails}>
            <Text style={_styles.containerDetailsText}>House Rent</Text>
            <Text style={_styles._containerDetailsText}>₱ 000,000,000.00</Text>
          </View>
          <View style={_styles.containerDetails}>
            <Text style={_styles.containerDetailsText}>Car</Text>
            <Text style={_styles._containerDetailsText}>₱ 000,000,000.00</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const _styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  containerText: {
    fontSize: 20,
  },
  containerDetails: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 15,
  },
  containerDetailsText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  _containerDetailsText: {
    fontSize: 15,
  },
});

const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 15,
    marginTop: 15,
  },
});
