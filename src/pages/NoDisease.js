import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import HeaderBack from "../components/HeaderBack";


const Error = () => {
    const navigation = useNavigation();
    const onPress = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.errorContainer}>
            <HeaderBack title={""} onPress={onPress} />
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 50
            }}>
                <Image
                    source={require("../../assets/emptystate.png")}
                    style={styles.errorImg}
                />
                <Text style={styles.errorMsg}>No disease detected</Text>
                <Button
                    onPress={onPress}
                    title={"Try again"}
                    buttonStyle={styles.buttonStyle}
                    titleStyle={styles.buttonText}
                    containerStyle={styles.buttonContainer}
                />
            </View>

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
