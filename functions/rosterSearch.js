const axios = require('axios');
//****************************************************************************************************
// FUNCTIONS FOR ROSTERS AND TEAMS
//****************************************************************************************************
// NOTE: ALL arguments should be STRINGS, including team_ids and dates
//****************************************************************************************************
// listTeams returns all the teams of a given year
// NOTE: change allStar to 'Y' to include All Star Teams
//****************************************************************************************************
const listTeams = (season, allStar) => {
  let link =  allStar
  ? `http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='${allStar}'&sort_order=name_asc&season='${season}'`
  : `http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='${season}'`;

  let teams;
  axios.get(link)
    .then(res =>{
      teams = res.data.team_all_season.queryResults.row;
      console.log(teams);
    })
    .catch(err =>{
      console.log(err);
    });
};
// listTeams(season)
//****************************************************************************************************
// fortyManRoster returns the ACTIVE 40 man roster of a given team
//****************************************************************************************************
const fortyManRoster = (team_id) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id='${team_id}'`;
  let roster;
  axios.get(link)
    .then(res =>{
      roster = res.data.roster_40.queryResults.row;
      // console.log(roster);
      for(let player in roster){
        // console.log(roster[player].name_display_first_last);
      }
    })
    .catch(err =>{
      console.log(err);
    });
};
// fortyManRoster(team_id);
//****************************************************************************************************
// rosterBySeason returns a team's roster between given dates;
// Dates are given by year as STRINGS eg: '2018'
//****************************************************************************************************
const rosterBySeason = (team_id, start, end) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season='${start}'&end_season='${end}'&team_id='${team_id}'`;
  let roster;
  axios.get(link)
    .then(res =>{
      roster = res.data.roster_team_alltime.queryResults.row;
      console.log(roster);
      // for(let player in roster){
        // console.log(roster[player].name_first_last);
      // }
    })
    .catch(err =>{
      console.log(err);
    });
};
// rosterBySeason(team_id, start, end);

module.exports.listTeams = listTeams;
module.exports.fortyManRoster = fortyManRoster;
module.exports.rosterBySeason = rosterBySeason;
