import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameView from './Components/Game/View.js';

class App extends Component {
    render() {
        return (
            <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Let's Play a Game 😈</h2>
        </div>
        <GameView />
      </div>
        );
    }
}

export default App;
