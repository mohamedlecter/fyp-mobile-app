import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  GET_USER,
  GET_USER_FAIL,
  GET_USERS,
  GET_USERS_FAIL,
  DELETE_USER,
  DELETE_USER_FAIL,
  FETCH_USER_PLANTS,
  FETCH_USER_PLANTS_FAIL,
  FETCH_USER_PLANT,
  FETCH_USER_PLANT_FAIL,
  SAVE_CARE_REMINDER,
  SAVE_CARE_REMINDER_FAIL,
  GET_USER_REMINDER_DATES,
  GET_USER_REMINDER_DATES_FAIL,
  GET_USER_REMINDER_DATES_BY_DATE,
  GET_USER_REMINDER_DATES_BY_DATE_FAIL,
  UPDATE_REMINDER_COMPLETION_SUCCESS,
  UPDATE_REMINDER_COMPLETION_FAIL,
} from "../constants/users";
import axios from "axios";
import API from "../../../api";

export const login = (email, password) => async (dispatch) => {
  console.log("Request data:", { email, password });
  try {
    const res = await axios.post(`${API}/user/login`, {
      email,
      password,
    });

    console.log("Response after post data:", res.data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    return res.data; // Add this line to return the response
  } catch (err) {
    console.log("Error logging in:", err);

    dispatch({
      type: LOGIN_FAIL,
      payload: err.response ? err.response.data.msg : err.message,
    });

    throw err; // Re-throw the error to be caught in handleLogin
  }
};

export const signUp = (email, password, username) => async (dispatch) => {
  try {
    const data = await axios.post(`${API}/user/signup`, {
      email,
      password,
      username,
    });

    console.log(data);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    console.log("Error in sign-up:", err);

    dispatch({
      type: SIGNUP_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });

    throw error;
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API}/`);
    if (res && res.data) {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    } else {
      throw new Error("Invalid response");
    }
  } catch (error) {
    dispatch({
      type: GET_USERS_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${API}/user/${id}`);
    if (res && res.data) {
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } else {
      throw new Error("Invalid response");
    }
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};

export const updateUser = (id, name, email, password) => async (dispatch) => {
  try {
    const res = await axios.put(`${API}/user/${id}`, {
      name,
      email,
      password,
    });
    if (res && res.data) {
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
    } else {
      throw new Error("Invalid response");
    }
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API}/user/${id}`);
    dispatch({
      type: DELETE_USER,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};
export const fetchUserPlants = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${API}/plant/user/${id}`);
    console.log("User plants response:", res.data);
    if (res) {
      dispatch({
        type: FETCH_USER_PLANTS,
        payload: res.data,
      });
    } else {
      throw new Error("Invalid response");
    }
  } catch (error) {
    console.error("Error fetching user plants:", error);
    dispatch({
      type: FETCH_USER_PLANTS_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};

export const fetchUserPlant = (userId, plantId) => async (dispatch) => {
  try {
    const res = await axios.get(`${API}/plant/user/${userId}/${plantId}`);
    if (res) {
      dispatch({
        type: FETCH_USER_PLANT,
        payload: res.data,
      });
      return res.data; // Return the fetched data
    } else {
      throw new Error("Invalid response");
    }
  } catch (error) {
    console.error("Error fetching user plant:", error);
    dispatch({
      type: FETCH_USER_PLANT_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};

export const saveCareReminder =
  (user_id, plant_id, action, time) => async (dispatch) => {
    try {
      console.log(user_id, plant_id, action, time);
      const response = await axios.post(
        `${API}/plant/user/${user_id}/${plant_id}/care_reminders`,
        { action, time } // Send only necessary data in the request body
      );
      console.log("Save care reminder response:", response.data);
      dispatch({
        type: SAVE_CARE_REMINDER,
        payload: response.data,
      });
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error saving care reminder:", error);
      dispatch({
        type: SAVE_CARE_REMINDER_FAIL,
        payload: error.response
          ? error.response.data.msg
          : "Failed to save care reminder",
      });
    }
  };

export const fetchUserReminderDates = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`${API}/plant/user/${userId}/reminder_dates`);
    if (res && res.data) {
      dispatch({
        type: GET_USER_REMINDER_DATES,
        payload: res.data,
      });
    } else {
      throw new Error("Invalid response");
    }
  } catch (error) {
    console.error("Error fetching user reminder dates:", error);
    dispatch({
      type: GET_USER_REMINDER_DATES_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};

export const fetchUserReminderDatesByDate =
  (userId, date) => async (dispatch) => {
    try {
      const res = await axios.get(
        `${API}/plant/user/${userId}/reminder_dates/${date}`
      );
      if (res && res.data) {
        dispatch({
          type: GET_USER_REMINDER_DATES_BY_DATE,
          payload: res.data,
        });
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error("Error fetching user reminder dates by date:", error);
      dispatch({
        type: GET_USER_REMINDER_DATES_BY_DATE_FAIL,
        payload: error.response ? error.response.data.msg : error.message,
      });
    }
  };
export const updateReminderCompletion =
  (userId, plantId, action, completed) => async (dispatch) => {
    try {
      const res = await axios.put(
        `${API}/plant/user/${userId}/plant/${plantId}/care_reminders/${action}`,
        {
          userId,
          plantId,
          action,
          completed,
        }
      );
      console.log("Update reminder completion response:", res.data);
      // Dispatch an action with the updated reminder completion status
      dispatch({
        type: UPDATE_REMINDER_COMPLETION_SUCCESS,
        payload: res.data, // Assuming the response contains the updated data
      });
      return res.data; // Return the response data
    } catch (error) {
      console.error("Error updating reminder completion:", error);
      dispatch({
        type: UPDATE_REMINDER_COMPLETION_FAIL,
        payload: error.response
          ? error.response.data.msg
          : "Failed to update reminder completion",
      });
      throw error;
    }
  };
