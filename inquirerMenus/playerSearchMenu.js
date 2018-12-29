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
      switch (submenu.playerSearch) {
        case 'Search For a Player By Name':
          console.log('\033[2J');
          searchByNamePrompt(currentMenu);
          break;
        case 'Search For a Player By ID':
          console.log('\033[2J');
          searchByIdPrompt(currentMenu);
          break;
        case 'Search For a Player\'s Teams':
          console.log('\033[2J');
          playerTeamsPrompt(currentMenu);
          break;
        case 'Main Menu':
          console.log('\033[2J');
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
  // console.log('\033[2J');
  inquirer
    .prompt([{
      type: 'input',
      name: 'id',
      message: 'Search For A Player By ID'
    }]).then(answer => {
      playerSearch.playerLookup(answer.id, data => {
        let columns = tools.quickColumn(data);
        console.log(columns)
        showStatsPrompt(data);
      });
    });
};

//----------------------------------------------------------------------------------------------------

const showStatsPrompt = (data) => {
  // console.log(data)
  inquirer
    .prompt([{
      name: 'action',
      type: 'list',
      message: `Show ${data.name}'s Stats?`,
      choices: [`Show ${data.name}'s Stats`, 'Main Menu']
    }]).then(answer => {
      switch (answer.action) {
        case `Show ${data.name}'s Stats?`:
          tools.quickStatsLookup(data.player_id)
          break;
        case 'Main Menu':
          console.log('main menu')
          menu.menu()
          break;
      }
    })
}

//----------------------------------------------------------------------------------------------------

const playerTeamsPrompt = (currentMenu) => {
  console.log('\033[2J');
  inquirer
    .prompt([{
      type: 'input',
      name: 'id',
      message: 'Enter a Player\s ID'
    }, {
      type: 'input',
      name: 'season',
      message: 'Enter A Season (Year Format: YYYY)'
    }]).then(answer => {
      playerSearch.playerTeams(answer.id, answer.season, data => {
        playerSearch.playerLookup(answer.id, player => {
          console.log('*********************************************************************************************************')
          console.log(`*********************************** ${player.name}'s Teams in ${answer.season} ****************************************`)
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
