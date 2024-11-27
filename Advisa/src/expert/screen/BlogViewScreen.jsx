import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {BASE_URL} from '../../config';

const BlogViewScreen = ({navigation, route}) => {
  const {blog, authorId} = route.params;

  const renderBlog = blog => (
    <View style={styles.blogContainer}>
      <Image
        source={{
          uri: `${BASE_URL}/uploads/${blog.blogImage.replace(/%C2%A0/g, '')}`,
        }}
        style={styles.blogblogImage}
      />
      <Text style={styles.blogTitle}>{blog.title}</Text>
      <View style={styles.blogInfoContainer}>
        <Text>
          By: <Text style={styles.blogAuthor}>{blog.author}</Text>
        </Text>
        <Text style={styles.blogDate}>{formatDate(blog.date)}</Text>
      </View>
      <Text style={styles.blogContent}>{blog.content}</Text>
    </View>
  );
  const deleteBlog = blogId => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this blog?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Delete Cancelled'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => Alert.alert("Deleted!","Deleted Successfully"),
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString.replace(/\./g, ":"));
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderBlog(blog)}
        <View style={styles.reportButtonContainer}>
          {blog.authorId !== authorId && (
            <TouchableOpacity
              style={styles.reportButton}
              onPress={() => Alert.alert('Reported', `${blog.id} `)}>
              <Text style={styles.reportButtonText}>Report This Blog</Text>
            </TouchableOpacity>
          )}
          {blog.authorId === authorId && (
            <>
              <TouchableOpacity
                style={[styles.reportButton, {backgroundColor: '#36d709'}]}
                onPress={() =>
                  navigation.replace('EditBlog', {
                    blog: blog,
                  })
                }>
                <Text style={styles.reportButtonText}>Update Blog</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.reportButton}
                onPress={() => deleteBlog(blog.id)}>
                <Text style={styles.reportButtonText}>Delete Blog</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  reportButtonContainer: {
    marginHorizontal: 20,
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  reportButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#fc2f00',
    alignItems: 'center',
  },
  reportButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
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
});

export default BlogViewScreen;
