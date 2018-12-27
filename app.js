const axios = require('axios');
//****************************************************************************************************
// API DOCUMENTATION CAN BE FOUND HERE:
// https://appac.github.io/mlb-data-api-docs/
//****************************************************************************************************
// NOTE: ALL variables should be STRINGS, including player_ids and years/seasons
//****************************************************************************************************
let name = 'Kershaw';
let team_id = '119' // Dodgers
let active; // Y or N
// let player_id = '641355'; // Bellinger (for hitting stats)
let player_id = '477132'; // Kershaw (for pitching stats)
// let season = '2018';
// let game_type = 'R';
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
//****************************************************************************************************
// PLAYER FUNCTIONS
//****************************************************************************************************
//****************************************************************************************************
// playerSearch searches via inputed string.
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
      console.log(player)
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
//****************************************************************************************************
// hittingStats returns a players hitting statistics given a player_id, season (year), and game_type
//****************************************************************************************************
const hittingStats = (player_id, season, game_type) => {
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

// hittingStats(player_id, season, game_type);
//****************************************************************************************************
// pitchingStats returns pitching statistics given a player_id, season (year), and game_type
//****************************************************************************************************
const pitchingStats = (player_id, season, game_type) => {
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
// pitchingStats(player_id, season, game_type);
//****************************************************************************************************
//****************************************************************************************************
// TEAM FUNCTIONS
//****************************************************************************************************
//****************************************************************************************************
// listTeams returns all the teams of a given year
// change allStar to 'Y' to include All Star Teams
//****************************************************************************************************
const listTeams = (season) => {
  let allStar = 'N';
  let link = `http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='${allStar}'&sort_order=name_asc&season='${season}'`;
  let teams;
  axios.get(link)
    .then(res =>{
      teams = res.data.team_all_season.queryResults.row;
      console.log(teams);
    })
    .catch(err =>{
      console.log(err);
    });
};
// listTeams(season)
//****************************************************************************************************
// fortyManRoster returns the ACTIVE 40 man roster of a given team
//****************************************************************************************************
const fortyManRoster = (team_id) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id='${team_id}'`;
  let roster;
  axios.get(link)
    .then(res =>{
      roster = res.data.roster_40.queryResults.row;
      // console.log(roster);
      for(let player in roster){
        // console.log(roster[player].name_display_first_last)
      }
    })
    .catch(err =>{
      console.log(err);
    });
};
// fortyManRoster(team_id);
//****************************************************************************************************
// rosterBySeason returns a team's roster between given dates
//****************************************************************************************************
let start = '2016';
let end = '2017';

const rosterBySeason = (team_id, start, end) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season='${start}'&end_season='${end}'&team_id='${team_id}'`;
  let roster;
  axios.get(link)
    .then(res =>{
      roster = res.data.roster_team_alltime.queryResults.row;
      console.log(roster);
      // for(let player in roster){
        // console.log(roster[player].name_first_last)
      // }
    })
    .catch(err =>{
      console.log(err);
    });
};
// rosterBySeason(team_id, start, end);

//****************************************************************************************************
//****************************************************************************************************
// REPORTS FUNCTIONS
//****************************************************************************************************
//****************************************************************************************************
// transactionsOverPeriod returns all transactions over a given period of time
// start_date and end_date should be in YYYYMMDD format
//****************************************************************************************************
// let start_date = '20181211';
// let end_date = '20181218';

const transactionsOverPeriod = (start_date, end_date) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.transaction_all.bam?sport_code='mlb'&start_date='${start_date}'&end_date='${end_date}'`;
  let players;
  axios.get(link)
    .then(res =>{
      players = res.data.transaction_all.queryResults.row;
      console.log(players);
    })
    .catch(err =>{
      console.log(err);
    });
};
// transactionsOverPeriod(start_date, end_date);
//****************************************************************************************************
// broadcastInformation returns all data about broadcast over a given period of time
// start_date and end_date should be in YYYYMMDD format
// home_away is an optional parameter. 'H' for home games. 'A' for away games. Leave null for both
//****************************************************************************************************
// let start_date = '20181021';
// let end_date = '20181031';
// let home_away = 'A';
// let season = '2018';

const broadcastInformation = (start_date, end_date, home_away) => {
  let link = `http://lookup-service-prod.mlb.com/json/named.mlb_broadcast_info.bam?src_type='TV'&src_comment='National'&tcid=mm_mlb_schedule&sort_by='game_time_et_asc'&home_away='${home_away}'&start_date='${start_date}'&end_date='${end_date}'&season='${season}'`;
  let trades;
  axios.get(link)
    .then(res =>{
      trades = res.data.mlb_broadcast_info.queryResults.row;
      console.log(trades);
    })
    .catch(err =>{
      console.log(err);
    });
};
// broadcastInformation(start_date, end_date, home_away);
//****************************************************************************************************
// ***  NOT WORKING  ***   ***  NOT WORKING  ***   ***  NOT WORKING  ***   ***  NOT WORKING  ***
//****************************************************************************************************
// injuryReport returns all players who are currently injured
//****************************************************************************************************
// ***  NOT WORKING  ***   ***  NOT WORKING  ***   ***  NOT WORKING  ***   ***  NOT WORKING  ***
//****************************************************************************************************

// API endpoint isn't correctly documented

// const injuryReport = () => {
//   let link = `http://lookup-service-prod.mlb.com/fantasylookup/json/json/named.wsfb_news_injury.bam?`;
//   let injuredPlayers;
//   axios.get(link)
//     .then(res =>{
//       injuredPlayers = res.data.wsfb_news_injury.queryResults.row;
//       console.log(injuredPlayers);
//     })
//     .catch(err =>{
//       console.log(err);
//     });
// };
// injuryReport();
//****************************************************************************************************
// hittingLeaders returns data regarding the hitting leaderboards
//****************************************************************************************************
// results is a required INTERGER, specifying the number of results to return;
// season is also a required parameter;
// game_type is a required parameter;
// sort_column is a required parameter, specifying which stat to sort by: 'ab', 'hr', etc.
//****************************************************************************************************
// SORT COLUMNS
//---------------------------------------------------------------------------------------------------- --
// 'gidp' -- ground into double player
// 'sac' -- sacrifice fly
// 'np' -- number of pitches seen
// 'name_display_first_last' -- displays name
// 'pos' -- position
// 'rank' -- power ranking
// 'tb' -- total bases
// 'team_brief' -- team's short name or 'mascot'
// 'sport_id' --
// 'name_display_last_init' -- last name, first initial
// 'bb' -- walks
// 'avg' -- batting average
// 'slg' -- slugging average
// 'ops' -- on base percentage plus slugging
// 'hbp' -- hit by pitch
// 'team_abbrev' -- capitalized abbreviated team name
// 'so' -- strikeouts
// 'league_id' -- number that refers to team's league and division
// 'sf' --
// 'team' -- lowercase abbreviation
// 'league' -- NL or AL
// 'cs' --
// 'sb' -- stolen bases
// 'go_ao' --
// 'last_name' -- player's last name
// 'player_id' -- MLB stats API id associated with player
// 'ibb' --
// 'player_qualifier' --
// 'team_id' -- MLB stats API id associated with player's team
// 'go' --
// 'hr' -- homeruns
// 'minimum_qualifier' --
// 'gdp' --
// 'name_display_roster' --
// 'qualifies' --
// 'rbi' -- Runners batted in
// 'name_first' -- player's first name
// 'bats' -- Bats left handed, right handed, or switch hits.
// 'xbh' --
// 'g' -- games played
// 'd' --
// 'team_name' -- name of player's team
// 'sport' --
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
let results = 20;
let sort_column = 'hr';
let game_type = 'R';
let season = '2018';
let leader_hitting_repeater;

const hittingLeaders = (results, game_type, season, sort_column, leader_hitting_repeater) => {
  let link = leader_hitting_repeater
  ? `http://lookup-service-prod.mlb.com/json/named.leader_hitting_repeater.bam?sport_code='mlb'&results=${results}&game_type='${game_type}'&season='${season}'&sort_column='${sort_column}'&leader_hitting_repeater.col_in=${leader_hitting_repeater}`
  : `http://lookup-service-prod.mlb.com/json/named.leader_hitting_repeater.bam?sport_code='mlb'&results=${results}&game_type='${game_type}'&season='${season}'&sort_column='${sort_column}'`;
  let leaders;
  axios.get(link)
    .then(res =>{
      leaders = res.data.leader_hitting_repeater.leader_hitting_mux.queryResults.row;
      // console.log(leaders);
      for(let x in leaders){
        let player = leaders[x];
        for(let y in player){
          // Shows keys, which are the sort_columns
          // console.log(y)
        }
        // See results :
        // console.log(player)
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
