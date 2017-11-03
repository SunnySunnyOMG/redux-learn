export const ADD = 'ADD';
export const MINUS = 'MINUS';
export const DELAY_ADD_REQUEST = 'DELAY_ADD_REQUEST';
export const DELAY_ADD_SUCCESS = 'DELAY_ADD_SUCCESS';
export const DELAY_ADD_FAILURE = 'DELAY_ADD_FAILURE';
//export const DELAY_MINUS = 'DELAY_MINUS';
export const CLICK_STAR = 'CLICK_STAR';

export const starNumModifyAction = (type, payload) => {
  switch (type) {
    case ADD:
      return { type: ADD }

    case MINUS:
      return { type: MINUS }

    default:
      console.error('undefined action type: ', type)
  }
}

export const starNumDelayAddAsyncAction = () => {
  return dispatch => {
    dispatch({ type: DELAY_ADD_REQUEST });
    mockAsyncServerCall(
      (response) => dispatch({ type: DELAY_ADD_SUCCESS, payload: response }),
      (response) => dispatch({ type: DELAY_ADD_FAILURE, payload: response })
    )
  }
}

export const lightStarAction = (type, payload) => {
  switch (type) {
    case CLICK_STAR:
      return { type: CLICK_STAR, payload };

    default:
      console.error('undefined action type: ', type)
  }

}


const mockAsyncServerCall = (success_callback, fail_callback) => {
  return new Promise((resolve, reject) =>
    setTimeout(()=>_randomResponse(success_callback, fail_callback, resolve, reject), 2000)
  )
}

const _randomResponse = (success_callback, fail_callback, resolve, reject) => {
  let isSuccess = Math.random() > 0.5;
  isSuccess ? success_callback('success') : fail_callback('failed');
  isSuccess ? resolve('success') : reject('failed');


  //resolve(isSuccess ? 'success' : 'failed')
}