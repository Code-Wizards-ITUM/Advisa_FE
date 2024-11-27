import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const MySchedule = () => {
  const initialTimeSlots = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newHour, setNewHour] = useState('09');
  const [newMinute, setNewMinute] = useState('00');
  const [availableTimes, setAvailableTimes] = useState({
    [new Date().toDateString()]: [...initialTimeSlots], // Set initial time slots for today
  });

  const getWeekDates = startDate => {
    const weekDates = [];
    const startOfWeek = new Date(startDate);
    const currentDay = startOfWeek.getDay();
    startOfWeek.setDate(
      startOfWeek.getDate() - (currentDay === 0 ? 6 : currentDay - 1),
    );

    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(startOfWeek);
      nextDate.setDate(startOfWeek.getDate() + i);
      weekDates.push(nextDate);
    }
    return weekDates;
  };

  const weekDays = getWeekDates(selectedDate);

  const handleDateSelection = date => {
    setSelectedDate(date);
  };

  const isToday = date => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const moveToNextWeek = () => {
    const nextWeekDate = new Date(selectedDate);
    nextWeekDate.setDate(nextWeekDate.getDate() + 7);
    setSelectedDate(nextWeekDate);
  };

  const moveToPreviousWeek = () => {
    const prevWeekDate = new Date(selectedDate);
    prevWeekDate.setDate(prevWeekDate.getDate() - 7);
    setSelectedDate(prevWeekDate);
  };

  const deleteTimeSlot = timeToDelete => {
    const dateKey = selectedDate.toDateString();
    setAvailableTimes(prevTimes => ({
      ...prevTimes,
      [dateKey]: prevTimes[dateKey].filter(time => time !== timeToDelete),
    }));
  };

  const addTimeSlot = () => {
    const newTimeSlot = `${newHour}:${newMinute}`;
    const dateKey = selectedDate.toDateString();

    // Check if time slot exists for the selected date
    const timeSlotExists = availableTimes[dateKey]?.includes(newTimeSlot);
    if (timeSlotExists) {
      alert('This time slot is already available. Please choose another one.');
    } else {
      setAvailableTimes(prevTimes => ({
        ...prevTimes,
        [dateKey]: [...(prevTimes[dateKey] || []), newTimeSlot].sort(), // Add and sort the new time slot
      }));
    }
  };

  const resetTimeSlots = () => {
    const dateKey = selectedDate.toDateString();
    setAvailableTimes(prevTimes => ({
      ...prevTimes,
      [dateKey]: [], // Reset available times for the selected date
    }));
  };

  const selectedDayTimes = availableTimes[selectedDate.toDateString()] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Week of {selectedDate.toLocaleDateString()}
      </Text>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={moveToPreviousWeek} style={styles.navButton}>
          <Image
            source={require('../../src/screen/arrowL.png')}
            style={styles.arrowImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={moveToNextWeek} style={styles.navButton}>
          <Image
            source={require('../../src/screen/arrowR.png')}
            style={styles.arrowImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.dayContainer}>
        {weekDays.map((day, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDateSelection(day)}
            style={[
              styles.dayButton,
              selectedDate.toDateString() === day.toDateString() &&
                styles.selectedDay,
              isToday(day) && styles.todayDay,
            ]}>
            <Text>{day.toLocaleDateString('en-US', {weekday: 'short'})}</Text>
            <Text>{day.getDate()}</Text>
            {isToday(day) && <View style={styles.dot} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Scroll view for the available times for the selected date */}
      <ScrollView
        style={styles.doctorContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.availableTimesContainer}>
          {selectedDayTimes.map(time => (
            <View key={time} style={styles.timeContainer}>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => deleteTimeSlot(time)}>
                <Text>{time}</Text>
                <TouchableOpacity
                  onPress={() => deleteTimeSlot(time)}
                  style={styles.deleteIconContainer}>
                  <Image
                    source={require('../../src/screen/x.png')}
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Picker for Time Slot */}
      <View style={styles.addTimeSlotContainer}>
        <Picker
          selectedValue={newHour}
          style={styles.timePicker}
          onValueChange={itemValue => setNewHour(itemValue)}>
          {Array.from({length: 24}, (_, i) => i).map(hour => (
            <Picker.Item
              key={hour}
              label={hour.toString().padStart(2, '0')}
              value={hour.toString().padStart(2, '0')}
            />
          ))}
        </Picker>

        <Picker
          selectedValue={newMinute}
          style={styles.timePicker}
          onValueChange={itemValue => setNewMinute(itemValue)}>
          <Picker.Item label="00" value="00" />
          <Picker.Item label="15" value="15" />
          <Picker.Item label="30" value="30" />
          <Picker.Item label="45" value="45" />
        </Picker>

        <TouchableOpacity onPress={addTimeSlot} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Time Slot</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={resetTimeSlots} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Delete Time Slots</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4F8',
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    padding: 10,
  },
  arrowImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 50,
  },
  dayButton: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedDay: {
    backgroundColor: '#D1E8FF',
  },
  todayDay: {
    borderColor: '#FFA500',
    borderWidth: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF5733',
    marginTop: 5,
  },
  doctorContainer: {
    flex: 1,
    //marginBottom: 10,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 8,
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginRight: 10,
    marginLeft: 10,
  },
  availableTimesScroll: {
    flex: 1,
  },
  availableTimesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 18,
    marginTop: 30,
  },
  //timeContainer: {
  // margin: 0.11,
  // },
  timeButton: {
    backgroundColor: '#D1E8FF',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  deleteIconContainer: {
    marginLeft: 10,
  },
  deleteIcon: {
    width: 15,
    height: 15,
  },
  addTimeSlotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timePicker: {
    flex: 1,
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
  },
  addButtonText: {
    color: '#FFF',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#F44336',
    borderRadius: 5,
    padding: 10,
  },
  resetButtonText: {
    color: '#FFF',
    textAlign: 'center',
  },
});

export default MySchedule;
