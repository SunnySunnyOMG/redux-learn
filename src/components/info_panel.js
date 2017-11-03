import React from 'react';

const InfoPanel = ({value, status}) => <div style={style}>{status ? 'Fetching...' : value}</div>


const style ={
  height:40,
  width:300,
  //border:'2px solid grey',
  //borderRadius:30,
  textAlign:'center'
}

export default InfoPanel;