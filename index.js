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
    this.print()
  }
  static generateField(width, height, percent){
    const field = new Array(height).fill(0).map(arr => new Array(width))
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let odds = Math.random();
        field[i][j] = odds > percent ? fieldCharacter : hole;
      }
    }
    return field
  }
}


let myField = new Field (Field.generateField(30, 10, 0.1))
myField.startGame()