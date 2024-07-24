import inquirer from 'inquirer';
import SVG from './lib/svg.js';
import {Circle, Triangle, Square} from './lib/shapes.js';
import { writeFile } from 'fs/promises';

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter 3 letters for the Logo',
    validate: function (input) {
      if (input.length > 3 || input.length < 3 ) {
        return 'Please enter no more or less than 3 characters.';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color (color keyword or hexadecimal number)',
    validate: function (input) {
      const isHexColor = /^#[0-9A-F]{6}$/i.test(input);
      const isColorKeyword = typeof input === 'string' && input.length > 0;
      if (!isHexColor && !isColorKeyword) {
        return 'Please enter a valid color keyword or hexadecimal number.';
      }
      return true;
    }
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape',
    choices: ['circle', 'triangle', 'square']
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color (color keyword or hexadecimal number)',
    validate: function (input) {
      const isHexColor = /^#[0-9A-F]{6}$/i.test(input);
      const isColorKeyword = typeof input === 'string' && input.length > 0;
      if (!isHexColor && !isColorKeyword) {
        return 'Please enter a valid color keyword or hexadecimal number.';
      }
      return true;
    }
  },
];

function init() {
  inquirer.prompt(questions).then((answers) => {
    let shape;
    switch(answers.shape){
      case "circle": 
        shape = new Circle();
        break;
    
      case "square":
        shape = new Square();
        break;
    
      default:
        shape = new Triangle();
        break;
    }

    shape.setColor(answers.shapeColor)

    const svg = new SVG();
    svg.setText(answers.title, answers.textColor);
    svg.setShape(shape);
    return writeFile("logo.svg", svg.render());
    })
    .then(() => {
      console.log("Generated logo.svg");
    })
    .catch((error) => {
      console.log(error);
      console.log("Oops! Something went wrong.");
    });
 }


// Function call to initialize app
init();
