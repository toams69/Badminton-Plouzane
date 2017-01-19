import axios from 'axios';

export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const UPDATE_PLAYER_CLUB = 'UPDATE_PLAYER_CLUB';
export const UPDATE_PLAYER_SUCCESS = 'UPDATE_PLAYER_SUCCESS';
export const UPDATE_PLAYER_FAILURE = 'UPDATE_PLAYER_FAILURE';

export const DELETE_PLAYER = 'DELETE_PLAYER';
export const DELETE_PLAYER_SUCCESS = 'DELETE_PLAYER_SUCCESS';
export const DELETE_PLAYER_FAILURE = 'DELETE_PLAYER_FAILURE';

export const GET_PLAYERS = 'GET_PLAYERS';
export const GET_PLAYERS_SUCCESS = 'GET_PLAYERS_SUCCESS';
export const GET_PLAYERS_FAILURE = 'GET_PLAYERS_FAILURE';

export const CREATE_NEW_PLAYER = 'CREATE_NEW_PLAYER';
export const UPDATE_FIELD = "UPDATE_FIELD";


export const SELECT_PLAYER_TO_EDIT = 'SELECT_PLAYER_TO_EDIT';
export const EDIT_PLAYER = 'EDIT_PLAYER';
export const EDIT_PLAYER_SUCCESS = 'EDIT_PLAYER_SUCCESS';
export const EDIT_PLAYER_FAILURE = 'EDIT_PLAYER_FAILURE';

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

export function updatePlayer(player) {
  let request = null;
  if (player.isNew) {
    request = axios.post(`${ROOT_URL}/players`, player);
  } else {

    request = axios.post(`${ROOT_URL}/players`+"/"+player["_id"], {"operation": "update", "player": player});
  }
  return {
    type: UPDATE_PLAYER,
    payload: request
  };
}

export function updatePlayerClub(playerId, clubId, year) {
  let request = null;

  request = axios.post(`${ROOT_URL}/enrollments`, {"playerId": playerId, "clubId": clubId, "saison": year});

  return {
    type: UPDATE_PLAYER_CLUB,
    payload: request
  };
}



export function updatePlayerSuccess(player) {
  return {
    type: UPDATE_PLAYER_SUCCESS,
    payload: player
  };
}

export function updatePlayerFailure(error) {
  return {
    type: UPDATE_PLAYER_FAILURE,
    payload: error
  };
}

export function deletePlayer(id) {
  const request = axios.post(`${ROOT_URL}/players/`+id, {"operation": "delete"});
  return {
    type: DELETE_PLAYER,
    payload: request
  };
}

export function deletePlayerSuccess() {
  return {
    type: DELETE_PLAYER_SUCCESS
  };
}

export function deletePlayerFailure(error) {
  return {
    type: DELETE_PLAYER_FAILURE,
    payload: error
  };
}

export function createNewPlayer() {
  return {
    type: CREATE_NEW_PLAYER
  };
}

export function updateField(key, value) {
  return {
    type: UPDATE_FIELD,
    key: key,
    value: value
  };
}

export function getPlayer(player) {
   return {
    type: GET_PLAYER,
    player: player
  };
}
