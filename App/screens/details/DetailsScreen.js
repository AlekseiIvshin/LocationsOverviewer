import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import LocationsActions from 'app/actions/LocationsActions';

import styles from 'app/screens/details/DetailsScreenStyles';

/**
 * Screen shows detailed location information and provide ability to change location note.
 */
class DetailsScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.location.name,
  });

  static propTypes = {
    location: PropTypes.object.isRequired,
    updateNote: PropTypes.func.isRequired,
    note: PropTypes.object,
  };

  static defaultProps = {
    note: { text: '' }
  };

  handleNoteChanges = (text) => {
    this.props.updateNote(this.props.location, text);
  };

  render() {
    const { lat, lng } = this.props.location;
    return (
      <View style={styles.container}>
        <Text> {lat} x {lng}</Text>
        <TextInput
          onChangeText={this.handleNoteChanges}
          numberOfLines={4}
          multiline={true}
          placeholder="Enter notes"
          value={this.props.note.text}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  const location = props.navigation.state.params.location;
  const locationNote = _.find(state.locations.notes, (note) => {
    return note.byName === location.name;
  });
  return {
    location,
    note: locationNote,
  };
};

export default connect(mapStateToProps, {
  ...LocationsActions
})(DetailsScreen);