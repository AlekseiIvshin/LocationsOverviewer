import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styles from 'app/screens/list/LocationsListScreenStyles';
import { sortByDistance } from 'app/selectors/ListSelectors';

/**
 * Screen for list representation of locations.
 */

class LocationsListScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    locations: PropTypes.array.isRequired,
  };

  keyExtractor = (item) => {
    return item.name;
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.locations}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('Details', {location: item});
        }}
        style={styles.item}
      >
        <Text>{item.name} ({item.lat} x {item.lng})</Text>
      </TouchableOpacity>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    locations: sortByDistance(state, { lat: -33, lng: 151 })
  };
};

export default connect(mapStateToProps)(LocationsListScreen);
