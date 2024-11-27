import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import DashBoard from './DashBoard';
import BlogS1 from './BlogDashboard';
import ProblemPosts from './ProblemPosts';
import Chat from './Chat';
import ExpertAccount from './ExpertAccount';
import ChatHome from '../../chat/screens/ChatHome';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconSource;

          switch (route.name) {
            case 'DashBoard':
              iconSource = require('../assets/home.png');
              break;
            case 'BlogS1':
              iconSource = require('../assets/blog.png');
              break;
            case 'ProblemPosts':
              iconSource = require('../assets/queries.png');
              break;
            case 'Chat':
              iconSource = require('../assets/chat.png');
              break;
            case 'ExpertAccount':
              iconSource = require('../assets/account.png');
              break;
            default:
              iconSource = null;
          }

          return (
            <Image
              source={iconSource}
              style={{width: size, height: size, tintColor: color}}
            />
          );
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
        // headerStyle: {
        //   backgroundColor: '#3b82f6',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },
        // headerLeft: () => (
        //   <TouchableOpacity onPress={() => navigation.goBack()}>
        //     <Image
        //       source={require('../assets/arrowb.png')}
        //       style={{width: 30, height: 30, marginLeft: 10}}
        //     />
        //   </TouchableOpacity>
        // ),
      })}>
      <Tab.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="BlogS1"
        component={BlogS1}
        options={{
          headerShown: true,
          tabBarLabel: 'Blog',
          title: 'Blogs',
          headerStyle: {
            backgroundColor: '#007BFF',
          },
          headerTintColor: '#ffff',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="ProblemPosts"
        component={ProblemPosts}
        options={{
          headerShown: true,
          tabBarLabel: 'Queries',
          title: 'Problem Posts',
          headerStyle: {
            backgroundColor: '#007BFF',
          },
          headerTintColor: '#ffff',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="Chat"
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
      <Tab.Screen
        name="ExpertAccount"
        component={ExpertAccount}
        options={{
          headerShown: true,
          tabBarLabel: 'Account',
          title: 'My Profile',
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
