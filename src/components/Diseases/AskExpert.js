import { StyleSheet, Text, View, Image } from "react-native";
import { PRIMARY_GREEN, PRIMARY_GREY } from "../../colors";
import { Button } from "@rneui/themed";

const AskExpert = () => {
  return (
    <View style={styles.askContainer}>
      <Image
        source={require("../../../assets/bot.png")}
        style={styles.askImg}
      />
      <View style={styles.texts}>
        <View>
          <Text style={[styles.heading1, { marginBottom: 5 }]}>
            Ask Plant Bot
          </Text>
          <Text style={[styles.heading2, { color: PRIMARY_GREY }]}>
            Our bot is redy to help you with your problems.
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <Button
            title="Ask Plant Bot"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonText}
            containerStyle={styles.buttonContainer}
          />
        </View>
      </View>
    </View>
  );
};

export default AskExpert;

const styles = StyleSheet.create({
  askContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
  askImg: {
    width: 130,
    height: 130,
  },
  texts: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 180,
  },
  heading1: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  heading2: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  btnContainer: {
    marginVertical: 16,
  },
  buttonStyle: {
    backgroundColor: PRIMARY_GREEN,
    borderRadius: 16,
    padding: 10,
  },
  buttonText: {
    fontSize: 14,
    color: "#ffff",
  },
  buttonContainer: {
    width: "100%",
    height: 50,
  },
});
