const inquirer = require('inquirer');
const tools = require('./menuTools.js');
const menu = require('./mainMenu.js');
const leaderboards = require('../functions/leaderboards.js');

//----------------------------------------------------------------------------------------------------
// LEADERBOARDS MENUS
//----------------------------------------------------------------------------------------------------
const leaderboardsPrompt = () => {
  // console.log('\033[2J');
  inquirer
    .prompt([{
      type: 'list',
      name: 'leaderboards',
      message: 'What would you like to do?',
      choices: ['Hitting Leaderboards', 'Pitching Leaderboards', 'Main Menu']
    }]).then(submenu => {
      switch (submenu.leaderboards) {
        case 'Hitting Leaderboards':
          leaderboards.hittingLeaders();
          break;
        case 'Pitching Leaderboards':
          leaderboards.hittingLeaders();
          break;
        case 'Main Menu':
          menu.menu();
          break;
      };
    });
};

module.exports.leaderboardsPrompt = leaderboardsPrompt;

//----------------------------------------------------------------------------------------------------

const hittingLeadersPrompt = () => {
  inquirer
    .prompt([{
      type: 'input',
      name: 'startDate',
      message: 'Enter the start date (format: YYYYMMDD), or hit ENTER to search for the last week'
    },
    {
      type: 'input',
      name: 'endDate',
      message: 'Enter the end date (format: YYYYMMDD), or hit ENTER to search for the last week'
    },
    {
      type: 'input',
      name: 'season',
      message: 'Enter the year (format: YYYY) of the season you want stats for',
      validate: menuTools.validateYear
    },
    {
      type: 'list',
      name: 'game_type',
      message: 'Choose the game type you want stats for',
      choices: ['Regular Season -R', 'World Series -W', 'League Championship -L', 'First Round (Wild Card) -F', 'Division Series -D', 'Spring Training -S']
    }]).then(submenu => {
        leaderboards.hittingLeaders(results, game_type, season, sort_column, , stats => {
          let columns = tools.quickColumn(stats)
          console.log('******************************************************************************************************************************************************************************')
          console.log(`******************************************************** Hitting Leaderboards for ${season} ${gametype} *******************************************************************`)
          console.log('******************************************************************************************************************************************************************************')
          console.log(columns);
          reportsPrompt();
        })
    });
};
