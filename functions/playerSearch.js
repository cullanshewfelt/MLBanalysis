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
const playerSearch = (name, active) => {
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
        height: `${player.height_feet}'${player.height_inches}"`,
        weight: player.weight,
        position: player.position,
        team: player.team_full,
        throws: player.throws,
        bats: player.bats,
        birthplace: `${player.birth_city}, ${player.birth_country}`,
        player_id: player.player_id,
        college: player.college
      }
      let columns = columnify(data);
      console.log(columns)
    })
    .catch(err =>{
      console.log(err)
    })
};
// playerSearch(name, active)
//****************************************************************************************************
// playerLookup returns information from a player ID.
//****************************************************************************************************
const playerLookup = (player_id) => {
  let player;
  let link = `http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='${player_id}'`;
  axios.get(link)
    .then(res =>{
      player = res.data.player_info.queryResults.row;
      console.log(player);
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
const playerTeams = (player_id, season) => {
  // Ternary operate checks for a season, if there is one, include it, if not, return all teams/seasons played for.
  let link = season
  ? `http://lookup-service-prod.mlb.com/json/named.player_teams.bam?season='${season}'&player_id='${player_id}'`
  : `http://lookup-service-prod.mlb.com/json/named.player_teams.bam?player_id='${player_id}'`;
  let teams;
  axios.get(link)
    .then(res =>{
      teams = res.data.player_teams.queryResults.row;
      console.log(teams);
    })
    .catch(err =>{
      console.log(err);
    });
};
// playerTeams(player_id, season)

module.exports.playerSearch = playerSearch;
module.exports.playerLookup = playerLookup;
module.exports.playerTeams = playerTeams;
