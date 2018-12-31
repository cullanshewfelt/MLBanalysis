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
          hittingLeadersPrompt();
          break;
        case 'Pitching Leaderboards':
          pitchingLeadersPrompt();
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
        type: 'list',
        name: 'sort_column',
        message: 'What Stat Would You Like To Sort By?',
        choices: ['Home Runs', 'Batting Average', 'Hits']      },
      {
        type: 'input',
        name: 'results',
        message: 'Enter the Number of Results You Want',
        validate: tools.validateResults
      },
      {
        type: 'input',
        name: 'season',
        message: 'Enter the year (format: YYYY) of the season you want stats for',
        validate: tools.validateYear
      },
      {
        type: 'list',
        name: 'game_type',
        message: 'Choose the game type you want stats for',
        choices: ['Regular Season', 'World Series', 'League Championship', 'First Round (Wild Card)', 'Division Series', 'Spring Training']
      }
    ]).then(answer => {
      let game_type = tools.gameTypeFilter(answer.game_type);
      let sort_column = tools.sortColumnFilter(answer.sort_column);
      leaderboards.hittingLeaders(answer.results, game_type, answer.season, sort_column, stats => {
        let columns = tools.quickColumn(stats)
        console.log('******************************************************************************************************************************************************************************')
        console.log(`************************************* Hitting Leaderboards for ${answer.season} ${answer.game_type} (Sorting by ${answer.sort_column})*******************************************************************`)
        console.log('******************************************************************************************************************************************************************************')
        console.log(columns);
      })
    });
};

//----------------------------------------------------------------------------------------------------

const pitchingLeadersPrompt = () => {
  inquirer
    .prompt([{
        type: 'list',
        name: 'sort_column',
        message: 'What Stat Would You Like To Sort By?',
        choices: ['Earned Run Average', 'Walks and Hits Per Innings Pitched', 'Strikeouts', 'Walks', 'Strikeout/Walk Ratio']
      },
      {
        type: 'input',
        name: 'results',
        message: 'Enter the Number of Results You Want',
        validate: tools.validateResults
      },
      {
        type: 'input',
        name: 'season',
        message: 'Enter the year (format: YYYY) of the season you want stats for',
        validate: tools.validateYear
      },
      {
        type: 'list',
        name: 'game_type',
        message: 'Choose the game type you want stats for',
        choices: ['Regular Season', 'World Series', 'League Championship', 'First Round (Wild Card)', 'Division Series', 'Spring Training']
      }
    ]).then(answer => {
      let game_type = tools.gameTypeFilter(answer.game_type);
      let sort_column = tools.sortColumnFilter(answer.sort_column);
      leaderboards.pitchingLeaders(answer.results, game_type, answer.season, sort_column, stats => {
        let columns = tools.quickColumn(stats)
        console.log('******************************************************************************************************************************************************************************')
        console.log(`************************************* Pitching Leaderboards for ${answer.season} ${answer.game_type} (Sorting by ${answer.sort_column}) *******************************************************************`)
        console.log('******************************************************************************************************************************************************************************')
        console.log(columns);
      })
    });
};
