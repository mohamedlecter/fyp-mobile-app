import axios from "axios";
import API from "../../../api";
import {
  SEND_MESSAGE_TO_BOT,
  SEND_MESSAGE_TO_BOT_FAIL,
  RECEIVE_RESPONSE_FROM_BOT,
  RECEIVE_RESPONSE_FROM_BOT_FAIL,
  FETCH_USER_CONVERSATIONS,
  FETCH_USER_CONVERSATIONS_FAIL,
} from "../constants/chatbot";

export const sendMessageToBot = (user_id, message) => async (dispatch) => {
  try {
    const requestData = {
      user_id: user_id,
      message: message,
    };
    // Dispatching SEND_MESSAGE_TO_BOT action to indicate message sending
    dispatch({
      type: SEND_MESSAGE_TO_BOT,
      payload: { text: message, fromUser: true }, // Set fromUser to true for user messages
    });
    const response = await axios.post(`${API}/chatbot/chat`, requestData);
    console.log("Send message response:", response.data);
    // Dispatching RECEIVE_RESPONSE_FROM_BOT action upon successful message sending
    dispatch({
      type: RECEIVE_RESPONSE_FROM_BOT,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    // Dispatching SEND_MESSAGE_TO_BOT_FAIL action if message sending fails
    dispatch({
      type: SEND_MESSAGE_TO_BOT_FAIL,
      payload: error.response
        ? error.response.data.msg
        : "Failed to send message",
    });
  }
};

export const fetchUserConversations = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API}/chatbot/chat/${userId}`);
    dispatch({
      type: FETCH_USER_CONVERSATIONS,
      payload: response.data.conversations,
    });
  } catch (error) {
    console.error("Error fetching user conversations:", error);
    dispatch({
      type: FETCH_USER_CONVERSATIONS_FAIL,
      payload: error.response
        ? error.response.data.msg
        : "Failed to fetch user conversations",
    });
  }
};
