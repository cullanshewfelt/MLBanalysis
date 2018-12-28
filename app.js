const lines = '***************************************************************************************';
const axios = require('axios');
const inquirer = require('inquirer');
// const ui = new inquirer.ui.BottomBar();
//****************************************************************************************************
// Here are all the modules being imported.
// Refer to ./functions/ to see logic & API endpoints
// ---------------------------------------------------------------------------------------------------
// OR ALL API DOCUMENTATION CAN BE FOUND HERE:
// https://appac.github.io/mlb-data-api-docs/
//****************************************************************************************************
const rosterSearch = require('./functions/rosterSearch.js');
const playerSearch = require('./functions/playerSearch.js');
const projectedStats = require('./functions/projectedStats.js');
const seasonStats = require('./functions/seasonStats.js');
const leagueStats = require('./functions/leagueStats.js');
const careerStats = require('./functions/careerStats.js');
const reports = require('./functions/reports.js');
const leaderboards = require('./functions/leaderboards.js');
//****************************************************************************************************
// Visit ./functions/ to see logic & API endpoints
//****************************************************************************************************
// NOTE: ALL variables should be STRINGS, including player_ids and years/seasons
//****************************************************************************************************
// GAME TYPES:
//----------------------------------------------------------------------------------------------------
// 'R' - Regular Season
// 'S' - Spring Training
// 'E' - Exhibition
// 'A' - All Star Game
// 'D' - Division Series
// 'F' - First Round (Wild Card)
// 'L' - League Championship
// 'W' - World Series
//****************************************************************************************************
// TEST variables
//----------------------------------------------------------------------------------------------------
let name = 'Kershaw';
let team_id = '119' // Dodgers
let active; // Y or N
// let player_id = '641355'; // Bellinger (for hitting stats)
let player_id = '477132'; // Kershaw (for pitching stats)
let season = '2018';
let game_type = 'R';
let allStar;
let start = '2016';
let end = '2017';
let start_date = '20181223';
let end_date = '20181227';
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
let results = 3;
// let game_type = 'R';
// let season = '2018';
let sort_column = 'era';
let leader_hitting_repeater;
let leader_pitching_repeater;
// leaderboards.hittingLeaders(results, game_type, season, sort_column, leader_hitting_repeater);
// leaderboards.pitchingLeaders(results, game_type, season, sort_column, leader_pitching_repeater);
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
      answer.menu === '' ? subMenu() :
        answer.menu.toLowerCase().trim() === 'menu' ? subMenu() :
        playerSearch.playerSearch(answer.menu, 'Y') && console.log('\033[2J');
    });
}

//----------------------------------------------------------------------------------------------------

const subMenu = () => {
  console.log('\033[2J');
  inquirer
    .prompt([{
      type: 'list',
      name: 'subMenu',
      message: 'Welcome to the MLB stats app. What would you like to do?',
      choices: ['Roster Search Menu', 'Player Search Menu', 'Player Statistics Menu', 'Reports Menu', 'Back']
    }]).then(submenu => {
      let currentMenu = Object.keys(submenu)[0];
      switch (submenu.subMenu) {
        case 'Roster Search Menu':
          console.log('\033[2J');
          rosterSearchPrompt(currentMenu);
          break;
        case 'Player Search Menu':
          // console.log('\033[2J');
          playerSearchPrompt(currentMenu);
          break;
        case 'Player Statistics Menu':
          // console.log('\033[2J');
          console.log('Player Statistics Menu');
          break;
        case 'Reports Menu':
          // console.log('\033[2J');
          console.log('Reports Menu');
          break;
        case 'Back':
          console.log('\033[2J');
          menu();
          break;
      }
    });
};

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

//----------------------------------------------------------------------------------------------------
// ROSTER/TEAM SEARCH MENUS
//----------------------------------------------------------------------------------------------------
const rosterSearchPrompt = (currentMenu) => {
  // console.log('\033[2J');
  inquirer
    .prompt([{
      type: 'list',
      name: 'rosterSearch',
      message: 'What would you like to do?',
      choices: ['40 Man Roster', 'List Teams', 'Roster By Season', 'Main Menu']
    }]).then(submenu => {
      switch (submenu.rosterSearch) {
        case '40 Man Roster':
          console.log('\033[2J');
          fortyManRoster(currentMenu)
          break;
        case 'List Teams':
          console.log('\033[2J');
          listTeams(currentMenu);
          break;
        case 'Roster By Season':
          console.log('\033[2J');
          rosterBySeason(currentMenu);
          break;
        case 'Main Menu':
          menu();
          break;
      };
    });
};

//----------------------------------------------------------------------------------------------------

const fortyManRoster = (currentMenu) => {
  console.log('\033[2J');
  inquirer
    .prompt([{
      type: 'input',
      name: 'team_id',
      message: 'Enter a Team ID to See Their 40 Man Roster'
    }]).then(answer => {
      rosterSearch.fortyManRoster(answer.team_id.toString());
    });
};

//----------------------------------------------------------------------------------------------------

const listTeams = (currentMenu) => {
  console.log('\033[2J');
  inquirer
    .prompt([{
      type: 'input',
      name: 'year',
      message: 'Enter a Season(Year) to See Teams'
    }]).then(answer => {
      rosterSearch.listTeams(answer.year, 'N');
    });
};

//----------------------------------------------------------------------------------------------------

const rosterBySeason = (currentMenu) => {
  console.log('\033[2J');
  inquirer
    .prompt([{
      type: 'input',
      name: 'team_id',
      message: 'Enter the Team\'s ID of Whose Roster You\'d Wish to See'
    }, {
      type: 'input',
      name: 'start_year',
      message: 'Enter the Start Year (YYYY)'
    }, {
      type: 'input',
      name: 'end_year',
      message: 'Enter the End Year (YYYY)'
    }]).then(answer => {
      rosterSearch.rosterBySeason(answer.team_id, answer.start_year, answer.end_year);
    });
};

//----------------------------------------------------------------------------------------------------
// PLAYER SEARCH MENUS
//----------------------------------------------------------------------------------------------------
const playerSearchPrompt = (currentMenu) => {
  // console.log('\033[2J');
  inquirer
    .prompt([{
      type: 'list',
      name: 'playerSearch',
      message: 'What would you like to do?',
      choices: ['Search For a Player By Name', 'Search For a Player By ID', 'Main Menu']
    }]).then(submenu => {
      switch (submenu.playerSearch) {
        case 'Search For a Player By Name':
          console.log('\033[2J');
          searchByNamePrompt(currentMenu)
          break;
        case 'Search For a Player By ID':
          console.log('\033[2J');
          console.log('2');
          break;
        case 'Main Menu':
          console.log('\033[2J');
          menu();
          break;
      }
    })
}

const searchByNamePrompt = (currentMenu) => {
  console.log('\033[2J');
  inquirer
    .prompt([{
      type: 'input',
      name: 'name',
      message: 'Search For A Player By Name'
    }]).then(answer => {
      console.log('\033[2J');
      playerSearch.playerSearch(answer.name, 'Y');
    });
};
//----------------------------------------------------------------------------------------------------
// PLAYER STATISTICS MENUS
//----------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------
// REPORTS MENUS
//----------------------------------------------------------------------------------------------------


//****************************************************************************************************
// INITIALIZE
//****************************************************************************************************

menu()

//****************************************************************************************************

//****************************************************************************************************
