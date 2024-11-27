import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useNavigation} from '@react-navigation/native';

const MakeAppoinment = ({route}) => {
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  //const [selectedPlace, setSelectedPlace] = useState('');

  const times = [
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
  ];

  {
    /*const places = [
    'Asiri Maharagama',
    'Asiri Colombo',
    'Asiri Kottawa',
    'Lanka Hospital Colombo',
    'Other',
  ];*/
  }

  const onDayPress = day => {
    setSelectedDate(day.dateString);
  };

  const renderTimeSlot = ({item}) => (
    <TouchableOpacity
      style={[
        styles.timeSlot,
        selectedTime === item && styles.selectedTimeSlot,
      ]}
      onPress={() => setSelectedTime(item)}>
      <Text
        style={
          selectedTime === item ? styles.selectedTimeText : styles.timeText
        }>
        {item}
      </Text>
    </TouchableOpacity>
  );

  {
    /*const renderPlace = ({item}) => (
    <TouchableOpacity
      style={[styles.place, selectedPlace === item && styles.selectedplace]}
      onPress={() => setSelectedPlace(item)}>
      <Text
        style={
          selectedPlace === item ? styles.selectedplaceText : styles.timeText
        }>
        {item}
      </Text>
    </TouchableOpacity>
  );
*/
  }
  const {doctorname, category, price, rating, profileImage, location} =
    route?.params || {};

  if (!doctorname || !category || !price) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error: Consultant details are missing.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Consultant Profile</Text>
        </View>

        <View>
          <Text style={styles.topText}>Select Your Visit Date & Time</Text>
          <Text style={styles.subText}>
            You can choose the date & time from the available schedule
          </Text>
        </View>

        {/* Date Picker */}
        <View>
          <Text style={styles.dateText}>Choose Day</Text>
          <Calendar
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                marked: true,
                selectedColor: '#007BFF',
              },
            }}
            theme={{
              selectedDayBackgroundColor: '#007BFF',
              arrowColor: '#007BFF',
            }}
            style={styles.calendar}
          />
        </View>

        {/* Time Slots */}
        <View>
          <Text style={styles.dateText}>Choose Time</Text>
          <FlatList
            data={times}
            renderItem={renderTimeSlot}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.timeSlotContainer}
          />
        </View>

        {/* Places */}
        {/*<View>
          <Text style={styles.placeText}>Choose Place</Text>
          <FlatList
            data={places}
            renderItem={renderPlace}
            keyExtractor={item1 => item1}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.placeContainer}
          />
        </View>*/}

        {/* Selected Date ,Time nad Place */}
        {selectedDate && selectedTime && (
          <View style={styles.selectionContainer}>
            <Text style={styles.selectionText}>
              Selected Date: {selectedDate}
            </Text>
            <Text style={styles.selectionText}>
              Selected Time: {selectedTime}
            </Text>
            {/*<Text style={styles.selectionText}>
              Selected Place: {selectedPlace}
            </Text>*/}
          </View>
        )}

        {/* Confirm Appointment Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('FillDetalis', {
                selectedDate,
                selectedTime,
                //selectedPlace,
                doctorname,
                category,
                price,
                rating,
                profileImage,
                location,
              })
            }>
            <Text style={styles.buttonText}>Confirm Appointment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default MakeAppoinment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  topText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    marginLeft: 10,
  },
  subText: {
    marginLeft: 10,
    marginTop: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    marginLeft: 10,
  },
  calendar: {
    margin: 10,
  },
  timeSlotContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  timeSlot: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedTimeSlot: {
    backgroundColor: '#007BFF',
  },
  timeText: {
    color: '#000',
  },
  selectedTimeText: {
    color: '#fff',
  },
  timeSlotContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  place: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedplace: {
    backgroundColor: '#007BFF',
  },
  placeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    marginLeft: 10,
  },
  placeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  selectedplaceText: {
    color: '#fff',
  },

  selectionContainer: {
    padding: 20,
    backgroundColor: '#F9F9F9',
    marginTop: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  selectionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
