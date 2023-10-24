import {
    GET_USER,
  } from "../constants/users";
  
  const initialState = {
    user: null,
    isAuth: false,
    isLoading: true,
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
      default:
        return state;
    }
  };
  