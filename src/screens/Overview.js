import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Box from "../components/Box";
import { styles } from "../styles/Box";
import axios from "axios";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const Overview = ({ navigation }) => {
  const [income, setIncome] = useState(0);
  const [graphData, setGraphData] = useState([
    {
      month: "Jan",
      total_income: 0,
      total_expense: 0,
      total_saving: 0,
    },
  ]);
  const [expense, setExpense] = useState(0);
  const [saving, setSaving] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
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
  console.log(userData);

  const data = {
    labels: graphData.map((item) => item.month),
    datasets: [
      {
        data: graphData.map((item) => item.total_income),
        color: (opacity = 1) => `green`,
        strokeWidth: 2,
      },
      {
        data: graphData.map((item) => item.total_expense),
        color: (opacity = 1) => `red`,
        strokeWidth: 2,
      },
      {
        data: graphData.map((item) => item.total_saving),
        color: (opacity = 1) => `blue`,
        strokeWidth: 2,
      },
    ],
  };

  useEffect(() => {
    fetchData();
    getUserData();
  }, []);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      }
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(
        `${"https://smart-spend.online"}/api/users/overview`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGraphData(response.data.combined_data);
      setIncome(response.data.incomes);
      setExpense(response.data.expenses);
      setSaving(response.data.savings);
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
      <Box
        container={styles.container}
        title={styles.title}
        description={styles.description}
        titleLabel={`Welcome, ${userData.first_name} ${userData.last_name}`}
        descriptionLabel={`${userData.email}`}
      />
      <View style={styless.container}>
        <LineChart
          data={data}
          width={screenWidth - 40}
          height={220}
          yAxisLabel="₱"
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#e2e2e2",
            backgroundGradientFrom: "#e2e2e2",
            backgroundGradientTo: "#e2e2e2",
            decimalPlaces: 2,
            color: (opacity = 1) => `grey`,
            labelColor: (opacity = 1) => `#000000`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffffff",
            },
            propsForLabels: {
              fontSize: 8,
            },
          }}
          bezier
          style={{
            marginVertical: 0,
            borderRadius: 16,
          }}
        />
      </View>
      <Box
        container={styles.container}
        title={styles.title}
        description={styles.description}
        titleLabel="Total Income Monitoring"
        descriptionLabel={`₱ ${Number(Math.round(income)).toLocaleString()}`}
      />
      <Box
        container={styles.container}
        title={styles.title}
        description={styles.description}
        titleLabel="Total Expense Monitoring"
        descriptionLabel={`₱ ${Number(Math.round(expense)).toLocaleString()}`}
      />
      <Box
        container={styles.container}
        title={styles.title}
        description={styles.description}
        titleLabel="Total Savings Monitoring"
        descriptionLabel={`₱ ${Number(Math.round(saving)).toLocaleString()}`}
      />
    </ScrollView>
  );
};

const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
});

export default Overview;
