import { FETCH_ARTICLES_START, FETCH_ARTICLES_SUCCESS } from '../actions';

let defaultState = {
  isLoading: false,
  items: []
}

const articles = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_SUCCESS:
      return {
        isLoading: false,
        items: [
          ...action.data
        ]
      }
    case FETCH_ARTICLES_START:
      return {
        isLoading: true,
        items: state.items
      }
    default:
      return state
  }
}

export default articles
