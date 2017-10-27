export const ADD = 'ADD';
export const MINUS = 'MINUS';
export const CLICK_STAR = 'CLICK_STAR';

export const starNumModifyAction = type =>{
  switch(type){
    case ADD:
    return {type: ADD}

    case MINUS:
    return {type:MINUS}

    default:
    console.error('undefined action type: ', type)
  }
}

export const lightStarAction = (type, payload)=>{
  switch(type){
    case CLICK_STAR:
    return { type: CLICK_STAR, payload};

    default:
    console.error('undefined action type: ', type)
  }
  
}