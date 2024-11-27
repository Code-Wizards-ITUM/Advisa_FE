// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   Image,
// } from 'react-native';
// import {Picker} from '@react-native-picker/picker';
// import {launchImageLibrary} from 'react-native-image-picker';

// const ConsultantRegister = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [bio, setBio] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [selectedExpertise, setSelectedExpertise] = useState('');
//   const [qualificationImage, setQualificationImage] = useState(null); // State to store selected image

//   const validateForm = () => {
//     if (
//       !fullName ||
//       !email ||
//       !selectedExpertise ||
//       !phoneNumber ||
//       !bio ||
//       !password ||
//       !confirmPassword
//     ) {
//       Alert.alert('Error', 'Please fill all the fields.');
//       return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       Alert.alert('Error', 'Please enter a valid email address.');
//       return false;
//     }

//     if (password.length < 6) {
//       Alert.alert('Error', 'Password must be at least 6 characters long.');
//       return false;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match.');
//       return false;
//     }

//     if (!qualificationImage) {
//       Alert.alert('Error', 'Please upload your qualification document.');
//       return false;
//     }

//     return true;
//   };

//   const handleRegister = () => {
//     if (validateForm()) {
//       // Handle the form submission logic here

//       // Reset all fields after submission
//       setFullName('');
//       setEmail('');
//       setPhoneNumber('');
//       setBio('');
//       setPassword('');
//       setConfirmPassword('');
//       setSelectedExpertise('');
//       setQualificationImage(null); // Reset the qualification image
//       Alert.alert('Success', 'Registration successful!');
//     }
//   };

//   const selectQualificationImage = () => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//       quality: 1,
//       selectionLimit: 1,
//       maxWidth: 800,
//       maxHeight: 800,
//     };

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.assets) {
//         setQualificationImage(response.assets[0]); // Save the selected image
//       }
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.formContainer}>
//         <Text style={styles.title}>Consultant Register</Text>
//         <Text style={styles.subtitle}>
//           Enter your details to register as a consultant.
//         </Text>

//         <Text style={styles.label}>Full Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your full name"
//           value={fullName}
//           onChangeText={setFullName}
//         />

//         <Text style={styles.label}>Email</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Email Address"
//           keyboardType="email-address"
//           value={email}
//           onChangeText={setEmail}
//         />

//         <Text style={styles.label}>Expertise</Text>
//         <View style={styles.dropdownContainer}>
//           <Picker
//             selectedValue={selectedExpertise}
//             onValueChange={itemValue => setSelectedExpertise(itemValue)}
//             style={[
//               styles.picker,
//               selectedExpertise === '' && styles.placeholderColor,
//             ]}
//             itemStyle={styles.pickerItem}>
//             <Picker.Item label="Select your expertise domain" value="" />
//             <Picker.Item label="Mental Health" value="expertise1" />
//             <Picker.Item label="Legal" value="expertise2" />
//             <Picker.Item label="Beauty" value="expertise3" />
//             <Picker.Item label="Nutrition" value="expertise4" />
//           </Picker>
//         </View>

//         <Text style={styles.label}>Phone Number</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your phone number"
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//         />

//         <Text style={styles.label}>Bio</Text>
//         <TextInput
//           style={[styles.input, {height: 120, textAlignVertical: 'top'}]}
//           multiline={true}
//           numberOfLines={5}
//           placeholder="Enter your Bio"
//           value={bio}
//           onChangeText={setBio}
//         />

//         {/* Qualification Image Upload */}

//         <Text style={styles.label}>Password</Text>
//         <View style={styles.passwordContainer}>
//           <TextInput
//             style={styles.passwordInput}
//             placeholder="Enter your password"
//             secureTextEntry={!passwordVisible}
//             value={password}
//             onChangeText={setPassword}
//           />
//           <TouchableOpacity
//             onPress={() => setPasswordVisible(!passwordVisible)}>
//             {/* <Image source={passwordVisible ? require('./path/to/eye-open.png') : require('./path/to/eye-closed.png')} style={styles.eyeIcon} /> */}
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.label}>Confirm Password</Text>
//         <View style={styles.passwordContainer}>
//           <TextInput
//             style={styles.passwordInput}
//             placeholder="Confirm your password"
//             secureTextEntry={!confirmPasswordVisible}
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//           />
//           <TouchableOpacity
//             onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
//             {/* <Image source={confirmPasswordVisible ? require('./path/to/eye-open.png') : require('./path/to/eye-closed.png')} style={styles.eyeIcon} /> */}
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.label}>Qualification Document (PNG/JPG/pdf)</Text>
//         <TouchableOpacity
//           style={styles.uploadButton}
//           onPress={selectQualificationImage}>
//           <Text style={styles.uploadButtonText}>
//             {qualificationImage ? 'Image Selected' : 'Upload Image'}
//           </Text>
//         </TouchableOpacity>
//         {qualificationImage && (
//           <Image
//             source={{uri: qualificationImage.uri}}
//             style={styles.imagePreview}
//           />
//         )}
//         <TouchableOpacity
//           style={styles.registerButton}
//           onPress={handleRegister}>
//           <Text style={styles.registerButtonText}>Register</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#fff',
//   },
//   formContainer: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     textAlign: 'center',
//     color: 'black',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: 'gray',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 11,
//     paddingHorizontal: 10,
//     marginBottom: 12,
//     fontSize: 14,
//   },
//   label: {
//     fontSize: 14,
//     color: 'black',
//     marginBottom: 5,
//     fontWeight: '600',
//     marginLeft: 5,
//   },
//   dropdownContainer: {
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 11,
//     marginBottom: 15,
//     position: 'relative',
//   },
//   picker: {
//     height: 40,
//     width: '100%',
//     fontSize: 14,
//   },
//   pickerItem: {
//     fontSize: 14,
//   },
//   placeholderColor: {
//     color: 'gray',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 11,
//     marginBottom: 15,
//   },
//   passwordInput: {
//     flex: 1,
//     height: 40,
//     paddingHorizontal: 10,
//     fontSize: 14,
//   },
//   registerButton: {
//     backgroundColor: '#3b82f6',
//     paddingVertical: 18,
//     borderRadius: 20,
//     alignItems: 'center',
//     marginTop: 15,
//   },
//   registerButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   uploadButton: {
//     backgroundColor: '#E2E2E2',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   uploadButtonText: {
//     color: '#000',
//     fontSize: 16,
//   },
//   imagePreview: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//     marginTop: 10,
//     alignSelf: 'center',
//   },
// });

// export default ConsultantRegister;

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker'; // Import the library
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {BASE_URL} from '../../config';

const ConsultantRegister = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [qualificationDocument, setQualificationDocument] = useState(null); // Store selected PDF
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (
      !fullName ||
      !email ||
      !selectedExpertise ||
      !phoneNumber ||
      !bio ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Error', 'Please fill all the fields.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return false;
    }

    if (!qualificationDocument) {
      Alert.alert('Error', 'Please upload your qualification document.');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      const formData = new FormData();

      formData.append('name', fullName);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('bio', bio);
      formData.append('password', password);
      formData.append('category', selectedExpertise);

      // Append the PDF file
      formData.append('verifiDocument', {
        uri: qualificationDocument.uri,
        type: qualificationDocument.type,
        name: qualificationDocument.name,
      });

      try {
        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${BASE_URL}/signup/expert`,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        };

        const response = await axios(config);

        if (response.status === 201) {
          Alert.alert('Success', 'Your request placed successfully.');
          setFullName('');
          setEmail('');
          setPhoneNumber('');
          setBio('');
          setPassword('');
          setConfirmPassword('');
          setSelectedExpertise('');
          setQualificationDocument(null);
        } else {
          Alert.alert('Error', 'Failed to Register');
        }
      } catch (error) {
        console.error('Registration Error:', error);
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    }
  };

  const selectQualificationDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // Restrict to PDFs only
      });
      setQualificationDocument(res[0]); // Store the first selected PDF
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('Document Picker Error:', err);
        Alert.alert('Error', 'Unable to select the document.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Consultant Register</Text>

        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <Text style={styles.label}>Expertise</Text>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={selectedExpertise}
            onValueChange={setSelectedExpertise}
            style={styles.picker}>
            <Picker.Item label="Select Expertise" value="" />
            <Picker.Item label="Mental Health" value="mental" />
            <Picker.Item label="Legal" value="legal" />
            <Picker.Item label="Beauty" value="beauty" />
            <Picker.Item label="Nutrition" value="nutrition" />
          </Picker>
        </View>
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <Text style={styles.label}>Bio</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
            multiline
            placeholder="Bio"
            value={bio}
            onChangeText={setBio}
          />
        </View>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome
              name={showPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="#9A9A9A"
              Style={styles.InputIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>
          Upload your verification document (pdf)
        </Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={selectQualificationDocument}>
          <Text style={styles.uploadButtonText}>
            {qualificationDocument ? 'PDF Selected' : 'Upload PDF'}
          </Text>
        </TouchableOpacity>
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
  inputContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderRadius: 10,
    // elevation: 10,
    borderColor: '#000',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  InputIcon: {
    marginLeft: 5,
  },
  container: {flexGrow: 1, padding: 20, backgroundColor: '#fff'},
  formContainer: {paddingBottom: 30},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#E2E2E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#000',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  registerButtonText: {color: '#fff', fontWeight: 'bold'},
  input: {
    // width: 100,
    // height: 40,
    // borderColor: 'gray',
    // borderWidth: 1,
    // borderRadius: 11,
    // paddingHorizontal: 10,
    // marginBottom: 12,
    // fontSize: 14,
    color: 'black',
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
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
    fontSize: 14,
  },
  pickerItem: {
    fontSize: 14,
  },
  placeholderColor: {
    color: 'gray',
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
    fontSize: 14,
  },
});

export default ConsultantRegister;
