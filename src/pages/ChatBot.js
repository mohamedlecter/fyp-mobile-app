import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessageToBot,
  fetchUserConversations,
} from "../redux/actions/chatbot";

const ChatBot = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chatBotReducer.messages);
  const conversations = useSelector(
    (state) => state.chatBotReducer.conversations
  );
  const isLoading = useSelector((state) => state.chatBotReducer.isLoading);
  const isBotLoading = useSelector(
    (state) => state.chatBotReducer.isBotLoading
  );
  const error = useSelector((state) => state.chatBotReducer.error);
  const userId = useSelector((state) => state.userReducer.user.user._id);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef();

  useEffect(() => {
    // Fetch user conversations when the component mounts
    dispatch(fetchUserConversations(userId)); // Replace userId with appropriate value
  }, [conversations]); // Empty dependency array ensures it only runs once when the component mounts

  useEffect(() => {
    // Scroll to the bottom of chat when a new message is added
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]); // Trigger the effect whenever messages are updated

  const handleMessageSend = () => {
    if (inputText.trim() !== "") {
      dispatch(sendMessageToBot(userId, inputText));
      setInputText("");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContentContainer}
      >
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          conversations.map((conversation, index) => (
            <View key={index}>
              <Text>Conversation ID: {conversation.conversation_id}</Text>
              <View>
                {conversation.conversation_history.map((message, index) => (
                  <Text
                    key={index}
                    style={
                      message.role === "user"
                        ? styles.userMessageText
                        : styles.botMessageText
                    }
                  >
                    {message.content}
                  </Text>
                ))}
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={handleMessageSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  chatContainer: {
    flex: 1,
  },
  chatContentContainer: {
    paddingBottom: 20, // Adjust as per your UI needs
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  userMessageText: {
    color: "#000",
    alignSelf: "flex-end",
  },
  botMessageText: {
    color: "#333",
    alignSelf: "flex-start",
  },
});

export default ChatBot;
