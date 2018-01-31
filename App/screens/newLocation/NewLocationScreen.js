import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import LocationsActions from 'app/actions/LocationsActions';

class NewLocationScreen extends Component {

  static propTypes = {
    coordinates: PropTypes.object.isRequired,
    addNewLocation: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: ''
    }
  }

  handleAddNew = () => {
    this.props.addNewLocation(this.props.coordinates, this.state.name);
    this.props.navigation.goBack();
  };

  handleNameChanges = (name) => this.setState({ name: name.trim() });

  render() {
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
          styles={styles.openList}
          disabled={!this.state.name}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});


const mapStateToProps = (state, props) => {
  return {
    coordinates: props.navigation.state.params.coordinates,
  };
};

export default connect(mapStateToProps, {
  ...LocationsActions,
})(NewLocationScreen);
