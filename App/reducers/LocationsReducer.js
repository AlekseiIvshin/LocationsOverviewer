import _ from 'lodash';
import { handleActions } from 'redux-actions';

import ActionTypes from 'app/actions/LocationsActionTypes';

const initialState = {
  isLoading: false,
  locations:[]
};

function handleLoadLocationsRequest(state, action) {
  return {
    ...state,
    isLoading: true,
    locations:[]
  };
}

function handleLoadLocationsSuccess(state, action) {
  const loadedLocations =  _.map(action.payload.locations, (location, index)=> {
    return {
      ...location,
      _id: index
    }
  });

  return {
    lastUpdate: action.payload.updated,
    locations: _.merge([], state.locations, loadedLocations),
    isLoading: false
  };
}

function handleLoadLocationsFailure(state, action) {
  return {
    ...state,
    isLoading: false
  };
}


const reducer = handleActions(
  {
    [ActionTypes.LOCATIONS_LOAD_REQUEST]: handleLoadLocationsRequest,
    [ActionTypes.LOCATIONS_LOAD_SUCCESS]: handleLoadLocationsSuccess,
    [ActionTypes.LOCATIONS_LOAD_FAILURE]: handleLoadLocationsFailure,
  },
  initialState
);

export default reducer;