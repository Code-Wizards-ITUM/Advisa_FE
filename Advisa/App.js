import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/user/screen/LoginScreen';
import UserSignupScreen from './src/user/screen/UserSignupScreen';
import ExpertRegisterScreen from './src/expert/screen/ConsultantRegister';
import WelcomeScreen from './WelcomeScreen';
import UserDashboard from './src/user/screen/MainScreen';
//import ExpertDashboard from './src/expert/screen/DashBoard';
import SearchConsultant from './src/user/screen/SearchConsultantScreen';
import Consulter from './src/user/screen/ConsultScreen';
import ConsultantProfile from './src/user/screen/ConsultProfileScreen';
import MakeAppointment from './src/user/screen/MakeAppoinmentScreen';
import FillDetalis from './src/user/screen/FillDetailsScreen';
import Payment from './src/user/screen/PaymentScreen';
import PaymentSuccess from './src/user/screen/PaymentSuccessScreen';
import MyAppointments from './src/user/screen/MyAppoinmentScreen';
import AppoinmentDetails from './src/user/screen/ApoinmentDetailsScreen';
import ReviewScreen from './src/user/screen/ReviewScreen';
import AddPostScreen from './src/user/screen/PostAddScreen';
import PostScreen from './src/user/screen/PostScreen';
// import ChatScreen from './src/user/screen/ChatScreen';
import Suggestions from './src/user/screen/SuggestionsScreen';
import Review from './src/user/screen/Reviwe&RatingScreen';
import Location from './src/user/screen/ConsulterLocationScreen';

import ExpertDashboard from './src/expert/screen/BottomTabNavigator';
import BlogDashboard from './src/expert/screen/BlogDashboard';
import ProblemPosts from './src/expert/screen/ProblemPosts';
// import Chat from './src/expert/screen/Chat';
import ExpertAccount from './src/expert/screen/ExpertAccount';
import ViewSugg from './src/expert/screen/ViewSugg';
import Appointments from './src/expert/screen/Appointments';
import MyAppointment1 from './src/expert/screen/MyAppointment1';
import CanselAppointments from './src/expert/screen/CanselAppointments';
import AddNewBlog from './src/expert/screen/AddNewBlog';
// import MyBlogs from './src/expert/screen/MyBlogs';
import BlogViewScreen from './src/expert/screen/BlogViewScreen';
// import BlogS3 from './src/expert/screen/BlogS3';
// import BlogS2 from './src/expert/screen/BlogS2';
import EditBlog from './src/expert/screen/EditBlog';
import ReviewR from './src/expert/screen/ReviewR';
import MyLocations from './src/expert/screen/MyLocations';
import Schedule from './src/expert/screen/Schedule';
import Notification from './src/expert/screen/Notification';
import BlogDetailScreen from './src/user/screen/BlogDetailScreen';

import ChatHome from "./src/chat/screens/ChatHome"
import ChatInside from "./src/chat/screens/ChatInside"

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserSignupScreen"
          component={UserSignupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ExpertRegisterScreen"
          component={ExpertRegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserDashboard"
          component={UserDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ExpertDashboard"
          component={ExpertDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Consulter"
          component={Consulter}
          options={{
            headerShown: true,
            title: 'Consultant Category',
            headerStyle: {
              backgroundColor: '#007BFF',
            },
            headerTintColor: '#ffff',
          }}
        />
        <Stack.Screen
          name="SearchConsultant"
          component={SearchConsultant}
          options={{
            headerShown: true,
            title: 'Search Consultant',
            headerStyle: {
              backgroundColor: '#007BFF',
            },
            headerTintColor: '#ffff',
          }}
        />
        <Stack.Screen
          name="ConsultantProfile"
          component={ConsultantProfile}
          options={{
            headerShown: true,
            title: 'Consultant Profile',
            headerStyle: {
              backgroundColor: '#007BFF',
            },
            headerTintColor: '#ffff',
          }}
        />
        <Stack.Screen
          name="MakeAppointment"
          component={MakeAppointment}
          options={{
            headerShown: true,
            title: 'Make Appointment',
            headerStyle: {
              backgroundColor: '#007BFF',
            },
            headerTintColor: '#ffff',
          }}
        />
        <Stack.Screen
          name="FillDetalis"
          component={FillDetalis}
          options={{
            headerShown: true,
            title: 'Fill Details',
            headerStyle: {
              backgroundColor: '#007BFF',
            },
            headerTintColor: '#ffff',
          }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{
            headerShown: true,
            title: 'Payment Details',
            headerStyle: {
              backgroundColor: '#007BFF',
            },
            headerTintColor: '#ffff',
          }}
        />
        <Stack.Screen
          name="PaymentSuccess"
          component={PaymentSuccess}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyAppointments"
          component={MyAppointments}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AppoinmentDetails"
          component={AppoinmentDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ReviewScreen"
          component={ReviewScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddPostScreen"
          component={AddPostScreen}
          options={{
            headerShown: true,
            title: 'Add New Problem Post',
            headerStyle: {
              backgroundColor: '#007BFF',
            },
            headerTintColor: '#ffff',
          }}
        />
        <Stack.Screen
          name="PostScreen"
          component={PostScreen}
          options={{
            headerShown: true,
            title: 'Problem Posts',
            headerStyle: {
              backgroundColor: '#007BFF',
            },
            headerTintColor: '#ffff',
          }}
        />
        {/* <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Suggestions"
          component={Suggestions}
          options={{
            headerShown: true,
            title: 'Suggestions',
            headerStyle: {
              backgroundColor: '#007BFF',
            },
            headerTintColor: '#ffff',
          }}
        />
        <Stack.Screen
          name="Location"
          component={Location}
          options={{
            headerShown: true,
            title: 'Available Locations',
            headerStyle: {
              backgroundColor: '#007BFF',
            },
            headerTintColor: '#ffff',
          }}
        />
        <Stack.Screen
          name="Review"
          component={Review}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewSugg"
          component={ViewSugg}
          options={{
            headerShown: true,
            title: 'Suggestions',
            headerStyle: {
              backgroundColor: '#007BFF',
            },
            headerTintColor: '#ffff',
          }}
        />
        <Stack.Screen
          name="Appointments"
          component={Appointments}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyAppointment1"
          component={MyAppointment1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CanselAppointments"
          component={CanselAppointments}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddNewBlog"
          component={AddNewBlog}
          options={{
            headerShown: true,
            title: 'Add New Blog',
            headerStyle: {
              backgroundColor: '#007BFF',
            },
            headerTintColor: '#ffff',
          }}
        />
        <Stack.Screen
          name="BlogViewScreen"
          component={BlogViewScreen}
          options={{
            headerShown: true,
            title: 'Read Blog',
            headerStyle: {
              backgroundColor: '#007BFF',
            },
            headerTintColor: '#ffff',
            headerTitleAlign:'center'
          }}
        />
        <Stack.Screen
          name="EditBlog"
          component={EditBlog}
          options={{
            headerShown: true,
            title: 'Edit Blog',
            headerStyle: {
              backgroundColor: '#007BFF',
            },
            headerTintColor: '#ffff',
            headerTitleAlign:'center'
          }}
        />
        <Stack.Screen
          name="ReviewR"
          component={ReviewR}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyLocations"
          component={MyLocations}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Schedule"
          component={Schedule}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BlogDetailScreen"
          component={BlogDetailScreen}
          options={{
            headerShown: true,
            title: 'Read Blog',
            headerStyle: {
              backgroundColor: '#007BFF',
            },
            headerTintColor: '#ffff',
          }}
        />
        <Stack.Screen
          name="BlogDashboard"
          component={BlogDashboard}
          options={{
            headerShown: true,
            title: 'Blogs',
            headerStyle: {
              backgroundColor: '#007BFF',
            },
            headerTintColor: '#ffff',
            headerTitleAlign:'center'
          }}
        />
        <Stack.Screen
          name="ProblemPosts"
          component={ProblemPosts}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="ChatHome"
          component={ChatHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatInside"
          component={ChatInside}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ExpertAccount"
          component={ExpertAccount}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
