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
  const [render, setRender] = useState(null);
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
  const [validationError, setValidationError] = useState(""); // New state for validation error

  useEffect(() => {
    fetchData();
    getUserData();
  }, [render]);

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
        initialSelectedOptions[question.id] = "";
      });
      setSelectedOptions(initialSelectedOptions);
      setRiskAssessments(response.data.risk_assessments);
      setRiskAssessmentsAnswers(
        response.data.userAssessmentAnswer === null
          ? []
          : response.data.userAssessmentAnswer
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

  const handleOptionSelect = (questionId, option, choiceId) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: { option, choiceId },
    });
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    const unansweredQuestions = riskAssessments.filter(
      (question) => !selectedOptions[question.id]
    );
    if (unansweredQuestions.length > 0) {
      setValidationError("Please answer all questions.");
      return;
    }

    let result = "";
    for (const key in selectedOptions) {
      result += `${key}:"${
        selectedOptions[key].option === undefined
          ? ""
          : selectedOptions[key].option
      }":${
        selectedOptions[key].choiceId === undefined
          ? 0
          : selectedOptions[key].choiceId
      }|`;
    }

    console.log(result);
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

      navigation.navigate("Risk Assessment Answers");
      setRender(response);
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
      {riskAssessmentsAnswers.length !== 0 && (
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.inputButton}
            onPress={() => navigation.navigate("Risk Assessment Answers")}
          >
            <Text style={styles.buttonText}>Your Risk Assessment Answers</Text>
          </TouchableOpacity>
        </View>
      )}
      {riskAssessments.map((question) => (
        <View key={question.id} style={styles.container}>
          <Text style={styles.title}>{question.question}</Text>
          {question.choices.map((choice) => {
            const isSelected =
              selectedOptions[question.id]?.option === choice.letter;
            return (
              <TouchableOpacity
                key={choice.id}
                onPress={() =>
                  handleOptionSelect(question.id, choice.letter, choice.id)
                }
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

      {validationError !== "" && (
        <Text style={{ color: "red", textAlign: "center" }}>
          {validationError}
        </Text>
      )}

      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.inputButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RiskAssessment;
