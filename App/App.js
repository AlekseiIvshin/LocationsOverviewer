import React, { Component } from 'react';

import ActivityIndicatorComponent from 'app/components/ActivityIndicator/ActivityIndicatorComponent';

import { Provider } from 'react-redux';

import RootNavigation from 'app/RootNavigation';

import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from 'app/configureStore';

let { store, persistor } = configureStore();

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicatorComponent/>} persistor={persistor}>
          <RootNavigation/>
        </PersistGate>
      </Provider>
    );
  }
}