import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import victorImage from '../images/victor.jpg'; // Import image

const chatData = [
  {
    id: '1',
    name: 'Dr. Victor Chuks',
    message: 'How are you?',
    time: '7.06 PM',
    imageUrl: victorImage, // Use imported image
  },
  // other chat entries...
];

export default function ChatList() {
  const navigation = useNavigation();
  const renderChatItem = ({item}) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatScreen', {name: item.name})}>
      <Image source={{uri: item.imageUrl}} style={styles.profileImage} />
      <View style={styles.chatText}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage}>{item.message}</Text>
      </View>
      <Text style={styles.chatTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={chatData}
      renderItem={renderChatItem}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatMessage: {
    color: '#666',
  },
  chatTime: {
    alignSelf: 'center',
    color: '#666',
  },
});
