import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

class LocationsListScreen extends Component {

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
          this.props.navigation.navigate('Details', {location: item})
        }}
        style={styles.item}
      >
        <Text>{item.name} ({item.lat}x{item.lng})</Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  item: {
    padding: 16
  }
});

const mapStateToProps = (state) => {
  return {
    locations: state.locations.locations,
  };
};

export default connect(mapStateToProps)(LocationsListScreen);
