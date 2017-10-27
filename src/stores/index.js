import { createStore/*, applyMiddleware */ } from 'redux';
import ratingStarReducer from '../reducers/rating_stars.reducer';

const storeConfig = (init_state) => {
  return createStore(ratingStarReducer, init_state);
}

export default storeConfig;

