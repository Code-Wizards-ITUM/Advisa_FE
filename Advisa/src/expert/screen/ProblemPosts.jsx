import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {BASE_URL} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProblemPosts = ({navigation}) => {
  const [filter, setFilter] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const [postData, setPostData] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const fetchPosts = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const userPhoneNumber = await AsyncStorage.getItem('userPhoneNumber');

        try {
          const response = await axios.get(
            `${BASE_URL}/expert/getPosts/${userPhoneNumber}`,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            },
          );
          const posts = response.data.data;
          setPostData(posts);
        } catch (error) {
          if (error.response) {
            Alert.alert('Failed to load Posts', error.response.data.message);
          } else if (error.request) {
            Alert.alert(
              'Failed to load Posts',
              'Network error. Please try again later.',
            );
          } else {
            Alert.alert(
              'Failed to load Posts',
              'An unexpected error occurred.',
            );
          }
        }
      };

      fetchPosts();

      return () => {
        setPostData([]);
      };
    }, []),
  );

  const formatDate = dateString => {
    const date = new Date(dateString.replace(/\./g, ':'));
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}/${String(date.getDate()).padStart(2, '0')}, ${String(
      date.getHours(),
    ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const renderPostItem = ({item}) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.anonymousContainer}>
          <FontAwesome name="user-circle" size={25} color="#355c7d" />
          <Text style={styles.anonymousText}>
            {' '}
            {item.anonymity === 'yes' ? 'Anonymous' : item.userName}
          </Text>
        </View>
        <Text style={styles.timeText}>{formatDate(item.date)}</Text>
      </View>
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <View style={styles.postBodyContainer}>
          <Text style={styles.postBody}>{item.description}</Text>
        </View>
        <TouchableOpacity
          style={styles.suggestionsButton}
          onPress={() =>
            navigation.navigate('ViewSugg', {
              postId: item.id,
            })
          }>
          <Text style={styles.suggestionsButtonText}>View Suggestions</Text>
          <FontAwesome name="comments" size={25} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={postData}
        renderItem={renderPostItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ProblemPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#3b82f6',
  },
  arrowButton: {
    paddingRight: 10,
  },
  arrowImage: {
    width: 30,
    height: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1, // Allows the title to take up the remaining space
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Keep the text and icon aligned
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: 150, // Fixed width
  },
  filterText: {
    color: '#355c7d',
    marginRight: 5,
  },
  dropdownIcon: {
    width: 15,
    height: 15,
    marginLeft: 30,
  },
  dropdownIcon2: {
    width: 25,
    height: 25,
    marginLeft: 20,
  },
  clearFilterButton: {
    backgroundColor: '#6f6f7b',
    borderRadius: 8,
    padding: 10,
    paddingHorizontal: 15,
  },
  clearFilterText: {
    color: '#fff',
  },
  postContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  postHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  anonymousContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  anonymousIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  anonymousText: {
    fontWeight: 'bold',
    color: '#355c7d',
    fontSize: 16,
    marginLeft: 10,
  },
  timeText: {
    color: '#777',
  },
  postContent: {
    marginBottom: 20,
    borderRadius: 8,
    padding: 20,
    backgroundColor: '#4f4f5a',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  postBodyContainer: {
    borderTopWidth: 1, // Adds a line at the top
    borderBottomWidth: 1, // Adds a line at the bottom
    borderColor: '#fff', // Line color
    paddingVertical: 10, // Padding between the text and lines
  },
  postBody: {
    color: 'white',
    lineHeight: 30,
    textAlign: 'justify', // This is needed to justify the text
  },

  suggestionsButton: {
    backgroundColor: '#4f4f5a',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#fff',
    alignSelf: 'flex-end',
    width: '100%',
  },
  suggestionsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 1,
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: '#333',
    paddingHorizontal: 10,
  },
  sendButton: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    width: 30,
    height: 30,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 28,
    height: 28,
    marginBottom: 5,
  },
  navText: {
    fontSize: 12,
  },
});
