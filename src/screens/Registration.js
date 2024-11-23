import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/Form";
import axios from "axios";
import { CheckBox } from "react-native-elements";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const Registration = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("+639");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState(""); // New state for gender
  const [age, setAge] = useState("");
  const [work, setWork] = useState("");
  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: false,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      navigation.navigate("Tab Navigator", { screen: "Overview" });
    }
  };

  const capitalizeName = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleRegister = async () => {
    setError("");
    try {
      const response = await axios.post(
        `${"https://smart-spend.online"}/api/users/register`,
        {
          first_name: capitalizeName(firstName),
          last_name: capitalizeName(lastName),
          phone: phone,
          address: address,
          date_of_birth: date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }),
          gender: gender,
          age: age,
          work: work,
          email: email,
          salary: salary,
          password: password,
          password_confirmation: passwordConfirmation,
        }
      );

      const { token, user } = response.data.response;

      navigation.navigate("OTP", {
        user: user,
      });
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <ScrollView>
      <View
        style={[
          styles.container,
          { flex: 1, marginBottom: 30, justifyContent: "flex-start" },
        ]}
      >
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.description}>Create a new account.</Text>
        {error !== "" && (
          <Text style={[styles.description, { color: "red" }]}>{error}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="First name"
          value={firstName}
          onChangeText={(text) => {
            const nameValue = text
              .replace(/[^A-Za-z\s]/g, "")
              .replace(/\b\w/g, (char) => char.toUpperCase());
            setFirstName(nameValue);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          value={lastName}
          onChangeText={(text) => {
            const nameValue = text
              .replace(/[^A-Za-z\s]/g, "")
              .replace(/\b\w/g, (char) => char.toUpperCase());
            setLastName(nameValue);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => {
            const incomeValue = text.replace(/[^0-9+]/g, "").slice(0, 13);
            setPhone(incomeValue);
          }}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <TouchableOpacity
          style={[styles.inputButton, { marginBottom: 10 }]}
          onPress={showDatepicker}
        >
          <Text style={styles.inputButtonText}>Birthdate</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })}
          editable={false}
        />
        <View style={{ width: "100%" }}>
          {["Male", "Female", "Rather not say"].map((option) => (
            <TouchableOpacity
              key={option}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "start",
              }}
              onPress={() => setGender(option)}
            >
              <CheckBox
                checked={gender === option}
                onPress={() => setGender(option)}
              />
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Work"
          value={work}
          onChangeText={(text) => {
            const nameValue = text.replace(/[^A-Za-z\s]/g, "");
            setWork(nameValue);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Salary"
          value={salary}
          onChangeText={(text) => {
            const incomeValue = text.replace(/[^0-9]/g, "");
            setSalary(incomeValue);
          }}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={passwordConfirmation}
          onChangeText={(text) => setPasswordConfirmation(text)}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleRegister}>
          <Text style={styles.inputButtonText}>Register</Text>
        </TouchableOpacity>

        <CheckBox
          title="I agree to the Terms & Conditions"
          checked={isChecked}
          onPress={toggleCheckbox}
          containerStyle={{ backgroundColor: "#f2f2f2", borderWidth: 0 }}
          textStyle={{ color: "#000" }}
        />

        <Text style={styles.inputText}>
          Already have an account?{" "}
          <Text
            style={styles.subInputText}
            onPress={() => navigation.navigate("Login")}
          >
            Sign in
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Registration;
