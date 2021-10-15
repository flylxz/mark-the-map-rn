import React, {useEffect} from 'react';
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

export const HomeScreen = ({navigation}) => {
  const {data, error, isLoading} = useGetHouseListQuery();
  const dispatch = useDispatch();
  const {houses} = useSelector(state => state);
  // console.log(data, error, isLoading);
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const renderHouseList = ({item}) => {
    return (
      <TouchComponent onPress={() => navigation.navigate('Map', {item})}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: item.image}}
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
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <View style={styles.list}>
          <FlatList
            data={data}
            keyExtractor={item => `${item.id}`}
            renderItem={renderHouseList}
          />

          {/* <Button
          title="to map"
          onPress={() => navigation.navigate('Map', {initialRegion})}
        /> */}
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#e3e3e3',
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
