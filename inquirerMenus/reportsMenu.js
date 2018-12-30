const inquirer = require('inquirer');
var moment = require('moment');
const tools = require('./menuTools.js');
const menu = require('./mainMenu.js');
const reports = require('../functions/reports.js');

//----------------------------------------------------------------------------------------------------
// REPORTS MENUS
//----------------------------------------------------------------------------------------------------
const reportsPrompt = (currentMenu) => {
  // console.log('\033[2J');
  inquirer
    .prompt([{
      type: 'list',
      name: 'reports',
      message: 'What would you like to do?',
      choices: ['Transactions Report', 'Injury Report', 'Broadcast Information', 'Main Menu']
    }]).then(submenu => {
      switch (submenu.reports) {
        case 'Transactions Report':
          transactionsPrompt();
          break;
        case 'Injury Report':
          // seasonPitchingPrompt();
          break;
        case 'Broadcast Information':
          // seasonPitchingPrompt();
          break;
        case 'Main Menu':
          menu.menu();
          break;
      };
    });
};

module.exports.reportsPrompt = reportsPrompt;
//----------------------------------------------------------------------------------------------------

const transactionsPrompt = () => {
  inquirer
    .prompt([{
      type: 'input',
      name: 'startDate',
      message: 'Enter the start date (format: YYYYMMDD), or hit ENTER to search for the last week'
    },
    {
      type: 'input',
      name: 'endDate',
      message: 'Enter the end date (format: YYYYMMDD), or hit ENTER to search for the last week'
    }]).then(submenu => {
      let startDate = submenu.startDate || (parseInt(moment().format('YYYYMMDD'))-7).toString();
      let endDate = submenu.endDate || moment().format('YYYYMMDD');
        reports.transactionsOverPeriod(startDate, endDate, stats => {
          startDate = `${startDate.slice(4,6)}/${startDate.slice(6,8)}/${startDate.slice(0,4)}`
          endDate = `${endDate.slice(4,6)}/${endDate.slice(6,8)}/${endDate.slice(0,4)}`
          let columns = tools.quickColumn(stats)
          console.log('******************************************************************************************************************************************************************************')
          console.log(`******************************************************** Transactions Report from ${startDate} to ${endDate} *******************************************************************`)
          console.log('******************************************************************************************************************************************************************************')
          console.log(columns);
          reportsPrompt();
        })
    });
};



//----------------------------------------------------------------------------------------------------
