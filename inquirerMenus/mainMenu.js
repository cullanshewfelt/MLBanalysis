//****************************************************************************************************
// Here are all the modules being imported.
// Refer to ../functions/ to see logic & API endpoints
// OR ALL API DOCUMENTATION CAN BE FOUND HERE:
// https://appac.github.io/mlb-data-api-docs/
//****************************************************************************************************
const inquirer = require('inquirer');
const columnify = require('columnify');
const rosterSearch = require('../functions/rosterSearch.js');
const playerSearch = require('../functions/playerSearch.js');
const projectedStats = require('../functions/projectedStats.js');
const seasonStats = require('../functions/seasonStats.js');
const leagueStats = require('../functions/leagueStats.js');
const careerStats = require('../functions/careerStats.js');
const reports = require('../functions/reports.js');
const leaderboards = require('../functions/leaderboards.js');
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

const quickNameLookup = (name) => {
  playerSearch.playerSearch(name, 'Y', player => {
    let columns = quickColumn(player);
    console.log('***********************************')
    console.log(`******* ${player.name} Info **********`)
    console.log('***********************************')
    console.log(columns);
    seasonHittingPrompt()
  });
}

const quickStatsLookup = (player) => {
  seasonStats.seasonHittingStats
}
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
        quickNameLookup(answer.menu)
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
          // console.log('\033[2J');
          rosterSearchPrompt(currentMenu);
          break;
        case 'Player Search Menu':
          // console.log('\033[2J');
          playerSearchPrompt(currentMenu);
          break;
        case 'Player Statistics Menu':
          // console.log('\033[2J');
          statsSearchPrompt(currentMenu);
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
          menu();
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
        let columns = quickColumn(data);
        console.log('****************************************************************************************************************************************************************')
        console.log(`************************************************************** ${data[0].team} 40 Man Roster ***************************************************************`)
        console.log('****************************************************************************************************************************************************************')
        console.log(columns);
        searchByIdPrompt(currentMenu);
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
      message: 'Enter a Season (Year Format: YYYY) to See Teams'
    }]).then(answer => {
      rosterSearch.listTeams(answer.year, 'N', data => {
        let columns = quickColumn(data);
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
      message: 'Enter the Start Year (YYYY)'
    }, {
      type: 'input',
      name: 'end_year',
      message: 'Enter the End Year (YYYY)'
    }]).then(answer => {
      rosterSearch.rosterBySeason(answer.team_id, answer.start_year, answer.end_year, data => {
        rosterSearch.fortyManRoster(answer.team_id.toString(), roster => {
          let columns = quickColumn(data)
          console.log('**************************************************************************************************************')
          console.log(`***************************************** ${roster[0].team}'s Roster ***************************************`)
          console.log('**************************************************************************************************************')
          console.log(columns);
          searchByIdPrompt(currentMenu);
        })
      });
    });
};

//----------------------------------------------------------------------------------------------------



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
          menu();
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
      quickNameLookup(answer.name);
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
        let columns = quickColumn(data);
        console.log(columns)
      });
    });
};

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
          let columns = quickColumn(data);
          console.log(columns);
        })
      });
    });
};

//----------------------------------------------------------------------------------------------------
// PLAYER STATISTICS MENUS
//----------------------------------------------------------------------------------------------------

const statsSearchPrompt = (currentMenu) => {
  // console.log('\033[2J');
  inquirer
    .prompt([{
      type: 'list',
      name: 'statSearch',
      message: 'What would you like to do?',
      choices: ['Season Hitting Stats', 'Season Pitching Stats', 'Main Menu']
    }]).then(submenu => {
      switch (submenu.statSearch) {
        case 'Season Hitting Stats':
          // console.log('\033[2J');
          seasonHittingPrompt();
          // fortyManRoster(currentMenu);
          break;
        case 'Season Pitching Stats':
          // console.log('\033[2J');
          console.log('Season Pitching Stats')
          // listTeams(currentMenu);
          break;
        case 'Main Menu':
          console.log('\033[2J');
          menu();
          break;
      };
    });
};

//----------------------------------------------------------------------------------------------------

const seasonHittingPrompt = (currentMenu) => {
  // console.log('\033[2J');
  inquirer
    .prompt([{
        type: 'input',
        name: 'id',
        message: 'Enter Player ID to see Hitting Stats'
      },
      {
        type: 'input',
        name: 'season',
        message: 'Enter the season (Year format YYYY) of the season you want stats for'
      },
      {
        type: 'list',
        name: 'game_type',
        message: 'Choose the game type you want stats for',
        choices: ['Regular Season -R', 'World Series -W', 'League Championship -L', 'First Round (Wild Card) -F', 'Division Series -D', 'Spring Training -S']
      }
    ]).then(answer => {
      seasonStats.seasonHittingStats(answer.id, answer.season, answer.game_type, stats => {
        playerSearch.playerLookup(answer.id, data => {
          let columns = quickColumn(stats)
          console.log('****************************************************************************************************************************************************************')
          console.log(`***************************************************************** ${data.name}'s Statistics ******************************************************************`)
          console.log('****************************************************************************************************************************************************************')
          console.log(data.name)
          console.log(columns);
        });

      });
    });
};

//----------------------------------------------------------------------------------------------------
// REPORTS MENUS
//----------------------------------------------------------------------------------------------------


//****************************************************************************************************
// INITIALIZE
//****************************************************************************************************

module.exports = {
  menu: menu
}
