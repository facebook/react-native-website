https://api.openai.com/v1/chat/completionsimport React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";

export default function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const API_KEY = "YOUR_OPENAI_API_KEY"; // 🔑 Put your API key here

  const sendMessage = async () => {
    if (!message) return;

    const newChat = [...chat, { role: "user", content: message }];
    setChat(newChat);
    setMessage("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: newChat,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reply = response.data.choices[0].message;

      setChat([...newChat, reply]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tycoon Health 🍏</Text>

      <FlatList
        data={chat}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={item.role === "user" ? styles.user : styles.bot}>
            {item.content}
          </Text>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="What do you want to eat today?"
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text style={styles.buttonText}>Ask AI</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E8F5E9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  user: {
    alignSelf: "flex-end",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  bot: {
    alignSelf: "flex-start",
    backgroundColor: "#ccc",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#2E7D32",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
const API_KEY = "YOUR_OPENAI_API_KEY";
