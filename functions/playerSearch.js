const axios = require('axios');
const columnify = require('columnify');
//****************************************************************************************************
// FUNCTIONS FOR PLAYER SEARCH/LOOKUP
//****************************************************************************************************
// NOTE: ALL arguments should be STRINGS, including player_ids and years/seasons
//****************************************************************************************************
// playerSearch searches via inputed STRING.
// Can search active and inactive players (an optional parameter).
//****************************************************************************************************
const playerSearch = (name, active, callback) => {
  console.log('\033[2J');
  let link = active
  ? `http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='${active}'&name_part='${name}%25'`
  : `http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${name}%25'`;
  let player;
  axios.get(link)
    .then(res =>{
      player = res.data.search_player_all.queryResults.row;
      // console.log(player)
      let data = {
        name: player.name_display_first_last,
        player_id: player.player_id,
        height: `${player.height_feet}'${player.height_inches}"`,
        weight: player.weight,
        position: player.position,
        team: player.team_full,
        team_id: player.team_id,
        throws: player.throws,
        bats: player.bats,
        birthplace: `${player.birth_city}, ${player.birth_country}`,
        college: player.college
      }
      callback(data);
    })
    .catch(err =>{
      console.log(err)
    })
};
// playerSearch(name, active)
//****************************************************************************************************
// playerLookup returns information from a player ID.
//****************************************************************************************************
const playerLookup = (player_id, callback) => {
  let player;
  let link = `http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='${player_id}'`;
  axios.get(link)
    .then(res =>{
      player = res.data.player_info.queryResults.row;
      // console.log(player);
      let data = {
        name: player.name_display_first_last,
        player_id: player.player_id,
        height: `${player.height_feet}'${player.height_inches}"`,
        weight: player.weight,
        position: player.primary_position_txt,
        team: player.team_name,
        team_id: player.team_id,
        throws: player.throws,
        bats: player.bats,
        birthplace: `${player.birth_city}, ${player.birth_country}`,
        college: player.college
      }
      callback(data)
    })
    .catch(err =>{
      console.log(err);
    });
};
// playerLookup(player_id);
//****************************************************************************************************
// playerTeams returns information about what teams a player played for.
// season is an optional parameter
//****************************************************************************************************
const playerTeams = (player_id, season, callback) => {
  // Ternary operate checks for a season, if there is one, include it, if not, return all teams/seasons played for.
  let link = season
  ? `http://lookup-service-prod.mlb.com/json/named.player_teams.bam?season='${season}'&player_id='${player_id}'`
  : `http://lookup-service-prod.mlb.com/json/named.player_teams.bam?player_id='${player_id}'`;
  let teams;
  let dataArray = [];
  axios.get(link)
    .then(res =>{
      teams = res.data.player_teams.queryResults.row;
      for(let team in teams){
        let data = {
          team: teams[team].team,
          jersey: teams[team].jersey_number,
          status: teams[team].status_code,
          status_date: teams[team].status_date,
          start_date: teams[team].start_date,
          position: teams[team].primary_position
        }
        dataArray.push(data)
      }
      callback(dataArray);
    })
    .catch(err =>{
      console.log(err);
    });
};
// playerTeams(player_id, season)

module.exports.playerSearch = playerSearch;
module.exports.playerLookup = playerLookup;
module.exports.playerTeams = playerTeams;
