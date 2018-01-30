import _ from 'lodash';
import { handleActions } from 'redux-actions';

import ActionTypes from 'app/actions/LocationsActionTypes';

const initialState = {
  isLoading: false,
  locations: [],
  notes: []
};

function handleLoadLocationsRequest(state, action) {
  return {
    ...state,
    isLoading: true,
    locations: []
  };
}

function handleLoadLocationsSuccess(state, action) {
  return {
    ...state,
    lastUpdate: action.payload.updated,
    locations: _.unionBy( action.payload.locations,state.locations, 'name'),
    isLoading: false
  };
}

function handleLoadLocationsFailure(state, action) {
  return {
    ...state,
    isLoading: false
  };
}

function handleUpdateNote(state, action) {
  const { location, text } = action.payload;

  const newNotes = _.clone(state.notes);

  const noteIndex = _.findIndex(state.notes, (note) => {
    return note.byName === location.name;
  });

  if (noteIndex >= 0) {
    newNotes[noteIndex] = {
      ...newNotes[noteIndex],
      text
    };
  } else {
    newNotes.push({ text, byName: location.name });
  }

  return {
    ...state,
    notes: newNotes
  }
}

const reducer = handleActions(
  {
    [ActionTypes.LOCATIONS_LOAD_REQUEST]: handleLoadLocationsRequest,
    [ActionTypes.LOCATIONS_LOAD_SUCCESS]: handleLoadLocationsSuccess,
    [ActionTypes.LOCATIONS_LOAD_FAILURE]: handleLoadLocationsFailure,
    [ActionTypes.LOCATIONS_NOTE_UPDATE]: handleUpdateNote,
  },
  initialState
);

export default reducer;