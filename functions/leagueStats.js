const axios = require('axios');
//********************************************************************************************************************
// FUNCTIONS FOR PLAYER'S CAREER LEAGUE STATISTICS
//********************************************************************************************************************
// NOTE: ALL arguments should be STRINGS, including player_ids and years/seasons
//********************************************************************************************************************
// GAME TYPES:
//--------------------------------------------------------------------------------------------------------------------
// 'R' - Regular Season
// 'S' - Spring Training
// 'E' - Exhibition
// 'A' - All Star Game
// 'D' - Division Series
// 'F' - First Round (Wild Card)
// 'L' - League Championship
// 'W' - World Series
//********************************************************************************************************************
// leagueHittingStats returns a players career hitting statistics among both leagues given a player_id and game_type
//********************************************************************************************************************
const leagueHittingStats = (player_id, game_type) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.sport_career_hitting_lg.bam?league_list_id='mlb'&game_type='${game_type}'&player_id='${player_id}'`;
  let stats;
  axios.get(link)
    .then(res =>{
      stats = res.data.sport_career_hitting_lg.queryResults.row;
      console.log(stats);
    })
    .catch(err =>{
      console.log(err);
    });
};

// leagueHittingStats(player_id, game_type);
//********************************************************************************************************************
// leaguePitchingStats returns a players career pitching statistics among both leagues given a player_id and game_type
//********************************************************************************************************************
const leaguePitchingStats = (player_id, game_type) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.sport_career_pitching_lg.bam?league_list_id='mlb'&game_type='${game_type}'&player_id='${player_id}'`;
  let stats;
  axios.get(link)
    .then(res =>{
      stats = res.data.sport_career_pitching_lg.queryResults.row;
      console.log(stats);
    })
    .catch(err =>{
      console.log(err);
    });
};

// leaguePitchingStats(player_id, game_type);

module.exports.leagueHittingStats = leagueHittingStats;
module.exports.leaguePitchingStats = leaguePitchingStats;
