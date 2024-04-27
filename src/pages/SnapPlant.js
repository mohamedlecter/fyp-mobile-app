import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export default function SnapPlant() {
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [disease, setDisease] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    // Request camera permissions when the component mounts
    requestPermission();
  }, []);

  // Function to handle taking a picture
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setPickedImagePath(data.uri);
    }
  };

  // Function to handle selecting an image from the gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
    }
  };

  // Function to handle submitting the picture
  const submitPicture = () => {
    if (pickedImagePath !== "") {
      console.log(pickedImagePath);
      uploadImage(pickedImagePath);
      setConfidence(0);
      setDisease("");
    }
  };
  // Function to handle uploading the image
  const uploadImage = async (imageUri) => {
    try {
      setIsLoading(true); // Set isLoading to true when starting the upload

      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        name: "image.jpg",
        type: "image/jpg",
      });

      const response = await fetch(
        "https://us-central1-fyp-model-416403.cloudfunctions.net/predict",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      console.log(data);
      setDisease(data.class);
      setConfidence(data.confidence);

      // Navigate to the disease details page after 3 seconds
      setTimeout(() => {
        navigateToDiseaseDetails(data.class, data.confidence, imageUri);
      }, 2000);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // Function to navigate to the disease details page
  const navigateToDiseaseDetails = (diseaseName, confidence, imageUri) => {
    navigation.navigate("DiseaseDetails", {
      diseaseName,
      confidence,
      imageUri,
    });
  };

  // Function to handle retaking a picture
  const retakePicture = () => {
    setPickedImagePath("");
    setConfidence(0);
    setDisease("");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.cameraContainer}>
        <>
          {pickedImagePath === "" ? (
            <Camera
              style={styles.camera}
              type={type}
              ref={(ref) => setCamera(ref)}
            />
          ) : (
            <View style={styles.imageContainer}>
              <Image source={{ uri: pickedImagePath }} style={styles.image} />
            </View>
          )}
        </>
      </View>

      <View style={{ marginBottom: 2 }}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={pickImage}
            title="Select an image"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
          />
          <Button
            title="Take Picture"
            onPress={takePicture}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
          />
        </View>

        <View style={styles.buttonContainer}>
          {pickedImagePath !== "" && (
            <Button
              title="Retake Picture"
              onPress={retakePicture}
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.buttonStyle}
            />
          )}
          {pickedImagePath !== "" && (
            <Button
              title="Submit Picture"
              onPress={submitPicture}
              titleStyle={styles.buttonTitle}
              buttonStyle={[styles.buttonStyle, { backgroundColor: "#4951f5" }]}
            />
          )}
        </View>
      </View>

      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : disease && confidence ? (
          <Text>
            disease: {disease} with confidence of {confidence}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  cameraContainer: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    flex: 1,
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    flex: 1,
  },
  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 5,
  },
  buttonStyle: {
    backgroundColor: "#00a86b",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
  },
});
