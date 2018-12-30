const inquirer = require('inquirer');
const tools = require('./menuTools.js');
const menu = require('./mainMenu.js');
const rosterMenu = require('./rosterMenu.js');
const playerSearchMenu = require('./playerSearchMenu.js');
const statisticsMenu = require('./statisticsMenu.js');
const reportsMenu = require('./reportsMenu.js');

const projectedStats = require('../functions/projectedStats.js');
const seasonStats = require('../functions/seasonStats.js');
const leagueStats = require('../functions/leagueStats.js');
const careerStats = require('../functions/careerStats.js');
const reports = require('../functions/reports.js');
const leaderboards = require('../functions/leaderboards.js');

const subMenu = () => {
  inquirer
    .prompt([{
      type: 'list',
      name: 'subMenu',
      message: 'Welcome to the MLB stats app. What would you like to do?',
      choices: ['Roster Search Menu', 'Player Search Menu', 'Player Statistics Menu', 'Reports Menu', 'Back']
    }]).then(submenu => {
      console.log('\033[2J');
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
          reportsMenu.reportsPrompt(currentMenu);
          break;
        case 'Back':
          menu.menu();
          break;
      }
    });
};

module.exports.subMenu = subMenu;
