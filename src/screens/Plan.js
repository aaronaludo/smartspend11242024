import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";

const SinglePlan = ({ route }) => {
  const { item } = route.params;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Text style={styles.titleHeader}>Content</Text>
        </View>
        <View style={styles.containerImage}>
          {/* <Image
            source={require("../../assets/images/learn.jpg")}
            style={styles.image}
            resizeMode="contain"
          /> */}
          <Image
            source={{
              uri: `${"https://smart-spend.online"}/storage/${item.image}`,
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.containerContent}>
          <View style={styles.contents}>
            <Text style={styles.label}>Title:</Text>
            <Text style={styles.content} numberOfLines={1000}>
              {item.title}
            </Text>
          </View>
        </View>
        <View style={styles.containerContent}>
          <View style={styles.contents}>
            <Text style={styles.label}>Description:</Text>
            <Text
              style={[styles.content, styles.description]}
              numberOfLines={1000}
            >
              {item.description}
            </Text>
          </View>
        </View>
        <View style={styles.containerContent}>
          <View style={styles.contents}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Minimum Salary:</Text>
              <Text style={{ marginLeft: 5 }}>{item.minimum_salary}</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerContent}>
          <View style={styles.contents}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Minimum Age:</Text>
              <Text style={{ marginLeft: 5 }}>{item.minimum_age}</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerContent}>
          <View style={styles.contents}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Total Expense:</Text>
              <Text style={{ marginLeft: 5 }}>{item.total_expense}</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerContent}>
          <View style={styles.contents}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Total Income:</Text>
              <Text style={{ marginLeft: 5 }}>{item.total_income}</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerContent}>
          <View style={styles.contents}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>
                Minimum Monthly Cashflow:
              </Text>
              <Text style={{ marginLeft: 5 }}>
                {item.minimum_monthly_cashflow}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.containerContent}>
          <View style={styles.contents}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Cost:</Text>
              <Text style={{ marginLeft: 5 }}>{item.cost}</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerContent}>
          <View style={styles.contents}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Months:</Text>
              <Text style={{ marginLeft: 5 }}>{item.months}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SinglePlan;

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
    marginBottom: 10,
  },
  titleHeader: {
    fontWeight: "bold",
  },
  image: { width: "100%", height: 300, borderRadius: 20 },
  contents: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  content: {
    flex: 1,
  },
  description: {
    flexShrink: 1,
  },
});
