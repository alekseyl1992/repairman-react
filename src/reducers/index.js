import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { RECALCULATE } from '../actions';

const updateResults = (state, action) => {
  switch (action.type) {
    case RECALCULATE:
      return {
        id: action.id,
        results: action.data
      };
    default:
      if (!state) {
        return {
          id: action.id,
          results: []
        };
      }

      return state;
  }
}

export default combineReducers({
  routing: routeReducer,
  updateResults
});
