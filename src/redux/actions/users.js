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
} from "../constants/users";
import axios from "axios";
import API from "../../../api";

export const login = (email, password) => async (dispatch) => {
  console.log("Request data:", { email, password });
  axios
    .post(`${API}/user/login`, {
      email,
      password,
    })
    .then((res) => {
      console.log("Response after post data:", res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("Error logging in:", err);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response ? err.response.data.msg : err.message,
      });
    });
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
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
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
