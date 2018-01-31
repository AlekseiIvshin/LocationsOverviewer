import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { Marker } from 'react-native-maps';

export default class MarkerComponent extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    onCalloutPress: PropTypes.func.isRequired,
  };

  handleCalloutPress = () => {
    this.props.onCalloutPress(this.props.location);
  };

  render() {
    const { location } = this.props;
    return (
      <Marker
        coordinate={{
                latitude: location.lat,
                longitude: location.lng,
              }}
        title={location.name}
        onCalloutPress={this.handleCalloutPress}
      />
    );
  }
}
