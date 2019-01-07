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
const playerSearch =  (name, active, callback) => {
  console.log(12, name, active)
  let link =  active
  ? `http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='${active}'&name_part='${name}%25'`
  : `http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${name}%25'`;
  let player;
  axios.get(link)
    .then(res =>{
      player = res.data.search_player_all.queryResults.row;
      console.log(21, player)
      let data = dataParse(player);
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
      let data = dataParse(player);
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
      if(teams.length !== undefined){
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
      } else {
        let data = {
          team: teams.team,
          jersey: teams.jersey_number,
          status: teams.status_code,
          status_date: teams.status_date,
          start_date: teams.start_date,
          position: teams.primary_position
        }
        dataArray.push(data);
      }
      // console.log(dataArray)
      callback(dataArray);
    })
    .catch(err =>{
      console.log(err);
    });
};
// playerTeams(player_id, season)
//****************************************************************************************************
const dataParse = (player) => {
  let birthplace = player.birth_state ? `${player.birth_city}, ${player.birth_state}` : `${player.birth_city}, ${player.birth_country}`
  let position = player.position || player.primary_position_txt;
  let team = player.team_full || player.team_name;
  let data = {
    name: player.name_display_first_last,
    player_id: player.player_id,
    height: `${player.height_feet}'${player.height_inches}"`,
    weight: player.weight,
    position: position,
    team: team,
    team_id: player.team_id,
    throws: ` ${player.throws} `,
    bats: ` ${player.bats} `,
    birthplace: birthplace,
    college: player.college
  }
  return data;
}

//****************************************************************************************************

module.exports.playerSearch = playerSearch;
module.exports.playerLookup = playerLookup;
module.exports.playerTeams = playerTeams;
