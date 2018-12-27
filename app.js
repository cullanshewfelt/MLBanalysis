//****************************************************************************************************
const axios = require('axios');
//****************************************************************************************************
// Here are all the modules being imported.
// Refer to ./functions/ to see logic & API endpoints
// ---------------------------------------------------------------------------------------------------
// OR ALL API DOCUMENTATION CAN BE FOUND HERE:
// https://appac.github.io/mlb-data-api-docs/
//****************************************************************************************************
const rosterSearch = require('./functions/rosterSearch.js');
const playerSearch = require('./functions/playerSearch.js');
const projectedStats = require('./functions/projectedStats.js');
const seasonStats = require('./functions/seasonStats.js');
const leagueStats = require('./functions/leagueStats.js');
const careerStats = require('./functions/careerStats.js');
const reports = require('./functions/reports.js');
const leaderboards = require('./functions/leaderboards.js');
//****************************************************************************************************
// Visit ./functions/ to see logic & API endpoints
//****************************************************************************************************
// NOTE: ALL variables should be STRINGS, including player_ids and years/seasons
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
// TEST variables
//----------------------------------------------------------------------------------------------------
let name = 'Kershaw';
let team_id = '119' // Dodgers
let active; // Y or N
// let player_id = '641355'; // Bellinger (for hitting stats)
let player_id = '477132'; // Kershaw (for pitching stats)
let season = '2018';
let game_type = 'R';
let allStar;
let start = '2016';
let end = '2017';
let start_date = '20181223';
let end_date = '20181227';
//----------------------------------------------------------------------------------------------------
// rosterSearch.listTeams(season, allStar);
// rosterSearch.fortyManRoster(team_id);
// rosterSearch.rosterBySeason(team_id, start, ed);
//----------------------------------------------------------------------------------------------------
// playerSearch.playerSearch(name, active);
// playerSearch.playerLookup(player_id);
// playerSearch.playerTeams(player_id, season);
//----------------------------------------------------------------------------------------------------
// projectedStats.projectedHittingStats(player_id, season);
// projectedStats.projectedPitchingStats(player_id, season);
//----------------------------------------------------------------------------------------------------
// seasonStats.seasonHittingStats(player_id, season, game_type);
// seasonStats.seasonPitchingStats(player_id, season, game_type);
//----------------------------------------------------------------------------------------------------
// leagueStats.leagueHittingStats(player_id, game_type);
// leagueStats.leaguePitchingStats(player_id, game_type);
//----------------------------------------------------------------------------------------------------
// careerStats.careerHittingStats(player_id, game_type);
// careerStats.careerPitchingStats(player_id, game_type);
//----------------------------------------------------------------------------------------------------
// reports.transactionsOverPeriod(start_date, end_date);
// reports.broadcastInformation(start_date, end_date, home_away);
// reports.injuryReport() // !WORKING
//----------------------------------------------------------------------------------------------------
let results = 3;
// let game_type = 'R';
// let season = '2018';
let sort_column = 'hr';
let leader_hitting_repeater;
let leader_pitching_repeater;
// leaderboards.hittingLeaders(results, game_type, season, sort_column, leader_hitting_repeater);
// leaderboards.pitchingLeaders(results, game_type, season, sort_column, leader_pitching_repeater);
