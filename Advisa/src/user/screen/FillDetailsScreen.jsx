import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const FillDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    doctorname,
    category,
    price,
    profileImage,
    selectedDate,
    selectedTime,
    location,
  } = route?.params || {};

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    nic: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.userName = 'User Name is required';
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Valid 10-digit Phone Number is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid Email is required';
    if (!formData.nic || !/^\d{12}$/.test(formData.nic))
      newErrors.nic = 'Valid 12-digit NIC is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Navigate to PaymentScreen and pass the form data
      navigation.navigate('Payment', {
        selectedDate,
        selectedTime,
        location,
        name: formData.name, // User's name from form
        phoneNumber: formData.phoneNumber, // User's phone number
        email: formData.email, // User's email
        nic: formData.nic, // NIC/Passport
        doctorname,
        category,
        price,
        profileImage,
      });
    } else {
      Alert.alert(
        'Form Validation Failed',
        'Please check the errors and try again.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.signContainer}>
        <Text style={styles.signText}>Fill Your Details</Text>
        <Text style={styles.infoText}>Enter your details </Text>
      </View>

      <Text style={styles.details}>Full Name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="User Name"
          value={formData.namename}
          onChangeText={value => handleInputChange('name', value)}
        />
        {errors.userName && (
          <Text style={styles.errorText}>{errors.userName}</Text>
        )}
      </View>

      <Text style={styles.details}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={value => handleInputChange('email', value)}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <Text style={styles.details}>Mobile Number</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Phone Number"
          keyboardType="numeric"
          value={formData.phoneNumber}
          onChangeText={value => handleInputChange('phoneNumber', value)}
        />
        {errors.phoneNumber && (
          <Text style={styles.errorText}>{errors.phoneNumber}</Text>
        )}
      </View>

      <Text style={styles.details}>NIC</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="NIC"
          keyboardType="numeric"
          value={formData.nic}
          onChangeText={value => handleInputChange('nic', value)}
        />
        {errors.nic && <Text style={styles.errorText}>{errors.nic}</Text>}
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handleSubmit}>
        <Text style={styles.payButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FillDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  signContainer: {
    marginBottom: 20,
  },
  signText: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#082567',
  },
  infoText: {
    color: 'black',
  },
  details: {
    color: 'black',
    fontSize: 15,
    marginBottom: 5,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 5,
  },
  textInput: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  payButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
