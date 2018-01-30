import { createAction } from 'redux-actions';
import ActionTypes from 'app/actions/LocationsActionTypes';
import RNDataFetcher from 'react-native-data-fetcher';

const URL = 'http://bit.ly/test-locations';

async function fetch(dispatch) {
  dispatch(createAction(ActionTypes.LOCATIONS_LOAD_REQUEST)());
  try {
    var result = await RNDataFetcher.fetch(URL);
    dispatch(createAction(ActionTypes.LOCATIONS_LOAD_SUCCESS)(result));
  } catch (error) {
    dispatch(createAction(ActionTypes.LOCATIONS_LOAD_FAILURE)(error))
  }
}

const loadLocations = () => (dispatch) => {
  fetch(dispatch);
};

export default {
  loadLocations,
};
