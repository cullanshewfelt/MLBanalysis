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
// seasonHittingStats returns a players hitting statistics given a player_id, season (year), and game_type
//********************************************************************************************************
const seasonHittingStats = (player_id, season, game_type, callback) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='${game_type}'&season='${season}'&player_id='${player_id}'`;
  let stats;
  axios.get(link)
    .then(res =>{
      stats = res.data.sport_hitting_tm.queryResults.row;
      // console.log(stats)
      let data = {
        average: stats.avg,
        hits: stats.h,
        home_runs: stats.hr,
        runs: stats.r,
        rbis: stats.rbi,
        walks: stats.bb,
        stolen_bases: stats.sb,
        left_on_base: stats.lob
      }
      callback(data);
    })
    .catch(err =>{
      console.log(err);
    });
};

// seasonHittingStats(player_id, season, game_type);
//****************************************************************************************************
// seasonPitchingStats returns pitching statistics given a player_id, season (year), and game_type
//****************************************************************************************************
const seasonPitchingStats = (player_id, season, game_type, callback) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='${game_type}'&season='${season}'&player_id='${player_id}'`;
  let stats;
  axios.get(link)
    .then(res =>{
      stats = res.data.sport_pitching_tm.queryResults.row;
      // console.log(stats)
      let data = {
        era: stats.era,
        whip: stats.whip,
        average: stats.avg,
        strikeouts: stats.so,
        hits: stats.h,
        walks: stats.bb,
        innings_pitched: stats.ip,
        wins: stats.w,
        loses: stats.l,
        games_started: stats.gs
      }
      callback(data);
    })
    .catch(err =>{
      console.log(err);
    });
};
// seasonPitchingStats(player_id, season, game_type);

module.exports.seasonHittingStats = seasonHittingStats;
module.exports.seasonPitchingStats = seasonPitchingStats;
