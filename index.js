import inquirer from 'inquirer';

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
    console.log("Your inputs:");
    console.log(`Logo Text: ${answers.title}`);
    console.log(`Text Color: ${answers.textColor}`);
    console.log(`Shape: ${answers.shape}`);
    console.log(`Shape Color: ${answers.shapeColor}`);
  }).catch((error) => {
    console.error(error);
  });
}

// Function call to initialize app
init();
