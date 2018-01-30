import { createAction } from 'redux-actions';
import ActionTypes from 'app/actions/LocationsActionTypes';
import RNDataFetcher from 'react-native-data-fetcher';

const URL = 'http://bit.ly/test-locations';

const loadLocations = () => (dispatch) => {
  dispatch(createAction(ActionTypes.LOCATIONS_LOAD_REQUEST)());

  RNDataFetcher.fetch(URL)
    .then((data) => {
      console.log(data);
      dispatch(createAction(ActionTypes.LOCATIONS_LOAD_SUCCESS)(data));
    })
    .catch((error) => {
      dispatch(createAction(ActionTypes.LOCATIONS_LOAD_FAILURE)(error))
    })
};

export default {
  loadLocations,
};
