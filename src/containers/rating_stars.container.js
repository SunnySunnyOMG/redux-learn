import React from 'react';
import Stars from '../components/stars';
import Button from '../components/button';
import InfoPanel from '../components/info_panel';
import styles from '../styles/rating_stars.styles';

import { connect } from 'react-redux'
import { ADD, MINUS, starNumModifyAction, starNumDelayAddAsyncAction } from '../actions/rating_stars.action';

const RatingStars = ({ starNum, litStarNum, onClickAdd, onClickMinus, onClickDelayAdd ,infoPanelValue, infoPanelStatus}) => {
  console.log('=====render rating stars======')
  return <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
    <Stars starNum={starNum} litStarNum={litStarNum} />
    <InfoPanel value={infoPanelValue} status={infoPanelStatus}/>
    <div style={styles.buttons}>
      <Button title='Add' onClick={onClickAdd} />
      <Button title='Minus' onClick={onClickMinus} />
      <Button title='Delay Add' onClick={onClickDelayAdd} />
    </div>
  </div>
}


const mapStateToProps = state => {
  console.log('isFetching', state.getIn(['delayAddState','isFetching']))
  
  return {
    starNum: state.getIn(['ratingStarState','starNum']),
    litStarNum: state.getIn(['ratingStarState','litStarNum']),
    infoPanelStatus: state.getIn(['delayAddState','isFetching']),
    infoPanelValue: state.getIn(['delayAddState','response'])
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onClickAdd: () => dispatch(starNumModifyAction(ADD)),
    onClickMinus: () => dispatch(starNumModifyAction(MINUS)),
    onClickDelayAdd:() => dispatch(starNumDelayAddAsyncAction())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RatingStars);