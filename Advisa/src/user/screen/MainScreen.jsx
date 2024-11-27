import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import HomeScreen from './HomeScreen';
import BlogsScreen from './BlogsScreen';
import PostScreen from './PostScreen';
import ChatHome from '../../chat/screens/ChatHome';


const homeName = 'Home';
const blogsName = 'Blog';
const postName = 'Post';
const chatName = 'Chat';

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === blogsName) {
            iconName = focused ? 'book' : 'book-outline';
          } else if (rn === postName) {
            iconName = focused ? 'create' : 'create-outline';
          } else if (rn === chatName) {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {paddingBottom: 10, fontSize: 10},
        tabBarStyle: {padding: 10, height: 70},
      })}>
      <Tab.Screen
        name={homeName}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={blogsName}
        component={BlogsScreen}
        options={{
          headerShown: true,
          title: 'Blogs',
          headerStyle: {
            backgroundColor: '#007BFF',
          },
          headerTintColor: '#ffff',
          headerTitleAlign:"center"
        }}
      />
      <Tab.Screen
        name={postName}
        component={PostScreen}
        options={{
          headerShown: true,
          title: 'Problem Posts',
          headerStyle: {
            backgroundColor: '#007BFF',
          },
          headerTintColor: '#ffff',
           headerTitleAlign:"center"
        }}
      />
      <Tab.Screen
        name={chatName}
        component={ChatHome}
        options={{
          headerShown: true,
          tabBarLabel: 'Chat',
          title: 'Chat Room',
          headerStyle: {
            backgroundColor: '#007BFF',
          },
          headerTintColor: '#ffff',
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
}

export default MainContainer;
