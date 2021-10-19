import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/HomeScreen';
import {MapScreen} from '../screens/MapScreen';
import {AddEditScreen} from '../screens/AddEditScreen';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        headerTransparent: true,
        // headerBlurEffect: 'systemChromeMaterial',
        animation: 'fade',
        // presentation: 'fullScreenModal',
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="AddEdit" component={AddEditScreen} />
    </Stack.Navigator>
  );
};
