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
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MarkerComponent from 'app/screens/home/MarkerComponent';

class HomeScreen extends Component {

  static propTypes = {
    locations: PropTypes.array.isRequired,
    loadLocations: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      tempLocation: null,
    }
  }

  componentDidMount() {
    this.props.loadLocations();
  }

  removeTempMarker = () => {
    this.setState({
      tempLocation: null
    });
  };

  handlePressOnMap = (event) => {
    const coordinate = event.nativeEvent.coordinate;
    this.setState({
      tempLocation: {
        lng: coordinate.longitude,
        lat: coordinate.latitude,
      }
    });
  };

  handlePressOnCallout = (location) => {
    this.props.navigation.navigate('Details', { location })
  };

  handleOpenList = () => {
    this.props.navigation.navigate('LocationsList');
  };

  handleAddNew = () => {
    this.props.navigation.navigate('NewLocation', { coordinates: this.state.tempLocation });
    this.removeTempMarker();
  };

  render() {
    const initialRegion = {
      latitude: -33.860178,
      longitude: 151.212706,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    return (
      <View style={styles.container}>
        <Button
          onPress={this.handleOpenList}
          title="Open list"
          styles={styles.openList}
        />
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
          style={styles.maps}
          onPress={this.handlePressOnMap}
          onMarkerPress={this.removeTempMarker}
        >
          {this.props.locations.map(location => (
            <MarkerComponent
              key={location.name}
              location={location}
              onCalloutPress={this.handlePressOnCallout}
            />
          ))}
          {this.renderTempLocation()}
        </MapView>
        <Button
          onPress={this.handleAddNew}
          title="Add"
          styles={styles.openList}
          disabled={!this.state.tempLocation}
        />
      </View>
    );
  }

  renderTempLocation = () => {
    if (this.state.tempLocation) {
      const coordinate = {
        latitude: this.state.tempLocation.lat,
        longitude: this.state.tempLocation.lng,
      };
      return (
        <Marker
          coordinate={coordinate}
          pinColor="green"
          title={location.name}
        />
      );
    }
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  maps: {
    flex: 1
  },
  openList: {}
});


const mapStateToProps = (state) => {
  return {
    locations: state.locations.locations,
  };
};

export default connect(mapStateToProps, {
  ...LocationsActions,
})(HomeScreen);
