import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../config';

const AddNewBlog = ({navigation}) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogImage, setBlogImage] = useState(null);
  const [textAreaHeight, setTextAreaHeight] = useState(0);

  const selectBlogImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      quality: 1,
      selectionLimit: 1,
      maxWidth: 800,
      maxHeight: 800,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets) {
        setBlogImage(response.assets[0]);
      }
    });
  };

  const validateForm = () => {
    if (!blogTitle || !blogContent || !blogImage) {
      Alert.alert('Error', 'Please fill all the fields and upload an image.');
      return false;
    }
    return true;
  };

  const handleAddBlog = async () => {
    if (validateForm()) {
      try {
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const userToken = await AsyncStorage.getItem('userToken');
        const userPhoneNumber = await AsyncStorage.getItem('userPhoneNumber');
        const userName = await AsyncStorage.getItem('userName');
        const formData = new FormData();

        formData.append('title', blogTitle);
        formData.append('author', userName);
        formData.append('authorId', userPhoneNumber);
        formData.append('date', date);
        formData.append('content', blogContent);
        formData.append('file', {
          uri: blogImage.uri,
          name: blogImage.fileName, 
          type: blogImage.type 
        });
        const response = await axios.post(
          `${BASE_URL}/expert/blog`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              'Content-Type': 'multipart/form-data', 
            },
          },
        );
        if (response.status === 201) {
          Alert.alert('Success', response.data.message);

          setBlogTitle('');
          setBlogContent('');
          setBlogImage(null);
        }
      } catch (error) {
        if (error.response) {
          Alert.alert('Failed to Add', error.response.data.message);
        } else if (error.request) {
          Alert.alert(
            'Failed to Add',
            'Network error. Please try again later.',
          );
        } else {
          Alert.alert('Failed to Add', 'An unexpected error occurred.');
        }
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView contentContainerStyle={styles.content}>
        <View style={styles.content}>
          <Text style={styles.titleText}>Post Your Blog</Text>
          <Text style={styles.subtitleText}>
            Fill and submit the form to post your blog.
          </Text>

          <View style={styles.imageSection}>
            <Text style={styles.label}>Blog Image</Text>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={selectBlogImage}>
              <Text style={styles.uploadButtonText}>
                {blogImage ? 'Image Selected' : 'Upload Image'}
              </Text>
            </TouchableOpacity>
            {blogImage && (
              <Image
                source={{uri: blogImage.uri}}
                style={styles.imagePreview}
                resizeMode="contain"
              />
            )}
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Blog Title</Text>
            <TextInput
              value={blogTitle}
              onChangeText={setBlogTitle}
              style={styles.input}
              placeholder="Enter blog title"
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Content</Text>
            <TextInput
              value={blogContent}
              onChangeText={setBlogContent}
              multiline
              // numberOfLines={6}
              style={[styles.textArea, {height: textAreaHeight}]}
              placeholder="Write your blog content here"
              onContentSizeChange={event =>
                setTextAreaHeight(event.nativeEvent.contentSize.height)
              }
            />
          </View>

          <TouchableOpacity onPress={handleAddBlog} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Add Blog</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  iconcontent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitleText: {
    marginTop: 5,
    fontSize: 16,
    color: 'black',
  },
  imageSection: {
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  uploadButton: {
    backgroundColor: '#E2E2E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#000',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    aspectRatio: 1.5,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  inputSection: {
    marginTop: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#d1d5db',
    height: 40,
  },
  textArea: {
    // padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#d1d5db',
  },
  submitButton: {
    width:'100%' ,
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddNewBlog;
