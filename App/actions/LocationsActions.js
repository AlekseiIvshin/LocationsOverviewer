import { createAction } from 'redux-actions';
import ActionTypes from 'app/actions/LocationsActionTypes';
import RNDataFetcher from 'react-native-data-fetcher';

const URL = 'http://bit.ly/test-locations';

async function fetchLocation(dispatch) {
  dispatch(createAction(ActionTypes.LOCATIONS_LOAD_REQUEST)());
  try {
    const result = await RNDataFetcher.fetch(URL);
    dispatch(createAction(ActionTypes.LOCATIONS_LOAD_SUCCESS)(result));
  } catch (error) {
    dispatch(createAction(ActionTypes.LOCATIONS_LOAD_FAILURE)(error));
  }
}

const loadLocations = () => (dispatch) => {
  fetchLocation(dispatch);
};

const updateNote = (location, text) => {
  return {
    type: ActionTypes.LOCATIONS_NOTE_UPDATE,
    payload: {
      location,
      text
    }
  };
};

const addNewLocation = (coordinates, name) => {
  return {
    type: ActionTypes.LOCATIONS_ADD_NEW,
    payload: {
      coordinates,
      name
    }
  };
};

export default {
  loadLocations,
  updateNote,
  addNewLocation,
};
