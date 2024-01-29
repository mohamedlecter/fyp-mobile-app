import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
import { Button } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";

export default function SnapPlant() {
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState("");

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result.assets[0].uri);

    if (!result.cancelled) {
      setPickedImagePath(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <Button onPress={showImagePicker} title="Select an image" />
        <Button onPress={openCamera} title="Open camera" />
      </View>

      <View style={styles.imageContainer}>
        {pickedImagePath !== "" && (
          <Image source={{ uri: pickedImagePath }} style={styles.image} />
        )}
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
    width: 400,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageContainer: {
    padding: 30,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: "cover",
  },
});
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [camera, setCamera] = useState(null);
//   const [image, setImage] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);

//   useEffect(() => {
//     (async () => {
//       const cameraStatus = await Camera.requestPermissionsAsync();
//       setHasCameraPermission(cameraStatus.status === "granted");
//     })();
//   }, []);

//   const takePicture = async () => {
//     if (camera) {
//       const data = await camera.takePictureAsync(null);
//       setImage(data.uri);
//     }
//   };

//   const openCamera = async () => {
//     // Ask the user for the permission to access the camera
//     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert("You've refused to allow this appp to access your camera!");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync();

//     // Explore the result
//     console.log(result);

//     if (!result.canceled) {
//       setPickedImagePath(result.uri);
//       console.log(result.uri);
//     }
// }

//   const showImagePicker = async () => {
//     // Ask the user for the permission to access the media library
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert("You've refused to allow this appp to access your photos!");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync();

//     // Explore the result
//     console.log(result);

//     if (!result.canceled) {
//       setPickedImagePath(result.uri);
//       console.log(result.uri);
//     }

//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.cameraContainer}>
//         {image ? (
//           <Image source={{ uri: image.uri }} style={styles.previewImage} />
//         ) : (
//           <Camera
//             style={styles.camera}
//             type={type}
//             ref={(ref) => setCamera(ref)}
//           ></Camera>
//         )}
//       </View>
//       <View style={styles.buttonContainer}>
//         <Button title="Take Picture" onPress={takePicture} disabled={!!image} />
//         <Button title="Choose from Gallery" onPress={pickImage} />
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   cameraContainer: {
//     flex: 1,
//     flexDirection: "row",
//     width: "100%",
//   },
//   camera: {
//     flex: 1,
//   },
//   previewImage: {
//     width: "100%",
//     height: "100%",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     padding: 20,
//     width: "100%",
//   },
// });
