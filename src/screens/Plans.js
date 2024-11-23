import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
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
        {plans.map((item) => (
          <View style={styles.containerContent} key={item.plan.id}>
            <View style={styles.contents}>
              <View style={{ width: "100%" }}>
                {/* <Text style={{ marginLeft: 5, marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Count: </Text>
                  {item.count}
                </Text> */}
                <Text style={{ marginLeft: 5, marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Category: </Text>
                  {item.plan.category === "retirement"
                  ? "Plans Recommendations - Retirement"
                  : item.plan.category === "medium_to_long"
                  ? "Plans Recommendations - Medium to Long Term Goals"
                  : item.plan.category === "ready_fund"
                  ? "Plans Recommendations - Ready Fund for Critical Illness (Critical illness Protection)"
                  : item.plan.category === "estate_conservation"
                  ? "Plans Recommendations - Estate Conservation"
                  : "Plans Recommendations"}
                </Text>
                <Text style={{ marginLeft: 5, marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Plan Name: </Text>
                  {item.plan.title}
                </Text>
                <Text style={{ marginLeft: 5, marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Minimum Salary: </Text>
                  <Text>
                    {item.plan.minimum_salary}{" "}
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      (Current Average Salary: {minimumSalary})
                    </Text>
                  </Text>
                </Text>
                <Text style={{ marginLeft: 5, marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Minimum Age: </Text>
                  <Text>
                    {item.plan.minimum_age}{" "}
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      (Current Age: {minimumAge})
                    </Text>
                  </Text>
                </Text>
                <Text style={{ marginLeft: 5, marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Total Income: </Text>
                  <Text>
                    ₱{" "}{item.plan.total_income}{" "}
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      (Current Total Income: {totalIncome})
                    </Text>
                  </Text>
                </Text>
                <Text style={{ marginLeft: 5, marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Total Expense: </Text>
                  <Text>
                    ₱{" "}{item.plan.total_expense}{" "}
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      (Current Total Expense: {totalExpense})
                    </Text>
                  </Text>
                </Text>
                <Text style={{ marginLeft: 5, marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    Minimum Monthly Cashflow:{" "}
                  </Text>
                  <Text>
                    {item.plan.minimum_monthly_cashflow}{" "}
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      (Current Monthly Cashflow: {minimumMonthlyCashflow})
                    </Text>
                  </Text>
                </Text>
                <Text style={{ marginLeft: 5, marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Cost: </Text>
                  <Text>{item.plan.cost}</Text>
                </Text>
                <Text style={{ marginLeft: 5, marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Months: </Text>
                  <Text>{item.plan.months}</Text>
                </Text>
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
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Plans;

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  containerHeader: {
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerImage: {
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: 500,
  },
  containerContent: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 3,
  },
  titleHeader: {
    fontWeight: "bold",
  },
  image: { width: "100%", height: 300, borderRadius: 20 },
  contents: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    backgroundColor: "#41DC40",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
