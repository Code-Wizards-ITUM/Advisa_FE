import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import {Calendar} from 'react-native-calendars';

// Sample appointments data
const appointments = [
  {id: '1', ref: '######', name: 'Mr. Sample', date: '01/10/2024'},
  {id: '2', ref: '######', name: 'Ms. Example', date: '02/10/2024'},
];

const MyAppointments = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const [selectedDate, setSelectedDate] = useState(''); // State to store the selected date
  const [filteredAppointments, setFilteredAppointments] =
    useState(appointments); // State to store filtered appointments

  const handleDateSelect = day => {
    const dateString = day.dateString; // Get the selected date string
    setSelectedDate(dateString);
    setModalVisible(false); // Close the modal after selecting the date
    filterAppointments(dateString); // Filter appointments based on the selected date
  };

  const filterAppointments = date => {
    const filtered = appointments.filter(
      appointment => appointment.date === date,
    );
    setFilteredAppointments(filtered); // Update the filtered appointments state
  };

  const renderAppointment = ({item}) => (
    <TouchableOpacity
      style={styles.appointmentContainer}
      onPress={() => {
        // Navigate to a specific appointment page based on the id
        navigation.navigate(`MyAppointment${item.id}`, {
          appointmentId: item.id,
        });
      }}>
      <Text style={styles.refNo}>
        Ref. No: {item.ref} | Date: {item.date}
      </Text>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectDateButton}
        onPress={() => setModalVisible(true)} // Open the calendar modal
      >
        <Text style={styles.selectDateText}>Select Date</Text>
        <Image
          source={require('../assets/calendar.png')} // Add your calendar image here
          style={styles.calendarIcon}
        />
      </TouchableOpacity>

      <FlatList
        data={filteredAppointments} // Use filtered appointments here
        renderItem={renderAppointment}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('DashBoard')}>
          <Image
            source={require('../assets/home.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('BlogS1')}>
          <Image
            source={require('../assets/blog.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Blog</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('ProblemPosts')}>
          <Image
            source={require('../assets/queries.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Queries</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Chat')}>
          <Image
            source={require('../assets/chat.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('ExpertAccount')}>
          <Image
            source={require('../assets/account.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Handle back button
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Date</Text>
            <Calendar
              onDayPress={handleDateSelect} // Handle date selection
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  marked: true,
                  selectedColor: 'blue',
                },
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  selectDateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#3A68D7',
    borderRadius: 10,
    margin: 10,
    paddingVertical: 10,
  },
  selectDateText: {
    fontSize: 16,
    color: '#3A68D7',
    marginRight: 10,
  },
  calendarIcon: {
    width: 30,
    height: 30,
  },
  list: {
    paddingHorizontal: 10,
  },
  appointmentContainer: {
    backgroundColor: '#F1F3FB',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  refNo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#3A68D7',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MyAppointments;
