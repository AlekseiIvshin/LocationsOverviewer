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

class HomeScreen extends Component {

  static propTypes = {
    locations: PropTypes.array.isRequired,
    loadLocations: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadLocations();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Home screen</Text>
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
