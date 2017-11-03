import React from 'react';
import Star from '../containers/star.container';
import styles from '../styles/rating_stars.styles';

const Stars = ({ starNum, litStarNum }) => {
  let stars = [], _count = starNum;

  while (_count) {
    let tag = starNum - _count;
    let _lit = tag < litStarNum;

    stars.push(<Star key={tag} lit={_lit} tag={tag} />);
    _count--;
  }

  return <div style={styles.stars}>{stars}</div>
}

Stars.defaultProps = {
  starNum:6,
  litStarNum:1
}

export default Stars;