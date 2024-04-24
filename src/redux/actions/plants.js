import {
  GET_PLANTS,
  GET_PLANTS_FAIL,
  GET_PLANT,
  GET_PLANT_FAIL,
  SEARCH_PLANTS,
  SEARCH_PLANTS_FAIL,
  ADD_PLANT,
  ADD_PLANT_FAIL,
  GET_DISEASE,
  GET_DISEASE_FAIL,
  DELETE_PLANT,
  DELETE_PLANT_FAIL,
} from "../constants/plants";
import axios from "axios";
import API from "../../../api";

export const getPlants = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API}/plant/`);
    console.log("Get plants response:", response.data);
    dispatch({
      type: GET_PLANTS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching plants:", error);
    dispatch({
      type: GET_PLANTS_FAIL,
      payload: error.response
        ? error.response.data.msg
        : "Failed to fetch plants",
    });
  }
};

export const searchPlants = (searchQuery) => async (dispatch) => {
  try {
    const response = await axios.get(`${API}/plant/search/${searchQuery}`);
    console.log("Search plants response:", response.data);
    dispatch({
      type: SEARCH_PLANTS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error searching plants:", error);
    dispatch({
      type: SEARCH_PLANTS_FAIL,
      payload: error.response
        ? error.response.data.msg
        : "Failed to search plants",
    });
  }
};

export const addPlant = (userId, plantId) => async (dispatch) => {
  try {
    const requestData = {
      user_id: userId,
      plant_id: plantId,
    };

    const response = await axios.post(
      `${API}/user_plant/add_plant`,
      requestData
    );
    dispatch({
      type: ADD_PLANT,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PLANT_FAIL,
      payload: error.response ? error.response.data.msg : "Failed to add plant",
    });
  }
};
export const deletePlant = (userId, plantId) => async (dispatch) => {
  const requestData = {
    user_id: userId,
    plant_id: plantId,
  };
  console.log("Request data:", requestData);
  try {
    const response = await axios.delete(`${API}/user_plant/delete_plant`, {
      data: requestData,
    });

    console.log("Delete plant response:", response.data);
    dispatch({
      type: DELETE_PLANT,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PLANT_FAIL,
      payload: error.response
        ? error.response.data.msg
        : "Failed to delete plant",
    });
  }
};

export const getPlant = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API}/plant/${id}`);
    dispatch({
      type: GET_PLANT,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PLANT_FAIL,
      payload: error.response
        ? error.response.data.msg
        : "Failed to fetch plant",
    });
  }
};

export const getDisease = (diseaseName) => async (dispatch) => {
  try {
    const response = await axios.get(`${API}/plant/disease/${diseaseName}`);
    dispatch({
      type: GET_DISEASE,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DISEASE_FAIL,
      payload: error.response
        ? error.response.data.msg
        : "Failed to fetch disease details",
    });
  }
};
