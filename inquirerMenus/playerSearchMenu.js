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
      message: 'OPTIONAL: Enter A Season (Year Format: YYYY). Or Leave Blank/Press ENTER to See All Team\'s Throughout Career.',
      validate: function validateYear(year){
        const reg = /^\d{4,4}\b/;
        return reg.test(year) ? reg.test(year) : year === '' ? true : "Please Enter a Valid Year (Format: YYYY) or Leave Blank to See All Team's Throughout Career."
      }
    }]).then(query => {
      playerSearch.playerTeams(query.id, query.season, data => {
        let modifyer = query.season ? `in ${query.season} ` : 'Throughout Career '
        playerSearch.playerLookup(query.id, player => {
          // console.log(data)
          console.log('*********************************************************************************************************')
          console.log(`*********************************** ${player.name}'s Teams ${modifyer}****************************************`)
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
