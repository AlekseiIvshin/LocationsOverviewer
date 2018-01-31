import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import LocationsActions from 'app/actions/LocationsActions';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class HomeScreen extends Component {

  static propTypes = {
    locations: PropTypes.array.isRequired,
    loadLocations: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadLocations();
  }

  render() {

    const initialRegion = {
      latitude: -33.860178,
      longitude: 151.212706,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
          style={styles.maps}
        />
        <Button
          onPress={()=> this.props.navigation.navigate('LocationsList')}
          title="To list"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  maps: {
    ...StyleSheet.absoluteFillObject
  }
});


const mapStateToProps = (state) => {
  return {
    locations: state.locations.locations,
  };
};

export default connect(mapStateToProps, {
  ...LocationsActions,
})(HomeScreen);
