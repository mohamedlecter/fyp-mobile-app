import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/users";
import { Formik } from "formik";
import { Button } from "@rneui/themed";
import * as yup from "yup";
import { PRIMARY_GREEN } from "../colors";

const LoginPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email Address is required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  const handleLogin = async (values) => {
    setLoading(true);
    setError("");

    try {
      const loginResponse = await dispatch(
        login(values.email, values.password)
      );

      console.log("Login response:", loginResponse);

      // Check if login response indicates success
      if (loginResponse && loginResponse.message === "Login successful") {
        navigation.navigate("Bottom Tabs");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Login failed. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Login</Text>
      </View>

      <Formik
        validateOnMount={true}
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View style={{
            justifyContent: "center",
          }}>
            <View style={styles.inputContainer}>
              <View style={styles.fieldTitle}>
                <Text style={styles.fieldTitleText}>Email</Text>
              </View>
              <View style={styles.inputTextContainer}>
                <Image
                  source={require("../../assets/email.png")}
                  style={styles.icon}
                />

                <TextInput
                  name="email"
                  placeholder="Email Address"
                  style={styles.TextInput}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
              </View>
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.fieldTitle}>
                <Text style={styles.fieldTitleText}>Password</Text>
              </View>
              <View style={styles.inputTextContainer}>
                <Image
                  source={require("../../assets/password.png")}
                  style={styles.icon}
                />
                <TextInput
                  name="password"
                  placeholder="Password"
                  style={styles.TextInput}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                />
              </View>
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>

            <View style={styles.btnContainer}>
              <Button
                onPress={handleSubmit}
                title="LOG IN"
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonText}
                containerStyle={styles.buttonContainer}
              />
            </View>

            {loading ? (
              <ActivityIndicator
                style={styles.loadingIndicator}
                size="small"
                color="#000000"
              />
            ) : null}
          </View>
        )}
      </Formik>

      <View>
        <View style={styles.otherLoginMethodsTextContainer}>
          <Text style={styles.otherLoginMethodsText}>Or </Text>
        </View>
        <View style={styles.alreadyHasAccountContainer}>
          <Text style={styles.alreadyHasAccountText}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.clickSignUp}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },
  titleContainer: {
    marginTop: 50,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    color: "#0C001B",
    fontSize: 27,
    fontWeight: "800",
    textAlign: "right",
  },
  inputContainer: {
    marginVertical: 16,
  },
  inputTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderColor: "#DAD8DD",
    borderRadius: 16,
    textAlign: "left",
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
    height: 25,
    width: 25,
  },
  TextInput: {
    flex: 1,
    height: 50,
    color: "#180036",
    fontSize: 16,
    fontWeight: "400",
  },
  errorText: {
    fontSize: 10,
    color: "red",
    marginVertical: 5,
  },
  fieldTitle: {
    marginBottom: 16,
  },
  fieldTitleText: {
    color: "#0C001B",
    fontSize: 16,
    fontWeight: "400",
  },
  loadingIndicator: {},
  alreadyHasAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  alreadyHasAccountText: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: "400",
  },
  clickSignUp: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    color: "#63c6a3",
  },
  btnContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  buttonStyle: {
    backgroundColor: PRIMARY_GREEN,
    borderRadius: 16,
    padding: 12,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#ffff",
  },
  buttonContainer: {
    width: "100%",
    height: 50,
  },
  socialMediaBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DAD8DD",
    borderRadius: 16,
    height: 50,
    marginTop: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  socialMediaText: {
    color: "#180036",
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 15,
    textAlign: "center",
  },
  socialMediaIcon: {
    height: 25,
    width: 25,
  },
  otherLoginMethodsTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  otherLoginMethodsText: {
    color: "#180036",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
});

export default LoginPage;
