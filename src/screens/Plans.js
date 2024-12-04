import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Plans = ({ navigation, route }) => {
  const { category } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [plans, setPlans] = useState([]);
  const [render, setRender] = useState(null);
  const [totalExpense, setTotalExpense] = useState("");
  const [totalIncome, setTotalIncome] = useState("");
  const [minimumAge, setMinimumAge] = useState("");
  const [minimumExpense, setMinimumExpense] = useState("");
  const [minimumSalary, setMinimumSalary] = useState("");
  const [minimumMonthlyCashflow, setMinimumMonthlyCashflow] = useState("");
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
    salary: "",
    work: "",
    created_at: null,
    updated_at: null,
  });

  useEffect(() => {
    fetchData();
    getUserData();
  }, [render]);

  console.log(plans);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(
        `${"https://smart-spend.online"}/api/users/plans`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.plans);
      setTotalExpense(response.data.sumExpenses);
      setTotalIncome(response.data.sumIncomes);
      setMinimumAge(response.data.minimum_age);
      setMinimumExpense(response.data.minimum_expense);
      setMinimumSalary(response.data.minimum_salary);
      setMinimumMonthlyCashflow(response.data.minimum_monthly_cashflow);
      // setPlans(
      //   category !== "all"
      //     ? response.data.plans.filter(
      //         (item) => item.plan.category === category
      //       )
      //     : response.data.plans
      // );
      setPlans(
        category !== "all"
          ? response.data.planDetailsWithCounts.filter(
              (item) => item.plan.category === category
            )
          : response.data.planDetailsWithCounts
      );
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.delete(
        `${"https://smart-spend.online"}/api/users/user-plan/${
          item.plan.user_plan[0].id
        }`,
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

  const handleApply = async (item) => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.post(
        `${"https://smart-spend.online"}/api/users/user-plan/add`,
        {
          plan_id: item.plan.id,
          status: "pending",
        },
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

  const renderTableRow = (label, value, additionalValue = "") => (
    <View>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.tableCellLabel]}>{label}</Text>
        <Text style={styles.tableCell}>
          {value}
          {additionalValue ? (
            <Text style={styles.additionalValue}>{additionalValue}</Text>
          ) : null}
        </Text>
      </View>
      <View style={styles.tableLine} />
    </View>
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
      }
    >
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Text style={styles.titleHeader}>
            {category === "retirement"
              ? "Plans Recommendations - Retirement"
              : category === "medium_to_long"
              ? "Plans Recommendations - Medium to Long Term Goals"
              : category === "ready_fund"
              ? "Plans Recommendations - Ready Fund for Critical Illness (Critical illness Protection)"
              : category === "estate_conservation"
              ? "Plans Recommendations - Estate Conservation"
              : "Plans Recommendations"}
          </Text>
        </View>

        <FlatList
          data={plans}
          keyExtractor={(item) => item.plan.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableContainer}>
              <Text style={styles.tableTitle}>{item.plan.title}</Text>
              <View style={styles.tableLine} />
              {renderTableRow(
                "Minimum Salary",
                `₱ ${Number(item.plan.minimum_salary).toLocaleString()}`,
                `(Current Average Salary: ₱${Number(
                  minimumSalary
                ).toLocaleString()})`
              )}
              {renderTableRow(
                "Minimum Age",
                Number(item.plan.minimum_age).toLocaleString(),
                `(Current Age: ${Number(minimumAge).toLocaleString()})`
              )}
              {renderTableRow(
                "Total Income",
                `₱ ${Number(item.plan.total_income).toLocaleString()}`,
                `(Current Total Income: ₱${Number(
                  totalIncome
                ).toLocaleString()})`
              )}
              {renderTableRow(
                "Total Expenses",
                `₱ ${Number(item.plan.total_expense).toLocaleString()}`,
                `(Current Total Expenses: ₱${Number(
                  totalExpense
                ).toLocaleString()})`
              )}
              {renderTableRow(
                "Minimum Cash Flow",
                `₱ ${Number(
                  item.plan.minimum_monthly_cashflow
                ).toLocaleString()}`,
                `(Current Monthly Cash Flow: ₱${Number(
                  minimumMonthlyCashflow
                ).toLocaleString()})`
              )}
              {renderTableRow(
                "Cost",
                `₱ ${Number(item.plan.cost).toLocaleString()}`
              )}

              {renderTableRow("Months", item.plan.months)}

              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() =>
                    item.plan.user_plan.length > 0 &&
                    item.plan.user_plan[0].plan_id === item.plan.id &&
                    item.plan.user_plan[0].user_id === userData.id
                      ? handleDelete(item)
                      : handleApply(item)
                  }
                >
                  <Text style={styles.buttonText}>
                    {item.plan.user_plan.length > 0 &&
                    item.plan.user_plan[0].plan_id === item.plan.id &&
                    item.plan.user_plan[0].user_id === userData.id
                      ? item.plan.user_plan[0].status === "success"
                        ? "Delete (success)"
                        : item.plan.user_plan[0].status === "failed"
                        ? "Delete (failed)"
                        : "Delete (pending)"
                      : "Apply"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() =>
                    navigation.navigate("Plan", {
                      item: item.plan,
                    })
                  }
                >
                  <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Plans;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  containerHeader: {
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  titleHeader: {
    fontWeight: "bold",
    fontSize: 16,
  },
  tableContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tableTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: "right",
    paddingHorizontal: 5,
  },
  tableCellLabel: {
    fontWeight: "bold",
    textAlign: "left",
  },
  additionalValue: {
    color: "green",
    fontWeight: "bold",
    marginLeft: 5,
  },
  tableLine: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonContainer: {
    backgroundColor: "#157347",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
