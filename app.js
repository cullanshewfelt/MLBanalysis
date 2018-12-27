const axios = require('axios');
const projectedStats = require('./functions/projectedStats.js');
const players = require('./functions/playerSearch.js');
const seasonStats = require('./functions/seasonStats.js');
const careerStats = require('./functions/careerStats.js');
const leagueStats = require('./functions/leagueStats.js');
const rosterSearch = require('./functions/rosterSearch.js');
const reports = require('./functions/reports.js');
const leaderboards = require('./functions/leaderboards.js');

//****************************************************************************************************
// API DOCUMENTATION CAN BE FOUND HERE:
// https://appac.github.io/mlb-data-api-docs/
// Visit ./functions/ to see logic & API endpoints
//****************************************************************************************************
// NOTE: ALL variables should be STRINGS, including player_ids and years/seasons
//****************************************************************************************************
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

// projectedStats.projectedPitchingStats(player_id, season);
// players.playerSearch(name, active)
// seasonStats.seasonHittingStats(player_id, season, game_type);
// careerStats.careerHittingStats(player_id, game_type);
// leagueStats.leagueHittingStats(player_id, game_type);
// rosterSearch.listTeams(season, allStar);
// reports.transactionsOverPeriod(start_date, end_date);
// reports.broadcastInformation(start_date, end_date, home_away);
// reports.injuryReport() // !WORKING

let results = 3;
// let game_type = 'R';
// let season = '2018';
let sort_column = 'era';
let leader_hitting_repeater;
let leader_pitching_repeater;

// leaderboards.hittingLeaders(results, game_type, season, sort_column, leader_hitting_repeater);
// leaderboards.pitchingLeaders(results, game_type, season, sort_column, leader_pitching_repeater);

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
