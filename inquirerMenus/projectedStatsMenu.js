

// projectedStats.projectedHittingStats(player_id, season);
// projectedStats.projectedPitchingStats(player_id, season);

const inquirer = require('inquirer');
const tools = require('./menuTools.js');
const menu = require('./mainMenu.js');
const projectedStats = require('../functions/projectedStats.js');
// const playerSearch = require('../functions/playerSearch.js');
// const playerSearchMenu = require('./playerSearchMenu.js');

//----------------------------------------------------------------------------------------------------
// PROJECTED STATISTICS MENUS
//----------------------------------------------------------------------------------------------------

const projectedStatsSearchPrompt = () => {
  // console.log('\033[2J');
  inquirer
    .prompt([{
      type: 'list',
      name: 'projectedStatSearch',
      message: 'What would you like to do?',
      choices: ['Projected Hitting Stats', 'Projected Pitching Stats', 'Main Menu']
    }]).then(submenu => {
      switch (submenu.projectedStatSearch) {
        case 'Projected Hitting Stats':
          projectedHittingPrompt();
          break;
        case 'Projected Pitching Stats':
          projectedPitchingPrompt();
          break;
        case 'Main Menu':
          // console.log('\033[2J');
          menu.menu();
          break;
      };
    });
};

module.exports.statsSearchPrompt = statsSearchPrompt;
//----------------------------------------------------------------------------------------------------

const projectedHittingPrompt = () => {
  // console.log('\033[2J');
  inquirer
    .prompt([{
        type: 'input',
        name: 'id',
        message: 'Enter Player ID to see Hitting Stats'
      },
      {
        type: 'input',
        name: 'season',
        message: 'Enter the year (format: YYYY) of the season you want stats for',
        validate: tools.validateYear
      }
    ]).then(answer => {
      projectedStats.projectedHittingStats(answer.id, answer.season, stats => {
        tools.quickPlayerStats(answer.id, stats, answer.season, currentMenu);
      });
    });
};

module.exports.seasonHittingPrompt = seasonHittingPrompt;

//----------------------------------------------------------------------------------------------------

const projectedPitchingPrompt = () => {
  // console.log('\033[2J');
  inquirer
    .prompt([{
        type: 'input',
        name: 'id',
        message: 'Enter Player ID to see Pitching Stats'
      },
      {
        type: 'input',
        name: 'season',
        message: 'Enter the year (format: YYYY) of the season you want stats for',
        validate: tools.validateYear
      }
    ]).then(answer => {
      projectedStats.projectedPitchingStats(answer.id, answer.season, stats => {
        tools.quickPlayerStats(answer.id, stats, answer.season, currentMenu);
      });
    });
};

module.exports.seasonPitchingPrompt = seasonHittingPrompt;

//----------------------------------------------------------------------------------------------------
