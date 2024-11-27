import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  collection,
  query,
  addDoc,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChatInside({ route }) {
  const { chatId, userNames } = route.params; // Retrieve chatId and userNames from params
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  

  useEffect(() => {
    const fetchChatHistory = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      setUserEmail(email);
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      const q = query(messagesRef, orderBy('time', 'asc'));

      // Real-time listener for messages in the chat
      const unsubscribe = onSnapshot(q, snapshot => {
        const fetchedMessages = snapshot.docs.map(doc => ({
          _id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      });

      return unsubscribe;
    };

    // Call the fetch function
    fetchChatHistory();
  }, [chatId]);

  const sendMessage = async () => {
    if (!textMessage.trim()) return;

    const newMessage = {
      sender: userEmail,
      message: textMessage,
      time: new Date().toISOString(), // Use ISO format for consistency
      isRead: false, // New messages are unread
      receiverName: userEmail === Object.keys(userNames)[0] ? Object.keys(userNames)[1] : Object.keys(userNames)[0], // Determine receiver name
    };

    try {
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      await addDoc(messagesRef, newMessage); // Add message to Firebase
      setTextMessage(''); // Clear input after sending
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === userEmail ? styles.userMessage : styles.otherMessage,
            ]}>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.senderName}>
              {item.sender === userEmail ? 'You' : userNames[item.sender]}
            </Text>
            <Text style={styles.time}>
              {new Date(item.time).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          value={textMessage}
          onChangeText={setTextMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <FontAwesome
            name="paper-plane"
            size={20}
            color="#fff"
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#495057',
  },
  messageText: {
    color: '#fff',
  },
  senderName: {
    fontSize: 10,
    color: '#eee',
    alignSelf: 'flex-end',
  },
  time: {
    fontSize: 10,
    color: '#eee',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
  },
});
