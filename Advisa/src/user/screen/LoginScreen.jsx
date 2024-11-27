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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../config';
import {Buffer} from 'buffer';

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
  });
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  const navigation = useNavigation();

  const navigateUserRegister = () => {
    navigation.navigate('UserSignupScreen');
  };

  const navigateExpertRegister = () => {
    navigation.navigate('ExpertRegisterScreen');
  };
  const handleLogin = async () => {
    if (formData.phoneNumber == '' || formData.password == '') {
      Alert.alert(
        'Empty Fields.',
        'Enter your mobile number and password to login.',
      );
    } else {
      try {
        const response = await axios.post(`${BASE_URL}/login`, {
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        });
        const {token} = response.data;
        if (response.status === 200) {
          const parts = token
            .split('.')
            .map(part =>
              Buffer.from(
                part.replace(/-/g, '+').replace(/_/g, '/'),
                'base64',
              ).toString(),
            );
          const payload = JSON.parse(parts[1]);
          await AsyncStorage.setItem('userType', payload.userType);
          await AsyncStorage.setItem('userPhoneNumber', payload.phoneNumber);
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('userName', payload.name);
          await AsyncStorage.setItem('userEmail', payload.email);

          if (payload.userType === 'USER') {
            Alert.alert('Success', 'Login Success!');
            navigation.replace('UserDashboard');
          } else if (payload.userType === 'EXPERT') {
            Alert.alert('Success', 'Login Success!');
            navigation.replace('ExpertDashboard');
          }
        }
      } catch (error) {
        if (error.response) {
          Alert.alert('Failed to login', error.response.data.message);
        } else if (error.request) {
          Alert.alert(
            'Failed to login',
            'Network error. Please try again later.',
          );
        } else {
          Alert.alert('Failed to login', 'An unexpected error occurred.');
        }
      }
    }
  };
  return (
    <ImageBackground
      source={require('../assets/bg2.jpg')}
      style={styles.container}>
      <View>
        <Text style={styles.logInText}>Login</Text>
        <Text style={styles.infoText}>Please enter details to login.</Text>

        <Text style={styles.email}>Mobile number</Text>
        <View style={styles.inputContainer}>
          <FontAwesome
            name={'user'}
            size={20}
            color={'#9A9A9A'}
            style={styles.InputIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter mobile number"
            onChangeText={value => handleInputChange('phoneNumber', value)}
            value={formData.phoneNumber}
          />
        </View>
        <Text style={styles.email}> Password</Text>
        <View style={styles.inputContainer}>
          <FontAwesome
            name={'lock'}
            size={20}
            color={'#9A9A9A'}
            style={styles.InputIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter password"
            secureTextEntry={!showPassword}
            onChangeText={value => handleInputChange('password', value)}
            value={formData.password}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome
              name={showPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="#9A9A9A"
              Style={styles.InputIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.forgetPassword}>Forget password</Text>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <Text style={styles.doNotText}>Don't have an account? </Text>
        <TouchableOpacity onPress={navigateUserRegister}>
          <Text style={styles.register}> Register as User </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateExpertRegister}>
          <Text style={styles.register}> Register as Consultant </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  helloImage: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  logInText: {
    fontSize: 30,
    color: '#262626',
    marginBottom: 5,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#262626',
    marginBottom: 30,
  },
  radioGroup: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  radioButtonsContainer: {
    flexDirection: 'column',
    alignItems: '',
  },

  email: {
    fontSize: 15,
    color: '#262626',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  InputIcon: {
    marginLeft: 5,
  },
  textInput: {
    color: 'black',
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  forgetPassword: {
    color: '#8E8E8E',
    textAlign: 'right',
  },
  logInButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 60,
    elevation: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  doNotText: {
    color: '#262626',
    textAlign: 'center',
  },
  register: {
    color: 'blue',
    textAlign: 'center',
  },
});
