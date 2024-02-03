import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@rneui/themed";

export default function SnapPlant() {
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [disease, setDisease] = useState("");

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
      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
        name: "image.jpg",
        type: "image/jpg",
      });

      const response = await fetch("http://10.0.2.2:5000/diagnose/", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      console.log(data);
      setDisease(data.disease);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
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
        {disease ? <Text>disease: {disease}</Text> : null}
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
