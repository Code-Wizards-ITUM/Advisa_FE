import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
import {useCallback} from 'react';
import {BASE_URL} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Sample data for Posts
const othersPostsData = [
  // {
  //   id: 1,
  //   title: 'Post Title',
  //   date: '08.00 @ 22.05.24',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //   author: 'Anonymous',
  // },
];

// Sample data for My Posts (initially empty, can be populated when user adds posts)
const myPostsData = [
  // {
  //   id: 3,
  //   title: 'My First Post',
  //   date: '10.00 @ 22.05.24',
  //   description: 'This is my first post about an issue I faced.',
  //   author: 'Me',
  // },
];

const PostScreen = () => {
  const navigation = useNavigation();

  const [isMyPost, setIsMyPost] = useState(false); // To toggle between "Posts" and "My Posts"
  const [searchText, setSearchText] = useState(''); // For search filtering

  const [othersPostsData, setOthersPostsData] = useState([]);
  const [myPostsData, setMyPostsData] = useState([]);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  useFocusEffect(
    useCallback(() => {
      const fetchPosts = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const userPhoneNumber=await AsyncStorage.getItem('userPhoneNumber');
        setUserPhoneNumber(userPhoneNumber);
        try {
          const response = await axios.get(`${BASE_URL}/user/getPosts`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          const posts = response.data.data;
          setMyPostsData(posts.filter(item => item.userId === userPhoneNumber));
          setOthersPostsData(
            posts.filter(item => item.userId !== userPhoneNumber),
          );
        } catch (error) {
          if (error.response) {
            Alert.alert('Failed to load posts', error.response.data.message);
          } else if (error.request) {
            Alert.alert(
              'Failed to load posts',
              'Network error. Please try again later.',
            );
          } else {
            Alert.alert(
              'Failed to load posts',
              'An unexpected error occurred.',
            );
          }
        }
      };

      fetchPosts();

      return () => {
        setMyPostsData([]);
        setOthersPostsData([]); // Optionally reset the blogs when leaving the screen
      };
    }, []),
  );
  const formatDate = (dateString) => {
    const date = new Date(dateString.replace(/\./g, ":"));
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };
  // Function to render post items
  const renderPostItem = ({item}) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Text style={styles.postAuthor}>
          <FontAwesome name="user-circle-o" size={24} color="#555" />{' '}
          {item.anonymity == 'yes' ? item.userId ===userPhoneNumber?`${item.userName}(Anonymous)`:"Anonymous" : item.userName}
        </Text>
        <Text style={styles.postDate}>{formatDate(item.date)}</Text>
      </View>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postDescription}>{item.description}</Text>
      <View style={styles.postActions}>
        {isMyPost && (
          <TouchableOpacity style={styles.deleteButton}
          onPress={() => Alert.alert(`${item.id} ${item.title}`)}
          >
            <FontAwesome name="trash" size={18} color="#ffffff" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => navigation.navigate('Suggestions', {postId: item.id})}>
          <Text style={styles.viewButtonText}>View Suggestions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, !isMyPost && styles.activeTab]}
          onPress={() => setIsMyPost(false)} // Switch to "Posts"
        >
          <Text style={[styles.tabText, !isMyPost && styles.activeTabText]}>
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, isMyPost && styles.activeTab]}
          onPress={() => setIsMyPost(true)} // Switch to "My Posts"
        >
          <Text style={[styles.tabText, isMyPost && styles.activeTabText]}>
            My Posts
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filters Section */}
      <View style={styles.filtersContainer}>
        <TextInput
          style={styles.input}
          placeholder="Select by category"
          onChangeText={setSearchText}
          value={searchText}
        />
        <TextInput
          style={styles.input}
          placeholder="Filter"
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>

      {/* Search Input */}
      <View>
        <TextInput
          style={styles.input}
          placeholder="Search Post"
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>

      {/* Post List */}
      <FlatList
        data={isMyPost ? myPostsData : othersPostsData} // Show "My Posts" or all "Posts" based on the tab
        keyExtractor={item => item.id.toString()}
        renderItem={renderPostItem}
      />

      {/* Add Post Button for "My Posts" */}
      {/* {isMyPost && ( */}
      <View style={styles.addButtonContainerRight}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddPostScreen')} // Navigate to add post screen
        >
          <FontAwesome name="plus" size={20} color="#FFFFFF" />
          {/* <Text style={styles.addButtonText}>Add Post</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  tabButton: {
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    marginHorizontal: 10,
  },
  activeTab: {
    backgroundColor: '#007BFF',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTabText: {
    color: '#fff',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  postContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postAuthor: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  postDate: {
    fontSize: 12,
    color: '#888',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  postDescription: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 10,
    // height: 30,
  },
  viewButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
  },
  viewButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButtonContainerRight: {
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    padding: 10,
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  addButton: {
    backgroundColor: '#007BFF',
    // padding: 10,
    borderRadius: 15,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    // fontWeight: 'bold',
  },
});
