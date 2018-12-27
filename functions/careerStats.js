const axios = require('axios');
//****************************************************************************************************
// FUNCTIONS FOR PLAYER'S CAREER STATISTICS
//********************************************************************************************************
// NOTE: ALL arguments should be STRINGS, including player_ids and years/seasons
//****************************************************************************************************
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
// careerHittingStats returns a players career hitting statistics given a player_id and game_type
//****************************************************************************************************
const careerHittingStats = (player_id, game_type) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='${game_type}'&player_id='${player_id}'`;
  let stats;
  axios.get(link)
    .then(res =>{
      stats = res.data.sport_career_hitting.queryResults.row;
      console.log(stats);
    })
    .catch(err =>{
      console.log(err);
    });
};

// careerHittingStats(player_id, game_type);
//****************************************************************************************************
// careerPitchingStats returns a players career pitching statistics given a player_id and game_type
//****************************************************************************************************
const careerPitchingStats = (player_id, game_type) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.sport_career_pitching.bam?league_list_id='mlb'&game_type='${game_type}'&player_id='${player_id}'`;
  let stats;
  axios.get(link)
    .then(res =>{
      stats = res.data.sport_career_pitching.queryResults.row;
      console.log(stats);
    })
    .catch(err =>{
      console.log(err);
    });
};

// careerPitchingStats(player_id, game_type);

module.exports.careerHittingStats = careerHittingStats;
module.exports.careerPitchingStats = careerPitchingStats;
