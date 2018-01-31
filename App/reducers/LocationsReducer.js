import _ from 'lodash';
import { handleActions } from 'redux-actions';

import ActionTypes from 'app/actions/LocationsActionTypes';

const initialState = {
  isLoading: false,
  locations: [],
  notes: []
};

function handleLoadLocationsRequest(state) {
  return {
    ...state,
    isLoading: true,
  };
}

function handleLoadLocationsSuccess(state, action) {
  return {
    ...state,
    lastUpdate: action.payload.updated,
    locations: _.unionBy(action.payload.locations, state.locations, 'name'),
    isLoading: false
  };
}

function handleLoadLocationsFailure(state) {
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
  };
}

function handleAddNewLocation(state, action) {
  const { coordinates, name } = action.payload;

  return {
    ...state,
    locations: [...state.locations, { ...coordinates, name }]
  };
}

const reducer = handleActions(
  {
    [ActionTypes.LOCATIONS_LOAD_REQUEST]: handleLoadLocationsRequest,
    [ActionTypes.LOCATIONS_LOAD_SUCCESS]: handleLoadLocationsSuccess,
    [ActionTypes.LOCATIONS_LOAD_FAILURE]: handleLoadLocationsFailure,
    [ActionTypes.LOCATIONS_NOTE_UPDATE]: handleUpdateNote,
    [ActionTypes.LOCATIONS_ADD_NEW]: handleAddNewLocation,
  },
  initialState
);

export default reducer;