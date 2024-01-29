import {
  GET_PLANTS,
  GET_PLANTS_FAIL,
  GET_PLANT,
  GET_PLANT_FAIL,
  GET_DISEASES,
  GET_DISEASES_FAIL,
  GET_DISEASE,
  GET_DISEASE_FAIL,
} from "../constants/plants";
import axios from "axios";
import API from "../../../api";

export const getPlants = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API}/plant`);
    console.log(response.data); // Log the data from the response
    dispatch({
      type: GET_PLANTS,
      payload: response.data, // Update to use response.data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_PLANTS_FAIL,
      payload: error.response
        ? error.response.data.msg
        : "Failed to fetch plants", // Provide a default error message
    });
  }
};

export const getPlant = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API}/plant/${id}`);
    console.log(response.data); // Log the data from the response
    dispatch({
      type: GET_PLANT,
      payload: response.data, // Update to use response.data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_PLANT_FAIL,
      payload: error.response
        ? error.response.data.msg
        : "Failed to fetch plant", // Provide a default error message
    });
  }
};

export const getDiseases = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://perenual.com/api/pest-disease-list?key=sk-PFs2655e223d2d8613080&page=1&q=Leaf"
    );
    dispatch({
      type: GET_DISEASES,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching diseases:", error);
    dispatch({
      type: GET_DISEASES_FAIL,
      payload: error.message || "Failed to fetch diseases", // Use error message or a default message
    });
  }
};

export const getDisease = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API}/plant/diseases/${id}`);
    console.log(response.data); // Log the data from the response
    dispatch({
      type: GET_DISEASE,
      payload: response.data, // Update to use response.data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_DISEASE_FAIL,
      payload: error.response
        ? error.response.data.msg
        : "Failed to fetch disease", // Provide a default error message
    });
  }
};
