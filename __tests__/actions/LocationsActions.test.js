import actions from 'app/actions/LocationsActions';
import ActionTypes from 'app/actions/LocationsActionTypes';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

var mockFetch;

jest.mock('react-native-data-fetcher', () => {
  mockFetch = jest.fn();
  return {
    fetch: mockFetch,
  }
});

describe('Locations actions', () => {

  let store = null;

  beforeEach(function () {
    store = mockStore({});
    mockFetch.mockClear();
  });

  it('should fetch data from url', async () => {
    // given
    const payload = { locations: [], updated: [] };
    mockFetch.mockReturnValue(payload);

    // when
     await store.dispatch(actions.loadLocations());

    // then
    expect(mockFetch).toBeCalledWith('http://bit.ly/test-locations');
    expect(store.getActions()).toEqual([{
      type: ActionTypes.LOCATIONS_LOAD_REQUEST
    }, {
      type: ActionTypes.LOCATIONS_LOAD_SUCCESS,
      payload
    }])
  });

});