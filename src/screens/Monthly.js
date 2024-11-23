import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import Box from "../components/Box";
import { styles } from "../styles/Box";
import { BarChart, PieChart } from "react-native-chart-kit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

export default function Monthly({ navigation }) {
  const [graphExpenses, setGraphExpenses] = useState([]);
  const [graphExpense, setGraphExpense] = useState([0]);

  const [currentMonth, setCurrentMonth] = useState("");
  const [monthlyCashflow, setMonthlyCashflow] = useState("");
  const [totalIncome, setTotalIncome] = useState("");
  const [totalExpense, setTotalExpense] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [monthlyCategories, setMonthCategories] = useState([
    {
      category: "",
      expense: "",
    },
  ]);

  const [userData, setUserData] = useState({
    id: null,
    role_id: null,
    image: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    date_of_birth: "",
    age: 0,
    work: "",
    created_at: null,
    updated_at: null,
  });

  const data = {
    labels: ["Expense", "Income"],
    datasets: [
      {
        data: [totalExpense, totalIncome],
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
        strokeWidth: 1,
      },
    ],
  };

  const colors = [
    "rgb(255, 0, 0)", // Red
    "rgb(0, 255, 0)", // Green
    "rgb(0, 0, 255)", // Blue
    "rgb(255, 255, 0)", // Yellow
    "rgb(255, 165, 0)", // Orange
    "rgb(75, 0, 130)", // Indigo
    "rgb(238, 130, 238)", // Violet
  ];

  const data1 = monthlyCategories.map((item, index) => ({
    name: item.category,
    population: parseInt(item.expense),
    color: colors[index % colors.length],
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
    percentage: ((parseInt(item.expense) / totalExpense) * 100).toFixed(2),
  }));

  useEffect(() => {
    fetchData();
    getUserData();
  }, []);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(
        `${"https://smart-spend.online"}/api/users/monthly`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGraphExpense(response.data.graphExpenses.map((item) => item.expense));
      setGraphExpenses(response.data.graphExpenses);
      setTotalIncome(response.data.total_income);
      setTotalExpense(response.data.total_expense);
      setMonthlyCashflow(response.data.monthly_cashflow);
      setCurrentMonth(response.data.currentMonth);
      setMonthCategories(response.data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const getUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Monthly Budget</Text>
        <Text style={styles.description}>
          Create a budget to sharpen your spending and amplifying your savings
        </Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Create Budget")}
        >
          <Text style={styles.buttonText}>Create a Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate("1 Tap Goal Savings", {
              result: "",
            })
          }
        >
          <Text style={styles.buttonText}>1 Tap Goal Savings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Monthly Cash flow ({currentMonth})</Text>
        <Text style={styles.description}>
          {" "}
          ₱ <Text style={{ color: "green" }}>{totalIncome}</Text> (Income)
        </Text>
        <Text style={styles.description}>
          -₱ <Text style={{ color: "red" }}>{totalExpense}</Text> (Expense)
        </Text>
        <Text
          style={[
            styles.description,
            { borderTopWidth: 2, borderTopColor: "grey" },
          ]}
        >
          {" "}
          ₱ {monthlyCashflow}
        </Text>
        <View style={styless.container}>
          <BarChart
            data={data}
            width={screenWidth - 80}
            height={220}
            yAxisLabel="₱"
            chartConfig={{
              backgroundColor: "#e2e2e2",
              backgroundGradientFrom: "#e2e2e2",
              backgroundGradientTo: "#e2e2e2",
              decimalPlaces: 2,
              color: (opacity = 1) => `#000`,
              labelColor: (opacity = 1) => `black`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 10,
              borderRadius: 16,
            }}
          />
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>
          Monthly Spending Categorize ({currentMonth})
        </Text>
        <View style={[styless.container]}>
          {!data1.some((item) => isNaN(item.population)) && (
            <PieChart
              data={data1}
              width={screenWidth - 80}
              height={220}
              chartConfig={{
                backgroundColor: "#e2e2e2",
                backgroundGradientFrom: "#e2e2e2",
                backgroundGradientTo: "#e2e2e2",
                color: (opacity = 1) => `#000`,
                labelColor: (opacity = 1) => `black`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              formatLabelText={(value, name) =>
                `${value} (${
                  data1.find((item) => item.name === name)?.percentage
                }%)`
              }
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
});
