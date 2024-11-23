import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Box from "../components/Box";
import { styles } from "../styles/Box";

const NeedAndPriorities = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Retirement</Text>
        <Text style={styles.description}>
          Retirement plans are financial strategies for post-work income.
        </Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate("Plans", {
              category: "retirement",
            })
          }
        >
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Medium to Long Term Goals</Text>
        <Text style={styles.description}>
          Medium to long-term goals plans encompass financial strategies aimed
          at achieving objectives over an extended period, typically beyond five
          years.
        </Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate("Plans", {
              category: "medium_to_long",
            })
          }
        >
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>
          Ready Fund for Critical Illness (Critical illness Protection)
        </Text>
        <Text style={styles.description}>
          Ready Fund for Critical Illness, also known as Critical Illness
          Protection plans, are financial products designed to provide financial
          assistance in the event of a severe illness diagnosis.
        </Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate("Plans", {
              category: "ready_fund",
            })
          }
        >
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Estate Conservation</Text>
        <Text style={styles.description}>
          Estate conservation plans aim to preserve and manage assets for the
          future, minimizing tax liabilities and ensuring assets are distributed
          according to the individual's wishes.{" "}
        </Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate("Plans", {
              category: "estate_conservation",
            })
          }
        >
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NeedAndPriorities;
