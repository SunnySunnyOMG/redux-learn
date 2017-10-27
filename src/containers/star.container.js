import React from 'react';
import Star from '../components/star';
import { connect } from 'react-redux'

import { CLICK_STAR, lightStarAction } from '../actions/rating_stars.action';

const _Star = ({ onClick, lit, tag }) => <Star lit={lit} tag={tag} onClick={(tag)=>{onClick(tag); console.log('tag:', tag)}} />

// const mapStateToProps = state =>{
//   return{
//     lit:
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (tag) => dispatch(lightStarAction(CLICK_STAR, tag))
  }
}

export default connect(null, mapDispatchToProps)(_Star);