const inquirer = require('inquirer');
const tools = require('./menuTools.js');
const menu = require('./mainMenu.js');
const seasonStats = require('../functions/seasonStats.js');
const playerSearch = require('../functions/playerSearch.js');
const playerSearchMenu = require('./playerSearchMenu.js');

//----------------------------------------------------------------------------------------------------
// PLAYER STATISTICS MENUS
//----------------------------------------------------------------------------------------------------

const statsSearchPrompt = () => {
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
          seasonPitchingPrompt();
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

const seasonHittingPrompt = () => {
  let currentMenu = 'Hitting';
  // console.log('\033[2J');
   inquirer
    .prompt([{
        type: 'input',
        name: 'name',
        message: 'Enter Player\'s Name You\'d Wish to see Hitting Stats For'
      },
      {
        type: 'list',
        name: 'status',
        message: 'Is this player active or inactive?',
        choices: ['Active', 'Inactive'],
        filter: tools.statusFilter,
        validate: tools.validateStatus
      }]).then(answerOne => {
        inquirer
        .prompt([{
          type: 'input',
          name: 'season',
          message: 'Enter the year (format: YYYY) of the season you want stats for',
          validate: tools.validateYear
        },
        {
          type: 'list',
          name: 'game_type',
          message: 'Choose the game type you want stats for',
          choices: ['Regular Season', 'World Series', 'League Championship', 'First Round (Wild Card)', 'Division Series', 'Spring Training'],
          filter: tools.gameTypeFilter
        }
      ]).then(answerTwo => {
        tools.nameToID(answerOne.name, answerOne.status, player => {
          seasonStats.seasonHittingStats(player.player_id, answerTwo.season, answerTwo.game_type, stats => {
            tools.quickPlayerStats(player, stats, answerTwo.season, currentMenu);
          });
        })
      })
    })
};

module.exports.seasonHittingPrompt = seasonHittingPrompt;

//----------------------------------------------------------------------------------------------------

const seasonPitchingPrompt = () => {
  let currentMenu = 'Pitching';
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
      },
      {
        type: 'list',
        name: 'game_type',
        message: 'Choose the game type you want stats for',
        choices: ['Regular Season', 'World Series', 'League Championship', 'First Round (Wild Card)', 'Division Series', 'Spring Training'],
        filter: tools.gameTypeFilter
      }
    ]).then(answer => {
      seasonStats.seasonPitchingStats(answer.id, answer.season, answer.game_type, stats => {
        tools.quickPlayerStats(answer.id, stats, answer.season, currentMenu);
      });
    });
};

module.exports.seasonPitchingPrompt = seasonHittingPrompt;

//----------------------------------------------------------------------------------------------------
