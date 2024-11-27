import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import io from "socket.io-client";

// const socket = io('http://localhost:3000', {
//   transports: ['websocket'], // Force WebSocket transport
// });

const initialMessages = [
  {
    id: '1',
    sender: 'Doctor',
    message: 'Hi, doctor. How are you today?',
    time: '10:22 AM',
  },
  {
    id: '2',
    sender: 'User',
    message: 'Hi, doctor. How are you today?',
    time: '10:22 AM',
  },
];

export default function ChatScreen({route}) {
  const {name} = route.params;
  const [messages, setMessages] = useState(initialMessages);
  const [textMessage, setTextMessage] = useState('');
  const chatId = 'chat-room-1';

  useEffect(() => {
    const chatId = 'chat-room-1';

    const fetchChatHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/chat-history/${chatId}`,
        );
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching chat history: ', error);
      }
    };

    fetchChatHistory();
    // socket.on('receiveMessage', message => {
    //   setMessages(prevMessages => [...prevMessages, message]); // Add new message
    // });

    // Cleanup the socket listener on component unmount
    return () => {
      // socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    //const chatId = "chat-room-1";
    const newMessage = {
      //id: `${messages.length + 1}-${new Date().getTime()}`, //use timestamp as unique id
      chatId,
      sender: 'User',
      message: textMessage,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    // socket.emit('sendMessage', newMessage);

    //setMessages([...messages, newMessage]);
    setTextMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      <FlatList
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === 'User'
                ? styles.userMessage
                : styles.doctorMessage,
            ]}>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{item.time}</Text>
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
            marginTop={10}
            marginLeft={8}
            name="paper-plane"
            size={20}
            color="#fff"
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
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    color: 'white',
  },
  doctorMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  message: {
    color: 'white',
  },
  time: {
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 0,
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
    width: 40,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 0,
    margin: 0,
  },
});
