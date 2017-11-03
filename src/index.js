import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import storeConfig from './stores';
import Immutable from 'immutable';

const $$init_state = Immutable.fromJS({
  ratingStarState: { starNum: 4, litStarNum: 2 },
  delayAddState: { isFetching: false }
})



const store = storeConfig($$init_state);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
