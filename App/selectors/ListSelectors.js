import _ from 'lodash';

export function sortByDistance(state, coordinates) {
  return _.sortBy(state.locations.locations, (location) => {
    return Math.sqrt((coordinates.lat - location.lat) ** 2 + (coordinates.lng - location.lng) ** 2);
  });
}