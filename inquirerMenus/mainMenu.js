//****************************************************************************************************
// Here are all the modules being imported.
// Refer to ../functions/ to see logic & API endpoints
// OR ALL API DOCUMENTATION CAN BE FOUND HERE:
// https://appac.github.io/mlb-data-api-docs/
//****************************************************************************************************
const inquirer = require('inquirer');
const columnify = require('columnify');

const subMenu = require('./subMenu.js');
const tools = require('./menuTools.js');

//****************************************************************************************************
// Visit ./functions/ to see logic & API endpoints
//----------------------------------------------------------------------------------------------------
// rosterSearch.listTeams(season, allStar);
// rosterSearch.fortyManRoster(team_id);
// rosterSearch.rosterBySeason(team_id, start, ed);
//----------------------------------------------------------------------------------------------------
// playerSearch.playerSearch(name, active);
// playerSearch.playerLookup(player_id);
// playerSearch.playerTeams(player_id, season);
//----------------------------------------------------------------------------------------------------
// projectedStats.projectedHittingStats(player_id, season);
// projectedStats.projectedPitchingStats(player_id, season);
//----------------------------------------------------------------------------------------------------
// seasonStats.seasonHittingStats(player_id, season, game_type);
// seasonStats.seasonPitchingStats(player_id, season, game_type);
//----------------------------------------------------------------------------------------------------
// leagueStats.leagueHittingStats(player_id, game_type);
// leagueStats.leaguePitchingStats(player_id, game_type);
//----------------------------------------------------------------------------------------------------
// careerStats.careerHittingStats(player_id, game_type);
// careerStats.careerPitchingStats(player_id, game_type);
//----------------------------------------------------------------------------------------------------
// reports.transactionsOverPeriod(start_date, end_date);
// reports.broadcastInformation(start_date, end_date, home_away);
// reports.injuryReport() // !WORKING
//----------------------------------------------------------------------------------------------------


//****************************************************************************************************
// INQUIRER LOGIC
//****************************************************************************************************
// MAIN MENU
//----------------------------------------------------------------------------------------------------
const menu = () => {
  inquirer
    .prompt([{
      type: 'input',
      name: 'menu',
      message: "Type 'Menu' or hit enter to see the menu. Type in a player's name to search for a player."
    }]).then(answer => {
      console.log('\033[2J');
      answer.menu === '' ? subMenu.subMenu() :
        answer.menu.toLowerCase().trim() === 'menu' ? subMenu.subMenu() :
        tools.quickNameLookup(answer.menu);
    });
}

module.exports.menu = menu;

//----------------------------------------------------------------------------------------------------

const searchAgain = (currentMenu) => {
  console.log('\033[2J');
  inquirer
    .prompt([{
      type: 'list',
      name: 'searchAgain',
      message: 'What would you like to do?',
      choices: ['']
    }]).then(submenu => {

    })
};


//****************************************************************************************************
// INITIALIZE
//****************************************************************************************************
