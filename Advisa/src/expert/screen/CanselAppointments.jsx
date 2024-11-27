import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';

const CancelAppointments = ({navigation}) => {
  const [showReasonSelection, setShowReasonSelection] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState(''); // State for other reason input
  const reasons = [
    'Scheduling Conflict',
    'Personal Reasons',
    'Health Issues',
    'Other',
  ];

  const handleCancellation = () => {
    // Logic for cancelling the appointment (API call or state management can go here)

    // After cancellation, send a message to the patient
    const cancellationMessage =
      'Your appointment has been cancelled successfully.';
    sendMessageToPatient(cancellationMessage);
  };

  const sendMessageToPatient = message => {
    // Here you can implement the logic to send the message to the patient
    // This could involve an API call to your backend service

    // For now, we'll use an alert to simulate sending a message
    Alert.alert('Message Sent', message);

    // Optionally, navigate back to the dashboard after sending the message
    navigation.navigate('DashBoard');
  };

  const confirmCancellation = () => {
    if (selectedReason === 'Other' && !otherReason) {
      Alert.alert(
        'Input Required',
        'Please specify the reason for cancellation.',
      );
      return;
    }

    if (selectedReason || otherReason) {
      handleCancellation();
    } else {
      Alert.alert(
        'Select a reason',
        'Please select a reason for cancellation.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Cancel Appointment</Text>
        <Text style={styles.message}>
          Are you sure you want to cancel your appointment?
        </Text>

        {showReasonSelection ? (
          <View style={styles.reasonContainer}>
            <Text style={styles.reasonTitle}>Select a Reason:</Text>
            {reasons.map((reason, index) => (
              <TouchableOpacity
                key={index}
                style={styles.reasonButton}
                onPress={() => {
                  setSelectedReason(reason);
                  setShowReasonSelection(false); // Hide selection after picking
                  if (reason !== 'Other') {
                    setOtherReason(''); // Clear the input if not selecting 'Other'
                  }
                }}>
                <Text style={styles.reasonButtonText}>{reason}</Text>
              </TouchableOpacity>
            ))}

            {selectedReason === 'Other' && (
              <TextInput
                style={styles.otherReasonInput}
                placeholder="Please specify..."
                value={otherReason}
                onChangeText={setOtherReason}
              />
            )}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.selectReasonButton}
            onPress={() => setShowReasonSelection(true)}>
            <Text style={styles.selectReasonText}>
              {selectedReason || 'Select Reason for Cancellation'}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={confirmCancellation}>
          <Text style={styles.confirmButtonText}>Confirm Cancellation</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('DashBoard')}>
          <Image
            source={require('../assets/home.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('BlogS1')}>
          <Image
            source={require('../assets/blog.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Blog</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('ProblemPosts')}>
          <Image
            source={require('../assets/queries.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Queries</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Chat')}>
          <Image
            source={require('../assets/chat.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('ExpertAccount')}>
          <Image
            source={require('../assets/account.png')}
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
    justifyContent: 'space-between', // Ensures the bottomNav stays at the bottom
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
    justifyContent: 'center', // Centers the content vertically
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  selectReasonButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  selectReasonText: {
    color: '#333',
    fontSize: 16,
  },
  reasonContainer: {
    marginBottom: 20,
  },
  reasonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  reasonButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  reasonButtonText: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  otherReasonInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#ff6f61',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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

export default CancelAppointments;
