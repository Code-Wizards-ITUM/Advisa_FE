import React, {useState} from 'react'; // Added useState for managing input state
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';

const Notification = ({navigation}) => {
  const [suggestion, setSuggestion] = useState(''); // State for suggestion input

  return (
    <View style={styles.container}>
      <ScrollView style={styles.postContainer}>
        <View style={styles.postHeader}>
          <View style={styles.leftContainer}>
            <View style={styles.anonymousContainer}>
              <Image
                source={require('../../src/screen/account.png')}
                style={styles.anonymousIcon}
              />
              <Text style={styles.anonymousText}>Anonymous</Text>
            </View>
            <Text style={styles.timeText}>08:00 @ 22.05.2024</Text>
          </View>
        </View>

        <View style={styles.postContent}>
          <Text style={styles.postTitle}>Post Title</Text>
          <View style={styles.postBodyContainer}>
            <Text style={styles.postBody}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.555
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your suggestion."
              placeholderTextColor="#999"
              value={suggestion}
              onChangeText={setSuggestion}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                // Handle the suggestion submission here
                console.log(suggestion); // Replace this with your submission logic
                setSuggestion(''); // Reset the suggestion input
              }}>
              <Image
                source={require('../../src/screen/send.png')}
                style={styles.sendIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.postHeader}>
          <View style={styles.leftContainer}>
            <View style={styles.anonymousContainer}>
              <Image
                source={require('../../src/screen/account.png')}
                style={styles.anonymousIcon}
              />
              <Text style={styles.anonymousText}>Anonymous</Text>
            </View>
            <Text style={styles.timeText}>08:00 @ 22.05.2024</Text>
          </View>
        </View>

        <View style={styles.postContent}>
          <Text style={styles.postTitle}>Post Title</Text>
          <View style={styles.postBodyContainer}>
            <Text style={styles.postBody}>
              quat.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your suggestion."
              placeholderTextColor="#999"
              value={suggestion}
              onChangeText={setSuggestion}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                // Handle the suggestion submission here
                console.log(suggestion); // Replace this with your submission logic
                setSuggestion(''); // Reset the suggestion input
              }}>
              <Image
                source={require('../../src/screen/send.png')}
                style={styles.sendIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  postContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  anonymousContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  anonymousIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  anonymousText: {
    fontWeight: 'bold',
    color: '#355c7d',
    fontSize: 16,
  },
  timeText: {
    color: '#777',
  },
  postContent: {
    marginBottom: 20,
    borderRadius: 8,
    padding: 20,
    backgroundColor: '#4f4f5a',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  postBodyContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#fff',
    paddingVertical: 10,
  },
  postBody: {
    color: 'white',
    lineHeight: 30,
    textAlign: 'justify',
  },
  suggestionsButton: {
    backgroundColor: '#4f4f5a',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#fff',
    alignSelf: 'flex-end',
  },
  suggestionsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 1,
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    color: '#333',
    paddingHorizontal: 10,
  },
  sendButton: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    width: 30,
    height: 30,
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
