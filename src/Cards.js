import shuffle from 'shuffle-array';

export default class Cards {
  constructor(props) {
    this.cards = [];
    this.numberOfCards = props;
  }

  generateCardSet() {
    this.cards = [];
    let id = 1;
    for(var i = 1; i <= this.numberOfCards/2; i++){
      let firstCard = {
        id: id,
        image: i,
        turnedUp: false,
        matched: false
      };
      id++;
      let secondCard = {
        id: id,
        image: i,
        turnedUp: false,
        matched: false
      };
      id++;
      this.cards.push(firstCard, secondCard);
    }

    shuffle(this.cards);
  }

  getCard(id) {
    for(var i = 0; i < this.numberOfCards; i++){
      if(this.cards[i].id === id){
        return this.cards[i];
      }
    }
  }
  
  flipCard(id, turnedUp){
    this.getCard(id).turnedUp = turnedUp;
  }

  matchCard(id, matched){
    this.getCard(id).matched = matched;
  }

  cardsAreIdentical(id1, id2){
    if(this.getCard(id1).image === this.getCard(id2).image) return true;
    return false;
  }
}
