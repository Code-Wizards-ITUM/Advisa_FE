import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
const ConsultantRegister = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [certificationNumber, setCertificationNumber] = useState('');
  const [qualificationNumber, setQualificationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const handleRegister = Login => {
    // Handle the form submission logic here

    // Reset all fields after submission
    setFullName('');
    setEmail('');
    setCertificationNumber('');
    setQualificationNumber('');
    setPassword('');
    setConfirmPassword('');
    setSelectedExpertise('');
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.headerText}>Register</Text> */}
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Consultant Register</Text>
        <Text style={styles.subtitle}>
          Enter your details to register as a consultant.
        </Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Expertise</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedExpertise}
            onValueChange={itemValue => setSelectedExpertise(itemValue)}
            style={[
              styles.picker,
              selectedExpertise === '' && styles.placeholderColor,
            ]}
            itemStyle={styles.pickerItem}>
            <Picker.Item label="Select your expertise domain" value="" />
            <Picker.Item label="Mental Health" value="expertise1" />
            <Picker.Item label="Legal" value="expertise2" />
            <Picker.Item label="Beauty" value="expertise3" />
            <Picker.Item label="Nutrition" value="expertise4" />
          </Picker>
        </View>
        <Text style={styles.label}>Certification Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your certification number"
          value={certificationNumber}
          onChangeText={setCertificationNumber}
        />
        <Text style={styles.label}>Qualifications</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your qualification "
          value={qualificationNumber}
          onChangeText={setQualificationNumber}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}>
            {/* <Image source={passwordVisible ? require('./path/to/eye-open.png') : require('./path/to/eye-closed.png')} style={styles.eyeIcon} /> */}
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm your password"
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            {/* <Image source={confirmPasswordVisible ? require('./path/to/eye-open.png') : require('./path/to/eye-closed.png')} style={styles.eyeIcon} /> */}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 35,
    paddingHorizontal: 10,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 11,
    paddingHorizontal: 10,
    marginBottom: 12,
    fontSize: 14, // Adjusted font size
  },
  label: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
    fontWeight: '600',
    marginLeft: 5,
  },
  dropdownContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 11,
    marginBottom: 15,
    position: 'relative',
  },
  picker: {
    height: 40,
    width: '100%',
    fontSize: 14, // Adjusted font size
  },
  pickerItem: {
    fontSize: 14, // Adjusted font size for Picker items
  },
  placeholderColor: {
    color: 'gray',
  },
  arrowIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 30,
    height: 30,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 11,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 14, // Adjusted font size
  },
  registerButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 50,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
export default ConsultantRegister;
