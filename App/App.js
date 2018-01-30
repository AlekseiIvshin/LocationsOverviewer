import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { StackNavigator, addNavigationHelpers } from 'react-navigation';

import rootReducer from 'app/reducers/rootReducer';

import HomeScreen from 'app/screens/home/HomeScreen';
import LocationsListScreen from 'app/screens/list/LocationsListScreen';
import DetailsScreen from 'app/screens/details/DetailsScreen';

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  LocationsList: {
    screen: LocationsListScreen,
  },
  Details: {
    screen: DetailsScreen,
  },
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <RootNavigator/>
      </Provider>
    );
  }
}