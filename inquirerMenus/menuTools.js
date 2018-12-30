const inquirer = require('inquirer');
const columnify = require('columnify');
const playerSearch = require('../functions/playerSearch.js');
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

const quickNameLookup = (name) => {
  playerSearch.playerSearch(name, 'Y', player => {
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

const quickStatsLookup = (player) => {
  inquirer
    .prompt([{
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
      player.position === 'P'
      ? quickPitchingLookup(answer, player.player_id)
      : quickHittingLookup(answer, player.player_id);
    })
}

module.exports.quickStatsLookup = quickStatsLookup;

//----------------------------------------------------------------------------------------------------

const quickHittingLookup = (answer, player_id) => {
  seasonStats.seasonHittingStats(player_id, answer.season, answer.game_type, stats => {
    quickPlayerStats(player_id, stats);
  });
}

module.exports.quickHittingLookup = quickHittingLookup;

//----------------------------------------------------------------------------------------------------

const quickPitchingLookup = (answer, player_id) => {
  seasonStats.seasonPitchingStats(player_id, answer.season, answer.game_type, stats => {
    quickPlayerStats(player_id, stats);
  });
}

module.exports.quickPitchingLookup = quickPitchingLookup;

//----------------------------------------------------------------------------------------------------

const quickPlayerStats = (player_id, stats) => {
  playerSearch.playerLookup(player_id, data => {
    let columns = quickColumn(stats)
    console.log('******************************************************************')
    console.log(`******************* ${data.name}'s Statistics *********************`)
    console.log('******************************************************************')
    console.log(columns);
  });
}

module.exports.quickPlayerStats = quickPlayerStats;

//----------------------------------------------------------------------------------------------------

const validateYear = (year) => {
  const reg = /^\d{4,4}\b/;
  return reg.test(year) ? reg.test(year) : "Please Enter a Valid Year (Format: YYYY)."
}

module.exports.validateYear = validateYear;

//----------------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------
