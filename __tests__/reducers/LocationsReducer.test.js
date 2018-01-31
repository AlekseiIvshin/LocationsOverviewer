import ActionTypes from 'app/actions/LocationsActionTypes';
import reducer from 'app/reducers/LocationsReducer';

const TEST_INITIAL_STATE = {
  isLoading: false,
  locations: [],
  notes: []
};

describe('Locations reducer', () => {

  test('should returns initial state', () => {
    // Given
    const action = {
      type: 'ANY'
    };

    // When
    const actualStore = reducer(undefined, action);

    // Then
    expect(actualStore.locations).toEqual([]);
    expect(actualStore.notes).toEqual([]);
    expect(actualStore.isLoading).toBe(false);
  });

  test('should not clean current locations and indicate loading', () => {
    // Given
    const action = {
      type: ActionTypes.LOCATIONS_LOAD_REQUEST
    };
    var initialStore = {
      ...TEST_INITIAL_STATE,
      locations: [{
        name: 'Existed location',
        lat: -50,
        lng: -50
      }],
      notes: [{
        byName: 'Existed location',
        test: 'Im here'
      }]
    };

    // When
    const actualStore = reducer(initialStore, action);

    // Then
    expect(actualStore.locations).toEqual(initialStore.locations);
    expect(actualStore.notes).toEqual(initialStore.notes);
    expect(actualStore.isLoading).toBe(true);
  });

  test('should handle locations receiving failure', () => {
    // Given
    const action = {
      type: ActionTypes.LOCATIONS_LOAD_FAILURE,
      payload: 'Error'
    };

    // When
    const actualStore = reducer(TEST_INITIAL_STATE, action);

    // Then
    expect(actualStore.locations).toEqual(TEST_INITIAL_STATE.locations);
    expect(actualStore.notes).toEqual(TEST_INITIAL_STATE.notes);
    expect(actualStore.isLoading).toBe(false);
  });

  test('should handle locations receiving', () => {
    // Given
    const action = {
      type: ActionTypes.LOCATIONS_LOAD_SUCCESS,
      payload: {
        locations: [{
          name: 'New location',
          lat: -50,
          lng: -50
        }]
      }
    };

    // When
    const actualStore = reducer({
      ...TEST_INITIAL_STATE,
      locations: []
    }, action);

    // Then
    expect(actualStore.locations).toEqual(action.payload.locations);
    expect(actualStore.notes).toEqual(TEST_INITIAL_STATE.notes);
    expect(actualStore.isLoading).toBe(false);
  });

  test('should add current locations with loaded, when they are new', () => {
    // Given
    const action = {
      type: ActionTypes.LOCATIONS_LOAD_SUCCESS,
      payload: {
        locations: [{
          name: 'New location',
          lat: 50,
          lng: 50
        }]
      }
    };

    // When
    var initialState = {
      ...TEST_INITIAL_STATE,
      locations: [{
        name: 'Existed location',
        lat: -50,
        lng: -50
      }]
    };
    const actualStore = reducer(initialState, action);

    // Then
    expect(actualStore.locations).toContainEqual(action.payload.locations[0]);
    expect(actualStore.locations).toContainEqual(initialState.locations[0]);
    expect(actualStore.notes).toEqual(TEST_INITIAL_STATE.notes);
    expect(actualStore.isLoading).toBe(false);
  });

  test('should update current locations with loaded, when they are existed', () => {
    // Given
    const action = {
      type: ActionTypes.LOCATIONS_LOAD_SUCCESS,
      payload: {
        locations: [{
          name: 'Existed location',
          lat: 50,
          lng: 50
        }]
      }
    };

    // When
    var initialState = {
      ...TEST_INITIAL_STATE,
      locations: [{
        name: 'Existed location',
        lat: -50,
        lng: -50
      }]
    };
    const actualStore = reducer(initialState, action);

    // Then
    expect(actualStore.locations).toContainEqual(action.payload.locations[0]);
    expect(actualStore.notes).toEqual(TEST_INITIAL_STATE.notes);
    expect(actualStore.isLoading).toBe(false);
  });

  test('should add new location', () => {
    // Given
    const name = 'New location';
    const coordinates = {
      lat: 50,
      lng: 50
    };
    const action = {
      type: ActionTypes.LOCATIONS_ADD_NEW,
      payload: {
        name,
        coordinates
      }
    };

    // When
    var initialState = {
      ...TEST_INITIAL_STATE,
      locations: [{
        name: 'Existed location',
        lat: -50,
        lng: -50
      }]
    };
    const actualStore = reducer(initialState, action);

    // Then
    expect(actualStore.locations).toContainEqual({ name, ...coordinates });
    expect(actualStore.locations).toContainEqual(initialState.locations[0]);
    expect(actualStore.notes).toEqual(TEST_INITIAL_STATE.notes);
    expect(actualStore.isLoading).toBe(false);
  });
});