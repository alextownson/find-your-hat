const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(arr){
    this.field = arr;
    this.x = 0;
    this.y = 0;
    this.field[this.y][this.x] = pathCharacter;
  }
  print(){
    let stringField = []; 
    for (let arr of this.field){
      stringField.push(arr.join(''))
    }
    stringField = stringField.join('\r\n')
    console.log(stringField)
  }
  startGame(){
    let playing = true;
    while (playing === true) {
      this.print()
      this.moveCharacter()
      if (!this.isInBounds()) {
        console.log('This move is out of bounds!')
        playing = false;
        break;
      } else if (this.isHole()) {
        console.log('Uh oh! You fell into a hole.')
        playing = false;
        break;
      } else if (this.isHat()) {
        console.log('You found your hat!')
        playing = false;
        break;
      } 
      this.field[this.y][this.x] = pathCharacter;
    }
  }
  moveCharacter() {
    const answer = prompt('Which way?')
    switch (answer) {
      case 'd':
        this.y += 1;
        break;
      case 'r':
        this.x += 1;
        break;
      case 'l':
        this.x -= 1;
        break;
      case 'u': 
        this.y -= 1;
        break;
      default:
        console.log('Enter U, D, L, or R')
        this.moveCharacter();
        break;
    }
  }
  isInBounds(){
    return (
      this.x >= 0 &&
      this.y >= 0 &&
      this.x <= this.field[0].length &&
      this.y <= this.field.length
    )
  }
  isHole() {
    return this.field[this.y][this.x] === hole;
  }
  isHat() {
    return this.field[this.y][this.x] === hat;
  }
  static generateField(width, height, percent){
    const field = new Array(height).fill(0).map(arr => new Array(width))
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let odds = Math.random();
        field[i][j] = odds > percent ? fieldCharacter : hole;
      }
    }
    const hatLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    }

    while (hatLocation.x === 0 && hatLocation.y === 0) {
      hatLocation.x = Math.floor(Math.random() * width);
      hatLocation.y = Math.floor(Math.random() * height);
    }

    field[hatLocation.y][hatLocation.x] = hat;

    return field
  }
}


let myField = new Field (Field.generateField(30, 10, 0.1))
myField.startGame()