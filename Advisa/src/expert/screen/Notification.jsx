import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// Sample notifications data
const notifications = [
  {
    id: '1',
    name: 'Emma Scarlett',
    title: 'You have a new Appointment',
    time: '17:41',
    date: '22/6/2024',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  ',
    //image: require('../../src/expert/assets/account.png'),
    isNew: true,
  },
  {
    id: '2',
    name: 'Liya Grace',
    title: 'Title of message',
    time: '17:41',
    date: '22/6/2024',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //image: require('../../src/expert/assets/account.png'),
    isNew: false,
  },
  {
    id: '3',
    name: 'Daniel Harper',
    title: 'Title of message',
    time: '17:41',
    date: '22/6/2024',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //image: require('../../assets/img/account.png'),
    isNew: false,
  },
];

// Notification List Screen
const Notification = ({navigation}) => {
  // Render function to display each notification item
  const renderItem = ({item}) => (
    <View style={styles.notificationCard}>
      <Image source={item.image} style={styles.profileImage} />
      <View style={styles.notificationInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.doctorName}>{item.name}</Text>
          {item.isNew && <Text style={styles.newBadge}>New</Text>}
        </View>
        <Text style={styles.doctorTitle}>{item.title}</Text>
        <View style={styles.dateTimeRow}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text style={styles.message}>{item.message}</Text>
        <TouchableOpacity
          onPress={() => {
            if (item.id === '1') {
              navigation.navigate('MyAppointment1'); // Navigate to MyAppoinment1 for id: 1
            } else {
              navigation.navigate('Appointments'); // Navigate to Appointments for other notifications
            }
          }}>
          <Text style={styles.seeMore}>see more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Delete All Button */}
      <TouchableOpacity style={styles.deleteAllButton}>
        <Image
          // source={require('../../assets/img/delete.png')}
          style={styles.deleteIcon}
        />
        <Text style={styles.deleteText}>Delete All</Text>
      </TouchableOpacity>

      {/* Notification List */}
      <ScrollView>
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </ScrollView>

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
    </View>
  );
};

// Styling for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  deleteAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 50,
    paddingVertical: 5,
    backgroundColor: '#f9f9f9',
    marginBottom: 30,
    marginTop: 10,
    borderRadius: 8,
    height: 60,
  },
  deleteIcon: {
    width: 22,
    height: 22,
    marginRight: 5,
  },
  deleteText: {
    color: 'black',
    fontSize: 14,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  profileImage: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  notificationInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  newBadge: {
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    marginLeft: 10,
  },
  doctorTitle: {
    fontSize: 14,
    color: '#888',
    marginVertical: 2,
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  message: {
    fontSize: 14,
    marginVertical: 5,
    color: '#333',
  },
  seeMore: {
    fontSize: 14,
    color: '#007BFF',
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
});

export default Notification;
