import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export const HomeScreen = ({navigation}) => {
  const initialRegion = {
    latitude: 50.0314,
    longitude: 36.2219,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={{marginTop: Platform.OS === 'android' ? 250 : 0}}>
          Home
        </Text>

        <Button
          title="to map"
          onPress={() => navigation.navigate('Map', {initialRegion})}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
