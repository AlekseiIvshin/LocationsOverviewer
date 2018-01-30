import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import { connect, Provider } from 'react-redux';

class LocationsListScreen extends Component {

  keyExtractor = (item) => {
    return item._id;
  }

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

  renderItem = ({item}) =>{
    return (
      <View>
        <Text>{item.name} ({item.lat}x{item.lng})</Text>
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

export default connect(mapStateToProps)(LocationsListScreen);
