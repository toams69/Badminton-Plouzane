import axios from 'axios';

export const GET_PLAYERS = 'GET_PLAYERS';
export const GET_PLAYERS_SUCCESS = 'GET_PLAYERS_SUCCESS';
export const GET_PLAYERS_FAILURE = 'GET_PLAYERS_FAILURE';
export const GET_PLAYER = 'GET_PLAYER';

const ROOT_URL = 'http://localhost:3002/api';

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

export function getPlayer(player) {
   return {
    type: GET_PLAYER,
    player: player
  };
}
