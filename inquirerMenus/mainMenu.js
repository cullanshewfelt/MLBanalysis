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
  let cliArg;
  if (argument === undefined) {
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
  } else {
    let cliArg = !argument[3] ? argument[2] : argument[3][0] === '-' ? argument[2] : `${argument[2]} ${argument[3]}`
    status = validateStatus(argument)
    tools.quickNameLookup(cliArg, status);
  }
}

module.exports.menu = menu;

//****************************************************************************************************
// ARGUMENTS LOGIC
//****************************************************************************************************

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

//****************************************************************************************************
// INITIALIZE ARGUMENTS LOGIC
//****************************************************************************************************

// status = validateStatus(process.argv)

//----------------------------------------------------------------------------------------------------
