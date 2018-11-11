import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: [5, 5],
      gameRunning: false
    }

    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
  }

  handleRowChange(event) {
    if (!this.state.gameRunning){
      var actualSize = this.state.size;

      if(event.target.value >= 5) actualSize[0] = event.target.value;

      this.setState({ size: actualSize });
      this.renderBoard();
    }
  }

  handleColumnChange(event) {
    if (!this.state.gameRunning){
      var actualSize = this.state.size;

      if(event.target.value >= 5) actualSize[1] = event.target.value;
      
      this.setState({ size: actualSize });
      this.renderBoard();
    }
  }

  startGame() {
    if(!this.state.gameRunning){
      this.setState({
        gameRunning: true
      }, () => {
        //this.intervalRef = setInterval(() => this.runGame(), 10);
      });
    }
  }

  stopGame() {
    this.setState({
      gameRunning: false
    }, () => {
      clearInterval(this.intervalRef);
    });
  }

  renderBoard() {
    var newWorld = [];
    var column = [];

    for(var row = 0; row < this.state.size[0]; row++){
      for(var col = 0; col < this.state.size[1]; col++){
        column.push(<Cell key={[row, col]} />);
      }
      newWorld.push(<div className="column" key={row}>{column}</div>);
      column = [];
    }

    return newWorld;
  }

  render() {
    return (
      <div className="contentWrapper">
        <div className="headerContainer">
          <div className="inputsContainer">
            <label className="label">
              Rows:
              <input className="input" type="text" value={ this.state.size[0] } onChange={ this.handleRowChange } />
            </label>
            <label className="label">
              Columns:
              <input className="input" type="text" value={ this.state.size[1] } onChange={ this.handleColumnChange } />
            </label>
          </div>
          <div className="buttonsContainer">
            <button className="submit" onClick={ this.startGame }>Start</button>
            <button className="submit" onClick={ this.stopGame }>Stop</button>
          </div>
        </div>
        <div className="boardContainer">
          { this.renderBoard() }
        </div>
      </div>
    );
  }
}

class Cell extends Component {
  render() {
    return (
      <div className="cellContainer"></div>
    );
  }
}
