//import { combineReducers } from 'redux';
import { ADD, MINUS, CLICK_STAR } from '../actions/rating_stars.action';


const ratingStar = (state, action) => {
  switch (action.type) {
    case ADD:
      console.log('add star');
      return state.starNum < 20 ? Object.assign({}, state, { starNum: state.starNum + 1 }) : state;

    case MINUS:
      console.log('minus star');
      return state.starNum > 0 ? Object.assign({}, state, { starNum: state.starNum - 1 }) : state;

    case CLICK_STAR:
      console.log('click star',action.payload);
      return  Object.assign({}, state, {litStarNum: action.payload + 1});

    default:
      return state;
  }
}

export default ratingStar;