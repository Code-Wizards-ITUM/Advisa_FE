import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ViewDetails = ({ navigation }) => {  // Accept navigation prop
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>ViewDetails </Text>
      </View>










      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DashBoard')}>
          <Image source={require('../../assets/img/home.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('BlogS1')}>
          <Image source={require('../../assets/img/blog.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Blog</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProblemPosts')}>
          <Image source={require('../../assets/img/queries.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Queries</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Chat')}>
          <Image source={require('../../assets/img/chat.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ExpertAccount')}>
          <Image source={require('../../assets/img/account.png')} style={styles.navIcon} />
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
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8', // Optional: change background color if needed
    borderTopWidth: 1,
    borderTopColor: '#ddd', // Optional: add a border on top of the navigation bar
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

export default ViewDetails ;
