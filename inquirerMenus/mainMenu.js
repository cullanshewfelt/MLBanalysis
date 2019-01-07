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
let status = '';
// let argument;

//****************************************************************************************************
// Visit ./functions/ to see logic & API endpoints
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
// projectedStats.projectedHittingStats(player_id, season);
// projectedStats.projectedPitchingStats(player_id, season);
//----------------------------------------------------------------------------------------------------
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
const menu = (argument) => {
  // console.log(argument)
  let cliArg;
  if (argument) {
    if (argument.length > 0 && argument.length < 3) {
      mainMenuPrompt();
    } else {
      cliArg = !argument[3] ? argument[2] : argument[3][0] === '-' ? argument[2] : `${argument[2]} ${argument[3]}`
      status = tools.validateStatus(argument)
      tools.quickNameLookup(cliArg, status);
    }
  } else {
    mainMenuPrompt();
  }
}

module.exports.menu = menu;

//----------------------------------------------------------------------------------------------------

const mainMenuPrompt = () => {
  inquirer.prompt([{
    type: 'input',
    name: 'menu',
    message: "Type 'Menu' or hit enter to see the menu. Type in a player's name to search for a player."
  }]).then(answer => {
    let name = answer.menu;
    answer.menu === '' ? subMenu.subMenu() :
      answer.menu.toLowerCase().trim() === 'menu' ? subMenu.subMenu() :
      tools.quickNameLookup(name);
  })
}

module.exports.mainMenuPrompt = mainMenuPrompt;


//****************************************************************************************************
// INITIALIZE ARGUMENTS LOGIC
//****************************************************************************************************

// status = validateStatus(process.argv)

//----------------------------------------------------------------------------------------------------
