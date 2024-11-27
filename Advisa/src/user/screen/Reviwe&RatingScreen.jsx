import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  ProgressBarAndroid,
  Image,
  TouchableOpacity,
} from 'react-native';

// Dummy data
const reviews = [
  {
    id: '1',
    name: 'Joan Perkins',
    rating: 5,
    timeAgo: '1 day ago',
    reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    //image: require("../assets/blogimg.jpg"),
  },
  {
    id: '2',
    name: 'Frank Garrett',
    rating: 4,
    timeAgo: '4 days ago',
    reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '3',
    name: 'Jane Doe',
    rating: 4,
    timeAgo: '4 days ago',
    reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: '4',
    name: 'John Smith',
    rating: 3,
    timeAgo: '4 days ago',
    reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: '5',
    name: 'Alice Johnson',
    rating: 2,
    timeAgo: '4 days ago',
    reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
];

const ratingsDistribution = {
  excellent: 10,
  good: 5,
  average: 4,
  belowAverage: 3,
  poor: 1,
};

// Function to render star images based on the rating
const renderStars = rating => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <Image
          key={i}
          source={require('../assets/star.png')}
          style={styles.star}
        />,
      );
    } else if (i - rating === 0.5) {
      stars.push(
        <Image
          key={i}
          source={require('../assets/starh.png')}
          style={styles.star}
        />,
      );
    } else {
      stars.push(
        <Image
          key={i}
          source={require('../assets/star_empty.png')}
          style={styles.star}
        />,
      );
    }
  }
  return stars;
};

const ReviewRating = ({navigation}) => {
  // Calculate average rating dynamically
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <View style={styles.postContainer}>
      <ScrollView style={styles.container}>
        {/* Average rating section */}
        <View style={styles.header}>
          <Text style={styles.averageRating}>{averageRating.toFixed(1)}</Text>
          {renderStars(averageRating)}
          <Text style={styles.reviewCount}>
            based on {reviews.length} reviews
          </Text>
        </View>

        {/* Progress Bars */}
        <View style={styles.progressContainer}>
          {Object.keys(ratingsDistribution).map((key, index) => (
            <View style={styles.progressBarRow} key={index}>
              <Text style={styles.label}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={ratingsDistribution[key] / 10} // Assume total 10 is max
                color={key === 'poor' ? 'red' : 'green'}
                style={styles.progressBar}
              />
              <Text>{ratingsDistribution[key]}</Text>
            </View>
          ))}
        </View>

        {/* Reviews List */}
        <FlatList
          data={reviews}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.reviewItem}>
              <View style={styles.userDetails}>
                <Image source={{uri: item.image}} style={styles.avatar} />
                <View>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.timeAgo}>{item.timeAgo}</Text>
                </View>
              </View>
              <View style={styles.stars}>{renderStars(item.rating)}</View>
              <Text style={styles.reviewText}>{item.reviewText}</Text>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  averageRating: {
    fontSize: 48,
    fontWeight: 'bold',
    marginRight: 10,
  },
  reviewCount: {
    fontSize: 16,
    color: '#666',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 14,
  },
  progressBar: {
    flex: 4,
    marginRight: 10,
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  timeAgo: {
    color: '#666',
    fontSize: 12,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  star: {
    width: 16,
    height: 16,
    marginRight: 2,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
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

export default ReviewRating;
