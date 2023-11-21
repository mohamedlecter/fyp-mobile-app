import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/users";

const LoginPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(login(email, password));
    navigation.navigate("Bottom Tabs");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login</Text>
        </View>
      </View>
      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View style={styles.forgotPassword}>
        <Text>Forgot Password?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerContainer: {
    marginTop: 10,
    width: 350,
  },
  header: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  form: {
    width: 350,
    marginVertical: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    padding: 10,
    marginVertical: 10,
    height: 48,
    width: 350,
  },
});

export default LoginPage;
