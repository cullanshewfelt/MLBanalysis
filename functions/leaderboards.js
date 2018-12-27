const axios = require('axios');
//****************************************************************************************************
// FUNCTIONS FOR LEADERBOARD STATISTICS/PLAYERS
//****************************************************************************************************
// hittingLeaders returns data regarding the hitting leaderboards
//****************************************************************************************************
// results is a required INTERGER, specifying the number of results to return;
// season is also a required parameter;
// game_type is a required parameter;
// sort_column is a required parameter, specifying which stat to sort by: 'ab', 'hr', etc.
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
// SORT COLUMNS
//----------------------------------------------------------------------------------------------------
// 'gidp' -- ground into double play
// 'sac' -- sacrifice hits and bunts
// 'np' -- number of pitches seen
// 'name_display_first_last' -- displays name
// 'pos' -- position
// 'rank' -- power ranking
// 'tb' -- total bases
// 'team_brief' -- team's short name or 'mascot'
// 'sport_id' -- wow i wonder how much variation this will have....
// 'name_display_last_init' -- last name, first initial
// 'bb' -- walks
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
// 'minimum_qualifier' --
// 'gdp' --
// 'name_display_roster' --
// 'qualifies' --
// 'rbi' -- Runners batted in
// 'name_first' -- player's first name
// 'bats' -- Bats left handed, right handed, or switch hits.
// 'xbh' -- extra base hits
// 'g' -- games played
// 'd' --
// 'team_name' -- name of player's team
// 'sport' -- baseball...
// 'tpa' --
// 'name_display_last_first' -- Last Name, First Name
// 'h' -- Hits
// 'obp' -- On Base Percentage (Average plus walk rate)
// 't' --
// 'ao' --
// 'r' -- runs
// 'ab' -- at bats
// 'name_last' -- player's last name
//****************************************************************************************************
// let results = 20;
// let game_type = 'R';
// let season = '2018';
// let sort_column = 'hr';
// let leader_hitting_repeater;

const hittingLeaders = (results, game_type, season, sort_column, leader_hitting_repeater) => {
  let link = leader_hitting_repeater
  ? `http://lookup-service-prod.mlb.com/json/named.leader_hitting_repeater.bam?sport_code='mlb'&results=${results}&game_type='${game_type}'&season='${season}'&sort_column='${sort_column}'&leader_hitting_repeater.col_in=${leader_hitting_repeater}`
  : `http://lookup-service-prod.mlb.com/json/named.leader_hitting_repeater.bam?sport_code='mlb'&results=${results}&game_type='${game_type}'&season='${season}'&sort_column='${sort_column}'`;
  let leaders;
  axios.get(link)
    .then(res =>{
      leaders = res.data.leader_hitting_repeater.leader_hitting_mux.queryResults.row;
      // console.log(leaders);
      for(let players in leaders){
        let player = leaders[players];
        for(let keys in player){
          // Shows keys, which are the sort_columns
          // console.log(keys)
        }
        // See results :
        console.log(player)
        // See basic slash line :
        // console.log(`${player.name_display_first_last} hit ${player.hr} homeruns off ${player.h} hits, ${player.rbi} RBI's, in ${player.ab} ABs. Averaging ${player.avg}/${player.obp}/${player.slg}/${player.ops}.`)
      }
    })
    .catch(err =>{
      console.log(err);
    });
};
// hittingLeaders(results, game_type, season, sort_column, leader_hitting_repeater);
//****************************************************************************************************
// pitchingLeaders returns data regarding the hitting leaderboards
//****************************************************************************************************
// results is a required INTERGER, specifying the number of results to return;
// season is also a required parameter;
// game_type is a required parameter;
// sort_column is a required parameter, specifying which stat to sort by: 'era', 'so', etc.
// SORT COLUMNS
//----------------------------------------------------------------------------------------------------
// 'gidp' -- ground into double play
// 'np' -- number of pitches
// 'name_display_first_last' -- displays name
// 'gf' -- games finished
// 'k_9' -- average number of strikeouts per 9 innings
// 'rank' -- rank of returned stats
// 'sho' -- shutouts
// 'tb' --
// 'bk' --
// 'sport_id' --
// 'sv' --
// 'name_display_last_init' --
// 'slg' --
// 'avg' --
// 'whip' --
// 'bb' --
// 'ops' --
// 'p_ip' --
// 'team_abbrev' --
// 'so' --
// 'tbf' --
// 'throws' --
// 'league_id' --
// 'wp' --
// 'team' --
// 'league' --
// 'hb' --
// 'cs' --
// 'pa' --
// 'go_ao' --
// 'sb' --
// 'last_name' --
// 'cg' --
// 'player_id' --
// 'ibb' --
// 'gs' --
// 'h_9' --
// 'player_qualifier' --
// 'team_id' --
// 'go' --
// 'pk' --
// 'hr' --
// 'bb_9' --
// 'minimum_qualifier' --
// 'wpct' --
// 'gdp' --
// 'era' --
// 'name_display_roster' --
// 'qualifies' --
// 'g' --
// 'hld' --
// 'k_bb' --
// 'team_name' --
// 'sport' --
// 'l' --
// 'svo' --
// 'name_display_last_first' --
// 'h' --
// 'ip' --
// 'obp' --
// 'w' --
// 'ao' --
// 'r' --
// 'ab' --
// 'name_last' --
// 'er' --
//****************************************************************************************************
let results = 5;
// let game_type = 'R';
// let season = '2018';
let sort_column = 'era';
let leader_pitching_repeater;

const pitchingLeaders = (results, game_type, season, sort_column, leader_pitching_repeater) => {
  let link =  leader_pitching_repeater
  ? `http://lookup-service-prod.mlb.com/json/named.leader_pitching_repeater.bam?sport_code='mlb'&results=${results}&game_type='${game_type}'&season='${season}'&sort_column='${sort_column}'&leader_pitching_repeater.col_in=${leader_pitching_repeater}`
  : `http://lookup-service-prod.mlb.com/json/named.leader_pitching_repeater.bam?sport_code='mlb'&results=${results}&game_type='${game_type}'&season='${season}'&sort_column='${sort_column}'`
  let pitchers;
  axios.get(link)
    .then(res =>{
      pitchers = res.data.leader_pitching_repeater.leader_pitching_mux.queryResults.row;
      console.log(pitchers);
      for(let leaders in pitchers){
        let player = pitchers[leaders];
        for(let keys in player){
          // Shows keys, which are the sort_columns
          // console.log(keys)
        }
        // See results :
        // console.log(player)
      // console.log(`${player.name_display_first_last} hit ${player.hr} homeruns off ${player.h} hits, ${player.rbi} RBI's, in ${player.ab} ABs. Averaging ${player.avg}/${player.obp}/${player.slg}/${player.ops}.`)
      }
    })
    .catch(err =>{
      // console.log(err);
    });
};

// pitchingLeaders(results, game_type, season, sort_column, leader_pitching_repeater);

module.exports.pitchingLeaders = pitchingLeaders;
module.exports.hittingLeaders = hittingLeaders;
