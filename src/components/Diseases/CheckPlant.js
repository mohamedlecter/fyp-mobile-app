import { StyleSheet, Text, View, Image } from "react-native";
import { PRIMARY_GREEN, PRIMARY_GREY } from "../../colors";
import { Button } from "@rneui/themed";

const CheckPlant = () => {
  return (
    <View style={styles.diagnoseContainer}>
      <Image
        source={require("../../../assets/checkPlant.png")}
        style={styles.diagnoseImg}
      />
      <View style={styles.diagnoseTexts}>
        <View>
          <Text style={[styles.heading1, { marginBottom: 5 }]}>
            Check your plant
          </Text>
          <Text style={[styles.heading2, { color: PRIMARY_GREY }]}>
            Take Photos, start diagnose diseases & get plant care
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <Button
            title="Diagnose"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonText}
            containerStyle={styles.buttonContainer}
          />
        </View>
      </View>
    </View>
  );
};

export default CheckPlant;

const styles = StyleSheet.create({
  diagnoseContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 16,
  },
  diagnoseImg: {
    width: 130,
    height: 130,
  },
  diagnoseTexts: {
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
