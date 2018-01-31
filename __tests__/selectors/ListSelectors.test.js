import { sortByDistance } from 'app/selectors/ListSelectors';

describe('List selectors', () => {

  it('should sort by distance', () => {
    // given
    const locations = [{
      lat: -50,
      lng: -50,
    }, {
      lat: -40,
      lng: -40,
    }, {
      lat: -30,
      lng: -30,
    }];

    // when
    const actualLocations = sortByDistance({
      locations: { locations }
    }, {
      lat: -20,
      lng: -20
    });

    // then
    expect(actualLocations[0]).toEqual(locations[2]);
    expect(actualLocations[1]).toEqual(locations[1]);
    expect(actualLocations[2]).toEqual(locations[0]);
  });

  it('should sort by distance for another coordinates', () => {
    // given
    const locations = [{
      lat: -50,
      lng: -50,
    }, {
      lat: -40,
      lng: -40,
    }, {
      lat: -30,
      lng: -30,
    }];

    // when
    const actualLocations = sortByDistance({
      locations: { locations }
    }, {
      lat: -60,
      lng: -60
    });

    // then
    expect(actualLocations[0]).toEqual(locations[0]);
    expect(actualLocations[1]).toEqual(locations[1]);
    expect(actualLocations[2]).toEqual(locations[2]);
  });

});