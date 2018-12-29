const inquirer = require('inquirer');
const tools = require('./menuTools.js');
const menu = require('./mainMenu.js');
const seasonStats = require('../functions/seasonStats.js');
const playerSearch = require('../functions/playerSearch.js');
const playerSearchMenu = require('./playerSearchMenu.js');

//----------------------------------------------------------------------------------------------------
// PLAYER STATISTICS MENUS
//----------------------------------------------------------------------------------------------------

const statsSearchPrompt = (currentMenu) => {
  // console.log('\033[2J');
inquirer
    .prompt([{
      type: 'list',
      name: 'statSearch',
      message: 'What would you like to do?',
      choices: ['Season Hitting Stats', 'Season Pitching Stats', 'Main Menu']
    }]).then(submenu => {
      switch (submenu.statSearch) {
        case 'Season Hitting Stats':
          seasonHittingPrompt();
          break;
        case 'Season Pitching Stats':
          console.log('Season Pitching Stats')
          break;
        case 'Main Menu':
          console.log('\033[2J');
          menu.menu();
          break;
      };
    });
};

module.exports.statsSearchPrompt = statsSearchPrompt;
//----------------------------------------------------------------------------------------------------

const seasonHittingPrompt = (currentMenu) => {
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
        message: 'Enter the year (format: YYYY) of the season you want stats for'
      },
      {
        type: 'list',
        name: 'game_type',
        message: 'Choose the game type you want stats for',
        choices: ['Regular Season -R', 'World Series -W', 'League Championship -L', 'First Round (Wild Card) -F', 'Division Series -D', 'Spring Training -S']
      }
    ]).then(answer => {
      seasonStats.seasonHittingStats(answer.id, answer.season, answer.game_type, stats => {
        playerSearch.playerLookup(answer.id, data => {
          let columns = tools.quickColumn(stats)
          console.log('****************************************************************************************************************************************************************')
          console.log(`***************************************************************** ${data.name}'s Statistics ******************************************************************`)
          console.log('****************************************************************************************************************************************************************')
          console.log(data.name)
          console.log(columns);
        });
      });
    });
};

module.exports.seasonHittingPrompt = seasonHittingPrompt;
