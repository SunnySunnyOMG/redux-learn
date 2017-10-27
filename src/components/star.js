import React from 'react';
const getStyle = lit => { return { height: 30, width: 30, margin: 10, border: '2px solid', backgroundColor: lit ? 'yellow' : undefined } };


const Star = ({ lit, onClick, tag }) =>  <div style={getStyle(lit)} onClick={()=>onClick(tag)} />
  
export default Star;