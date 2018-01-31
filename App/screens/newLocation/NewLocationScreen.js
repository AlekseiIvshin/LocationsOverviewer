import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import LocationsActions from 'app/actions/LocationsActions';
import styles from 'app/screens/newLocation/NewLocationScreenStyles';

/**
 * Screen for adding new location.
 */

class NewLocationScreen extends Component {
  static propTypes = {
    coordinates: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    locationNames: PropTypes.array.isRequired,
    addNewLocation: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }

  handleAddNew = () => {
    this.props.addNewLocation(this.props.coordinates, this.state.name);
    this.props.navigation.goBack();
  };

  handleNameChanges = (name) => {
    this.setState({ name: name.trim() });
  };

  render() {
    const isAddingEnabled = !!this.state.name && !this.props.locationNames.includes(this.state.name);
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Enter name"
          onChangeText={this.handleNameChanges}
          value={this.state.name}
        />
        <Button
          onPress={this.handleAddNew}
          title="Add"
          disabled={!isAddingEnabled}
        />
      </View>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    coordinates: props.navigation.state.params.coordinates,
    locationNames: state.locations.locations.map((location) => location.name)
  };
};

export default connect(mapStateToProps, {
  ...LocationsActions,
})(NewLocationScreen);
