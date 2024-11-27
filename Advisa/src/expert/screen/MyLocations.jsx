import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation

const MyLocations = () => {
  const navigation = useNavigation(); // Initialize navigation

  // State to manage locations and user inputs
  const [locations, setLocations] = useState([
    {id: 1, name: 'Location 1', address: '123 Main St, City A'},
    {id: 2, name: 'Location 2', address: '456 Elm St, City B'},
    {id: 3, name: 'Location 3', address: '789 Pine St, City C'},
  ]);

  const [locationName, setLocationName] = useState('');
  const [locationAddress, setLocationAddress] = useState('');

  // Function to add a new location
  const addLocation = () => {
    if (locationName === '' || locationAddress === '') {
      Alert.alert('Error', 'Please enter both a location name and address');
      return;
    }

    const newLocation = {
      id: locations.length + 1, // Assign a new unique ID
      name: locationName,
      address: locationAddress,
    };

    setLocations([...locations, newLocation]); // Update state with new location
    setLocationName(''); // Clear the input fields after adding
    setLocationAddress('');
  };

  return (
    <View style={styles.container}>
      {/* Content of the MyLocations screen */}
      <View style={styles.content}>
        <Text style={styles.title}>Available Locations</Text>
        <ScrollView>
          {locations.map(location => (
            <TouchableOpacity
              key={location.id}
              style={styles.locationItem}
              onPress={() => navigation.navigate('Schedule', {location})} // Navigate to Schedule page with location data
            >
              <Text style={styles.locationName}>{location.name}</Text>
              <Text style={styles.locationAddress}>{location.address}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input fields to add a new location */}
        <TextInput
          style={styles.input}
          placeholder="Enter location name"
          value={locationName}
          onChangeText={text => setLocationName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter location address"
          value={locationAddress}
          onChangeText={text => setLocationAddress(text)}
        />

        {/* Button to add a new location */}
        <Button title="Add Location" onPress={addLocation} />
      </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between', // Ensures the bottomNav stays at the bottom
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationAddress: {
    fontSize: 14,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
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

export default MyLocations;
