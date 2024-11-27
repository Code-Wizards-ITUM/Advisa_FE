import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  blogImage,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

const BlogS2 = ({navigation, route}) => {
  const {blogId} = route.params;

  const blogs = [
    {
      id: '1',
      title: 'This is blog Title for sample blog',
      author: 'Mason Eduard',
      date: 'Jan 3, 2022',
      blogImage: require('../assets/blogimg.jpg'), // Placeholder for blog blogImage
      content:
        'Lorem ipsum odor amet, consectetuer adipiscing elit. Cubilla penatibus egestas quisque consequat curae nisi maecenas posuere. Ultrices maximus odio semper potenti maximus viverra. Elementum feugiat lacus scelerisque fringilla sociosqu aliquet sociosqu porttitor urna. Nascetur suscipit ullamcorper euismod auctor malesuada justo ridiculus mi conubia. Et mollis consectetur inceptos nullam nunc quis maximus. Lacinia hendrerit aptent litora tempor egestas sagittis laoreet dolor?\n\nBlandit facilisis suspendisse laoreet pulvinar non natoque molestie. Mus vel nulla tortor etiam platea. Ullamcorper ante eu erat interdum litora vehicula. Netus euismod hendrerit potenti congue mollis interdum mi sodales. Cursus vulputate amet, eros rutrum arcu fusce sapien vitae. Taciti platea suscipit mi nam elementum.\n\nPhasellus cursus curabitur euismod venenatis amet, viverra suspendisse condimentum tincidunt. Urna metus mus congue suscipit dictum vulputate ultricies orci. Rhoncus sapien elementum magna augue lorem gravida eu. Nec convallis pellentesque sapien suspendisse tempor. Ex cursus mauris mollis molestie urna tempor mi enim. Eros arcu laoreet justo sollicitudin pulvinar interdum. Vulputate id vulputate purus non metus lacus vel a suspendisse, Fames pharetra turpis ipsum sem parturient tempor tincidunt purus. Libero justo interdum lacinia sollicitudin nec velit. Enim lobortis mattis, proin pretium arcu phasellus diam?',
    },
    // Add more blog entries if needed
  ];

  // Find the blog based on the blogId
  const selectedBlog = blogs.find(blog => blog.id === blogId);

  console.log('Received blogId:', blogId);

  // Function to handle delete action
  const handleDelete = () => {
    Alert.alert('Delete Blog', 'Are you sure you want to delete this blog?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => console.log('Blog Deleted')},
    ]);
  };

  // Function to handle edit action
  const handleEdit = () => {
    navigation.navigate('EditBlog', {blogId}); // Navigate to an edit screen (if implemented)
  };

  // Render a single blog
  const renderBlog = blog => (
    <View style={styles.blogContainer}>
      <blogImage source={blog.blogImage} style={styles.blogblogImage} />
      <Text style={styles.blogTitle}>{blog.title}</Text>
      <View style={styles.blogInfoContainer}>
        <Text>
          By: <Text style={styles.blogAuthor}>{blog.author}</Text>
        </Text>
        <Text style={styles.blogDate}>{blog.date}</Text>
      </View>
      <Text style={styles.blogContent}>{blog.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {selectedBlog ? renderBlog(selectedBlog) : <Text>Blog not found</Text>}

        {/* Edit and Delete Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('DashBoard')}>
          <blogImage
            source={require('../assets/home.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('BlogS1')}>
          <blogImage
            source={require('../assets/blog.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Blog</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('ProblemPosts')}>
          <blogImage
            source={require('../assets/queries.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Queries</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Chat')}>
          <blogImage
            source={require('../assets/chat.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('ExpertAccount')}>
          <blogImage
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
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  blogContainer: {
    padding: 20,
  },
  blogblogImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  blogTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  blogInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  blogAuthor: {
    fontWeight: 'bold',
  },
  blogDate: {
    color: '#777',
  },
  blogContent: {
    lineHeight: 20,
    textAlign: 'justify',
  },
  // Styles for the buttons
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF4C4C',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Bottom navigation styles
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
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

export default BlogS2;
