import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../config';
import React, {useState} from 'react';
const experts = [
  {id: '1', category: 'mental', name: 'Psychologist'},
  {id: '2', category: 'legal', name: 'Lawyers'},
  {id: '3', category: 'nutrition', name: 'Nutritionist'},
  {id: '4', category: 'beauty', name: 'Beautician'},
];

const ExpertItem = ({name, category, data}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        navigation.navigate('SearchConsultant', {expertsData: data.filter(item => item.category === category)});
      }}>
      <Text style={styles.itemText}>{name}</Text>
      <FontAwesome name="chevron-right" size={20} color="black" />
    </TouchableOpacity>
  );
};

const SearchConsultantScreen = () => {
  const navigation = useNavigation();
  const [expertsData, setExpertsData] = useState([]);
  const fetchExperts = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    try {
      const response = await axios.get(`${BASE_URL}/user/getActiveExperts`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = response.data.data;
      setExpertsData(data);
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
      fetchExperts();

      return () => {
        setExpertsData([]);
      };
    }, []),
  );
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>Experts</Text>
        <Text style={styles.subTitle}>Wide selection of specialties</Text>
        <FlatList
          data={experts}
          renderItem={({item}) => (
            <ExpertItem
              category={item.category}
              name={item.name}
              data={expertsData}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

export default SearchConsultantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  subTitle: {
    fontSize: 14,
    color: '#8E8E8E',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});
