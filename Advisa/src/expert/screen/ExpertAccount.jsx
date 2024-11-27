import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Rating = ({rating}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.ratingContainer}>
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <Image
            key={`full-${index}`}
            source={require('../assets/star.png')}
            style={styles.starImage}
          />
        ))}
      {hasHalfStar && (
        <Image
          source={require('../assets/starh.png')}
          style={styles.starImage}
        />
      )}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <Image
            key={`empty-${index}`}
            source={require('../assets/star_empty.png')}
            style={styles.starImage}
          />
        ))}
    </View>
  );
};

const ExpertAccount = () => {
  const navigation = useNavigation();
  const expertRating = 4.5;

  const [biography, setBiography] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nDoctor Fee : Rs. 2500.00',
  );
  const [isEditing, setIsEditing] = useState(false);
  const [tempBiography, setTempBiography] = useState(biography);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setBiography(tempBiography);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempBiography(biography);
    setIsEditing(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={require('../assets/expert.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Dr. Sample</Text>
          <Text style={styles.profileDegree}>MBBS</Text>
        </View>

        {/* Biography Section */}
        <View style={styles.biographySection}>
          <Text style={styles.sectionTitle}>Biography </Text>
          {isEditing ? (
            <>
              <TextInput
                style={styles.biographyInput}
                value={tempBiography}
                onChangeText={setTempBiography}
                multiline
                editable
              />
              <View style={styles.editButtonRow}>
                <View style={styles.buttonWrapper}>
                  <Button title="Save" color="#3A68D7" onPress={handleSave} />
                </View>
                <View style={styles.buttonWrapper}>
                  <Button title="Cancel" color="gray" onPress={handleCancel} />
                </View>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.biographyText}>{biography}</Text>
              <View style={styles.editButtonContainer}>
                <Button
                  title="Edit Biography"
                  color="#3A68D7"
                  onPress={handleEdit}
                />
              </View>
            </>
          )}
        </View>

        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <Text style={styles.ratingText}>Review (5)</Text>
          <View style={styles.ratingValue}>
            <Rating rating={expertRating} />
            <Text style={styles.ratingNumber}>4.5</Text>
          </View>
        </View>

        {/* Review Section */}
        <View style={styles.reviewSection}>
          <Text style={styles.reviewerName}>Reviewer Name</Text>
          <Text style={styles.reviewDate}>Today</Text>
          <View style={styles.ratingRow}>
            <Rating rating={4.5} />
            <Text style={styles.reviewRating}>4.5</Text>
          </View>
          <Text style={styles.reviewText}>Review text</Text>
        </View>

        {/* See More Link */}
        <View style={styles.seeMoreContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ReviewR')}>
            <Text style={styles.seeMoreText}>See More...</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1, // This ensures content scrolls properly
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileDegree: {
    fontSize: 16,
    color: '#666',
  },
  biographySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  biographyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  biographyInput: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    minHeight: 100,
  },
  editButtonContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  editButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  ratingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 16,
    color: '#333',
  },
  ratingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginRight: 5,
  },
  starImage: {
    width: 20,
    height: 20,
    marginRight: 2,
  },
  ratingNumber: {
    fontSize: 16,
    color: '#666',
  },
  reviewSection: {
    marginBottom: 20,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 14,
    color: '#666',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  reviewRating: {
    fontSize: 16,
    marginLeft: 5,
    color: '#666',
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
  },
  seeMoreContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  seeMoreText: {
    fontSize: 16,
    color: '#3A68D7',
    textDecorationLine: 'underline',
  },
});

export default ExpertAccount;
