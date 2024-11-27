// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
// import {useCallback} from 'react';
// import {BASE_URL} from '../../config';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const BlogsScreen = () => {
//   const [searchText, setSearchText] = useState('');
//   const [selectedBlog, setSelectedBlog] = useState(null); // To store the selected blog for detail view
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch blogs when the screen is focused
//   useFocusEffect(
//     useCallback(() => {
//       const fetchBlogs = async () => {
//         setLoading(true); // Start loading
//         const userToken = await AsyncStorage.getItem('userToken');
//         try {
//           const response = await axios.get(`${BASE_URL}/user/getBlogs`, {
//             headers: {
//               Authorization: `Bearer ${userToken}`,
//             }, //
//           }); // Adjust the URL
//           setBlogs(response.data.data); // Assuming the response structure
//           console.log(blogs);
//         } catch (error) {
//           console.error('Error fetching blogs:', error);
//         } finally {
//           setLoading(false); // Stop loading after fetching data
//         }
//       };

//       fetchBlogs();

//       // Optional: cleanup or cancel request if needed when the screen is blurred
//       return () => {
//         setBlogs([]); // Optionally reset the blogs when leaving the screen
//       };
//     }, []), // Empty dependency array means this will run only when the screen is focused
//   );

//   // Function to render the blog list view (UI 1)
//   const renderBlogList = () => (
//     <ScrollView style={styles.container}>
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.textInput}
//           placeholder="Search Blogs"
//           value={searchText}
//           onChangeText={text => setSearchText(text)}
//         />
//         {/*<TouchableOpacity style={styles.clearButton}>
//           <Text>Clear filter</Text>
//         </TouchableOpacity>*/}
//       </View>

//       {/* Blog List */}
//       {blogs.map(post => (

//         <TouchableOpacity
//           key={post.id}
//           style={styles.blogContainer}
//           onPress={() => setSelectedBlog(post)} // Set selected blog on image click
//         >
//           <Image
//             source={{
//               uri: `${BASE_URL}/uploads/${post.blogImage} `,
//             }}
//             style={styles.blogImage}
//           />
//           <Text style={styles.blogTitle}>{post.title}</Text>
//           <Text style={styles.blogAuthor}>By: {post.author}</Text>
//           <Text style={styles.blogDate}>{post.date}</Text>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );

//   // Function to render the blog detail view (UI 2)
//   const renderBlogDetail = () => (
//     <ScrollView style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => setSelectedBlog(null)}>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Blog Details</Text>
//       </View>

//       {/* Blog Details */}
//       <Image
//         source={{
//           uri: `${BASE_URL}/uploads/${selectedBlog.blogImage} `,
//         }}
//         style={styles.blogImageDetail}
//       />
//       <Text style={styles.blogTitleDetail}>{selectedBlog.title}</Text>
//       <Text style={styles.blogAuthorDetail}>By: {selectedBlog.author}</Text>
//       <Text style={styles.blogDateDetail}>{selectedBlog.date}</Text>
//       <Text style={styles.blogContentDetail}>{selectedBlog.content}</Text>
//     </ScrollView>
//   );

//   return selectedBlog ? renderBlogDetail() : renderBlogList(); // Conditional rendering
// };

// export default BlogsScreen;

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },

//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     elevation: 2,
//     marginBottom: 20,
//     marginTop: 10,
//   },
//   textInput: {
//     flex: 1,
//     padding: 10,
//     fontSize: 16,
//   },
//   clearButton: {
//     padding: 10,
//   },
//   blogContainer: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   blogImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   blogTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   blogAuthor: {
//     fontSize: 14,
//     color: '#555',
//   },
//   blogDate: {
//     fontSize: 12,
//     color: '#888',
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 20,
//     backgroundColor: '#fff',
//     elevation: 10,
//     borderRadius: 30,
//   },
//   blogImageDetail: {
//     width: '100%',
//     height: 250,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   blogTitleDetail: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   blogAuthorDetail: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 5,
//   },
//   blogDateDetail: {
//     fontSize: 14,
//     color: '#888',
//     marginBottom: 20,
//   },
//   blogContentDetail: {
//     fontSize: 16,
//     lineHeight: 24,
//     color: '#555',
//     marginBottom: 30,
//   },
// });
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
import {useCallback} from 'react';
import {BASE_URL} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BlogsScreen = ({navigation}) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Fetch blogs when the screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchBlogs = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        setLoading(true); // Start loading
        try {
          const response = await axios.get(`${BASE_URL}/user/getBlogs`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }); // Adjust the URL
          setBlogs(response.data.data); // Assuming the response structure
        } catch (error) {
          console.error('Error fetching blogs:', error);
        } finally {
          setLoading(false); // Stop loading after fetching data
        }
      };

      fetchBlogs();

      return () => {
        setBlogs([]); // Optionally reset the blogs when leaving the screen
      };
    }, []),
  );
  const formatDate = (dateString) => {
    const date = new Date(dateString.replace(/\./g, ":"));
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };
  const renderBlog = ({item}) => (
    <TouchableOpacity
      style={styles.blogContainer}
      onPress={() => navigation.navigate('BlogDetailScreen', {blog: item})} // Navigate to BlogDetail with blog data
    >
      <Image
        source={{
          uri: `${BASE_URL}/uploads/${item.blogImage.replace(/%C2%A0/g, '')}`,
        }} // Adjust the path
        style={styles.image}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>By: {item.author}</Text>
      <Text style={styles.date}>{formatDate(item.date)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <FlatList
            data={blogs}
            renderItem={renderBlog}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  listContainer: {
    paddingBottom: 16,
  },
  blogContainer: {
    marginBottom: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    marginBottom: 4,
    color: '#888',
  },
  date: {
    fontSize: 12,
    marginBottom: 16,
    color: '#888',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
});

export default BlogsScreen;
