import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from 'app/components/ActivityIndicator/ActivityIndicatorComponentStyles';

/**
 * ActivityIndicator wrapper.
 */
export default class ActivityIndicatorComponent extends Component {

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }
}