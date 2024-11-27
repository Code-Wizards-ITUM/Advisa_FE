import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashBoard = ({navigation}) => {
  const CustomButton = ({title, onPress}) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
  const logout = async () => {
    await AsyncStorage.clear();
    navigation.replace('LoginScreen');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <FontAwesome name={'sign-out'} size={40} color={'#000000'} />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Hello!</Text>
        <Text style={styles.subHeader}>Welcome to Advisa.</Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Consultant"
          onPress={() => navigation.navigate('Consulter')}
        />
        <CustomButton
          title="My Appointments"
          onPress={() => navigation.navigate('MyAppointments')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa', // Light background for a fresh look
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeader: {
    fontSize: 18,
    color: '#555',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4e7df2',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 15, // Rounded corners for a modern look
    marginVertical: 15,
    width: '80%', // Make the button take 80% of screen width
    alignItems: 'center',
    elevation: 5, // Add some shadow to give it depth
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  logoutButton: {
    margin: 0,
    padding: 0,
    marginTop: 20,
    alignItems: 'flex-end',
  },
});

export default DashBoard;
