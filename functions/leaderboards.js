const axios = require('axios');
//****************************************************************************************************
// FUNCTIONS FOR LEADERBOARD STATISTICS/PLAYERS
//****************************************************************************************************
// SORT COLUMNS FOR HITTERS
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
//****************************************************************************************************
// hittingLeaders returns data regarding the hitting leaderboards for that season
//****************************************************************************************************
// results is a required INTERGER, specifying the number of results to return;
// season is also a required STRING;
// game_type is a required STRING;
// sort_column is a required STRING, specifying which stat to sort by: 'ab', 'hr' etc.
//****************************************************************************************************
const hittingLeaders = (results, game_type, season, sort_column, callback) => {
  let leader_hitting_repeater;
  let link = leader_hitting_repeater ?
    `http://lookup-service-prod.mlb.com/json/named.leader_hitting_repeater.bam?sport_code='mlb'&results=${results}&game_type='${game_type}'&season='${season}'&sort_column='${sort_column}'&leader_hitting_repeater.col_in=${leader_hitting_repeater}` :
    `http://lookup-service-prod.mlb.com/json/named.leader_hitting_repeater.bam?sport_code='mlb'&results=${results}&game_type='${game_type}'&season='${season}'&sort_column='${sort_column}'`;
  let leaders;
  axios.get(link)
    .then(res => {
      leaders = res.data.leader_hitting_repeater.leader_hitting_mux.queryResults.row;
      let dataArray = [];
      // console.log(leaders);
      for (let players in leaders) {
        let player = leaders[players];
        console.log(player)
        let data = {
          name: player.name_display_first_last,
          sort_column: player[sort_column],
          average: player.avg,
          hits: player.h,
          home_runs: player.hr,
          runs: player.r,
          rbis: player.rbi,
          walks: player.bb,
          stolen_bases: player.sb
        }
        dataArray.push(data);
      }
      console.log(dataArray)
      callback(dataArray)
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.hittingLeaders = hittingLeaders;

// hittingLeaders(results, game_type, season, sort_column, leader_hitting_repeater);
//****************************************************************************************************
// SORT COLUMNS FOR PITCHERS
//----------------------------------------------------------------------------------------------------
// 'gidp' -- ground into double play
// 'np' -- total number of pitches
// 'name_display_first_last' -- displays name
// 'gf' -- games finished
// 'k_9' -- average number of strikeouts per 9 innings
// 'rank' -- rank amongst returned players
// 'sho' -- total shutouts
// 'tb' -- total balls
// 'bk' -- total balks
// 'sport_id' -- 1
// 'sv' -- saves
// 'name_display_last_init' -- last name, first initial
// 'slg' -- slugging percentage
// 'avg' -- average against
// 'whip' -- walks and hits per innings pitched
// 'bb' -- total walks
// 'ops' -- on-base plus slugging
// 'p_ip' -- pitches per innings pitched
// 'team_abbrev' -- three letter abbreviation
// 'so' -- total strikeouts
// 'tbf' -- total batters faced
// 'throws' -- left or right
// 'league_id' -- number corredsponding to league
// 'wp' -- total wild pitches
// 'team' -- ??? weird format ??????????????????????
// 'league' -- NL or AL
// 'hb' -- total batters hit
// 'cs' -- total runners caught stealing
// 'pa' -- total plate appearances
// 'go_ao' -- groundouts to flyouts ratio
// 'sb' -- stolen bases against
// 'last_name' -- last name
// 'cg' -- complete games
// 'player_id' -- player's id for this API
// 'ibb' -- intentional walks
// 'gs' -- total games saved
// 'h_9' -- total hits per 9 innings
// 'player_qualifier' -- innings pitched
// 'team_id' -- team's id for this API
// 'go' -- total groundouts
// 'pk' -- total pickoffs
// 'hr' -- total homeruns given
// 'bb_9' -- walks per 9 innings
// 'minimum_qualifier' -- 162.0 innings
// 'wpct' -- win percentage
// 'gdp' -- ground into double play
// 'era' -- earned run average (9*r/IP)
// 'name_display_roster' -- last name, first name
// 'qualifies' -- player_qualifier >= minimum_qualifier (162.0) ? true : false
// 'g' -- games played
// 'hld' -- holds
// 'k_bb' -- strikeout to walk ratio
// 'team_name' -- team full name
// 'sport' -- MLB
// 'l' -- total loses
// 'svo' -- save opportunities
// 'name_display_last_first' -- last name, first name
// 'h' -- total hits
// 'ip' -- total innings pitched
// 'obp' -- on base percentage
// 'w' -- total wins
// 'ao' -- fly out
// 'r' -- total runs
// 'ab' -- at bats
// 'name_last' -- last name
// 'er' -- total earned runs
//****************************************************************************************************
// pitchingLeaders returns data regarding the hitting leaderboards for a specific season
//****************************************************************************************************
// results is a required INTERGER, specifying the number of results to return;
// season is also a required parameter;
// game_type is a required parameter;
// sort_column is a required parameter, specifying which stat to sort by: 'era', 'so', etc.
//----------------------------------------------------------------------------------------------------
const pitchingLeaders = (results, game_type, season, sort_column, callback) => {
  let leader_pitching_repeater;
  let link = leader_pitching_repeater ?
    `http://lookup-service-prod.mlb.com/json/named.leader_pitching_repeater.bam?sport_code='mlb'&results=${results}&game_type='${game_type}'&season='${season}'&sort_column='${sort_column}'&leader_pitching_repeater.col_in=${leader_pitching_repeater}` :
    `http://lookup-service-prod.mlb.com/json/named.leader_pitching_repeater.bam?sport_code='mlb'&results=${results}&game_type='${game_type}'&season='${season}'&sort_column='${sort_column}'`
  let pitchers;
  axios.get(link)
    .then(res => {
      leaders = res.data.leader_pitching_repeater.leader_pitching_mux.queryResults.row;
      let dataArray = [];
      // console.log(leaders);
      for (let players in leaders) {
        let player = leaders[players];
        console.log(player)
        let data = {
          name: player.name_display_first_last,
          sort_column: player[sort_column],
          era: player.era,
          whip: player.whip,
          strikeouts: player.so,
          walks: player.bb,
          k_bb: player.k_bb,
          wins: player.w,
          loses: player.l,
          games: player.g,
          hits: player.h,
          home_runs: player.hr,
          runs: player.r,
        }
        dataArray.push(data);
      }
      // console.log(dataArray)
      callback(dataArray)
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.pitchingLeaders = pitchingLeaders;

// pitchingLeaders(results, game_type, season, sort_column, leader_pitching_repeater);
