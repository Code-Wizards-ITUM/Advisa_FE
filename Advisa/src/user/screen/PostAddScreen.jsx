import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../config';

const AddPostScreen = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
  });
  const [switchValue, setSwitchValue] = useState('no');

  const handleInputChange = async (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  const toggleSwitch = () =>
    setSwitchValue(prevValue => (prevValue === 'no' ? 'yes' : 'no'));

  const addPost = async () => {
    if (
      formData.title == '' ||
      formData.category == '' ||
      formData.description == ''
    ) {
      Alert.alert('Empty Fields.', 'Fill all the details related to post.');
    } else {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const userPhoneNumber = await AsyncStorage.getItem('userPhoneNumber');
        const userName = await AsyncStorage.getItem('userName');
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const response = await axios.post(
          `${BASE_URL}/user/addPost`,
          {
            title: formData.title,
            date: date,
            description: formData.description,
            userId: userPhoneNumber,
            userName: userName,
            category: formData.category,
            anonymity: switchValue,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        );
        if (response.status === 201) {
          Alert.alert('Success', response.data.message);

          setFormData({
            category: '',
            title: '',
            description: '',
          });
          setSwitchValue('no');
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
      {/* Form Content */}
      <View style={styles.body}>
        <Text style={styles.title}>Post Your Problem</Text>
        <Text style={styles.subTitle}>
          Fill and submit form to post your problem
        </Text>

        {/* Form Inputs */}
        <View>
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Anonymous Post (select if yes)</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={switchValue === 'yes' ? '#007BFF' : '#f4f3f4'}
              onValueChange={toggleSwitch}
              value={switchValue === 'yes'}
            />
          </View>
          <Text style={styles.label}>Category</Text>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={formData.category}
              onValueChange={value => handleInputChange('category', value)}
              style={styles.picker}>
              <Picker.Item label=" Select Category" value="" />
              <Picker.Item label="Mental Health" value="mental" />
              <Picker.Item label="Legal" value="legal" />
              <Picker.Item label="Beauty" value="beauty" />
              <Picker.Item label="Nutrition" value="nutrition" />
            </Picker>
          </View>

          <Text style={styles.label}>Problem Title</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Problem Title"
              value={formData.title}
              onChangeText={value => handleInputChange('title', value)}
            />
          </View>

          <Text style={styles.label}>Problem Description</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Problem Description"
              value={formData.description}
              multiline
              numberOfLines={4}
              onChangeText={value => handleInputChange('description', value)}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={addPost}>
          <Text style={styles.addButtonText}>Add Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  inputContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  textInput: {
    color: 'black',
    flex: 1,
    paddingHorizontal: 15,
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
