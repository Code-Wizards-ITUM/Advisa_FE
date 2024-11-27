import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    name,
    phoneNumber,
    email,
    nic,
    doctorname,
    category,
    price,
    profileImage,
    location,
    selectedDate,
    selectedTime,
  } = route?.params || {};

  // Check if required data exists, otherwise return a loading/error screen
  if (!doctorname || !category || price === undefined) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error: Consultant details are missing.
        </Text>
      </View>
    );
  }

  // Convert price to a number
  const numericPrice = parseFloat(price) || 0; // Fallback to 0 if price is NaN
  const serviceCharge = [(serviceprice = 300)];

  // Total payment calculation
  const totalPayment = numericPrice + serviceprice;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Payment</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image source={profileImage} style={styles.profileImage} />
        <View style={styles.profileTextContainer}>
          <Text style={styles.doctorName}>{doctorname}</Text>
          <Text style={styles.doctorSpecialty}>{category}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schedule Date</Text>
        <View style={styles.scheduleContainer}>
          <Text style={styles.scheduleText}>
            {selectedDate && selectedTime
              ? `${selectedDate}, ${selectedTime}`
              : 'No date and time selected'}
          </Text>
        </View>
        <Text style={styles.sectionTitle}>Schedule Place</Text>
        <Text style={styles.locationText}>{location}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details Summary</Text>
        <Text style={styles.detailText}>Name: {name}</Text>
        <Text style={styles.detailText}>Mobile No: {phoneNumber}</Text>
        <Text style={styles.detailText}>NIC/Passport No: {nic}</Text>
        <Text style={styles.detailText}>Email: {email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentMethodContainer}>
          <Image
            source={require('../assets/admin.png')}
            style={styles.paymentIcon}
          />
          <Image
            source={require('../assets/admin.png')}
            style={styles.paymentIcon}
          />
          <Image
            source={require('../assets/admin.png')}
            style={styles.paymentIcon}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Total Payment</Text>
        <View style={styles.paymentSummaryContainer}>
          <Text style={styles.paymentText}>Consultation Fee</Text>
          <Text style={styles.paymentAmount}>
            Rs. {numericPrice.toFixed(2)}
          </Text>
        </View>
        <View style={styles.paymentSummaryContainer}>
          <Text style={styles.paymentText}>Service Charge</Text>
          <Text style={styles.paymentAmount}>
            Rs. {serviceprice.toFixed(2)}
          </Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>Rs. {totalPayment.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.payButton}
        onPress={() =>
          navigation.navigate('PaymentSuccess', {
            selectedDate,
            selectedTime,
            location,
            doctorname,
            category,
            name,
            phoneNumber,
            profileImage,
            email,
            nic,
          })
        }>
        <Text style={styles.payButtonText}>Pay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PaymentScreen;

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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileTextContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    color: '#8E8E8E',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  scheduleText: {
    marginLeft: 10,
    fontSize: 16,
  },
  locationText: {
    marginLeft: 10,
    fontSize: 16,
  },
  detailText: {
    marginBottom: 5,
    color: '#333',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  paymentIcon: {
    width: 40,
    height: 25,
    marginRight: 10,
  },
  paymentSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  paymentText: {
    fontSize: 16,
  },
  paymentAmount: {
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    paddingTop: 10,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  payButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
