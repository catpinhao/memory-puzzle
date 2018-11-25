import React, { Component } from 'react';

export default class Cell extends Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    if(!this.props.matched && !this.props.turnedUp)
      this.props.onClick(this.props.id);
  }

  render() {
    let imgPath = process.env.PUBLIC_URL + '/images/';
    if(this.props.turnedUp) imgPath = imgPath + this.props.image + '.png';
    else imgPath = imgPath + 'back.png';
    
    return (
      <img className="card" src={imgPath} alt='' onClick={ this.onClick } />
    );
  }
}
