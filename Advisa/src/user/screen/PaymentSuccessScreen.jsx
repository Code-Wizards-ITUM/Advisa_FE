import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const AppointmentSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    selectedDate,
    selectedTime,
    doctorname,
    category,
    profileImage,
    location,
  } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../expert/assets/logo2.png')} style={styles.logo} />
      </View>
      <View style={styles.container2}>
        <Text style={styles.successMessage}>
          You have successfully made an appointment
        </Text>
        <Text style={styles.confirmationMessage}>
          The appointment confirmation has been sent to your email.
        </Text>

        <View style={styles.profileContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <Text style={styles.doctorName}>{doctorname}</Text>
          <Text style={styles.doctorSpecialty}>{category}</Text>
        </View>

        <View style={styles.scheduleContainer}>
          <View style={styles.iconTextContainer}>
            <Image
              source={require('../assets/admin.png')}
              style={styles.icon}
            />
            <Text style={styles.scheduleText}>
              {selectedDate && selectedTime
                ? `${selectedDate}, ${selectedTime}`
                : 'No date and time selected'}
            </Text>
          </View>
          <Text style={styles.locationText}>{location}</Text>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backButtonText}>Back to home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppointmentSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  container2: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  successMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  confirmationMessage: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: 'black',
  },
  scheduleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  scheduleText: {
    fontSize: 16,
    color: 'black',
  },
  locationText: {
    fontSize: 14,
    color: 'black',
  },
  backButton: {
    backgroundColor: '#0056b3',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: 'white',
  },
});
