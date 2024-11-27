import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../../config';

const UserSignupScreen = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    userName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName) newErrors.userName = 'User Name is required';
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Valid 10-digit Phone Number is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid Email is required';
    if (!formData.password || formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters long';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      sendSignupRequest(
        formData.phoneNumber,
        formData.userName,
        formData.email,
        formData.password,
      );
      // Navigate to PaymentScreen and pass the form data
    } else {
      Alert.alert(
        'Form Validation Failed',
        'Please check the errors and try again.',
      );
    }
  };

  const sendSignupRequest = async (phoneNumber, userName, email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup/user`, {
        phoneNumber: phoneNumber,
        userName: userName,
        email: email,
        password: password,
      });
      const {message, data} = response.data;
      if (response.status === 201) {
        setFormData({userName: '', phoneNumber: '', email: '', password: ''});
        Alert.alert(message, 'User registered successfully!');
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert('Error', 'Failed to register');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to register');
      console.error(error);
    }
  };

  return (
    // <ImageBackground source={require('../assets/bg2.jpg')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <View style={styles.signContainer}>
        <Text style={styles.signText}>User Register</Text>
        <Text style={styles.infoText}>
          Enter your details to register as a user
        </Text>
      </View>

      <Text style={styles.details}> Full Name </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="User Name"
          value={formData.userName}
          onChangeText={value => handleInputChange('userName', value)}
        />
        {errors.userName && (
          <Text style={styles.errorText}>{errors.userName}</Text>
        )}
      </View>

      <Text style={styles.details}> Email </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={value => handleInputChange('email', value)}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <Text style={styles.details}> Mobile Number </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Phone Number"
          keyboardType="numeric"
          value={formData.phoneNumber}
          onChangeText={value => handleInputChange('phoneNumber', value)}
        />
        {errors.phoneNumber && (
          <Text style={styles.errorText}>{errors.phoneNumber}</Text>
        )}
      </View>

      <Text style={styles.details}> Password </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={value => handleInputChange('password', value)}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>

      <Text style={styles.details}> Confirm Password </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={value => handleInputChange('password', value)}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handleSubmit}>
        <Text style={styles.payButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
    // </ImageBackground>
  );
};

export default UserSignupScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    marginTop: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  signContainer: {
    marginBottom: 20,
  },
  signText: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#082567',
  },
  infoText: {
    color: 'black',
  },
  details: {
    color: 'black',
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: 15,
    marginBottom: 5,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 5,
  },
  textInput: {
    fontSize: 16,
    color: '#333',
  },
  payButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
