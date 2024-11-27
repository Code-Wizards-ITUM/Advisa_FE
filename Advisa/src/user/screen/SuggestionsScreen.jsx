import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../config';

import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

const SuggestionsScreen = ({route}) => {
  const {postId} = route.params;
  const navigation = useNavigation();

  const [comments, setComments] = useState([]);
  const [showReplies, setShowReplies] = useState({});
  const fetchComments = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    try {
      const response = await axios.get(
        `${BASE_URL}/expert/getSuggestions/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      const data = response.data.data;
      setComments(data);
    } catch (error) {
      if (error.response) {
        Alert.alert('Failed to load Posts', error.response.data.message);
      } else if (error.request) {
        Alert.alert(
          'Failed to load Posts',
          'Network error. Please try again later.',
        );
      } else {
        Alert.alert('Failed to load Posts', 'An unexpected error occurred.');
      }
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchComments();

      return () => {
        setComments([]);
      };
    }, []),
  );

  const toggleRepliesVisibility = commentId => {
    setShowReplies(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <FlatList
        data={comments}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <CommentItem
            navigation={navigation}
            comment={item}
            showReplies={showReplies[item.id]}
            toggleReplies={() => toggleRepliesVisibility(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No Suggestions yet</Text>}
        contentContainerStyle={{paddingBottom: 80}}
      />
    </KeyboardAvoidingView>
  );
};

const CommentItem = ({comment, showReplies, toggleReplies, navigation}) => {
  return (
    <View style={styles.commentItem}>
      <View style={styles.commentHeader}>
        <View style={styles.commentAvatar}>
          <FontAwesome name="user-circle" size={35} color="#ccc" />
        </View>
        <View style={styles.commentContent}>
          <TouchableOpacity
            onPress={() => profileClick(comment.expertId, navigation)}>
            <Text style={styles.username}>{comment.expertName}</Text>
          </TouchableOpacity>

          <Text style={{textAlign: 'justify'}}>{comment.content}</Text>
          <View style={styles.commentActions}>
            {comment.replies.length > 0 && (
              <TouchableOpacity onPress={toggleReplies}>
                <Text style={styles.replyButton}>
                  {showReplies
                    ? 'Hide Replies'
                    : `View Replies (${comment.replies.length})`}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {showReplies && comment.replies.length > 0 && (
        <FlatList
          data={comment.replies}
          keyExtractor={reply => reply.id}
          renderItem={({item}) => (
            <ReplyItem reply={item} navigation={navigation} />
          )}
          style={styles.repliesContainer}
        />
      )}
    </View>
  );
};
const profileClick = async (id, navigation) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await axios.get(`${BASE_URL}/user/getExpert/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = response.data.data;
    navigation.navigate('ConsultantProfile', {
      data: data,
    });
  } catch (error) {
    if (error.response) {
      Alert.alert('Failed to load Posts', error.response.data.message);
    } else if (error.request) {
      Alert.alert(
        'Failed to load Posts',
        'Network error. Please try again later.',
      );
    } else {
      Alert.alert('Failed to load Posts', 'An unexpected error occurred.');
    }
  }
};
const ReplyItem = ({reply, navigation}) => {
  return (
    <View style={styles.replyItem}>
      <View style={styles.commentHeader}>
        <View style={styles.commentAvatar}>
          <FontAwesome name="user-circle" size={35} color="#ccc" />
        </View>
        <View style={styles.commentContent}>
          <TouchableOpacity
            onPress={() => profileClick(reply.expertId, navigation)}>
            <Text style={styles.username}>{reply.expertName}</Text>
          </TouchableOpacity>
          <Text style={{textAlign: 'justify'}}>{reply.content}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,

    backgroundColor: '#fff',
  },

  commentItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10, // Rounded borders for comments
    backgroundColor: '#f7f7f7', // Light background for comments
  },
  commentHeader: {
    flexDirection: 'row',
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor: '#ccc',
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentActions: {
    flexDirection: 'row',
    marginTop: 5,
  },
  replyButton: {
    color: 'blue',
    marginRight: 10,
  },
  repliesContainer: {
    marginTop: 10,
    paddingLeft: 20, // Indent replies
  },
  replyItem: {
    paddingLeft: 20,
    marginBottom: 5,
    padding: 5,
    backgroundColor: '#ebebeb',
    borderRadius: 10, // Rounded borders for replies
  },
  username: {
    fontWeight: 'bold',
  },
  replyContext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});

export default SuggestionsScreen;
