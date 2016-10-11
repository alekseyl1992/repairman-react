import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import todos from './todos'
import articles from './articles'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  routing: routeReducer,
  todos,
  articles,
  visibilityFilter
});
