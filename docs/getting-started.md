---import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', isUser: false },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() === '') return;

    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), text: inputText, isUser: true }]);
    setInputText('');

    // Simulate bot reply after 1 second
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), text: `I received: "${inputText}"`, isUser: false }]);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.message, item.isUser ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  message: { padding: 10, borderRadius: 8, marginVertical: 4, maxWidth: '80%' },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#007AFF', color: 'white' },
  botMessage: { alignSelf: 'flex-start', backgroundColor: '#E5E5EA', color: 'black' },
  messageText: { color: 'inherit' }, // Inherits from parent
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginRight: 8 },
});
