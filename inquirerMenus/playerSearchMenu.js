const inquirer = require('inquirer');
const menu = require('./mainMenu.js');
const rosterSearch = require('../functions/rosterSearch.js');
const playerSearch = require('../functions/playerSearch.js');
const tools = require('./menuTools.js');

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
      choices: ['Search For a Player By Name', 'Search For a Player By ID', 'Search For a Player\'s Teams', 'Main Menu']
    }]).then(submenu => {
      console.log('\033[2J');
      switch (submenu.playerSearch) {
        case 'Search For a Player By Name':
          searchByNamePrompt(currentMenu);
          break;
        case 'Search For a Player By ID':
          searchByIdPrompt(currentMenu);
          break;
        case 'Search For a Player\'s Teams':
          playerTeamsPrompt(currentMenu);
          break;
        case 'Main Menu':
          menu.menu();
          break;
      }
    });
};

//----------------------------------------------------------------------------------------------------

const searchByNamePrompt = (currentMenu) => {
  inquirer
    .prompt([{
      type: 'input',
      name: 'name',
      message: 'Search For A Player By Name'
    }]).then(answer => {
      tools.quickNameLookup(answer.name);
    });
};

//----------------------------------------------------------------------------------------------------

const searchByIdPrompt = (currentMenu) => {
  inquirer
    .prompt([{
      type: 'input',
      name: 'id',
      message: 'Search For A Player By ID'
    }]).then(query => {
      playerSearch.playerLookup(query.id, data => {

        let columns = tools.quickColumn(data);
        console.log(columns)
        showStatsPrompt(data);
      });
    });
};

//----------------------------------------------------------------------------------------------------

const showStatsPrompt = (data) => {
  inquirer
    .prompt([{
      name: 'action',
      type: 'list',
      message: `Show ${data.name}'s Stats?`,
      choices: [`Show ${data.name}'s Stats`, 'Main Menu']
    }]).then(query => {
      switch (query.action) {
        case `Show ${data.name}'s Stats`:
          tools.quickStatsLookup(data);
          break;
        case 'Main Menu':
          menu.menu()
          break;
      }
    })
}

//----------------------------------------------------------------------------------------------------

const playerTeamsPrompt = (currentMenu) => {
  inquirer
    .prompt([{
      type: 'input',
      name: 'id',
      message: 'Enter a Player\s ID'
    }, {
      type: 'input',
      name: 'season',
      message: 'OPTIONAL: Enter A Season (Year Format: YYYY). Will return all teams throughout career if left blank.'
    }]).then(query => {
      playerSearch.playerTeams(query.id, query.season, data => {
        playerSearch.playerLookup(query.id, player => {
          console.log('*********************************************************************************************************')
          console.log(`*********************************** ${player.name}'s Teams in ${query.season} ****************************************`)
          console.log('*********************************************************************************************************')
          let columns = tools.quickColumn(data);
          console.log(columns);
        })
      });
    });
};

module.exports = {
  playerSearchPrompt: playerSearchPrompt,
  searchByNamePrompt: searchByNamePrompt,
  searchByIdPrompt: searchByIdPrompt,
  showStatsPrompt: showStatsPrompt,
  playerTeamsPrompt: playerTeamsPrompt
}
