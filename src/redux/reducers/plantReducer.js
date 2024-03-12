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
} from "../constants/plants";

const initialState = {
  plants: [],
  isLoading: true,
  error: null,
  addedPlant: null,
  disease: [],
  plant: null,
};

const plantReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PLANTS:
      return {
        ...state,
        plants: payload,
        isLoading: false,
        error: null,
      };
    case GET_PLANTS_FAIL:
      return {
        ...state,
        plants: [],
        isLoading: false,
        error: payload,
      };
    case SEARCH_PLANTS:
      return {
        ...state,
        plants: payload,
        isLoading: false,
        error: null,
      };
    case SEARCH_PLANTS_FAIL:
      return {
        ...state,
        plants: [],
        isLoading: false,
        error: payload,
      };
    case ADD_PLANT:
      return {
        ...state,
        addedPlant: payload,
        error: null,
      };
    case ADD_PLANT_FAIL:
      return {
        ...state,
        addedPlant: null,
        error: payload,
      };
    case GET_PLANT:
      return {
        ...state,
        plant: payload,
        isLoading: false,
        error: null,
      };
    case GET_PLANT_FAIL:
      return {
        ...state,
        plant: null,
        isLoading: false,
        error: payload,
      };
    case GET_DISEASE:
      return {
        ...state,
        disease: payload,
        isLoading: false,
        error: null,
      };
    case GET_DISEASE_FAIL:
      return {
        ...state,
        disease: [],
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default plantReducer;
