import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doc, setDoc, getDoc} from 'firebase/firestore';
import { db } from '../../chat/config/firebase';
function generateChatId(userEmail1, userEmail2) {
  const emails = [userEmail1, userEmail2].sort();
  return `${emails[0]}_${emails[1]}`;
}
async function openOrCreateChat(userEmail1, userEmail2, userName1, userName2) {
  const chatId = generateChatId(userEmail1, userEmail2);
  const chatDocRef = doc(db, 'chats', chatId);

  // Check if chat already exists
  const chatDoc = await getDoc(chatDocRef);
  if (!chatDoc.exists()) {
      // If it doesn’t exist, create it with initial data
      await setDoc(chatDocRef, {
          participants: [userEmail1, userEmail2],
          names: { [userEmail1]: userName1, [userEmail2]: userName2 }, // Store user names
          messages: [], // Initialize with an empty messages array
      });
      console.log('New chat created!');
  } else {
      console.log('Chat already exists!');
  }
  return chatId; // Return chatId for navigation to the chat screen
}


const ConsultantProfile = ({route}) => {
  // Add fallback to handle undefined route.params
  const {data} = route.params;
  const navigation = useNavigation();
  const openChat = async () => {
    const userEmail = await AsyncStorage.getItem('userEmail');
    const userName = await AsyncStorage.getItem('userName'); // Assume userName is stored in AsyncStorage
    console.log(data.email, userEmail);
    const chatId = await openOrCreateChat(
      userEmail,
      data.email,
      userName,
      data.name,
    ); // Pass user names
    // Navigate to the chat screen, passing the chatId
    navigation.navigate('ChatInside', {
      chatId,
      userNames: {[userEmail]: userName, [data.email]: data.name},
    }); // Pass user names
  };

  // Check if required data exists, otherwise return a loading/error screen
  if (!data.name || !data.category) {
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
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={require('../assets/expert.png')}
            style={styles.profileImage}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.specialist}>{data.category}</Text>
            {/*<Text style={styles.price}>{price}</Text>*/}
          </View>
        </View>

        {/* Biography Section */}
        <View style={styles.biographySection}>
          <Text style={styles.sectionTitle}>Biography</Text>
          <Text style={styles.biographyText}>{data.bio}</Text>
        </View>

        {/* Rating Section 
        <View style={styles.ratingSection}>
        <TouchableOpacity style={styles.payButton} onPress={() => navigation.navigate('ReviweRating"')}>
        <Text style={styles.sectionTitle}>Rating (72)</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <FontAwesome name="star" size={16} color="#FFD700" />
            <FontAwesome name="star" size={16} color="#FFD700" />
            <FontAwesome name="star" size={16} color="#FFD700" />
            <FontAwesome name="star-half" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
      </TouchableOpacity>
          
        </View>*/}

        {/* Make Appointment Button */}
        <View style={styles.buttonContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log(data.email)}>
              <Text style={styles.buttonText}>Make Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.chatButton]} onPress={openChat}>
              <FontAwesome name="comment" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={styles.ratingSection}>
            <TouchableOpacity
              style={styles.payButton}
              onPress={() =>
                navigation.navigate('Review', {
                  doctorname,
                  rating,
                })
              }>
              <Text style={styles.sectionTitle}>Rating (72)</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color="#FFD700" />
                <FontAwesome name="star" size={16} color="#FFD700" />
                <FontAwesome name="star" size={16} color="#FFD700" />
                <FontAwesome name="star" size={16} color="#FFD700" />
                <FontAwesome name="star-half" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ConsultantProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
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
  profileSection: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginVertical: 10,
    borderRadius: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  specialist: {
    fontSize: 18,
    color: '#6c757d',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#6c757d',
  },
  biographySection: {
    padding: 20,
    backgroundColor: '#F9F9F9',
    marginVertical: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  biographyText: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
  },
  ratingSection: {
    padding: 20,
    backgroundColor: '#F9F9F9',
    marginVertical: 10,
    borderRadius: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 5,
    color: '#000',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  chatButton: {
    width: 45,
    height: 45,
    backgroundColor: '#007bff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1, // This extends the width of the button to fill available space
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
