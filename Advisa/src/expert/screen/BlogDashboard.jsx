import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {BASE_URL} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BlogDashboard = ({navigation}) => {
  
  const [search, setSearch] = useState('');
  const [isMyBlog, setIsMyBlog] = useState(false);
  const [othersBlogsData, setOthersBlogsData] = useState([]);
  const [myBlogsData, setMyBlogsData] = useState([]);
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  useFocusEffect(
    useCallback(() => {
      const fetchBlogs = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const userPhoneNumber = await AsyncStorage.getItem('userPhoneNumber');

        try {
          const response = await axios.get(`${BASE_URL}/expert/getBlogs`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }); // Adjust the URL
          const blogs = response.data.data;
          setUserPhoneNumber(userPhoneNumber);
          setMyBlogsData(
            blogs.filter(item => item.authorId === userPhoneNumber),
          );
          setOthersBlogsData(
            blogs.filter(item => item.authorId !== userPhoneNumber),
          );
        } catch (error) {
          if (error.response) {
            Alert.alert('Failed to load Blogs', error.response.data.message);
          } else if (error.request) {
            Alert.alert(
              'Failed to load Blogs',
              'Network error. Please try again later.',
            );
          } else {
            Alert.alert(
              'Failed to load blogs',
              'An unexpected error occurred.',
            );
          }
        }
      };

      fetchBlogs();

      return () => {
        setMyBlogsData([]);
        setOthersBlogsData([]);
      };
    }, []),
  );
  const formatDate = (dateString) => {
    const date = new Date(dateString.replace(/\./g, ":"));
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };
  
  const renderBlogItem = ({item}) => (
    <View style={styles.blogCard}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('BlogViewScreen', {
            blog: item,
            authorId: userPhoneNumber,
          });
        }}>
        <Image
          source={{
            uri: `${BASE_URL}/uploads/${item.blogImage.replace(/%C2%A0/g, '')}`,
          }}
          style={styles.blogblogImage}
        />
      </TouchableOpacity>
      <Text style={styles.blogTitle}>{item.title}</Text>
      <View style={styles.blogInfoContainer}>
        <Text>
          By: <Text style={styles.blogAuthor}>{item.author}</Text>
        </Text>
        <Text style={styles.blogDate}>{formatDate(item.date)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, !isMyBlog && styles.activeTab]}
          onPress={() => setIsMyBlog(false)}
        >
          <Text style={[styles.tabText, !isMyBlog && styles.activeTabText]}>
            Blogs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, isMyBlog && styles.activeTab]}
          onPress={() => setIsMyBlog(true)}
        >
          <Text style={[styles.tabText, isMyBlog && styles.activeTabText]}>
            My Blogs
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchFilterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Blog"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity>
        <FontAwesome name="search" size={20} color="#000000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={isMyBlog ? myBlogsData : othersBlogsData}
        renderItem={renderBlogItem}
        keyExtractor={item => item.id}
      />

      <View style={styles.addButtonContainerRight}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddNewBlog')} // Navigate to add Blog screen
        >
          <FontAwesome name="plus" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  topButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  topButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  topButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom:10
  },
  searchInput: {
    flex: 1,
  },
  iconblogImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  blogblogImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginTop: 20,
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  blogInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blogAuthor: {
    color: '#555',
    textDecorationLine: 'underline',
  },
  blogDate: {
    color: '#999',
  },
  reportButton: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
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
    borderRadius: 15,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
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
});

export default BlogDashboard;
