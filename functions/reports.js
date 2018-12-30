const axios = require('axios');
//****************************************************************************************************
// REPORTS FUNCTIONS
//****************************************************************************************************
// NOTE: ALL arguments should be STRINGS, including dates
//****************************************************************************************************
// transactionsOverPeriod returns all transactions over a given period of time
// start_date and end_date should be in YYYYMMDD format
//****************************************************************************************************
// let start_date = '20181211';
// let end_date = '20181218';

const transactionsOverPeriod = (start_date, end_date, callback) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.transaction_all.bam?sport_code='mlb'&start_date='${start_date}'&end_date='${end_date}'`;
  let players;
  axios.get(link)
    .then(res =>{
      let dataArray = [];
      transactions = res.data.transaction_all.queryResults.row;
      for(let t in transactions){
        let data = {
          transaction: transactions[t].note,
          name: transactions[t].player,
          team: transactions[t].team,
          date: transactions[t].trans_date,
          player_id: transactions[t].player_id,
          transaction_id: transactions[t].transaction_id
        }
        dataArray.push(data);
      }
      callback(dataArray);
    })
    .catch(err =>{
      console.log(err);
    });
};
module.exports.transactionsOverPeriod = transactionsOverPeriod;

// transactionsOverPeriod(start_date, end_date);
//****************************************************************************************************
// broadcastInformation returns all data about broadcast over a given period of time
// start_date and end_date should be in YYYYMMDD format
// home_away is an optional parameter. 'H' for home games. 'A' for away games. Leave null for both
//****************************************************************************************************
// let start_date = '20181021';
// let end_date = '20181031';
// let home_away = 'A';
// let season = '2018';

const broadcastInformation = (start_date, end_date, home_away) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.mlb_broadcast_info.bam?src_type='TV'&src_comment='National'&tcid=mm_mlb_schedule&sort_by='game_time_et_asc'&home_away='${home_away}'&start_date='${start_date}'&end_date='${end_date}'&season='${season}'`;
  let trades;
  axios.get(link)
    .then(res =>{
      trades = res.data.mlb_broadcast_info.queryResults.row;
      console.log(trades);
    })
    .catch(err =>{
      console.log(err);
    });
};
// broadcastInformation(start_date, end_date, home_away);
//****************************************************************************************************
// ***  NOT WORKING  ***   ***  NOT WORKING  ***   ***  NOT WORKING  ***   ***  NOT WORKING  ***
//****************************************************************************************************
// injuryReport returns all players who are currently injured
//****************************************************************************************************
// ***  NOT WORKING  ***   ***  NOT WORKING  ***   ***  NOT WORKING  ***   ***  NOT WORKING  ***
//****************************************************************************************************

// API endpoint isn't correctly well documented

const injuryReport = () => {
  let link = `http://lookup-service-prod.mlb.com/fantasylookup/json/json/named.wsfb_news_injury.bam?`;
  let injuredPlayers;
  axios.get(link)
    .then(res =>{
      injuredPlayers = res.data.wsfb_news_injury.queryResults.row;
      console.log(injuredPlayers);
    })
    .catch(err =>{
      console.log(err);
    });
};
// injuryReport();

module.exports.broadcastInformation = broadcastInformation;
module.exports.injuryReport = injuryReport;
