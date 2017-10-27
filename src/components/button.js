import React from 'react';
const style ={
  height: 40,
  width: 200,
  borderRadius: 10,
  backgroundColor:'#d33',
  margin:30,
  lineHeight:'40px',
  color:'white'
}

const Button = ({title, onClick}) => <div style={style} onClick={onClick}>{title}</div>

export default Button;