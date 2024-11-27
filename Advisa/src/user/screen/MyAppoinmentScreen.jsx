import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';

const MyAppointments = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState('upcoming');

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    { id: '1', doctorName: 'Dr. John Doe', date: '30/09/2024', time: '3:00 PM', refNo: '123456' },
    { id: '2', doctorName: 'Dr. Jane Doe', date: '01/10/2024', time: '9:00 AM', refNo: '789012' },
  ]);

  const pastAppointments = [
    { id: '3', doctorName: 'Dr. John Doe', date: '28/09/2024', time: '11:00 AM', refNo: '345678' },
  ];

 
  useEffect(() => {
    if (route.params?.newAppointment) {
      const newAppointment = route.params.newAppointment;
      setUpcomingAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
    }
  }, [route.params?.newAppointment]);

  const renderAppointment = ({ item }) => (
    <View style={styles.appointmentCard}>
      <Text style={styles.refNo}>Ref No.: {item.refNo}</Text>
      <Text style={styles.doctorName}>{item.doctorName}</Text>
      <Text style={styles.details}>{item.date} - {item.time}</Text>
      <View style={styles.buttonRow}>
        {activeTab === 'upcoming' ? (
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.reviewButton} onPress={() => navigation.navigate('ReviewScreen', { doctorName: item.doctorName })}>
            <Text style={styles.buttonText}>Write a Review</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('AppoinmentDetails', { 
            doctorName: item.doctorName, 
            date: item.date, 
            time: item.time, 
            refNo: item.refNo 
          })}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Appointments</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={styles.tabText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={styles.tabText}>Past</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'upcoming' ? upcomingAppointments : pastAppointments}
        renderItem={renderAppointment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#007BFF',
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  appointmentCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  refNo: {
    color: '#888',
    marginBottom: 5,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#F87171',
    padding: 10,
    borderRadius: 5,
  },
  reviewButton: {
    backgroundColor: '#34D399',
    padding: 10,
    borderRadius: 5,
  },
  detailsButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default MyAppointments;
