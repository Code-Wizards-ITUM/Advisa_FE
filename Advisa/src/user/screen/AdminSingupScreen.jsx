import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';


const AdminSignupScreen = () => {
  const navigation = useNavigation();

    const [formData, setFormData] = useState({
        userName: '',
        age: '',
        city: '',
        phoneNumber: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.userName) newErrors.userName = 'User Name is required';
        if (!formData.age || isNaN(formData.age)) newErrors.age = 'Valid Age is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Valid 10-digit Phone Number is required';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid Email is required';
        if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters long';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            Alert.alert('Form Submitted', JSON.stringify(formData));
        } else {
            Alert.alert('Form Validation Failed', 'Please check the errors and try again.');
        }
    };

    return (
        <ImageBackground source={require('../assets/bg2.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.signContainer}>
                    <Text style={styles.signText}>Sign In</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Admin Name"
                        value={formData.userName}
                        onChangeText={(value) => handleInputChange('userName', value)}
                    />
                    {errors.userName && <Text style={styles.errorText}>{errors.userName}</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Age"
                        keyboardType="numeric"
                        value={formData.age}
                        onChangeText={(value) => handleInputChange('age', value)}
                    />
                    {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="City"
                        value={formData.city}
                        onChangeText={(value) => handleInputChange('city', value)}
                    />
                    {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Phone Number"
                        keyboardType="numeric"
                        value={formData.phoneNumber}
                        onChangeText={(value) => handleInputChange('phoneNumber', value)}
                    />
                    {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={formData.email}
                        onChangeText={(value) => handleInputChange('email', value)}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        secureTextEntry
                        value={formData.password}
                        onChangeText={(value) => handleInputChange('password', value)}
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainContainer')}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default AdminSignupScreen;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
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
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});
