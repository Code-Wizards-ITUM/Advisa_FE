import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const MyBlogs = ({navigation, route}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const blogs = [
    {
      id: '1',
      title: 'This is a sample blog title 00',
      author: 'Mason Eduard',
      date: 'Jan 3, 2022',
      image: require('../assets/blogimg.jpg'), // Ensure this path is correct
    },
  ];

  // Filter blogs based on search and filter states
  const filteredBlogs = blogs.filter(
    blog =>
      blog.title.toLowerCase().includes(search.toLowerCase()) &&
      blog.title.toLowerCase().includes(filter.toLowerCase()),
  );

  const renderBlogItem = ({item}) => (
    <View style={styles.blogCard}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('BlogS2', {blogId: item.id});
        }}>
        <Image source={item.image} style={styles.blogImage} />
      </TouchableOpacity>
      <Text style={styles.blogTitle}>{item.title}</Text>
      <View style={styles.blogInfoContainer}>
        <Text>
          By: <Text style={styles.blogAuthor}>{item.author}</Text>
        </Text>
        <Text style={styles.blogDate}>{item.date}</Text>
      </View>
    </View>
  );

  // Get the current route name to determine which button should be highlighted
  const currentRoute = route.name;

  return (
    <View style={styles.container}>
      {/* Two Buttons at the Top */}
      <View style={styles.topButtonContainer}>
        <TouchableOpacity
          style={[
            styles.topButton,
            currentRoute === 'BlogS1'
              ? styles.activeButton
              : styles.inactiveButton, // Change to activeButton if it matches the route
          ]}
          onPress={() => navigation.navigate('BlogS1')}>
          <Text
            style={[
              styles.topButtonText,
              currentRoute === 'BlogS1'
                ? styles.activeButtonText
                : styles.inactiveButtonText,
            ]}>
            All Blogs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.topButton,
            currentRoute === 'MyBlogs' ? styles.activeButton : {},
          ]}
          onPress={() => navigation.navigate('MyBlogs')}>
          <Text
            style={[
              styles.topButtonText,
              currentRoute === 'MyBlogs' ? styles.activeButtonText : {},
            ]}>
            My Blogs
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filter Section */}
      <View style={styles.searchFilterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Post"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity>
          <Image
            source={require('../assets/search.png')} // Replace with your search image path
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>

      {/* Blog List */}
      <FlatList
        data={filteredBlogs}
        renderItem={renderBlogItem}
        keyExtractor={item => item.id}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => navigation.navigate('AddNewBlog')}>
        <Image source={require('../assets/plus.png')} style={styles.fabIcon} />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('DashBoard')}>
          <Image
            source={require('../assets/home.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('BlogS1')}>
          <Image
            source={require('../assets/blog.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Blog</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('ProblemPosts')}>
          <Image
            source={require('../assets/queries.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Queries</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Chat')}>
          <Image
            source={require('../assets/chat.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('ExpertAccount')}>
          <Image
            source={require('../assets/account.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Account</Text>
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
    fontSize: 16,
  },
  activeButton: {
    backgroundColor: '#3b82f6', // Color for "My Blogs"
  },
  activeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inactiveButton: {
    backgroundColor: '#888', // Set the background color to red for "All Blogs"
  },
  inactiveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 55,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  blogImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginTop: 40,
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
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
  fabButton: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    backgroundColor: '#3b82f6',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  fabIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
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

export default MyBlogs;
