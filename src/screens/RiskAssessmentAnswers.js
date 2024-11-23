import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { styles } from "../styles/Box";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const RiskAssessment = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [riskAssessments, setRiskAssessments] = useState([]);
  const [riskAssessmentsAnswers, setRiskAssessmentsAnswers] = useState([]);
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
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    fetchData();
    getUserData();
  }, []);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(
        `${"https://smart-spend.online"}/api/users/risk-assessments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const initialSelectedOptions = {};
      response.data.risk_assessments.forEach((question) => {
        initialSelectedOptions[question.id] = ""; // Initialize selected options for each question
      });
      setSelectedOptions(initialSelectedOptions);
      setRiskAssessments(response.data.risk_assessments);
      setRiskAssessmentsAnswers(
        response.data.userAssessmentAnswer === null
          ? []
          : response.data.userAssessmentAnswer.results
      );
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

  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: option });
  };

  const handleSubmit = async () => {
    let result = "";
    for (const key in selectedOptions) {
      result += `${key}:"${selectedOptions[key]}"|`;
    }

    console.log("Selected options:", result);

    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.post(
        `${"https://smart-spend.online"}/api/users/risk-assessments/add`,
        {
          results: result,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // setRender(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
      }
    >
      {riskAssessments.map((question) => (
        <View key={question.id} style={styles.container}>
          <Text style={styles.title}>{question.question}</Text>
          {question.choices.map((choice) => {
            const isSelected =
              selectedOptions[question.id] === choice.letter ||
              riskAssessmentsAnswers.find(
                (answer) =>
                  answer.question_id === question.id &&
                  answer.letter === choice.letter
              );

            return (
              <TouchableOpacity
                key={choice.id}
                onPress={() => handleOptionSelect(question.id, choice.letter)}
                style={[
                  {
                    padding: 10,
                    marginVertical: 5,
                    borderRadius: 8,
                    backgroundColor: isSelected ? "#ADD8E6" : "#F8F9FA",
                    borderWidth: isSelected ? 1 : 0,
                    borderColor: isSelected ? "#007BFF" : "transparent",
                  },
                ]}
              >
                <Text
                  style={{
                    color: isSelected ? "#007BFF" : "#000",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {`${choice.letter}.) ${choice.description}`}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() =>
            navigation.navigate("Plans", {
              category: "all",
            })
          }
        >
          <Text style={styles.buttonText}>Plan Recommendations</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RiskAssessment;
