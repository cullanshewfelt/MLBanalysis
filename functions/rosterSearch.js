const axios = require('axios');
var columnify = require('columnify');
//****************************************************************************************************
// FUNCTIONS FOR ROSTERS AND TEAMS
//****************************************************************************************************
// NOTE: ALL arguments should be STRINGS, including team_ids and dates
//****************************************************************************************************
//****************************************************************************************************
// fortyManRoster returns the ACTIVE 40 man roster of a given team
//****************************************************************************************************
const fortyManRoster = (team_id, callback) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id='${team_id}'`;
  let roster;
  axios.get(link)
    .then(res => {
      roster = res.data.roster_40.queryResults.row;
      // console.log(roster);
      let dataArray = [];
      for (let player in roster) {
        let data = {
          name: roster[player].name_display_first_last,
          player_id: roster[player].player_id,
          height: `${roster[player].height_feet}'${roster[player].height_inches}"`,
          weight: roster[player].weight,
          jersey: roster[player].jersey_number,
          position: roster[player].position_txt,
          throws: roster[player].throws,
          bats: roster[player].bats,
          college: roster[player].college,
          team: roster[player].team_name,
          team_id: roster[player].team_id
        }
        dataArray.push(data);
      }
      callback(dataArray);
    })
    .catch(err => {
      console.log(err);
    });
};
// fortyManRoster(team_id);
//****************************************************************************************************
// listTeams returns all the teams of a given year
// NOTE: change allStar to 'Y' to include All Star Teams
//****************************************************************************************************
const listTeams = (season, allStar, callback) => {
  let link = allStar ?
    `http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='${allStar}'&sort_order=name_asc&season='${season}'` :
    `http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='${season}'`;
  let teams;
  axios.get(link)
    .then(res => {
      teams = res.data.team_all_season.queryResults.row;
      let dataArray = [];
      for (let team in teams) {
        // console.log(teams[team]);
        let data = {
          team_name: teams[team].name_display_full,
          team_id: teams[team].team_id,
          division_full: teams[team].division_full,
          league: teams[team].league,
          league_id: teams[team].league_id,
          division: teams[team].division,
          division_id: teams[team].division_id,
          division_abbrev: teams[team].division_abbrev
        };
        dataArray.push(data);
      };
      callback(dataArray);
    })
    .catch(err => {
      console.log(err);
    });
};
// listTeams(season)

//****************************************************************************************************
// rosterBySeason returns a team's roster between given dates;
// Dates are given by year as STRINGS eg: '2018'
//****************************************************************************************************
const rosterBySeason = (team_id, start, end, callback) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season='${start}'&end_season='${end}'&team_id='${team_id}'`;
  let roster;
  axios.get(link)
    .then(res => {
      roster = res.data.roster_team_alltime.queryResults.row;
      // console.log(roster);
      let dataArray = [];
      for (let player in roster) {
        let data = {
          name: roster[player].name_first_last,
          player_id: roster[player].player_id,
          height: `${roster[player].height_feet}'${roster[player].height_inches}"`,
          weight: roster[player].weight,
          jersey: roster[player].jersey_number,
          position: roster[player].primary_position,
          team_id: roster[player].team_id,
          throws: roster[player].throws,
          bats: roster[player].bats
        }
        dataArray.push(data);
      }
      callback(dataArray);
    })
    .catch(err => {
      console.log(err);
    });
};
// rosterBySeason(team_id, start, end);

module.exports.listTeams = listTeams;
module.exports.fortyManRoster = fortyManRoster;
module.exports.rosterBySeason = rosterBySeason;
