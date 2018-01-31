import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import LocationsActions from 'app/actions/LocationsActions';

class DetailsScreen extends Component {

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
    const { name, lat, lng } = this.props.location;
    return (
      <View style={styles.container}>
        <Text>{name}</Text>
        <Text>({lat}x{lng})</Text>
        <TextInput
          onChangeText={this.handleNoteChanges}
          numberOfLines={4}
          multiline={true}
          value={this.props.note.text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  }
});

const mapStateToProps = (state, props) => {
  const location = props.navigation.state.params.location;
  const note = _.find(state.locations.notes, (note) => {
    return note.byName === location.name;
  });
  return {
    location,
    note,
  };
};

export default connect(mapStateToProps, {
  ...LocationsActions
})(DetailsScreen);