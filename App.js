import React, {useReducer, useRef, useState} from 'react';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './store/store';

import {MarkerModal} from './components/MarkerModal';

import {MainStack} from './navigation/navigator';

enableScreens(true);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack />
        <MarkerModal />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
