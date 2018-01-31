import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';

/**
 * Wrapper component for marker
 */
export default class MarkerComponent extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    onCalloutPress: PropTypes.func.isRequired,
  };

  handleCalloutPress = () => {
    this.props.onCalloutPress(this.props.location);
  };

  render() {
    const coordinate = {
      latitude: this.props.location.lat,
      longitude: this.props.location.lng,
    };
    return (
      <Marker
        coordinate={coordinate}
        title={this.props.location.name}
        onCalloutPress={this.handleCalloutPress}
      />
    );
  }
}
