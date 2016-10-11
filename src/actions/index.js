import fetch from 'isomorphic-fetch';
import conf from 'config';

let uid = 0

export const ADD_TODO = 'ADD_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const FETCH_ARTICLES_START = 'FETCH_ARTICLES_START';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';

export const addTodo = (text) => {
  return {
    type: ADD_TODO,
    id: uid++,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    id
  }
}

export const fetchArticlesStart = () => {
  return {
    type: FETCH_ARTICLES_START
  }
}

export const fetchArticlesSucces = (json) => {
  return {
    type: FETCH_ARTICLES_SUCCESS,
    data: json.data
  }
}

export function fetchArticles() {
  return dispatch => {
    dispatch(fetchArticlesStart());
    return fetch(conf.articlesUrl)
      .then(response => response.json())
      .then(json => {
        dispatch(fetchArticlesSucces(json))
      })
  }
}
