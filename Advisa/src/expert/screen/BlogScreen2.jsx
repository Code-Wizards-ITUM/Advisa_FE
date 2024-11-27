import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const BlogScreen2 = ({navigation}) => {
  const {blogId} = route.params;

  const blogs = [
    {
      id: '1',
      title: 'This is blog Title for sample blog',
      author: 'Mason Eduard',
      date: 'Jan 3, 2022',
      image: require('../../src/screen/blogimg.jpg'), // Placeholder for blog image
      content:
        'Lorem ipsum odor amet, consectetuer adipiscing elit. Cubilla penatibus egestas quisque consequat curae nisi maecenas posuere. Ultrices maximus odio semper potenti maximus viverra. Elementum feugiat lacus scelerisque fringilla sociosqu aliquet sociosqu porttitor urna. Nascetur suscipit ullamcorper euismod auctor malesuada justo ridiculus mi conubia. Et mollis consectetur inceptos nullam nunc quis maximus. Lacinia hendrerit aptent litora tempor egestas sagittis laoreet dolor?\n\nBlandit facilisis suspendisse laoreet pulvinar non natoque molestie. Mus vel nulla tortor etiam platea. Ullamcorper ante eu erat interdum litora vehicula. Netus euismod hendrerit potenti congue mollis interdum mi sodales. Cursus vulputate amet, eros rutrum arcu fusce sapien vitae. Taciti platea suscipit mi nam elementum.\n\nPhasellus cursus curabitur euismod venenatis amet, viverra suspendisse condimentum tincidunt. Urna metus mus congue suscipit dictum vulputate ultricies orci. Rhoncus sapien elementum magna augue lorem gravida eu. Nec convallis pellentesque sapien suspendisse tempor. Ex cursus mauris mollis molestie urna tempor mi enim. Eros arcu laoreet justo sollicitudin pulvinar interdum. Vulputate id vulputate purus non metus lacus vel a suspendisse, Fames pharetra turpis ipsum sem parturient tempor tincidunt purus. Libero justo interdum lacinia sollicitudin nec velit. Enim lobortis mattis, proin pretium arcu phasellus diam?',
    },
    // Add more blog entries if needed
  ];

  // Find the blog based on the blogId
  const selectedBlog = blogs.find(blog => blog.id === blogId);

  console.log('Received blogId:', blogId);

  // Render a single blog
  const renderBlog = blog => (
    <View style={styles.blogContainer}>
      <Image source={{uri: blog.image}} style={styles.blogImage} />
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
      {/*<View style={styles.header}>
        <TouchableOpacity>
          <Image 
            source={require('../../src/screen/arrowb.png')} // Replace with your image path
            style={styles.arrowImage} 
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Blog Details</Text>
      </View>*/}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {selectedBlog ? renderBlog(selectedBlog) : <Text>Blog not found</Text>}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../../src/screen/home.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../../src/screen/blog.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Blog</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../../src/screen/queries.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Queries</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../../src/screen/chat.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../../src/screen/account.png')}
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
  },
  header: {
    backgroundColor: '#3b82f6', // Blue background
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 60, // Space for the bottom nav
  },
  blogContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  blogImage: {
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
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
  blogContent: {
    marginTop: 10,
    textAlign: 'justify',
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
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

export default BlogScreen2;
