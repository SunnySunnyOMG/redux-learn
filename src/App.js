import React, { Component } from 'react';
import './App.css';
import logo from'./logo.png';
import RatingStars from './containers/rating_stars.container';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
           <img src={logo} className="App-logo" alt="logo" /> 
          <h1 className="App-title">React Redux Demo</h1>
          <h5 className="sub-title">by Wooko Inc.</h5>
        </header>
        <div className="content">
          <RatingStars />
        </div>
      </div>
    );
  }
}

export default App;
