import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashBoard = ({navigation, route}) => {
  const logout = async () => {
    await AsyncStorage.clear();
    navigation.replace('LoginScreen');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Image
          style={styles.logoutIcon}
          source={require('../assets/signout.png')}
        />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.header}>Hello Consultant!</Text>
          <Text style={styles.subHeader}>Welcome to Advisa.</Text>
        </View>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate('Notification')}>
          <Image
            style={styles.buttonBell}
            source={require('../assets/bell.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProblemPosts')}>
          <Text style={styles.buttonText}>Patient </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Appointments')}>
          <Text style={styles.buttonText}>Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddNewBlog')}>
          <Text style={styles.buttonText}>Blogs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MyLocations')}>
          <Text style={styles.buttonText}>My Schedule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginTop: 10,
  },
  header: {
    fontSize: 30,
    color: '#555',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  buttonContainer: {
    paddingVertical: 20,
    flex: 1,
    flexDirection: 'row',

    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#4e7df2',
    paddingVertical: 70,
    borderRadius: 10,
    marginVertical: 10,
    width: '48%',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 23,
  },
  button1: {
    paddingVertical: 10,
    width: '15%',
    alignItems: 'center',
  },
  buttonBell: {
    width: 30,
    height: 30,
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
  logoutButton: {
    margin: 0,
    padding: 0,
    marginTop: 20,
    alignItems: 'flex-end',
  },
  logoutIcon: {
    width: 30,
    height: 30,
    marginTop: 0,
  },
});

export default DashBoard;
