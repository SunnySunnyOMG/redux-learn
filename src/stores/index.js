import { createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import ratingStarReducer from '../reducers/rating_stars.reducer';

const storeConfig = (init_state) => {
  return createStore(ratingStarReducer, init_state, applyMiddleware(thunk));
}

export default storeConfig;

