const axios = require('axios');
//********************************************************************************************************
// FUNCTIONS FOR PLAYER'S SEASON STATISTICS
//********************************************************************************************************
// NOTE: ALL arguments should be STRINGS, including player_ids and years/seasons
//********************************************************************************************************
// GAME TYPES:
//----------------------------------------------------------------------------------------------------
// 'R' - Regular Season
// 'S' - Spring Training
// 'E' - Exhibition
// 'A' - All Star Game
// 'D' - Division Series
// 'F' - First Round (Wild Card)
// 'L' - League Championship
// 'W' - World Series
//****************************************************************************************************
//********************************************************************************************************
// seasonHittingStats returns a players hitting statistics given a player_id, season (year), and game_type
//********************************************************************************************************
const seasonHittingStats = (player_id, season, game_type) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='${game_type}'&season='${season}'&player_id='${player_id}'`;
  let stats;
  axios.get(link)
    .then(res =>{
      stats = res.data.sport_hitting_tm.queryResults.row;
      console.log(stats);
    })
    .catch(err =>{
      console.log(err);
    });
};

// seasonHittingStats(player_id, season, game_type);
//****************************************************************************************************
// seasonPitchingStats returns pitching statistics given a player_id, season (year), and game_type
//****************************************************************************************************
const seasonPitchingStats = (player_id, season, game_type) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='${game_type}'&season='${season}'&player_id='${player_id}'`;
  let stats;
  axios.get(link)
    .then(res =>{
      stats = res.data.sport_pitching_tm.queryResults.row;
      console.log(stats);
    })
    .catch(err =>{
      console.log(err);
    });
};
// seasonPitchingStats(player_id, season, game_type);

module.exports.seasonHittingStats = seasonHittingStats;
module.exports.seasonPitchingStats = seasonPitchingStats;
