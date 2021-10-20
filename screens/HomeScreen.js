import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TouchComponent} from '../components/TouchComponent';
import {useGetHouseListQuery} from '../service/house';
import {fetchHousesAsync} from '../store/houseSlice';

export const HomeScreen = ({navigation}) => {
  const {data, error, isLoading} = useGetHouseListQuery();

  const renderHouseList = ({item}) => {
    return (
      <TouchComponent onPress={() => navigation.navigate('Map', {item})}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: item.image}}
              // source={require('../assets/images/003.webp')}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          <View style={styles.title}>
            <Text>{item.title}</Text>
          </View>
        </View>
      </TouchComponent>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View>
        {!!error ? (
          <Text>Oh no, there was an error</Text>
        ) : isLoading ? (
          <Text>Loading...</Text>
        ) : !!data ? (
          <View>
            <FlatList
              contentContainerStyle={styles.list}
              data={data}
              keyExtractor={item => `${item.id}`}
              renderItem={renderHouseList}
            />
          </View>
        ) : (
          <Text>nothing</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    // flex: 1,
    // alignItems: 'center',
    backgroundColor: '#e3e3e3',
    paddingTop: 20,
    paddingBottom: 50,
    // marginBottom: 150,
  },
  card: {
    minHeight: 300,
    backgroundColor: 'white',
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  imageContainer: {
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    alignItems: 'center',
    marginBottom: 10,
  },
});
