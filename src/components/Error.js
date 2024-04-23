import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

const Error = ({ errorMsg, buttonTitle, handleClick }) => {
  return (
    <View style={styles.errorContainer}>
      <Image
        source={require("../../assets/emptystate.png")}
        style={styles.errorImg}
      />
      <Text style={styles.errorMsg}>{errorMsg}</Text>
      <Button
        onPress={handleClick}
        title={buttonTitle}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.buttonText}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  errorImg: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  errorMsg: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#888",
    marginBottom: 20,
  },
  btnContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  buttonStyle: {
    backgroundColor: "#00a86b",
    borderRadius: 16,
    padding: 12,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#ffff",
  },
  buttonContainer: {
    width: "50%",
    height: 50,
  },
});

export default Error;
