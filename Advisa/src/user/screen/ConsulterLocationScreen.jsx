import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

// Sample location data
const locations = [
  {id: '1', location: 'Asiri Kottawa', price: 2000},
  {id: '2', location: 'Asiri Maharagama', price: 2100},
  {id: '3', location: 'Lanka Hospital', price: 2200},
  {id: '4', location: 'Nawaloka Colombo', price: 2300},
];

// LocationItem Component
const LocationItem = ({
  location,
  profileImage,
  doctorname,
  category,
  price,
  rating,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() =>
        navigation.navigate('MakeAppointment', {
          location,
          profileImage,
          doctorname,
          category,
          price,
          rating,
        })
      }>
      <Image source={profileImage} style={styles.profileImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.locationName}>{location}</Text>
        <Text style={styles.category}>Hospital</Text>
        <Text style={styles.price}>Consultation Fee: {price} LKR</Text>
      </View>
    </TouchableOpacity>
  );
};

// LocationSearch Component
const LocationSearch = ({route, navigation}) => {
  const [searchText, setSearchText] = useState('');

  const filteredLocations = locations.filter(item =>
    item.location.toLowerCase().includes(searchText.toLowerCase()),
  );

  const {doctorname, category, rating, profileImage} = route?.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Search Location</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search Location"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>

      {filteredLocations.length > 0 ? (
        <FlatList
          data={filteredLocations}
          renderItem={({item}) => (
            <LocationItem
              location={item.location}
              profileImage={profileImage}
              doctorname={doctorname}
              category={category}
              price={item.price}
              rating={rating}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No locations found</Text>
        </View>
      )}
    </View>
  );
};

export default LocationSearch;

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
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 3,
    marginVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  category: {
    fontSize: 14,
    color: '#6c757d',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: '#6c757d',
  },
});
