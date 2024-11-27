import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../config';

import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

const ViewSugg = ({route}) => {
  const {postId} = route.params;
  const navigation = useNavigation();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
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

  const addComment = async () => {
    if (newComment.trim()) {
      try {
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const userToken = await AsyncStorage.getItem('userToken');
        const userPhoneNumber = await AsyncStorage.getItem('userPhoneNumber');
        const userName = await AsyncStorage.getItem('userName');
        const response = await axios.post(
          `${BASE_URL}/expert/addSuggestions`,
          {
            postId: postId,
            expertId: userPhoneNumber,
            parentId: replyingTo,
            date: date,
            content: newComment,
            expertName: userName,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        );
        if (response.status === 201) {
          setNewComment('');
          Alert.alert('Success', response.data.message);
          fetchComments();
        }
      } catch (error) {
        if (error.response) {
          Alert.alert('Failed to Add', error.response.data.message);
        } else if (error.request) {
          Alert.alert(
            'Failed to Add',
            'Network error. Please try again later.',
          );
        } else {
          Alert.alert('Failed to Add', 'An unexpected error occurred.');
        }
      }
    }
  };

  const toggleRepliesVisibility = commentId => {
    setShowReplies(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setNewComment('');
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
            onReply={() => setReplyingTo(item.id)}
            showReplies={showReplies[item.id]}
            toggleReplies={() => toggleRepliesVisibility(item.id)}
          />
          
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No Suggestions yet</Text>}
        contentContainerStyle={{paddingBottom: 80}}
      />

      <View style={styles.inputWrapper}>
        {replyingTo && (
          <View style={styles.replyContext}>
            <Text style={styles.replyingText}>
              Replying to{' '}
              {comments.find(item => item.id === replyingTo)?.expertName}'s
              Comment
            </Text>
            <TouchableOpacity onPress={cancelReply}>
              <Text style={styles.cancelReply}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={replyingTo ? 'Add a reply...' : 'Add a comment...'}
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addComment}>
            <FontAwesome name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const CommentItem = ({comment, onReply, showReplies, toggleReplies,navigation}) => {
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
          
          <Text style={{textAlign:"justify"}}>{comment.content}</Text>
          <View style={styles.commentActions}>
            <TouchableOpacity onPress={onReply}>
              <Text style={styles.replyButton}>Reply</Text>
            </TouchableOpacity>
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
const profileClick = (id, navigation) => {
  console.log(id);
  navigation.navigate('ConsultantProfile', {
    doctorname: id,
    category: id,
    rating: id,
    profileImage: id,
  });
};
const ReplyItem = ({reply,navigation}) => {
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

          <Text style={{textAlign:"justify"}}>{reply.content}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f1f1f1',
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
  },
  addBtn: {
    flex: 1,
    marginStart: 5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
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
  replyingText: {
    fontWeight: 'bold',
    color: 'blue',
  },
  cancelReply: {
    color: 'red',
  },
});

export default ViewSugg;
