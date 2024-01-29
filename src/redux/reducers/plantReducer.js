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

const initialState = {
  plants: [],
  plant: null,
  diseases: [],
  disease: null,
  isLoading: true,
};

export default plantReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PLANTS:
      return {
        ...state,
        plants: payload,
        isLoading: false,
      };
    case GET_PLANTS_FAIL:
      return {
        ...state,
        plants: [],
        isLoading: false,
      };
    case GET_PLANT:
      return {
        ...state,
        plant: payload,
        isLoading: false,
      };
    case GET_PLANT_FAIL:
      return {
        ...state,
        plant: null,
        isLoading: false,
      };
    case GET_DISEASES:
      return {
        ...state,
        diseases: payload,
        isLoading: false,
      };
    case GET_DISEASES_FAIL:
      return {
        ...state,
        diseases: [],
        isLoading: false,
      };
    case GET_DISEASE:
      return {
        ...state,
        disease: payload,
        isLoading: false,
      };
    case GET_DISEASE_FAIL:
      return {
        ...state,
        disease: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
