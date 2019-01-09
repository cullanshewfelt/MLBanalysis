const inquirer = require('inquirer');
const columnify = require('columnify');
const menu = require('./mainMenu.js');
const playerSearch = require('../functions/playerSearch.js');
const playerSearchMenu = require('./playerSearchMenu.js');
const statisticsMenu = require ('./statisticsMenu.js');
const seasonStats = require('../functions/seasonStats.js');

//****************************************************************************************************
// QUICK FUNCTIONS
//****************************************************************************************************
// I found myself re-using this code a lot so I just made them quick little functions instead.
//----------------------------------------------------------------------------------------------------
const quickColumn = (data) => {
  let columns = columnify(data, {
    columnSplitter: '__|__',
    paddingChr: '_'
  });
  return columns;
};

module.exports.quickColumn = quickColumn;
//----------------------------------------------------------------------------------------------------

const quickNameLookup = (name, status) => {
  playerSearch.playerSearch(name, status || 'Y', player => {
    let columns = quickColumn(player);
    console.log('***********************************')
    console.log(`******* ${player.name} Info **********`)
    console.log('***********************************')
    console.log(columns);
    quickStatsLookup(player);
  });
}
module.exports.quickNameLookup = quickNameLookup;

//----------------------------------------------------------------------------------------------------

const nameToID = (name, sts, callback) => {
  let status = sts === '-i' ? 'N' : 'Y'
  playerSearch.playerSearch(name, status || 'Y', player => {
    callback(player);
  });
}
module.exports.nameToID = nameToID;

//----------------------------------------------------------------------------------------------------

const quickStatsLookup = (player) => {
  inquirer
    .prompt([{
        type: 'input',
        name: 'season',
        message: 'Enter the year (format: YYYY) of the season you want stats for',
        validate: validateYear
      },
      {
        type: 'list',
        name: 'game_type',
        message: 'Choose the game type you want stats for',
        choices: ['Regular Season', 'World Series', 'League Championship', 'First Round (Wild Card)', 'Division Series', 'Spring Training'],
        filter: gameTypeFilter
      }
    ]).then(answer => {
      player.position === 'P' ?
        quickPitchingLookup(answer, player) :
        quickHittingLookup(answer, player);
    })
}

module.exports.quickStatsLookup = quickStatsLookup;

//----------------------------------------------------------------------------------------------------

const quickHittingLookup = (answer, player) => {
  seasonStats.seasonHittingStats(player.player_id, answer.season, answer.game_type, stats => {
    quickPlayerStats(player, stats, answer.season);
  });
}

module.exports.quickHittingLookup = quickHittingLookup;

//----------------------------------------------------------------------------------------------------

const quickPitchingLookup = (answer, player) => {
  seasonStats.seasonPitchingStats(player.player_id, answer.season, answer.game_type, stats => {
    quickPlayerStats(player, stats, answer.season);
  });
}

module.exports.quickPitchingLookup = quickPitchingLookup;

//----------------------------------------------------------------------------------------------------

const quickPlayerStats = (player, stats, season, currentMenu) => {
  playerSearch.playerLookup(player.player_id, data => {
    currentMenu = currentMenu ? currentMenu : data.position === 'P' ? 'Pitching' : 'Hitting'
    let position = data.position === 'P' ? 'Pitching' : 'Hitting'
    let columns = quickColumn(stats)
    console.log('****************************************************************')
    console.log(`****** ${data.name}'s ${currentMenu} Statistics for ${season} ******`)
    console.log('****************************************************************')
    console.log(columns);
    searchAgain(player);
  });
}

module.exports.quickPlayerStats = quickPlayerStats;

//----------------------------------------------------------------------------------------------------

const searchAgain = (player) => {
  inquirer
    .prompt([{
      type: 'list',
      name: 'menu',
      message: 'What would you like to do?',
      choices: ['Search Another Year for This Player', 'Search Stats for a Different Player', 'Main Menu']
    }]).then(submenu => {
      switch (submenu.menu) {
        case 'Search Another Year for This Player':
          quickStatsLookup(player);
          break;
        case 'Search Stats for a Different Player':
          statisticsMenu.statsSearchPrompt();
          // pitchingOrHittingPrompt();
          // player.position === 'P' ? statisticsMenu.seasonPitchingPrompt() : statisticsMenu.seasonHittingPrompt();
          break;
        case 'Main Menu':
          menu.menu();
          break;
      }
    })
}



module.exports.searchAgain = searchAgain;

// //----------------------------------------------------------------------------------------------------
//
// const pitchingOrHittingPrompt = () => {
//   inquirer
//     .prompt([{
//       type: 'list',
//       name: 'menu',
//       message: 'Would You Like to Search For Hitting Stats or Pithcing Stats?',
//       choices: ['Season Hitting Stats', 'Season Pitching Stats', 'Main Menu']
//     }]).then(answer => {
//       switch (answer.menu) {
//         case 'Season Hitting Stats':
//           // statisticsMenu.seasonHittingPrompt();
//           break;
//         case 'Season Pitching Stats':
//           // statisticsMenu.seasonPitchingPrompt();
//           break;
//         case 'Main Menu':
//           menu.menu();
//           break;
//       }
//     })
// }
//****************************************************************************************************
// VALIDATOR AND FILTER FUNCTIONS FOR INQUIRER
//****************************************************************************************************
// ARGUMENTS LOGIC
// checks to see if if the user passed options as arguments and formats the name passed as the argument
//----------------------------------------------------------------------------------------------------
// checks see if the user wanted to search for active or inactive players
const validateStatus = (args) => {
  switch (args.length) {
    case 3:
      return 'Y'
    case 4:
      return args[3] === '-a' ? 'Y' : args[3] === '-i' ? 'N' : 'Y';
    case 5:
      return args[4] === '-a' ? 'Y' : args[4] === '-i' ? 'N' : 'Y';
  }
}

module.exports.validateStatus = validateStatus;

//----------------------------------------------------------------------------------------------------

const statusFilter = (status) => {
  switch (status) {
    case 'Active':
      return '-a'
    case 'Inactive':
      return '-i'
  }
}

module.exports.statusFilter = statusFilter;

//----------------------------------------------------------------------------------------------------

const validateYear = (year) => {
  const reg = /^\d{4,4}\b/;
  return reg.test(year) || "Please Enter a Valid Year (Format: YYYY)."
}

module.exports.validateYear = validateYear;

//----------------------------------------------------------------------------------------------------

const validateResults = (results) => {
  const reg = /^\d+\b/;
  return reg.test(results) || 'Please Enter a Number'
}
module.exports.validateResults = validateResults;

//----------------------------------------------------------------------------------------------------

const gameTypeFilter = (game_type) => {
  switch (game_type) {
    case 'Regular Season':
      return 'R'
    case 'World Series':
      return 'W'
    case 'League Championship':
      return 'L'
    case 'First Round (Wild Card)':
      return 'F'
    case 'Division Series':
      return 'D'
    case 'Spring Training':
      return 'S'
  }
}

module.exports.gameTypeFilter = gameTypeFilter;
//----------------------------------------------------------------------------------------------------

const sortColumnFilter = (sort_column) => {
  switch (sort_column) {
    case 'Home Runs':
      return 'hr'
    case 'Batting Average':
      return 'avg'
    case 'Hits':
      return 'h'
    case 'Earned Run Average':
      return 'era'
    case 'Walks and Hits Per Innings Pitched':
      return 'whip'
    case 'Strikeouts':
      return 'so'
    case 'Walks':
      return 'bb'
    case 'Strikeout/Walk Ratio':
      return 'k_bb'
  }
}

module.exports.sortColumnFilter = sortColumnFilter;

//----------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------
