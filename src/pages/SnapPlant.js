import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export default function SnapPlant() {
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [camera, setCamera] = useState(null);
  const [disease, setDisease] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [confidence, setConfidence] = useState(0);
  const [showOptionsContainer, setShowOptionsContainer] = useState(true);
  const [showCameraContainer, setShowCameraContainer] = useState(false);

  useEffect(() => {
    // Request camera permissions when the component mounts
    requestPermission();
  }, []);

  // Function to handle selecting an image from the gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
    }
    setShowOptionsContainer(false);
    setShowCameraContainer(false);
  };

  // Function to handle taking a picture
  const takePicture = async () => {
    setShowOptionsContainer(false);
    setShowCameraContainer(true);
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
    setShowOptionsContainer(true);
    setPickedImagePath("");
    setConfidence(0);
    setDisease("");
  };

  return (
    <View style={styles.screen}>
      {showOptionsContainer && (
        <View style={styles.optionsContainer}>
          <Text style={styles.text}>Identify</Text>
          <View style={styles.buttonContainer}>
            <Button
              onPress={pickImage}
              title="Select an image"
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.buttonTitle}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Take Picture"
              onPress={takePicture}
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.buttonTitle}
            />
          </View>
        </View>
      )}
      {showCameraContainer && (
        <CameraContainer
          takePicture={takePicture}
          setPickedImagePath={setPickedImagePath}
          setShowCameraContainer={setShowCameraContainer}
        />
      )}
      {pickedImagePath !== "" && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: pickedImagePath }}
            style={{ width: "100%", height: 450 }}
          />
          <View style={styles.rowButtonContainer}>
            <Button
              onPress={retakePicture}
              title="Retake Picture"
              buttonStyle={[
                styles.buttonStyle,
                { borderRadius: 5, marginHorizontal: 10, marginTop: 10 },
              ]}
              titleStyle={styles.buttonTitle}
            />
            <Button
              onPress={submitPicture}
              title="Submit"
              buttonStyle={[
                styles.buttonStyle,
                { backgroundColor: "blue", borderRadius: 5, marginTop: 10 },
              ]}
              titleStyle={styles.buttonTitle}
            />
          </View>
          {isLoading && <ActivityIndicator size="large" color="#00a86b" />}
        </View>
      )}
    </View>
  );
}

const CameraContainer = ({
  takePicture,
  setPickedImagePath,
  setShowCameraContainer,
}) => {
  const [camera, setCamera] = useState(null);

  return (
    <View style={styles.cameraContainer}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCamera(ref)}
      >
        <View style={styles.buttonContainer}>
          <Button
            onPress={async () => {
              if (camera) {
                const data = await camera.takePictureAsync(null);
                setPickedImagePath(data.uri);
                setShowCameraContainer(false);
              }
            }}
            title="Take Picture"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
          />
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-end", // Align items at the bottom
  },
  optionsContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    height: 180,
    width: "100%",
    position: "absolute", // Position absolute to cover bottom
    bottom: 0, // Align to bottom
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  rowButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: "#00a86b",
    borderRadius: 10,
    width: 150,
    height: 40,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
  },
  rowButtonStyle: {
    backgroundColor: "#00a86b",
    borderRadius: 10,
    width: 150,
    height: 40,
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
    flex: 1,
  },
});
