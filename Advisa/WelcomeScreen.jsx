import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from './src/config';

const WelcomeScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      checkLogin();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const checkLogin = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const userType = await AsyncStorage.getItem('userType');
      if (userToken) {
        const response = await axios.get(`${BASE_URL}/login/verify-token`, {
          headers: {Authorization: `Bearer ${userToken}`},
        });
        if (response.status === 200) {
          if (userType === 'USER') {
            navigation.replace('UserDashboard');
          } else if (userType === 'EXPERT') {
            navigation.replace('ExpertDashboard');
          }
        } else {
          await AsyncStorage.clear();
          navigation.replace('LoginScreen');
          Alert.alert(
            'Session expired',
            'Your login session expired. Please login again',
          );
        }
      } else {
        navigation.replace('LoginScreen');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await AsyncStorage.clear();
        navigation.replace('LoginScreen');
        Alert.alert(
          'Session expired',
          'Your login session expired. Please login again',
        );
      } else {
        console.error('An error occurred during token verification:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <View style={styles.logoContainer}>
        <Image
          source={require('./src/expert/assets/logo2.png')}
          style={styles.logo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#254edb',
  },
  logoText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logoContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default WelcomeScreen;
