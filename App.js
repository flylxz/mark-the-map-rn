import React from 'react';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './store/store';

import {MarkerModal} from './components/MarkerModal';

import {MainStack} from './navigation/navigator';
import {MapScreen} from './screens/MapScreen';

enableScreens(true);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
      {/* <MapScreen houseId="1" /> */}
    </Provider>
  );
};

export default App;
