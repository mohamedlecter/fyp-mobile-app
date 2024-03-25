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
} from "../constants/users";

const initialState = {
  user: null,
  isAuth: false,
  isLoading: true,
  users: [],
  userPlants: [],
  userPlant: null,
  reminderDates: [{}],
};

export default userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload,
        isAuth: true,
        isLoading: false,
      };
    case GET_USER_FAIL:
      return {
        ...state,
        user: null,
        isAuth: false,
        isLoading: false,
      };
    case GET_USERS:
      return {
        ...state,
        users: payload,
        isAuth: true,
        isLoading: false,
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        users: null,
        isAuth: false,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuth: true,
        isLoading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        isAuth: false,
        isLoading: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuth: true,
        isLoading: false,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        user: null,
        isAuth: false,
        isLoading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: payload,
        isAuth: true,
        isLoading: false,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        user: null,
        isAuth: false,
        isLoading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        user: null,
        isAuth: false,
        isLoading: false,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        user: null,
        isAuth: false,
        isLoading: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuth: false,
        isLoading: false,
      };
    case FETCH_USER_PLANTS:
      return {
        ...state,
        userPlants: payload,
        isLoading: false,
      };
    case FETCH_USER_PLANTS_FAIL:
      return {
        ...state,
        userPlants: null,
        isLoading: false,
      };
    case FETCH_USER_PLANT:
      return {
        ...state,
        userPlant: payload,
        isLoading: false,
      };
    case FETCH_USER_PLANT_FAIL:
      return {
        ...state,
        userPlant: null,
        isLoading: false,
      };
    case SAVE_CARE_REMINDER:
      return {
        ...state,
        userPlant: {
          ...state.userPlant,
          careReminders: payload,
        },
        isLoading: false,
      };
    case SAVE_CARE_REMINDER_FAIL:
      return {
        ...state,
        userPlant: null,
        isLoading: false,
      };
    case GET_USER_REMINDER_DATES:
      return {
        ...state,
        reminderDates: payload,
        isLoading: false,
      };
    case GET_USER_REMINDER_DATES_FAIL:
      return {
        ...state,
        reminderDates: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
