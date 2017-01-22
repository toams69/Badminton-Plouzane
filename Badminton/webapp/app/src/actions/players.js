import axios from 'axios';

export const GET_PLAYERS = 'GET_PLAYERS';
export const GET_PLAYERS_SUCCESS = 'GET_PLAYERS_SUCCESS';
export const GET_PLAYERS_FAILURE = 'GET_PLAYERS_FAILURE';

export const GET_PLAYER = 'GET_PLAYER';
export const GET_PLAYER_SUCCESS = 'GET_PLAYER_SUCCESS';
export const GET_PLAYER_FAILURE = 'GET_PLAYER_FAILURE';

const ROOT_URL = 'http://'+window.location.hostname+':3002/api';

export function getAllPlayers() {
  const request = axios.get(`${ROOT_URL}/players`);
  return {
    type: GET_PLAYERS,
    payload: request
  };
}

export function getAllPlayersSuccess(players) {
  return {
    type: GET_PLAYERS_SUCCESS,
    payload: players
  };
}

export function getPlayer(playerId) {
  const request = axios.get(`${ROOT_URL}/players/`+playerId);
  return {
    type: GET_PLAYER,
    payload: request
  };
}

export function getPlayerSuccess(player) {
  return {
    type: GET_PLAYER_SUCCESS,
    payload: player
  };
}