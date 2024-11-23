import "react-native-gesture-handler";
import * as React from "react";
import { TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./src/navigator/TabNavigator";
import Account from "./src/screens/Account";
import AccountInformation from "./src/screens/AccountInformation";
import ChangePassword from "./src/screens/ChangePassword";
import CreateBudget from "./src/screens/CreateBudget";
import LearningFeaturesContent from "./src/screens/LearningFeaturesContent";
import LearningFeaturesModule from "./src/screens/LearningFeaturesModule";
import Login from "./src/screens/Login";
import OTP from "./src/screens/OTP";
import Plans from "./src/screens/Plans";
import Registration from "./src/screens/Registration";
import RiskAssessment from "./src/screens/RiskAssessment";
import TapWidget from "./src/screens/TapWidget";
import Incomes from "./src/screens/Incomes";
import Expenses from "./src/screens/Expenses";
import AddIncome from "./src/screens/AddIncome";
import AddExpense from "./src/screens/AddExpense";
import EditIncome from "./src/screens/EditIncome";
import EditExpense from "./src/screens/EditExpense";
import Plan from "./src/screens/Plan";
import RiskAssessmentAnswers from "./src/screens/RiskAssessmentAnswers";
import NeedAndPriorities from "./src/screens/NeedAndPriorities";
import Protection from "./src/screens/Protection";
import ProtectionAssessment from "./src/screens/ProtectionAssessment";
import CreateGoal from "./src/screens/CreateGoal";
import AddCreateGoal from "./src/screens/AddCreateGoal";
import EditCreateGoal from "./src/screens/EditCreateGoal";
import Savings from "./src/screens/Savings";
import AddSaving from "./src/screens/AddSaving";
import EditSaving from "./src/screens/EditSaving";
import ForgotPassword from "./src/screens/ForgotPassword";
import ForgotPasswordVerification from "./src/screens/ForgotPasswordVerification";
import ForgotPasswordReset from "./src/screens/ForgotPasswordReset";
import ExpenseCategory from "./src/screens/ExpenseCategory";

const Stack = createStackNavigator();

const defaultScreenOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Tab Navigator", { screen: "Overview" })
      }
      style={{ marginRight: 15 }}
    >
      <Image
        source={require("./assets/icon.png")}
        style={{
          width: 45,
          height: 45,
          borderRadius: 10,
        }}
      />
    </TouchableOpacity>
  ),
});

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tab Navigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Account Information"
          component={AccountInformation}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Change Password"
          component={ChangePassword}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Create Budget"
          component={CreateBudget}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="1 Tap Goal Savings"
          component={CreateGoal}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Add 1 Tap Goal Savings"
          component={AddCreateGoal}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Edit 1 Tap Goal Savings"
          component={EditCreateGoal}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Learning Features Content"
          component={LearningFeaturesContent}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Learning Features Module"
          component={LearningFeaturesModule}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Plans"
          component={Plans}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Risk Assessment"
          component={RiskAssessment}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Tap Widget"
          component={TapWidget}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Incomes"
          component={Incomes}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Add Income"
          component={AddIncome}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Expenses"
          component={Expenses}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Add Expense"
          component={AddExpense}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Edit Expense"
          component={EditExpense}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Edit Income"
          component={EditIncome}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Plan"
          component={Plan}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Need And Priorities"
          component={NeedAndPriorities}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Protection"
          component={Protection}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Protection Assessment"
          component={ProtectionAssessment}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Risk Assessment Answers"
          component={RiskAssessmentAnswers}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Savings"
          component={Savings}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Add Saving"
          component={AddSaving}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Edit Saving"
          component={EditSaving}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Forgot Password"
          component={ForgotPassword}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Forgot Password Verification"
          component={ForgotPasswordVerification}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Forgot Password Reset"
          component={ForgotPasswordReset}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Expense Category"
          component={ExpenseCategory}
          options={defaultScreenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
