import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const SideBar = ({value, onPress}) => {
  return (
    <View style={styles.container}>
      {value.map(v => (
        <TouchableOpacity
          key={v.id}
          onPress={() => onPress(v.coords)}
          style={styles.touch}>
          <Text style={styles.text}>{v.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    right: 10,
    backgroundColor: 'beige',
    width: 100,
    height: 300,
  },
  touch: {
    paddingVertical: 10,
  },
  text: {
    color: 'black',
  },
});
