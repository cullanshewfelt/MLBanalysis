const axios = require('axios');
//**********************************************************************************************************************
// FUNCTIONS FOR PLAYER'S PROJECTED SEASON STATISTICS
//**********************************************************************************************************************
// SORT COLUMNS
//----------------------------------------------------------------------------------------------------
// 'gidp' -- ground into double play
// 'sac' -- sacrifice hits and bunts
// 'np' -- total number of pitches seen
// 'name_display_first_last' -- displays full name
// 'pos' -- position
// 'rank' -- power ranking
// 'tb' -- total bases
// 'team_brief' -- team's short name or 'mascot'
// 'sport_id' -- wow i wonder how much variation this will have....
// 'name_display_last_init' -- last name, first initial
// 'bb' -- total walks
// 'avg' -- batting average
// 'slg' -- slugging average
// 'ops' -- on base percentage plus slugging
// 'hbp' -- hit by pitch
// 'team_abbrev' -- capitalized abbreviated team name
// 'so' -- strikeouts
// 'league_id' -- number that refers to team's league and division
// 'sf' -- sacrifice flies
// 'team' -- lowercase abbreviation
// 'league' -- NL or AL
// 'cs' -- runners caught stealing
// 'sb' -- stolen bases
// 'go_ao' -- ground out / fly out ratio
// 'last_name' -- player's last name
// 'player_id' -- MLB stats API id associated with player
// 'ibb' -- intentional walks
// 'player_qualifier' --
// 'team_id' -- MLB stats API id associated with player's team
// 'go' -- ground outs
// 'hr' -- homeruns
// 'minimum_qualifier' -- 502 plate appearances
// 'gdp' -- ground into double play
// 'name_display_roster' -- name
// 'qualifies' -- Y or N
// 'rbi' -- Runners batted in
// 'name_first' -- player's first name
// 'bats' -- Bats left handed, right handed, or switch hits.
// 'xbh' -- extra base hits
// 'g' -- games played
// 'd' -- total doubles
// 'team_name' -- name of player's team
// 'sport' -- baseball...
// 'tpa' -- total plate appearances
// 'name_display_last_first' -- Last Name, First Name
// 'h' -- Hits
// 'obp' -- On Base Percentage (Average plus walk rate)
// 't' -- triples
// 'ao' -- flyouts
// 'r' -- runs
// 'ab' -- at bats
// 'name_last' -- player's last name
//********************************************************************************************************

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
