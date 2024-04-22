// chatbotReducer.js
import {
  SEND_MESSAGE_TO_BOT,
  SEND_MESSAGE_TO_BOT_FAIL,
  RECEIVE_RESPONSE_FROM_BOT,
  RECEIVE_RESPONSE_FROM_BOT_FAIL,
  FETCH_USER_CONVERSATIONS,
  FETCH_USER_CONVERSATIONS_FAIL,
} from "../constants/chatbot";

const initialState = {
  messages: [],
  conversations: [],
  isLoading: true,
  error: null,
  isBotLoading: false,
};

const chatBotReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEND_MESSAGE_TO_BOT:
      return {
        ...state,
        messages: [...state.messages, payload],
        isBotLoading: true,
        error: null,
      };
    case SEND_MESSAGE_TO_BOT_FAIL:
      return {
        ...state,
        isLoading: false,
        isBotLoading: false,
        error: payload,
      };
    case RECEIVE_RESPONSE_FROM_BOT:
      return {
        ...state,
        messages: [...state.messages, payload],
        isLoading: false,
        isBotLoading: false,
        error: null,
      };
    case RECEIVE_RESPONSE_FROM_BOT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case FETCH_USER_CONVERSATIONS:
      return {
        ...state,
        conversations: payload,
        isLoading: false,
        error: null,
      };
    case FETCH_USER_CONVERSATIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default chatBotReducer;
