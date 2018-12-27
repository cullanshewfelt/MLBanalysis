const axios = require('axios');
//**********************************************************************************************************************
// FUNCTIONS FOR PLAYER'S PROJECTED SEASON STATISTICS
//**********************************************************************************************************************
// projectedPitchingStats returns a players career hitting statistics among both leagues given a player_id and game_type
// both player_id and season SHOULD BE STRINGS
//**********************************************************************************************************************
const projectedPitchingStats = (player_id, season) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.proj_pecota_pitching.bam?league_list_id='mlb'&season='${season}'&player_id='${player_id}'`;
  let stats;
  axios.get(link)
    .then(res =>{
      stats = res.data.proj_pecota_pitching.queryResults.row;
      console.log(stats);
    })
    .catch(err =>{
      console.log(err);
    });
};

// projectedPitchingStats(player_id, season);
//*********************************************************************************************************************
// projectedHittingStats returns a players career hitting statistics among both leagues given a player_id and game_type
//*********************************************************************************************************************
// const season = '2018';
const projectedHittingStats = (player_id, season) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.proj_pecota_batting.bam?league_list_id='mlb'&season='${season}'&player_id='${player_id}'`;
  let stats;
  axios.get(link)
    .then(res =>{
      stats = res.data.proj_pecota_batting.queryResults.row;
      console.log(stats);
    })
    .catch(err =>{
      console.log(err);
    });
};
// projectedHittingStats(player_id, season);


module.exports.projectedPitchingStats = projectedPitchingStats;
module.exports.projectedHittingStats = projectedHittingStats;
