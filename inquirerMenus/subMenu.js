const inquirer = require('inquirer');
const tools = require('./menuTools.js');
const menu = require('./mainMenu.js');
const rosterSearch = require('../functions/rosterSearch.js');
const rosterMenu = require('./rosterMenu.js');
const playerSearch = require('../functions/playerSearch.js');
const playerSearchMenu = require('./playerSearchMenu.js');
const statisticsMenu = require('./statisticsMenu.js');

const subMenu = () => {
  console.log('\033[2J');
  inquirer
    .prompt([{
      type: 'list',
      name: 'subMenu',
      message: 'Welcome to the MLB stats app. What would you like to do?',
      choices: ['Roster Search Menu', 'Player Search Menu', 'Player Statistics Menu', 'Reports Menu', 'Back']
    }]).then(submenu => {
      let currentMenu = Object.keys(submenu)[0];
      switch (submenu.subMenu) {
        case 'Roster Search Menu':
          rosterMenu.rosterSearchPrompt(currentMenu);
          break;
        case 'Player Search Menu':
          playerSearchMenu.playerSearchPrompt(currentMenu);
          break;
        case 'Player Statistics Menu':
          statisticsMenu.statsSearchPrompt(currentMenu);
          break;
        case 'Reports Menu':
          console.log('Reports Menu');
          break;
        case 'Back':
          menu.menu();
          break;
      }
    });
};

module.exports.subMenu = subMenu;
