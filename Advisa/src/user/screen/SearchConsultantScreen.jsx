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
import {useNavigation} from '@react-navigation/native'; // Import navigation

const StarRating = ({rating}) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FontAwesome
        name={i <= 3 ? 'star' : 'star-o'}
        size={16}
        color="#FFD700"
      />,
    );
  }
  return <View style={styles.starRating}>{stars}</View>;
};


const ExpertItem = ({data}) => {
  const navigation = useNavigation(); // Use navigation hook
  let categoryName;
  switch (data.category) {
    case 'mental':
      categoryName = 'Psychologist';
      // code block
      break;
    case 'legal':
      categoryName = 'Lawyer';
      // code block
      break;
    case 'nutrition':
      categoryName = 'Nutritionist';
      break;
    case 'beauty':
      categoryName = 'Beautician';
      break;
    default:
      ' ';
    // code block
  }
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate('ConsultantProfile', {data: data})}>
      <Image source={require("../assets/expert.png")} style={styles.profileImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.doctorname}>{data.name}</Text>
        <Text style={styles.category}>{categoryName}</Text>
        <StarRating rating={4} />
      </View>
    </TouchableOpacity>
  );
};

const SearchConsultant = ({route}) => {
  const {expertsData} = route.params;
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState(''); // Define searchText state

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search Consultant"
          value={searchText} // Bind the TextInput to the state
          onChangeText={text => setSearchText(text)} // Update the state when the text changes
        />
      </View>

      <FlatList
        data={expertsData}
        renderItem={({item}) => <ExpertItem data={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default SearchConsultant;

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
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 10,
    marginVertical: 10,
    alignItems: 'center',
    marginBottom: 30,
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
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
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
  doctorname: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  category: {
    fontSize: 14,
    color: '#6c757d',
  },
  starRating: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
