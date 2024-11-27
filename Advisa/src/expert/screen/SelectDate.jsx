import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Calendar} from 'react-native-calendars';

const SelectDate = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState('2021-09-19');

  const appointments = [
    {
      id: '1',
      name: 'H.D Ranasingha',
      phone: '0712456789',
      place: 'Asiri Hospital Maharagama',
      time: '10.00 A.M',
      date: '2021-09-19',
    },
    {
      id: '2',
      name: 'Mark Taylor',
      phone: '0712456783',
      place: 'Lanka Hospitals',
      time: '2.00 P.M',
      date: '2021-09-19',
    },
    {
      id: '3',
      name: 'Linda Johnson',
      phone: '0712456784',
      place: 'Asiri Hospital Kandy',
      time: '3.00 P.M',
      date: '2021-09-25',
    },
    {
      id: '4',
      name: 'Tom Brown',
      phone: '0712456785',
      place: 'Ceylinco Healthcare',
      time: '4.00 P.M',
      date: '2021-09-25',
    },
  ];

  // Filter appointments based on selected date
  const filteredAppointments = appointments.filter(
    appointment => appointment.date === selectedDate,
  );

  // Function to render each appointment item
  const renderAppointment = ({item}) => (
    <View style={styles.appointmentContainer}>
      <Text style={styles.appointmentTitle}>Appointment {item.id}</Text>
      <Text style={styles.appointmentText}>Name: {item.name}</Text>
      <Text style={styles.appointmentText}>Phone Number: {item.phone}</Text>
      <Text style={styles.appointmentText}>Place: {item.place}</Text>
      <Text style={styles.appointmentText}>Time: {item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Appointment Calendar</Text>

      {/* Calendar Component */}
      <Calendar
        onDayPress={day => {
          console.log('Selected day:', day); // Debug log to verify selected date
          setSelectedDate(day.dateString); // Update selected date
        }}
        markedDates={{
          [selectedDate]: {selected: true, marked: true, selectedColor: 'blue'},
          '2021-09-19': {marked: true, dotColor: 'blue'}, // Mark this date
          '2021-09-25': {marked: true, dotColor: 'blue'}, // Mark this date
        }}
      />

      <Text style={styles.dateText}>{`Selected Date: ${selectedDate}`}</Text>

      {/* Display filtered appointments */}
      {filteredAppointments.length > 0 ? (
        <FlatList
          data={filteredAppointments} // Use filtered appointments
          renderItem={renderAppointment}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noAppointmentsText}>
          No appointments for this date.
        </Text>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('DashBoard')}>
          <Image
            source={require('../../src/screen/home.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('BlogS1')}>
          <Image
            source={require('../../src/screen/blog.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Blog</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('ProblemPosts')}>
          <Image
            source={require('../../src/screen/queries.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Queries</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Chat')}>
          <Image
            source={require('../../src/screen/chat.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('ExpertAccount')}>
          <Image
            source={require('../../src/screen/account.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Style definitions
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 15,
    marginVertical: 10,
    marginTop: 20,
  },
  appointmentContainer: {
    padding: 20,
    marginVertical: 5,
    borderBottomColor: '#ccc',
    backgroundColor: '#F1F3FB',
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 5,
  },
  appointmentText: {
    fontSize: 14,
    marginBottom: 3,
  },
  noAppointmentsText: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20,
    color: 'red',
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
});

export default SelectDate;
