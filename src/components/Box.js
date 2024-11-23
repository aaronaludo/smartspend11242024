import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const Box = ({
  container,
  title,
  description,
  titleLabel,
  descriptionLabel,
  buttonContainer,
  buttonText,
  buttonTextLabel,
  buttonNavigation,
  navigation,
}) => {
  return (
    <View style={container}>
      <Text style={title}>{titleLabel}</Text>
      <Text style={description}>{descriptionLabel}</Text>
      {navigation && (
        <TouchableOpacity
          style={buttonContainer}
          onPress={() => navigation.navigate(buttonNavigation)}
        >
          <Text style={buttonText}>{buttonTextLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Box;
