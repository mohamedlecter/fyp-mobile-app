import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessageToBot,
  fetchUserConversations,
} from "../redux/actions/chatbot";
import { Button } from "@rneui/themed";

const ChatBot = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chatBotReducer.messages);
  const conversations = useSelector(
    (state) => state.chatBotReducer.conversations
  );
  const isUserMessageLoading = useSelector(
    (state) => state.chatBotReducer.isUserMessageLoading
  );
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
        {conversations.map((conversation, index) => (
          <View key={index}>
            <View>
              {conversation.conversation_history.map((message, index) =>
                message.role === "user" ? (
                  <View key={index} style={styles.userMessageContainer}>
                    {isUserMessageLoading ? (
                      <Text style={styles.userMessageText}>Loading...</Text>
                    ) : (
                      <Text style={styles.userMessageText}>
                        {message.content}
                      </Text>
                    )}
                    <Image
                      style={styles.userImage}
                      source={require("../../assets/selfie.png")}
                    />
                  </View>
                ) : (
                  <View key={index} style={styles.botMessageContainer}>
                    <Image
                      style={styles.botImage}
                      source={require("../../assets/bot.png")}
                    />
                    {isBotLoading ? (
                      <Text style={styles.botMessageText}>Loading...</Text>
                    ) : (
                      <Text style={styles.botMessageText}>
                        {message.content}
                      </Text>
                    )}
                  </View>
                )
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleMessageSend}
        >
          <Image
            source={require("../../assets/send-mail.png")}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 60,
  },
  chatContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
    padding: 8,
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  userMessageContainer: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  botMessageContainer: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  userImage: {
    height: 30,
    width: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  botImage: {
    height: 30,
    width: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  userMessageText: {
    color: "white",
    maxWidth: "90%",
    backgroundColor: "#00a86b",
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  botMessageText: {
    color: "#333",
    maxWidth: "85%",
    backgroundColor: "#ebeaed",
    padding: 10,
    borderRadius: 10,
    marginLeft: 5,
  },
  btnContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  buttonStyle: {
    backgroundColor: "#00a86b",
    // borderRadius: 16,
    padding: 12,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#ffff",
  },
  buttonContainer: {
    // width: "20%",
    // height: 50,
  },
  sendIcon: {
    width: 30,
    height: 30,
  },
});

export default ChatBot;
