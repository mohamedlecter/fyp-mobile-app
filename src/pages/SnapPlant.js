import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export default function SnapPlant() {
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [disease, setDisease] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      const imagePickerStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasCameraPermission(
        cameraStatus.status === "granted" &&
          imagePickerStatus.status === "granted"
      );
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setPickedImagePath(data.uri);
      uploadImage(data.uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setPickedImagePath(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

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
      // Replace underscores with spaces in the disease name
      const formattedDisease = data.class.replace(/_/g, " ");
      console.log(formattedDisease);
      setDisease(formattedDisease);

      // Navigate to the disease details page after 3 seconds
      setTimeout(() => {
        navigateToDiseaseDetails(formattedDisease);
      }, 1000);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false); // Set isLoading to false when the upload is completed or failed
    }
  };

  const navigateToDiseaseDetails = (diseaseName) => {
    navigation.navigate("DiseaseDetails", { diseaseName }); // Navigate to plant disease page with diseaseName as parameter
  };

  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <Button onPress={pickImage} title="Select an image" />
        <Button onPress={flipCamera} title="Flip Camera" />
      </View>

      <View style={styles.cameraContainer}>
        {hasCameraPermission === null ? (
          <Text>Requesting Camera Permission</Text>
        ) : hasCameraPermission === false ? (
          <Text>No access to camera</Text>
        ) : (
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => setCamera(ref)}
          />
        )}
      </View>

      <View style={styles.imageContainer}>
        {pickedImagePath !== "" && (
          <Image source={{ uri: pickedImagePath }} style={styles.image} />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Take Picture"
          onPress={takePicture}
          disabled={!hasCameraPermission}
        />
        {isLoading ? ( // Show loading indicator when isLoading is true
          <ActivityIndicator size="large" color="blue" />
        ) : disease ? (
          <Text>disease: {disease}</Text>
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  cameraContainer: {
    width: "100%",
    aspectRatio: 4 / 3,
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  imageContainer: {
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "cover",
  },
});
