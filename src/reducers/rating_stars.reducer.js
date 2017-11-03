//import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import { ADD, MINUS, DELAY_ADD_REQUEST, DELAY_ADD_SUCCESS, DELAY_ADD_FAILURE, CLICK_STAR } from '../actions/rating_stars.action';



const ratingStar = (state = { starNum: 5, litStarNum: 3 }, action) => {
  console.log('store state:', state)
  switch (action.type) {
    case ADD:
    case DELAY_ADD_SUCCESS:
      console.log('add star~');
      return state.get('starNum') < 20 ? state.set('starNum', state.get('starNum') + 1) : state;
    
    case MINUS:
      console.log('minus star~');
      return state.get('starNum') > 0 ? state.set('starNum', state.get('starNum') - 1) : state;

    case CLICK_STAR:
      console.log('click star~', action.payload);
      return state.set('litStarNum', action.payload + 1);

    default:
      return state;
  }
}

const delayAddStarReducer = (state = { isFetching: false, response: null }, action) => {
  let $$new_state = null;
  switch (action.type) {
    case DELAY_ADD_REQUEST:
      console.log('delay add start~', action.payload);
      return state.set('isFetching', true);

    case DELAY_ADD_SUCCESS:
      console.log('delay add success~', action.payload);

      $$new_state = Immutable.fromJS({
        //starNum: state.starNum + 1,
        isFetching: false,
        response: action.payload
      })
      return state.merge($$new_state)
    //Object.assign({}, state, new_state);


    case DELAY_ADD_FAILURE:
      console.log('delay add fail~', action.payload);
      let $$new_state = Immutable.fromJS({ isFetching: false, response: action.payload });
      return state.merge($$new_state);
    //return Object.assign({}, state, new_state);

    default: return state;
  }
}

export default combineReducers({ ratingStarState: ratingStar, delayAddState: delayAddStarReducer });