import React, { Component } from 'react';
import './App.css';
import Cards from './Cards';
import Cell from './Cell';

export default class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      size: [4, 4]
    };
    this.cards = new Cards(this.state.size[0]*this.state.size[1]);
    this.renderBoard = this.renderBoard.bind(this);
    this.onCardClicked = this.onCardClicked.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  renderBoard() {
    let cells = [];
    let onClick = this.onCardClicked;

    this.cards.cards.forEach( c => {
      let card = <Cell key = {c.id}
        id = {c.id}
        image = {c.image}
        turnedUp = {c.turnedUp}
        matched = {c.matched}
        onClick = {onClick} />
        cells.push(card);
    });

    return cells;
  }

  componentWillMount(){
    this.initGame();
  }

  startGame(){
    this.initGame();
  }

  initGame(){
    this.cards.generateCardSet();
    this.setState({
      turnNumber: 1,
      pairsFound: 0,
      numberOfClicks: 0,
      firstId: undefined,
      secondId: undefined
    });
  }

  clearCards(id1, id2){
    if(this.state.numberOfClicks !== 2) return;

    this.cards.flipCard(this.state.firstId, false);
    this.cards.flipCard(this.state.secondId, false);
    this.setState({
      firstId: undefined,
      secondId: undefined,
      numberOfClicks: 0,
      turnNumber: this.state.turnNumber+1
    });
  }

  onCardClicked(id){
    if(this.state.numberOfClicks === 0 || this.state.numberOfClicks === 2){
      if(this.state.numberOfClicks === 2){
        clearTimeout(this.timeout);
        this.clearCards(this.state.firstId, this.state.secondId);
      }

      this.cards.flipCard(id, true);
      this.setState({
        firstId: id,
        numberOfClicks: 1
      });
    } else if (this.state.numberOfClicks === 1){
      this.cards.flipCard(id, true);
      this.setState({
        secondId: id,
        numberOfClicks: 2
      });

      if(this.cards.cardsAreIdentical(this.state.firstId, id)){
        this.cards.matchCard(this.state.firstId, true);
        this.cards.matchCard(id, true);
        this.setState({
          pairsFound: this.state.pairsFound+1,
          firstId: undefined,
          secondId: undefined,
          turnNumber: this.state.turnNumber+1,
          numberOfClicks: 0
        });
      } else {
        this.timeout = setTimeout(() => {
          this.clearCards(this.state.firstId, this.state.secondId);
        }, 5000);
      }
    }
  }

  render(){
    return(
      <div className="contentWrapper">
        <div className="headerContainer">
          <div className="inputsContainer">
            <label className="label">Number of Turns: {this.state.turnNumber}</label>
            <label className="label">Pairs found: {this.state.pairsFound}</label>
            <button className="submit" onClick={ this.startGame }>Start</button>
          </div>
        </div>
        <div className="boardContainer">
          { this.renderBoard() }
        </div>
      </div>
    );
  }
}
