import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import RootStackScreen from './navigation';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <RootStackScreen />
    </Provider>
  );
};

export default App;
