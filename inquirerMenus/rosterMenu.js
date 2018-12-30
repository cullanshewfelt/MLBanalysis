const inquirer = require('inquirer');
const playerSearchMenu = require('./playerSearchMenu.js');
const tools = require('./menuTools.js');
const rosterSearch = require('../functions/rosterSearch.js');
const playerSearch = require('../functions/playerSearch.js');
const menu = require('./mainMenu.js');

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
          fortyManRoster(currentMenu);
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
          menu.menu();
          break;
      };
    });
};

//----------------------------------------------------------------------------------------------------

const fortyManRoster = (currentMenu) => {
  // console.log('\033[2J');
  inquirer
    .prompt([{
      type: 'input',
      name: 'team_id',
      message: 'Enter a Team ID to See Their 40 Man Roster'
    }]).then(answer => {
      console.log('\033[2J');
      rosterSearch.fortyManRoster(answer.team_id.toString(), data => {
        let columns = tools.quickColumn(data);
        console.log('****************************************************************************************************************************************************************')
        console.log(`************************************************************** ${data[0].team} 40 Man Roster ***************************************************************`)
        console.log('****************************************************************************************************************************************************************')
        console.log(columns);
        playerSearchMenu.searchByIdPrompt(currentMenu);
      });
    });
};

//----------------------------------------------------------------------------------------------------

const listTeams = (currentMenu) => {
  console.log('\033[2J');
  inquirer
    .prompt([{
      type: 'input',
      name: 'year',
      message: 'Enter a Season (Year Format: YYYY) to See Teams',
      validate: tools.validateYear
    }]).then(answer => {
      rosterSearch.listTeams(answer.year, 'N', data => {
        let columns = tools.quickColumn(data);
        console.log('****************************************************************************************************************************************************************')
        console.log(`************************************************************************* ${answer.year} MLB Teams ***************************************************************************`)
        console.log('****************************************************************************************************************************************************************')
        console.log(columns);
        fortyManRoster(currentMenu);
      });
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
      message: 'Enter the Start Year (YYYY)',
      validate: tools.validateYear
    }, {
      type: 'input',
      name: 'end_year',
      message: 'Enter the End Year (YYYY)',
      validate: tools.validateYear
    }]).then(answer => {
      rosterSearch.rosterBySeason(answer.team_id, answer.start_year, answer.end_year, data => {
        rosterSearch.fortyManRoster(answer.team_id.toString(), roster => {
          let columns = tools.quickColumn(data)
          console.log('**************************************************************************************************************')
          console.log(`***************************************** ${roster[0].team}'s Roster ***************************************`)
          console.log('**************************************************************************************************************')
          console.log(columns);
          searchByIdPrompt(currentMenu);
        })
      });
    });
};

module.exports = {
  rosterSearchPrompt: rosterSearchPrompt,
  fortyManRoster: fortyManRoster,
  listTeams: listTeams,
  rosterBySeason: rosterBySeason
}
