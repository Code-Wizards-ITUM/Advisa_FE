import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {BASE_URL} from '../../config';
const BlogDetailScreen = ({route}) => {
  const {blog} = route.params; // Get blog data from navigation params
  const formatDate = (dateString) => {
    const date = new Date(dateString.replace(/\./g, ":"));
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: `${BASE_URL}/uploads/${blog.blogImage.replace(/%C2%A0/g, '')}`,
        }} // Adjust the path
        style={styles.image}
      />
      <Text style={styles.title}>{blog.title}</Text>
      <Text style={styles.author}>By: {blog.author}</Text>
      <Text style={styles.date}>{formatDate(blog.date)}</Text>
      <Text style={styles.content}>{blog.content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    marginBottom: 4,
    color: '#888',
  },
  date: {
    fontSize: 14,
    marginBottom: 16,
    color: '#888',
  },
  content: {
    fontSize: 16,
    color: '#333',
  },
});

export default BlogDetailScreen;
