import React from 'react';
import {
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

export const TouchComponent = ({children, onPress}) => {
  return Platform.OS === 'android' ? (
    <TouchableNativeFeedback
      onPress={onPress}
      useForeground
      background={TouchableNativeFeedback.Ripple('#e3e3e3')}>
      {children}
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
