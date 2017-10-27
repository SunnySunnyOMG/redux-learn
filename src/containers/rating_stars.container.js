import React from 'react';
import Stars from '../components/stars';
import Button from '../components/button';
import styles from '../styles/rating_stars.styles';

import { connect } from 'react-redux'
import { ADD, MINUS, starNumModifyAction } from '../actions/rating_stars.action';

const RatingStars = ({ starNum, litStarNum, onClickAdd, onClickMinus }) => {
  console.log('=====render rating stars======')
  return <div>
    <Stars starNum={starNum} litStarNum={litStarNum} />
    <div style={styles.buttons}>
      <Button title='Add' onClick={onClickAdd} />
      <Button title='Minus' onClick={onClickMinus} />
    </div>
  </div>
}


const mapStateToProps = state => {
  return {
    starNum: state.starNum,
    litStarNum: state.litStarNum
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onClickAdd: () => dispatch(starNumModifyAction(ADD)),
    onClickMinus: () => dispatch(starNumModifyAction(MINUS))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RatingStars);